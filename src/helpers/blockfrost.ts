import axios from 'axios';

const BLOCKFROST_API_KEY = process.env.BLOCKFROST_API_KEY;
if (!BLOCKFROST_API_KEY) {
  throw new Error("❌ BLOCKFROST_API_KEY not set. Make sure it's in your .env file.");
}

const BASE_URL = 'https://cardano-mainnet.blockfrost.io/api/v0';

async function callApi(endpoint: string): Promise<any> {
    const url = `${BASE_URL}${endpoint}`;
    console.log('📡 Calling:', url);

    const response = await axios.get(url, {
        headers: { project_id: BLOCKFROST_API_KEY },
    });

    return response.data;
}

export async function getUTXOs(address: string) {
    return callApi(`/addresses/${address}/utxos`);
}

export async function getDatum(hash: string) {
    return callApi(`/scripts/datum/${hash}`);
}

export async function getAssetsUnderPolicy(policy: string) {
    return callApi(`/assets/policy/${policy}`);
}

export async function getAssetHolders(asset: string) {
    return callApi(`/assets/${asset}/addresses`);
}
