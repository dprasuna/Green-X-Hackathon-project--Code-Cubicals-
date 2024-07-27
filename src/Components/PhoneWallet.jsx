import React, { useState, useEffect } from "react";
import PasswordScreen from "./PasswordScreen";
import user from "./address.json"
import * as DiamSdk from "diamante-sdk-js";
import axios from "axios";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  MenuOutlined,
  UserOutlined,
  LockOutlined,
  PlusOutlined,
  SettingOutlined,
  PoweroffOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import transactionData from "../Components/users.json"
import { Link } from "react-router-dom";
export default function PhoneWallet({}) {
    const [activeTab, setActiveTab] = useState("History");
    const [network, setNetwork] = useState("Diam Testnet");
    const [sidePanelVisible, setSidePanelVisible] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [balance, setBalance] = useState(null);
    const [maskedKey, setMaskedKey] = useState("");
    const [sendPopupVisible, setSendPopupVisible] = useState(false);
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [account, setAccount] = useState(null);
    const [userData,setUserData] = useState({
        senderSecretKey: 'SC3OCQUG35G4UQDX6HX4UUMU5ZOKI354YXB74KQ4DNO6AWDMVRJXQGYM',
        receiverPublicKey: 'GCFZSOZJ74DQ5N6AZJF27IA6MJJ2RE5P6KDIOI66VBOAUNGN5ALWH5HJ',
        amount: ''
    });
    const server = new DiamSdk.Horizon.Server(
      "https://diamtestnet.diamcircle.io"
    );


    useEffect(() => {
        const publicKey =user[2].publicKey;
       const formattedKey = `${publicKey.slice(0, 4)}******${publicKey.slice(-4)}`;
        setMaskedKey(formattedKey);
      }, [user[1].publicKey]);

  
    const handleNetworkChange = (event) => {
      setNetwork(event.target.value);
    };
  
    const toggleSidePanel = () => {
      if (isAuthenticated) {
        setSidePanelVisible(!sidePanelVisible);
      }
    };
  
    

    const handlePayment = async () => {
        const jsonString = JSON.stringify(userData);
        console.log(userData)
        const base64Encoded = btoa(jsonString);
        const encodedText = encodeURIComponent(base64Encoded);
    const smsLink = `sms:+919350728474?body=${encodedText}`;
    

    window.open(smsLink);
    
       
    };
  
    const handlePasswordSubmit = () => {
      setIsAuthenticated(true);
      setSidePanelVisible(false);
    };
  
    const handleLogout = () => {
      setIsAuthenticated(false);
      setSidePanelVisible(false);
    };
  
    useEffect(() => {
      if (!isAuthenticated) {
        setSidePanelVisible(false);
      }
    }, [isAuthenticated]);
  
  return (
    <div className="bg-black text-white h-full p-4 flex flex-col items-center relative min-h-screen" style={{ height: '70vh' }}>
      <div className="w-full flex items-center justify-between mb-4">
        <button className="text-foreground" onClick={toggleSidePanel}>
          <MenuOutlined style={{ fontSize: "24px" }} />
        </button>
      </div>

      {sidePanelVisible && (
        <div
          className="absolute left-0 top-0 h-full bg-gray-900 p-2 flex flex-col items-center justify-between"
          style={{ width: "60px" }}
        >
          <div className="flex flex-col items-center">
            <button className="text-white mb-4" onClick={toggleSidePanel}>
              <MenuOutlined style={{ fontSize: "24px" }} />
            </button>
            <UserOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
            <p style={{ color: "#1890ff", fontSize: "12px" }}>
              {/* {data[0].username} */}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <LockOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
            <Link to="/home">
            <PlusOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
            </Link>
            <SettingOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
            <PoweroffOutlined
              style={{ fontSize: "24px", color: "#1890ff" }}
              onClick={handleLogout}
            />
          </div>
        </div>
      )}

      {!isAuthenticated ? (
        <PasswordScreen onPasswordSubmit={handlePasswordSubmit} />
      ) : (
        <>
          <div className="text-center mb-4">
            <select
              value={network}
              onChange={handleNetworkChange}
              className="bg-gray-800 text-white p-2 rounded-lg"
            >
              <option value="Diam Mainnet">Diam Mainnet</option>
              <option value="Diam Testnet">Diam Testnet</option>
            </select>
          </div>

          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold">Akshat</h2>
            <div className="rounded-lg flex items-center justify-center space-x-2">
              <span>{maskedKey}</span>
            </div>
          </div>

          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold">{balance} DIAM</h1>
          </div>

          <div className="flex justify-around w-full mb-4">
            <button
              className="flex flex-col items-center text-blue-500 p-2 rounded-lg shadow-lg"
              onClick={() => setSendPopupVisible(true)}
            >
              <div className="flex items-center justify-center bg-blue-500 text-white rounded-full w-8 h-8 mb-1">
                <ArrowUpOutlined />
              </div>
              <span>Send</span>
            </button>
            <button className="flex flex-col items-center text-blue-500 p-2 rounded-lg shadow-lg">
              <div className="flex items-center justify-center bg-blue-500 text-white rounded-full w-8 h-8 mb-1">
                <ArrowDownOutlined />
              </div>
              <span>Receive</span>
            </button>
          </div>

          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => setActiveTab("History")}
              className={`py-2 px-4 rounded-lg shadow-lg ${
                activeTab === "History"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              History
            </button>
            <button
              onClick={() => setActiveTab("Assets")}
              className={`py-2 px-4 rounded-lg shadow-lg ${
                activeTab === "Assets"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              Assets
            </button>
          </div>
          {activeTab === "History" ? (
  <div className="text-center text-gray-500">
    {transactionHistory.length === 0 ? (
      <p className="text-lg font-semibold">No Transactions</p>
    ) : (
      <ul className="space-y-4">
        {transactionHistory.map((transaction) => (
          <li
            key={transaction.id}
            className="flex items-center justify-between bg-gray-800 rounded-lg shadow-md p-3"
          >
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-full mr-3">
                <CheckOutlined className="text-white text-sm" />
              </div>
              <div>
                {transaction.type === "payment" ? (
                  <>
                    {transaction.from === sender.publicKey() ? (
                      <p className="text-white font-medium text-sm">Send</p>
                    ) : (
                      <p className="text-white font-medium text-sm">Receive</p>
                    )}
                    <p className="text-gray-400 text-xs mt-1">
                      {new Date(transaction.created_at).toLocaleDateString()}{" "}
                      From: {transaction.from.slice(0, 4)}...
                      {transaction.from.slice(-4)}
                    </p>
                  </>
                ) : (
                  <p className="text-white text-sm ml-14">
                    Account <br /> Created
                  </p>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-medium text-sm">
                {transaction.amount
                  ? parseFloat(transaction.amount).toFixed(3)
                  : parseFloat(transaction.starting_balance).toFixed(3)}{" "}
                DIAM
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {(transaction.amount
                  ? parseFloat(transaction.amount)
                  : parseFloat(transaction.starting_balance) * 0.08
                ).toFixed(3)}{" "}
                USD
              </p>
            </div>
          </li>
        ))}
        {/* Displaying the zeroth index balance */}
        {account && account.balances.length > 0 && (
          <li
            key={account.balances[0].asset_code || "native"}
            className="flex items-center justify-between bg-gray-800 rounded-lg shadow-md p-3"
          >
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-full mr-3">
                <CheckOutlined className="text-white text-sm" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">
                  {account.balances[0].asset_code === "SampleNFT" ? "NFT" : "Balance"}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Updated on {new Date(account.last_modified_time).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-medium text-sm">
                {parseFloat(account.balances[0].balance).toFixed(3)}{" "}
                DIAM
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {(parseFloat(account.balances[0].balance) * 0.08).toFixed(3)} USD
              </p>
            </div>
          </li>
        )}
      </ul>
    )}
  </div>
) : (
  <div className="text-center text-gray-500">
    <p>No Assets</p>
  </div>
)}




          {sendPopupVisible && (
           <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center">
           <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
               <h2 className="text-xl font-semibold mb-4">Enter Your Credentials</h2>
   
               
   
               <div className="mb-4">
                   <label className="block mb-2">Receiver Public Key</label>
                   <input
                       type="text"
                    //    value={transactionData.receiverPublicKey}
                    value={user[2].publicKey}
                       onChange={(e) =>
                           setUserData({
                               ...userData,
                               receiverPublicKey: e.target.value,
                           })
                       }
                       className="w-full p-2 rounded-lg bg-gray-700 text-white"
                   />
               </div>
   
               <div className="mb-4">
                   <label className="block mb-2">Amount</label>
                   <input
                       type="number"
                    //    value={transactionData.amount}
                       onChange={(e) =>
                           setUserData({
                               ...userData,
                               amount: e.target.value,
                           })
                       }
                       className="w-full p-2 rounded-lg bg-gray-700 text-white"
                   />
               </div>
   
               <div className="flex justify-end space-x-4">
                   <button
                       onClick={() => setSendPopupVisible(false)}
                       className="px-4 py-2 bg-red-500 rounded-lg"
                   >
                       Cancel
                   </button>
                   <button
                    //    onClick={handleTransaction}
                    onClick={handlePayment}
                       className="px-4 py-2 bg-blue-500 rounded-lg"
                   >
                       Send
                   </button>
               </div>
           </div>
       </div>
          )}
        </>
      )}
    </div>
);
}