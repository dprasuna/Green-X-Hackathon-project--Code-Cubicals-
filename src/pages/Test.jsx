import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Test = ({ onMintComplete }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleMintNFT = async () => {
    const issuerSecret = 'SDBWDEU6LZY4WNEF6WAORXEJ7Z6L3IKBGLSKWWJGA2VKOVXOII54EY5E';
    const receiverSecret = 'SBEAY5MVLNCQQZY33ENRBJPEE2HIVU7I3YLHZ5STZQADKAL7GOECA6V5';
    const receiverPublicKey = 'GCKMH4PIORG24WIEXYUGALFFQZ7CZRKCALBZOLDTCDD5MBZ4AIQTQSL3';
    const nftName = 'SampleNFT';
    const nftMetadata = 'Sample Metadata';

    if (!file) {
      console.error('No file selected');
      return;
    }

    setIsLoading(true); // Show loader

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Upload file
      const response = await axios.post('https://greenx.onrender.com/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const filePath = response.data.filePath;

      // Mint NFT
      await axios.post('https://greenx.onrender.com/createNFT', {
        issuerSecret,
        receiverSecret,
        receiverPublicKey,
        nftName,
        nftMetadata,
        filePath
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('NFT minted successfully');
      setIsModalVisible(true); // Show success modal
      onMintComplete();
    } catch (error) {
      console.error('Error minting NFT:', error);
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <input 
        type="file" 
        onChange={handleFileChange} 
        style={{ 
          display: 'block', 
          margin: '20px auto', 
          padding: '10px', 
          border: '1px solid #ccc', 
          borderRadius: '4px' 
        }} 
      />
      {previewUrl && (
        <img 
          src={previewUrl} 
          alt="Preview" 
          style={{ 
            display: 'block', 
            margin: '20px auto', 
            maxHeight: '200px', 
            borderRadius: '4px' 
          }} 
        />
      )}
      <button 
        onClick={handleMintNFT}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer', 
          fontSize: '16px' 
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? 'Minting...' : 'MINT NFT'}
      </button>
      {isLoading && (
        <div className="mt-4 flex justify-center items-center h-64">
          <Spin 
            indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} 
            size="large" 
          />
        </div>
      )}
      <Modal
        title="Success"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>
        ]}
      >
        <p>Your NFT has been minted successfully!</p>
      </Modal>
    </div>
  );
};

export default Test;
