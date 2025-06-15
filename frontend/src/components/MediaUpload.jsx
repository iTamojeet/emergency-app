import { useState, useRef } from 'react';
import './MediaUpload.css';

const MediaUpload = ({ onFileSelect }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload an image (JPEG, PNG, GIF) or video (MP4, MOV) file');
      return;
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setError('File size must be less than 10MB');
      return;
    }

    setError('');
    onFileSelect(file);

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      fileInputRef.current.files = e.dataTransfer.files;
      handleFileChange({ target: { files: [file] } });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="media-upload">
      <div 
        className="upload-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,video/*"
          style={{ display: 'none' }}
        />
        {preview ? (
          <div className="preview">
            {preview.startsWith('data:image') ? (
              <img src={preview} alt="Preview" />
            ) : (
              <div className="video-placeholder">
                <span>📹 Video Selected</span>
              </div>
            )}
          </div>
        ) : (
          <div className="upload-prompt">
            <span className="upload-icon">📎</span>
            <p>Click or drag files here</p>
            <p className="upload-hint">Supports images and videos up to 10MB</p>
          </div>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default MediaUpload; 