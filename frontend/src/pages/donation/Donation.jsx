import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';

function Donation() {
  const { user, isSignedIn } = useUser();
  const [type, setType] = useState('blood');
  const [details, setDetails] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSignedIn) {
      setMessage('You must be signed in to submit a donation.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type,
          details,
          userId: user.id
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setMessage('✅ Donation request submitted successfully!');
      setDetails('');
      setType('blood');
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 px-6 py-8 bg-white shadow-xl rounded-xl border">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Submit a Donation Request</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Donation Type */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Donation Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            <option value="blood">🩸 Blood</option>
            <option value="organ">🫀 Organ</option>
          </select>
        </div>

        {/* Details */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Additional Details</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 h-32 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Mention location, blood group, urgency, or any specific request"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
          >
            Submit Request
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className="text-center mt-4 text-sm text-gray-800 bg-gray-100 rounded-md p-2">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default Donation;
