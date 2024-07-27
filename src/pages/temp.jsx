import React from 'react';
import {
  Horizon,
  Asset,
  Keypair,
  TransactionBuilder,
  BASE_FEE,
  Operation,
} from 'diamante-sdk-js';

// Initialize Horizon server and network passphrase for testnet
console.log('Initializing Horizon server and network passphrase for testnet');
const server = new Horizon.Server('https://diamtestnet.diamcircle.io/');
const networkPassphrase = 'Diamante Testnet';

// Generate key pairs for issuer, distributor, and external accounts
console.log('Generating key pairs for issuer, distributor, and external accounts');
const issuerKP = Keypair.fromSecret('SCG4RMYZZ4QFEZIU62DVZMOCL53MMWTKF77X2WIGMNHS2INVUIPOWJKO');
const distributorKP = Keypair.fromSecret('SCWSDGBE35M3AEYOKLJQUSJZIVVMR23IY65JJZXVHA5SXH2TA2AJ2JWW');
const externalKP = Keypair.fromSecret('SCYNFI4PRTULSTTHUOYS55J6LIW2VV2NJZNXZTRHOMKIN2C5RJHMK4ZL');

console.log('Issuer Public Key:', issuerKP.publicKey());
console.log('Distributor Public Key:', distributorKP.publicKey());
console.log('External Public Key:', externalKP.publicKey());

console.log('Creating asset instances');
const asset1 = new Asset('BAMBOO', issuerKP.publicKey());
const asset2 = new Asset('SAFFRON', issuerKP.publicKey());
const asset3 = new Asset('LAVENDRA', issuerKP.publicKey());


async function createAndDistributeAssets() {
  try {
    console.log('Loading issuer and distributor account details');
    const issuerAccount = await server.loadAccount(issuerKP.publicKey());
    const distributorAccount = await server.loadAccount(distributorKP.publicKey());

    console.log('Creating trustline transaction for distributor');
    const transaction = new TransactionBuilder(distributorAccount, {
      fee: BASE_FEE,
      networkPassphrase,
    })
      .addOperation(Operation.changeTrust({ asset: asset1 }))
      .addOperation(Operation.changeTrust({ asset: asset2 }))
      .addOperation(Operation.changeTrust({ asset: asset3 }))
      .setTimeout(30)
      .build();

    console.log('Signing trustline transaction');
    transaction.sign(distributorKP);
    console.log('Submitting trustline transaction');
    await server.submitTransaction(transaction);

    console.log('Creating asset transfer transaction from issuer to distributor');
    const transaction1 = new TransactionBuilder(issuerAccount, {
      fee: BASE_FEE,
      networkPassphrase,
    })
      .addOperation(
        Operation.payment({
          destination: distributorKP.publicKey(),
          asset: asset1,
          amount: '20',
        })
      )
      .addOperation(
        Operation.payment({
          destination: distributorKP.publicKey(),
          asset: asset2,
          amount: '20',
        })
      )
      .addOperation(
        Operation.payment({
          destination: distributorKP.publicKey(),
          asset: asset3,
          amount: '20',
        })
      )
      .setTimeout(30)
      .build();

    console.log('Signing asset transfer transaction');
    transaction1.sign(issuerKP);
    console.log('Submitting asset transfer transaction');
    await server.submitTransaction(transaction1);

    console.log('Transferred assets to Distributor account:', distributorKP.publicKey());

    return 1;
  } catch (e) {
    console.error('Error during createAndDistributeAssets transaction:', e);
    return 0;
  }
}

async function createLiquidity() {
  try {
    console.log('Loading distributor account details');
    const distributorAccount = await server.loadAccount(distributorKP.publicKey());

    console.log('Creating liquidity transaction');
    const transaction = new TransactionBuilder(distributorAccount, {
      fee: BASE_FEE,
      networkPassphrase,
    })
      .addOperation(
        Operation.manageSellOffer({
          selling: Asset.native(),
          buying: asset1,
          amount: '15',
          price: '1',
        })
      )
      .addOperation(
        Operation.manageSellOffer({
          selling: asset1,
          buying: asset2,
          amount: '15',
          price: '1',
        })
      )
      .addOperation(
        Operation.manageSellOffer({
          selling: asset2,
          buying: asset3,
          amount: '15',
          price: '1',
        })
      )
      .addOperation(
        Operation.manageSellOffer({
          selling: asset3,
          buying: Asset.native(),
          amount: '15',
          price: '1',
        })
      )
      .setTimeout(30)
      .build();

    console.log('Signing liquidity transaction');
    transaction.sign(distributorKP);
    console.log('Submitting liquidity transaction');
    await server.submitTransaction(transaction);

    console.log('Liquidity added successfully!');
    return 1;
  } catch (e) {
    console.error('Error during createLiquidity transaction:', e.response?.data?.extras?.result_codes || e);
    return 0;
  }
}

async function swapDiamToAsset() {
  try {
    console.log('Loading external account details');
    const externalAccount = await server.loadAccount(externalKP.publicKey());

    console.log('Creating trustline and swap transaction for external account');
    const transaction = new TransactionBuilder(externalAccount, {
      fee: BASE_FEE,
      networkPassphrase,
    })
      .addOperation(Operation.changeTrust({ asset: asset3 }))
      .addOperation(
        Operation.manageBuyOffer({
          selling: Asset.native(),
          buying: asset3,
          buyAmount: '10',
          price: '1',
        })
      )
      .setTimeout(100)
      .build();

    console.log('Signing trustline and swap transaction');
    transaction.sign(externalKP);
    console.log('Submitting trustline and swap transaction');
    await server.submitTransaction(transaction);

    console.log('Diams swapped to Asset3 successfully!');
    return 1;
  } catch (error) {
    console.error('Error during swapDiamToAsset transaction:', error);
    return 0;
  }
}


async function swapAssets() {
  try {
    console.log('Loading external account details');
    const account = await server.loadAccount(externalKP.publicKey());

    console.log('Finding best path from asset3 to asset1');
    const pathCallBuilder = server.strictSendPaths(asset3, '2', [asset1]);
    const paths = await pathCallBuilder.call();

    if (paths.records.length === 0) {
      console.log('No paths found. Checking offers...');
      return;
    }

    console.log('Best path found:', paths.records[0]);
    const bestPath = paths.records[0];

    const pathArray = bestPath.path.map((pathAsset) => {
      return new Asset(pathAsset.asset_code, pathAsset.asset_issuer);
    });

    console.log('Creating path payment transaction');
    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase,
    })
      .addOperation(Operation.changeTrust({ asset: asset1 }))
      .addOperation(
        Operation.pathPaymentStrictSend({
          sendAsset: asset3,
          sendAmount: '1',
          destination: externalKP.publicKey(),
          destAsset: asset1,
          path: pathArray,
          destMin: '1',
        })
      )
      .setTimeout(100)
      .build();

    console.log('Signing path payment transaction');
    transaction.sign(externalKP);
    console.log('Submitting path payment transaction');
    await server.submitTransaction(transaction);

    console.log('Asset3 -> Asset1 swap completed');
    return 1;
  } catch (error) {
    console.error('Error during swapAssets transaction:', error.response?.data?.extras?.result_codes || error);
    return 0;
  }
}


// Call this one by one in a main function
async function main() {
  try {
    console.log('Starting main function');
    const createAssetsResult = await createAndDistributeAssets();

    if (createAssetsResult === 1) {
      console.log('Assets created and distributed successfully');
      const createLiquidityResult = await createLiquidity();

      if (createLiquidityResult === 1) {
        console.log('Liquidity created successfully');
        const swapDiamToAssetResult = await swapDiamToAsset();

        if (swapDiamToAssetResult === 1) {
          console.log('Diam swapped to Asset3 successfully');
          await swapAssets();
          console.log('All transactions completed successfully!');
        } else {
          console.error('Error during swapDiamToAsset transaction.');
        }
      } else {
        console.error('Error during createLiquidity transaction.');
      }
    } else {
      console.error('Error during createAndDistributeAssets transaction.');
    }
  } catch (e) {
    console.error('Error during main function:', e);
  }
}

const Temp = () => {
  return (
    <div>
      <button onClick={createAndDistributeAssets}>Create And Distribute Assets</button> <br/><br/>
        <button onClick={createLiquidity}>Create Liquidity</button><br/><br/>
        <button onClick={swapDiamToAsset}>Swap Diam To Asset</button><br/><br/>
    </div>
  );
};

export default Temp;


