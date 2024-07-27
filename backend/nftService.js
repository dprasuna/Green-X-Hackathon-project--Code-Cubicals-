const diamSdk = require("diamante-sdk-js");
const { uploadFileToIPFS } = require('./ipfsService.js');
const { createTrustline } = require('./trustlineService.js');

async function createNFT(issuerSecret, receiverSecret, receiverPublicKey, nftName, nftMetadata, filePath) {
  try {
    console.log('Starting createNFT function');
    console.log(`Parameters received: issuerSecret=${issuerSecret}, receiverSecret=${receiverSecret}, receiverPublicKey=${receiverPublicKey}, nftName=${nftName}, nftMetadata=${nftMetadata}, filePath=${filePath}`);

    // Step 1: Upload file to IPFS
    const ipfsHash = await uploadFileToIPFS(filePath);
    console.log(`IPFS Hash: ${ipfsHash}`);

    // Step 2: Create Keypair from secret
    const issuerKeypair = diamSdk.Keypair.fromSecret(issuerSecret);
    console.log('Issuer Keypair created successfully');
    console.log(`Issuer Public Key: ${issuerKeypair.publicKey()}`);

    // Step 3: Create trustline
    await createTrustline(receiverSecret, receiverPublicKey, nftName, issuerKeypair.publicKey());

    // Step 4: Load issuer account
    const server = new diamSdk.Horizon.Server('https://diamtestnet.diamcircle.io');
    const issuerAccount = await server.loadAccount(issuerKeypair.publicKey());
    console.log('Issuer account loaded successfully');

    // Step 5: Create NFT asset
    const nftAsset = new diamSdk.Asset(nftName, issuerKeypair.publicKey());

    // Step 6: Ensure CID is stored completely
    const cidString = ipfsHash;
    console.log('CID String:', cidString);

    // Ensure nftMetadata is within 28 bytes and include IPFS hash
    const memoText = (nftMetadata + " | " + ipfsHash.substring(0, 16)).substring(0, 28);
    console.log('Memo text:', memoText);

    // Step 7: Build transaction
    const transaction = new diamSdk.TransactionBuilder(issuerAccount, {
      fee: await server.fetchBaseFee(),
      networkPassphrase: diamSdk.Networks.TESTNET
    })
      .addOperation(diamSdk.Operation.payment({
        destination: receiverPublicKey,
        asset: nftAsset,
        amount: '1'
      }))
      .addOperation(diamSdk.Operation.manageData({
        name: `${nftName}_CID`,
        value: cidString,
      }))
      .addMemo(diamSdk.Memo.text(memoText))
      .setTimeout(30)
      .build();
    console.log('Transaction built successfully');
    console.log(`Transaction XDR: ${transaction.toXDR()}`);

    // Step 8: Sign transaction
    transaction.sign(issuerKeypair);
    console.log('Transaction signed successfully');

    // Step 9: Submit transaction
    const result = await server.submitTransaction(transaction);
    console.log('Transaction submitted successfully');
    console.log(`Result: ${JSON.stringify(result, null, 2)}`);

    // Decode and display the CID for verification
    const cidEncoded = Buffer.from(cidString).toString('base64');
    const decodedCID = Buffer.from(cidEncoded, 'base64').toString('utf8');
    console.log('Decoded CID:', decodedCID);

    console.log('NFT created successfully');
  } catch (error) {
    console.error('Error in createNFT function:', error);
    throw error;
  }
}

module.exports = { createNFT };
