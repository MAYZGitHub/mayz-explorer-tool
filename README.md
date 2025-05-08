# 🧠 MAYZ Explorer Tool

This CLI tool performs a recursive on-chain analysis of the MAYZ Protocol fund structure on Cardano, using the Blockfrost API.

It resolves the address tree and tokens starting from the Invest Unit contract.

The tool explores two smart contract addresses:

- `INVEST_UNITS_ADDRESS_GOV`: for the Governance Site
- `INVEST_UNITS_ADDRESS_DAPP`: for the Funds dApp

These must be defined in your `.env` file. A template is provided as `.env.example`.

---

## 🚀 What It Does

Given an `InvestUnit` contract, this tool:

1. Fetches all UTXOs from the InvestUnit address.
2. Extracts the `FundID` from the datum and locates its Fund Contract.
3. Retrieves the `FundDatum`, including the `FundHoldingPolicy`.
4. Identifies the FundHolding contract address.
5. Scans all UTXOs at that address that include `FundHoldingID`.
6. For each UTXO, lists all tokens it contains.

---

## ⚙️ Setup

### 1. Clone and install

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env` with your Blockfrost API key and contract addresses:

```bash
BLOCKFROST_API_KEY=mainnetxxx
INVEST_UNITS_ADDRESS_GOV=addr1w8gdpwxszrtvlqutsmnexyshkxfa4x0q7e87d026hhdjljc2drj9d
INVEST_UNITS_ADDRESS_DAPP=addr1w8zmludk4gzhfynchy70fxatw2nrec4h9ny9cssjs5nsm4sh8heer
```

### 3. Run the script

```bash
npm run start
```

---

## 📁 Project Structure

```bash
src/
  ├── main.ts            # Entry point
  └── helpers/
       └── blockfrost.ts # API wrapper for Blockfrost
.env                     # Your Blockfrost API key and contract addresses
```

---

## 🧪 Example Output

```bash
🔍 Exploring Invest Units for GOVERNANCE fund...
🚀 Starting Fund Holdings Resolver
📡 Calling: https://cardano-mainnet.blockfrost.io/api/v0/addresses/addr1w8gdpwxszrtvlqutsmnexyshkxfa4x0q7e87d026hhdjljc2drj9d/utxos
📡 Calling: https://cardano-mainnet.blockfrost.io/api/v0/scripts/datum/8d8880922509b569eb811c0268346aac0ba32b9620aa2498f6ad6c2992aa293e
🔑 Fund Policy ID: e46f629f31e4a3c4ba16dd3bc396f24fb222f2776e7d698f2bda5018
📡 Calling: https://cardano-mainnet.blockfrost.io/api/v0/assets/policy/e46f629f31e4a3c4ba16dd3bc396f24fb222f2776e7d698f2bda5018
📡 Calling: https://cardano-mainnet.blockfrost.io/api/v0/assets/e46f629f31e4a3c4ba16dd3bc396f24fb222f2776e7d698f2bda501846756e644944/addresses
🏦 Fund Contract Address: addr1w8sqnryer3ddeypuztxyzp3n3n73gkzpyn6t3hmpfa3rj4cckmaks
📡 Calling: https://cardano-mainnet.blockfrost.io/api/v0/addresses/addr1w8sqnryer3ddeypuztxyzp3n3n73gkzpyn6t3hmpfa3rj4cckmaks/utxos
📡 Calling: https://cardano-mainnet.blockfrost.io/api/v0/scripts/datum/3658f61c83cff6879f5406ea53b81c37a1166670d38dcc69853d124cdf244d2b
🔐 FundHoldings Policy: 663f691fb395701ec27c044f908db7fa66e3379dafe072a3b4da332f
📡 Calling: https://cardano-mainnet.blockfrost.io/api/v0/assets/policy/663f691fb395701ec27c044f908db7fa66e3379dafe072a3b4da332f
📡 Calling: https://cardano-mainnet.blockfrost.io/api/v0/assets/663f691fb395701ec27c044f908db7fa66e3379dafe072a3b4da332f46756e64486f6c64696e67494430/addresses
✅ Fund Holding Address: addr1wxn9kx9w0gjzfkyuejqtt834z04gd9yrans6hy0xt5vunpslcg4j7
---------------------------------------
🔍 Fetching UTXOs from FundHolding address: addr1wxn9kx9w0gjzfkyuejqtt834z04gd9yrans6hy0xt5vunpslcg4j7
📡 Calling: https://cardano-mainnet.blockfrost.io/api/v0/addresses/addr1wxn9kx9w0gjzfkyuejqtt834z04gd9yrans6hy0xt5vunpslcg4j7/utxos
🔸 UTXO: 69cb2832842461e3c3c5a6a273c18efca593ea16d3c688d9558e78bd6fadc7f8#0
   🪙 lovelace: 2112331
   🪙 663f691fb395701ec27c044f908db7fa66e3379dafe072a3b4da332f46756e64486f6c64696e67494431: 1
   🪙 9e6d0f1fd1ba193afc247f560bbb3a847b3bcfcf9689019d54b7a9224d41595a5f4144415f4c51: 411497128110
   🪙 9e975c76508686eb2d57985dbaea7e3843767a31b4dcf4e99e5646834d41595a: 16459885124400
🔸 UTXO: 8831ae5ffa5b815efab345e60be0aa36f5d8ffd4b127e1a2b5e5fb6a69659d59#0
   🪙 lovelace: 2112331
   🪙 663f691fb395701ec27c044f908db7fa66e3379dafe072a3b4da332f46756e64486f6c64696e67494430: 1
   🪙 9e6d0f1fd1ba193afc247f560bbb3a847b3bcfcf9689019d54b7a9224d41595a5f4144415f4c51: 812587409940
   🪙 9e975c76508686eb2d57985dbaea7e3843767a31b4dcf4e99e5646834d41595a: 32503496397600
---------------------------------------
🏁 Done
🔍 Exploring Invest Units for DAPP fund...
🚀 Starting Fund Holdings Resolver
📡 Calling: https://cardano-mainnet.blockfrost.io/api/v0/addresses/addr1w8zmludk4gzhfynchy70fxatw2nrec4h9ny9cssjs5nsm4sh8heer/utxos
📡 Calling: https://cardano-mainnet.blockfrost.io/api/v0/scripts/datum/19e33226372c09c47dff59872e16fe43a168a10ea1b3f31b13d4cb02508fda73
🔑 Fund Policy ID: 55155a850105559a935720475f4d7eb080352c56408a28cef6ed23bc
📡 Calling: https://cardano-mainnet.blockfrost.io/api/v0/assets/policy/55155a850105559a935720475f4d7eb080352c56408a28cef6ed23bc
📡 Calling: https://cardano-mainnet.blockfrost.io/api/v0/assets/55155a850105559a935720475f4d7eb080352c56408a28cef6ed23bc46756e644944/addresses
🏦 Fund Contract Address: addr1w97l8camcru0jsanv8cwf3ru5mrtep9zzcm7tqsg8pcf4hsh3nufx
📡 Calling: https://cardano-mainnet.blockfrost.io/api/v0/addresses/addr1w97l8camcru0jsanv8cwf3ru5mrtep9zzcm7tqsg8pcf4hsh3nufx/utxos
📡 Calling: https://cardano-mainnet.blockfrost.io/api/v0/scripts/datum/191e52dbbeb2a0426bc07884a5cde068f9d7b029bdfbb5640477cc13e470fcfb
🔐 FundHoldings Policy: 9e804995fb82b1170c1bf3c1c81902adfd4dd25786ef035546366e69
📡 Calling: https://cardano-mainnet.blockfrost.io/api/v0/assets/policy/9e804995fb82b1170c1bf3c1c81902adfd4dd25786ef035546366e69
📡 Calling: https://cardano-mainnet.blockfrost.io/api/v0/assets/9e804995fb82b1170c1bf3c1c81902adfd4dd25786ef035546366e6946756e64486f6c64696e67494430/addresses
✅ Fund Holding Address: addr1wxlgzwu4vr5h75ndr523unyqrsq6g455uhudps02h403t4qkjud9l
---------------------------------------
🔍 Fetching UTXOs from FundHolding address: addr1wxlgzwu4vr5h75ndr523unyqrsq6g455uhudps02h403t4qkjud9l
📡 Calling: https://cardano-mainnet.blockfrost.io/api/v0/addresses/addr1wxlgzwu4vr5h75ndr523unyqrsq6g455uhudps02h403t4qkjud9l/utxos
🔸 UTXO: 8ac7cd48e8e4c169b1852d94cac79543c743a974d4f4426000a9272347d2ef34#0
   🪙 lovelace: 3104062
   🪙 29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c64d494e: 1048580100
   🪙 55155a850105559a935720475f4d7eb080352c56408a28cef6ed23bc43494e444558: 57936
   🪙 5dac8536653edc12f6f5e1045d8164b9f59998d3bdc300fc928434894e4d4b52: 6990534000
   🪙 804f5544c1962a40546827cab750a88404dc7108c0f588b72964754f56594649: 104858010
   🪙 9a9693a9a37912a5097918f97918d15240c92ab729a0b7c4aa144d7753554e444145: 1048580100
   🪙 9abf0afd2f236a19f2842d502d0450cbcd9c79f123a9708f96fd9b96454e4353: 69905340
   🪙 9e804995fb82b1170c1bf3c1c81902adfd4dd25786ef035546366e6946756e64486f6c64696e67494430: 1
   🪙 9e975c76508686eb2d57985dbaea7e3843767a31b4dcf4e99e5646834d41595a: 1747633500
   🪙 da8c30857834c6ae7203935b89278c532b3995245295456f993e1d244c51: 17476335
---------------------------------------
🏁 Done
```

---

## 📜 License

MIT © MAYZGitHub
