import React, { useState } from 'react';
import { Button, Card, Table, Row, Col, Modal, Input, message, Drawer } from 'antd';
import { DollarCircleOutlined, ArrowUpOutlined, SmileOutlined, BarChartOutlined, CheckOutlined, WalletFilled, WalletOutlined } from '@ant-design/icons';
import PiechartcustomChart from './Piechartcustomchart';
import LinechartChart from './LinechartChart';
import BarchartChart from './BarchartChart';
import Test from './Test';
import { Link } from 'react-router-dom';
import Wallet from '../Components/Wallet';
import user from '../Components/users.json';
import Footer from './Footer';
import avocado from '../assets/avocado.jpeg';
import saffron from '../assets/saffron.jpg';
import sandalwood from '../assets/sandalwood.jpg';



export default function Portfolio() {
  const [modalVisible, setModalVisible] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState(null);

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


  const cropData = [
    { key: '1', crop: 'Corn', value: '₹80,000', profitLoss: '+₹5,000', percentage: '32%', profitLossClass: 'text-green-500' },
    { key: '2', crop: 'Soybeans', value: '₹60,000', profitLoss: '+₹3,000', percentage: '24%', profitLossClass: 'text-green-500' },
    { key: '3', crop: 'Wheat', value: '₹40,000', profitLoss: '-₹2,000', percentage: '16%', profitLossClass: 'text-red-500' },
  ];

  const cardData = [
    {
      title: "Market Insights",
      content: [
        { label: "Commodity Prices", value: "+2.5% this week", valueClass: "text-green-500" },
        { label: "Weather Forecast", value: "Sunny with mild temperatures" },
        { label: "Industry News", value: "New government subsidies announced" },
      ],
      date: "just posted",
    },
    {
      title: "Market Trends",
      content: [
        { label: "Stock Market", value: "-1.2% this week", valueClass: "text-red-500" },
        { label: "Economic Growth", value: "Stable with slight increase" },
        { label: "Global Markets", value: "Positive outlook" },
      ],
      date: "2 days ago",
    },
    {
      title: "Agricultural Updates",
      content: [
        { label: "Crop Yields", value: "+3.0% this month", valueClass: "text-green-500" },
        { label: "Pest Control", value: "Effective measures in place" },
        { label: "Market Demand", value: "High demand for organic produce" },
      ],
      date: "a week ago",
    },
  ];

  const showModal = () => {
    if (referralCode.trim() === '') {
      messageApi.error('Please enter a referral code');
      return;
    }
    messageApi.success('Referral code accepted');
    setTimeout(() => {
      setReferralCode("");
      setModalVisible(true);
    }, 2000); // Delay of 2 seconds before opening the modal
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  // Data for trending profitable crops
  const trendingCrops = [
    { key: '1', crop: 'Saffron', rate: 'Rs.3,000/kg', profit: '+₹500/kg', image: saffron },
    { key: '2', crop: 'Sandalwood', rate: 'Rs.1,200/kg', profit: '+₹300/kg', image: sandalwood },
    { key: '3', crop: 'Avocado', rate: 'Rs.1,800/ton', profit: '+₹200/ton', image: avocado},
  ];

  return (
<div className="min-h-screen bg-gray-100">
<div className="container mx-auto mt-4">
            <header className="bg-teal-600 text-white py-4 px-6 md:px-10 flex items-center justify-between shadow-md rounded-2xl">
                <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                    <span className="text-2xl">GreenX</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6 text-lg font-bold">
                    Investor Dashboard
                </nav>
                <Button type="link" style={{ padding: 0, height: 'auto', lineHeight: 'normal' }} onClick={() => showDrawer('investor')}>
                    <WalletOutlined style={{ fontSize: '2rem', color: 'white' }} />
                </Button>
            </header>
        </div>
    

      <div className="container mx-auto mt-6 px-4 md:px-10">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} lg={6}>
            <Card className="bg-blue-50 border-blue-200 shadow-lg rounded-lg">
              <Card.Meta
                title="Total Investment"
                description={
                  <>
                    <div className="text-2xl font-bold text-blue-600">₹125,231.89</div>
                    <p className="text-xs text-gray-600">+10.2% from last quarter</p>
                  </>
                }
                avatar={<DollarCircleOutlined className="text-blue-500" />}
              />
            </Card>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Card className="bg-yellow-50 border-yellow-200 shadow-lg rounded-lg">
              <Card.Meta
                title="Total Returns"
                description={
                  <>
                    <div className="text-2xl font-bold text-yellow-600">₹15,231.89</div>
                    <p className="text-xs text-gray-600">+15.1% from last quarter</p>
                  </>
                }
                avatar={<ArrowUpOutlined className="text-yellow-500" />}
              />
            </Card>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Card className="bg-green-50 border-green-200 shadow-lg rounded-lg">
              <Card.Meta
                title="Yield"
                description={
                  <>
                    <div className="text-2xl font-bold text-green-600">12.5%</div>
                    <p className="text-xs text-gray-600">+2.1% from last quarter</p>
                  </>
                }
                avatar={<SmileOutlined className="text-green-500" />}
              />
            </Card>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Card className="bg-orange-50 border-orange-200 shadow-lg rounded-lg pb-1">
              <Card.Meta
                title="Refer Now"
                description={
                  <div className='flex flex-row items-center justify-between'>
                    <Input 
                      placeholder="Enter referral code"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      className="mt-2"
                    />
                    <Button
                      type="primary"
                      icon={<CheckOutlined />}
                      onClick={showModal}
                      className="mt-2 ml-2 w-4 p-4"
                    />
                  </div>
                }
                avatar={<BarChartOutlined className="text-orange-500" />}
              />
            </Card>
          </Col>
        </Row>

        <div className="mt-10">
          <Card title="Crop Investments" className="shadow-lg rounded-lg border-gray-200">
            <Table dataSource={cropData} pagination={false}>
              <Table.Column title="Crop" dataIndex="crop" key="crop" />
              <Table.Column title="Value" dataIndex="value" key="value" />
              <Table.Column
                title="Profit/Loss"
                dataIndex="profitLoss"
                key="profitLoss"
                render={(text, record) => (
                  <span className={record.profitLossClass}>{text}</span>
                )}
              />
              <Table.Column title="Percentage" dataIndex="percentage" key="percentage" />
            </Table>
          </Card>
        </div>

        {/* New Card for Trending Profitable Crops */}
        <div className="mt-10">
  <Card title="Trending Profitable Crops" className="rounded-lg border-gray-200">
    <Row gutter={[16, 16]}>
      {trendingCrops.map((crop) => (
        <Col xs={24} md={12} lg={8} key={crop.key}>
          <Card className="flex flex-col items-center shadow-lg rounded-lg border-gray-200 p-0">
            <img
              src={crop.image}
              className="h-40 w-64 object-cover rounded-t-lg mb-2"
              alt={crop.crop} // Add alt text for accessibility
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{crop.crop}</h3>
              <p className="text-gray-600 text-sm">Current Rate: {crop.rate}</p>
            </div>
          <button className='bg-teal-600 text-white p-2 ml-20 border rounded-xl '>Book Now </button>
          </Card>
        </Col>
      ))}
    </Row>
  </Card>
</div>



        <Card title="Investment Visualizations" className="mt-6 shadow-lg rounded-lg border-gray-200">
          <div className="flex flex-wrap gap-6">
            <div className="flex-1">
              <h3 className="mb-4 text-lg font-semibold">Investments by Crop</h3>
              <div className="w-full h-64">
                <PiechartcustomChart />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="mb-4 text-lg font-semibold">Portfolio Performance</h3>
              <div className="w-full h-64">
                <LinechartChart />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="mb-4 text-lg font-semibold">Profit/Loss by Crop</h3>
              <div className="w-full h-64">
                <BarchartChart />
              </div>
            </div>
          </div>
        </Card>

        <h1 className="font-bold mt-8 mb-4 text-3xl">Trending News</h1>

        <div className="flex flex-wrap gap-6 mb-5">
          {cardData.map((card, index) => (
            <Card title={card.title} className="flex-1 shadow-lg rounded-lg border-gray-200" key={index}>
              <div className="grid gap-4">
                {card.content.map((item, idx) => (
                  <div className="grid gap-2" key={idx}>
                    <div className="text-sm font-medium text-gray-600">{item.label}</div>
                    <div className={`text-2xl font-bold ₹{item.valueClass}`}>{item.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-gray-600">{card.date}</div>
            </Card>
          ))}
        </div>

        <Modal
          title="Referral Code Details"
          visible={modalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Test onMintComplete={handleCancel} />
        </Modal>
      </div>
      <Footer />
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
      </Drawer>
    </div>
  );
}
