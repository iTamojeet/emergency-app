import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationPicker from '../components/LocationPicker';
import MediaUpload from '../components/MediaUpload';
import { firService } from '../services/firService';

const EmergencyFIR = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    emergencyType: 'suicide',
    description: '',
    media: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationSelect = (location) => {
    setFormData(prev => ({
      ...prev,
      location
    }));
  };

  const handleFileSelect = (file) => {
    setFormData(prev => ({
      ...prev,
      media: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      await firService.createFIR(formDataToSend);
      setSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        location: '',
        emergencyType: 'suicide',
        description: '',
        media: null
      });

      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to submit FIR');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-red-600 text-center mb-4">🚨 Emergency FIR Filing</h1>
        <p className="text-gray-600 text-center mb-8 text-lg">
          📝 This report will immediately notify the nearest police station and be logged securely.
        </p>

        {success && (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6 text-center">
            FIR submitted successfully! Emergency services have been notified.
            Redirecting to dashboard...
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700">👤 Name of Reporter</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-semibold text-gray-700">📍 Location</label>
            <LocationPicker onLocationSelect={handleLocationSelect} />
          </div>

          <div className="space-y-2">
            <label className="block font-semibold text-gray-700">🚨 Type of Emergency</label>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="emergencyType"
                  value="suicide"
                  checked={formData.emergencyType === 'suicide'}
                  onChange={handleInputChange}
                  className="m-0"
                />
                <span>Suicide</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="emergencyType"
                  value="accident"
                  checked={formData.emergencyType === 'accident'}
                  onChange={handleInputChange}
                  className="m-0"
                />
                <span>Accident</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="emergencyType"
                  value="other"
                  checked={formData.emergencyType === 'other'}
                  onChange={handleInputChange}
                  className="m-0"
                />
                <span>Other</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-semibold text-gray-700">✏️ Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              maxLength="300"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] resize-y"
            />
            <div className="text-right text-sm text-gray-500">
              {formData.description.length}/300
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-semibold text-gray-700">📎 Upload Media (Optional)</label>
            <MediaUpload onFileSelect={handleFileSelect} />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 px-6 bg-red-600 text-white font-semibold rounded-lg transition-colors hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : '🚨 Submit FIR Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmergencyFIR; 