import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon, title, description, link }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
      <span className="text-2xl">{icon}</span>
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <Link 
      to={link} 
      className="inline-block text-blue-600 hover:text-blue-800 font-medium"
    >
      Get Started
    </Link>
  </div>
);

const StepCard = ({ number, title, description }) => (
  <div className="text-center">
    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
      {number}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Home = () => {
  return (
    <div>
      {/* Emergency Contact Banner */}
      <div className="bg-red-600 text-white text-center py-2 px-4">
        <span className="mr-2">📞 Emergency? Call 112</span>
        <span className="mx-2">|</span>
        <span>Suicide Helpline: 9152987821</span>
      </div>

      {/* Hero Section */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Get Help Instantly During Any Emergency
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Find hospitals, register patients, or report critical cases in seconds.
              </p>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
                <Link
                  to="/hospitals"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700"
                >
                  🏥 Nearby Hospitals
                </Link>
                <Link
                  to="/register"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700"
                >
                  👤 Pre-register
                </Link>
                <Link
                  to="/report"
                  className="inline-block bg-red-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-red-700"
                >
                  🚨 Report Emergency
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://placehold.co/600x400"
                alt="Emergency Services"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              icon="💉"
              title="Blood Donation"
              description="Find blood donors near you or donate blood to save lives"
              link="/blood-donation"
            />
            <ServiceCard
              icon="🫀"
              title="Organ Transplant"
              description="Connect with organ donors and recipients, save lives"
              link="/organ-transplant"
            />
            <ServiceCard
              icon="🩸"
              title="Blood Services"
              description="Find blood banks near you with available stock"
              link="/blood-services"
            />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Choose the Service"
              description="Select hospitals, blood donation, or organ transplant services"
            />
            <StepCard
              number="2"
              title="Fill Details"
              description="Provide essential information quickly"
            />
            <StepCard
              number="3"
              title="Get Response"
              description="Receive assistance or confirmation"
            />
          </div>
        </div>
      </div>

      {/* Trust Banner */}
      <div className="py-12 text-center">
        <p className="text-gray-600">
          Trusted by over 10,000 users across Kolkata
        </p>
      </div>
    </div>
  );
};

export default Home; 