import React,{useState} from 'react'


export default function Kyc() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        address: '',
        mobile: '',
        document: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // farmersData.push(formData)
        console.log(formData)
    
    
        setFormData({
          username: '',
          email: '',
          address: '',
        mobile: '',
          document: '',
        });
      };
  return (
    <div
    className="min-h-screen flex items-center justify-center bg-gray-100"
    style={{
      backgroundImage: `url('')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg w-full max-w-2xl  sm:p-8 md:p-10">
      <div className="flex flex-col space-y-4 mb-6">
        <h3 className="text-2xl font-bold text-center text-gray-800">KYC FORM</h3>
        <p className="text-sm text-gray-600 text-center">Enter your details</p>
      </div>
      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="address">
              Name
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              id="name"
              name="username"
              placeholder="Enter Your Name"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="cropType">
              Email
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleInputChange}
            />
           
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="yield">
              Address
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              id="address"
              name="address"
              placeholder="Enter your Address"
              
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="expectedPrice">
              Phone Number
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              id="mobile"
              name="mobile"
              placeholder="Enter your Mobile Number"
              type="number"
              value={formData.mobile}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="harvestDate">
              Upload your Government ID
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              id="document"
              name="document"
              type="file"
              placeholder='Upload your Government ID'
              value={formData.document}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex items-center mt-6">
          <button
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 h-10 px-4 py-2 ml-auto"
            type="submit"
          >
            Submit KYC
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}
