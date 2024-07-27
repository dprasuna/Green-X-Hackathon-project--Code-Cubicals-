import React, { useState } from 'react';
import farmersData from '../Components/data.json'; // Import existing data

const CropForm = () => {
  const [formData, setFormData] = useState({
    address: '',
    cropType: '',
    yield: '',
    expectedPrice: '',
    harvestDate: '',
  });

  const [farmers, setFarmers] = useState(farmersData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    farmersData.push(formData)


    setFormData({
      address: '',
      cropType: '',
      yield: '',
      expectedPrice: '',
      harvestDate: '',
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/1334312/pexels-photo-1334312.jpeg?cs=srgb&dl=pexels-designstrive-1334312.jpg&fm=jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-white rounded-lg border border-gray-200 shadow-lg w-full max-w-2xl  sm:p-8 md:p-10">
        <div className="flex flex-col space-y-4 mb-6">
          <h3 className="text-2xl font-bold text-center text-gray-800">Add New Asset</h3>
          <p className="text-sm text-gray-600 text-center">Enter the details of your asset below.</p>
        </div>
        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="address">
                Address
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                id="address"
                name="address"
                placeholder="Enter Wallet Address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="cropType">
                Crop Type
              </label>
              <select
                className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                id="cropType"
                name="cropType"
                value={formData.cropType}
                onChange={handleInputChange}
              >
                <option value="">Select crop type</option>
                <option value="wheat">Wheat</option>
                <option value="corn">Corn</option>
                <option value="soybean">Soybean</option>
                <option value="cotton">Cotton</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="yield">
                Yield
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                id="yield"
                name="yield"
                placeholder="1000"
                type="number"
                value={formData.yield}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="expectedPrice">
                Expected Price
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                id="expectedPrice"
                name="expectedPrice"
                placeholder="500"
                type="number"
                value={formData.expectedPrice}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="harvestDate">
                Harvest Date
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                id="harvestDate"
                name="harvestDate"
                type="date"
                value={formData.harvestDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex items-center mt-6">
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 h-10 px-4 py-2 ml-auto"
              type="submit"
            >
              Save Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CropForm;
