import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', category);

    try {
      await axios.post('http://localhost:5500/api/Gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Choose Image:</label>
          <input type="file" id="image" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" value={category} onChange={handleCategoryChange} />
        </div>
        <button type="submit">Upload Image</button>
      </form>
    </div>
  );
}

export default Admin;
