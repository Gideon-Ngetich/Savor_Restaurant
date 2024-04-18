import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopNav from '../Components/Navbar';

const GalleryBackground = () => {
  const categories = ['All Photos', 'Food', 'Events','Interior','VIP Guests'];
  const [currentCategory, setCurrentCategory] = useState('All Photos');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        let response;
        if (currentCategory === 'All Photos') {
          response = await axios.get('http://localhost:5500/api/Gallery');
        } else if(currentCategory === 'VIP Guests'){
          response = await axios.get(`http://localhost:5500/api/Gallery?category={VIP}`)
        }else {
          response = await axios.get(`hhttp://localhost:5500/api/Gallery?category=${currentCategory}`);
        }
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [currentCategory]);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  return (
    <div>
      <TopNav />

      <div
        className="bg-cover bg-center sm:bg-fixed h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `url('https://www.foodiesfeed.com/wp-content/uploads/2023/06/pouring-honey-on-pancakes.jpg')`,
        }}
      >
        <div className="text-white text-center">
          <h1 className="text-5xl font-bold">Gallery</h1>
        </div>
      </div>

      <div className="flex justify-center items-center bg-gray-900 text-white text-center py-2 sm:py-4">
        <div className="flex justify-center items-center px-4 sm:px-0">
          <div className="flex space-x-4">
            {categories.map((category) => (
              <span
                key={category}
                className={currentCategory === category ? 'text-blue-500 cursor-pointer' : 'text-white cursor-pointer'}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-1 sm:gap-2 md:gap-4 lg:gap-4 xl:gap-4 p-1 sm:p-2 md:p-4 lg:p-4 xl:p-4">
        {images
          .filter((image) => currentCategory === 'All Photos' || image.category === currentCategory)
          .map((image, index) => (
            <img key={index} src={image.src} alt={image.category} className="w-full h-full object-cover" />
          ))}
      </div>
    </div>
  );
};

export default GalleryBackground;
