import React, { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import farmersData from '../Components/data.json'; // Assuming data.json is in the same directory

const FarmerListing = () => {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    setFarmers(farmersData);
  }, []);

  
  const getRandomColor = () => {
    const colors = ['#FFD700', '#FF6347', '#00CED1', '#7B68EE', '#3CB371', '#BA55D3'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-center">Farmers Available for Hiring</h1>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {farmers.map((farmer) => (
          <div
            key={farmer.id}
            className="bg-white rounded-lg shadow-md overflow-hidden p-4"
            style={{
              border: `2px solid ${getRandomColor()}`,
              borderRadius: '8px',
            }}
          >
            <div className="h-32 bg-gray-100 flex items-center justify-center">
              <Avatar size={48} src={farmer.avatar} />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 text-blue-600">
                <a href={`/farmers/${farmer.id}`}>{farmer.name}</a>
              </h3>
              <p className="text-sm text-gray-600 mb-1"><strong>Location:</strong> {farmer.location}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Expertise:</strong> {farmer.expertise}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Experience:</strong> {farmer.experience} years</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Current Projects:</strong> {farmer.currentProjects}</p>
              <p className="text-sm text-gray-600 mb-4"><strong>Contact:</strong> {farmer.contact}</p>
              <button className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm hover:bg-blue-500">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmerListing;
