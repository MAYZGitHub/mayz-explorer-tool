import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env.local')) {
    dotenv.config({ path: '.env.local' });
} else {
    dotenv.config(); // fallback a .env
}

import { getUTXOs, getDatum, getAssetsUnderPolicy, getAssetHolders } from './helpers/blockfrost';

const INVEST_UNITS_ADDRESS_GOV = process.env.INVEST_UNITS_ADDRESS_GOV as string;
if (!INVEST_UNITS_ADDRESS_GOV) {
    throw new Error("❌ INVEST_UNITS_ADDRESS_GOV not set. Make sure it's in your .env file.");
}

const INVEST_UNITS_ADDRESS_DAPP = process.env.INVEST_UNITS_ADDRESS_DAPP as string;
if (!INVEST_UNITS_ADDRESS_DAPP) {
    throw new Error("❌ INVEST_UNITS_ADDRESS_DAPP not set. Make sure it's in your .env file.");
}

async function exploreInvestUnits(invest_unit_sc_address: string) {
    console.log('🚀 Starting Fund Holdings Resolver');

    const utxos = await getUTXOs(invest_unit_sc_address);

    for (const utxo of utxos) {
        const datumHash = utxo.data_hash;
        if (!datumHash) {
            console.log('⚠️ Skipping UTXO with no datum hash');
            continue;
        }

        const datum = await getDatum(datumHash);
        const fundPolicy = datum?.json_value?.fields?.[0]?.fields?.[1]?.bytes;
        if (!fundPolicy) {
            console.log('⚠️ No Fund Policy found');
            continue;
        }

        console.log('🔑 Fund Policy ID:', fundPolicy);

        const assets = await getAssetsUnderPolicy(fundPolicy);
        const fundId = assets.find((a: any) => a.asset.endsWith('46756e644944'))?.asset;

        if (!fundId) {
            console.log('⚠️ FundID Token not found');
            continue;
        }

        const fundHolders = await getAssetHolders(fundId);
        const fundAddress = fundHolders?.[0]?.address;
        if (!fundAddress) {
            console.log('⚠️ Fund Contract address not found');
            continue;
        }

        console.log('🏦 Fund Contract Address:', fundAddress);

        const fundUTXOs = await getUTXOs(fundAddress);
        const fundDatumHash = fundUTXOs.find((u: any) => u.data_hash)?.data_hash;
        if (!fundDatumHash) {
            console.log('⚠️ No datum found on fund contract');
            continue;
        }

        const fundDatum = await getDatum(fundDatumHash);
        const holdingPolicy = fundDatum?.json_value?.fields?.[0]?.fields?.[4]?.bytes;
        if (!holdingPolicy) {
            console.log('⚠️ FundHoldings Policy not found');
            continue;
        }

        console.log('🔐 FundHoldings Policy:', holdingPolicy);

        const holdingAssets = await getAssetsUnderPolicy(holdingPolicy);
        const holdingToken = holdingAssets?.[0]?.asset;
        if (!holdingToken) {
            console.log('⚠️ FundHolding token not found');
            continue;
        }

        const holdingAddr = (await getAssetHolders(holdingToken))?.[0]?.address;
        if (!holdingAddr) {
            console.log('⚠️ FundHoldings address not found');
            continue;
        }

        console.log('✅ Fund Holding Address:', holdingAddr);
        console.log('---------------------------------------');
        await inspectFundHoldingAssets(holdingAddr, holdingPolicy);
        console.log('---------------------------------------');
    }

    console.log('🏁 Done');
}

async function inspectFundHoldingAssets(holdingAddress: string, holdingPolicy: string) {
    console.log(`🔍 Fetching UTXOs from FundHolding address: ${holdingAddress}`);
    const utxos = await getUTXOs(holdingAddress);

    const fundHoldingUtxos = utxos.filter((u: any) =>
        u.amount.some(
            (a: any) => a.unit.startsWith(holdingPolicy) && a.unit.slice(56).startsWith('46756e64486f6c64696e674944') // "FundHoldingID" en hex
        )
    );

    for (const utxo of fundHoldingUtxos) {
        console.log(`🔸 UTXO: ${utxo.tx_hash}#${utxo.output_index}`);
        for (const asset of utxo.amount) {
            console.log(`   🪙 ${asset.unit}: ${asset.quantity}`);
        }
    }

    if (fundHoldingUtxos.length === 0) {
        console.log('⚠️ No UTXOs with FundHoldingID tokens found.');
    }
}

(async () => {
    console.log("🔍 Exploring Invest Units for GOVERNANCE fund...");
    await exploreInvestUnits(INVEST_UNITS_ADDRESS_GOV);

    console.log("🔍 Exploring Invest Units for DAPP fund...");
    await exploreInvestUnits(INVEST_UNITS_ADDRESS_DAPP);
})();