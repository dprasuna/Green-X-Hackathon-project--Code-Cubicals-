import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Drawer } from 'antd';
import Wallet from './Wallet';
import user from './users.json';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  const showDrawer = (type) => {
    setUserType(type);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setUserType(null);
  };

  const drawerHeaderStyle = {
    display: 'none' // Hide the header
  };

  const drawerBodyStyle = {
    padding: '0px', // Remove extra padding
    backgroundColor: '#000000', // Set your desired background color
  };

  const drawerContentWrapperStyle = {
    height: '70vh', // Set the height of the Drawer
    overflow: 'auto' // Add overflow to handle scrolling if necessary
  };

  return (
    <div className="container mx-auto mt-4">
      <header className="bg-teal-600 text-white py-4 px-6 md:px-10 flex items-center justify-between shadow-md rounded-2xl">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="text-2xl">GreenX</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/kyc" className="hover:underline hover:text-green-400 transition-colors duration-300">
            Explore
          </Link>
          <Link to="#" className="hover:underline hover:text-green-400 transition-colors duration-300">
            Invest
          </Link>
          <Link to="#" className="hover:underline hover:text-green-400 transition-colors duration-300">
            About
          </Link>
          <Link to="#" className="hover:underline hover:text-green-400 transition-colors duration-300">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button className="bg-green-400 text-white hover:bg-green-500 rounded-lg shadow-md " size="lg" onClick={()=>navigate("/portfolio")} >For Investors</Button>
          <Button className="border border-green-400 text-green-400 hover:bg-green-100 rounded-lg shadow-md" size="lg" onClick={()=>navigate("/farmerdashboard")}>For Farmers</Button>
        </div>
      </header>
      <Drawer
        placement="right"
        onClose={onClose}
        open={open}
        width={360} // Set the width for a smaller drawer
        headerStyle={drawerHeaderStyle} // Hide the header
        bodyStyle={drawerBodyStyle} // Apply body styles
        contentWrapperStyle={drawerContentWrapperStyle} // Apply content wrapper styles
      >
        {userType === 'investor' && (
          <Wallet data={user.investor} />
        )}
        {userType === 'farmer' && (
          <Wallet data={user.farmer} />
        )}
      </Drawer>
    </div>
  );
}
