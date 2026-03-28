import React, { useState } from 'react';

const Login = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    password: '',
    aadhar: '',
    location: '',
    state: '',
    pinCode: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4 font-sans">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl p-8 border border-green-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-2">Farmer Registration</h2>
          <p className="text-gray-500">Join our agricultural network today</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Responsive Grid Layout for Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Full Name */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91"
                maxLength="10"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Aadhar Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Aadhar Number</label>
              <input
                type="text"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleChange}
                placeholder="XXXX XXXX XXXX"
                maxLength="12"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Location / Village */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Village / Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your village"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="" disabled>Select your state</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Punjab">Punjab</option>
                <option value="Haryana">Haryana</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Gujarat">Gujarat</option>
                {/* Add more states as needed */}
              </select>
            </div>

            {/* PIN Code */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">PIN Code</label>
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                placeholder="e.g. 411001"
                maxLength="6"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Create Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-4 rounded-lg shadow-md transition-colors duration-200"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already registered?{' '}
          <a href="/login" className="text-green-600 hover:text-green-800 font-semibold transition-colors">
            Login here
          </a>
        </div>

      </div>
    </div>
  );
};

export default Login;