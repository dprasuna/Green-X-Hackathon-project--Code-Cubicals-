const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function uploadFileToIPFS(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath);
    const formData = new FormData();
    formData.append('file', fileContent, {
      filename: 'file.jpg', // Replace with actual file name if needed
      contentType: 'image/jpeg' // Replace with actual file content type if needed
    });

    console.log('Uploading file to IPFS...');

    const response = await axios.post('https://uploadipfs.diamcircle.io/api/v0/add', formData, {
      headers: {
        ...formData.getHeaders()
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    console.log('File uploaded to IPFS successfully');

    if (response.status === 200 && response.data && response.data.Hash) {
      console.log('IPFS Hash:', response.data.Hash);  
      return response.data.Hash;
    } else {
      throw new Error('Failed to upload file to IPFS');
    }
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    throw error;
  }
}

module.exports = { uploadFileToIPFS };
