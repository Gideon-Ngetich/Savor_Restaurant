import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [user, setUser] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit2 = async (e) => {
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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = localStorage.getItem('UserId')
        const response = await axios.get(`http://localhost:5500/api/user/${userId}`)
        setUser(response.data)
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchUserInfo()
  }, [])

  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    phone: '',
    location: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    const userId = localStorage.getItem('UserId')
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5500/api/user/${userId}`, userData);
      alert('User information updated successfully!');
      // Optionally, you can redirect the user or perform other actions after updating
    } catch (error) {
      console.error('Error updating user info:', error);
      alert('Failed to update user information');
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

      <div>
        <h2>User Profile</h2>
        {user && (
          <div>
            <p><strong>Name:</strong> {user.userName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Location:</strong> {user.location}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            {/* Add more user details as needed */}
          </div>
        )}
      </div>
    </div>


  );
}

export default Admin;
