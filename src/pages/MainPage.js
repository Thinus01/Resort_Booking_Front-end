import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [resorts, setResorts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch the resorts data from the backend
    const fetchResorts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/resorts');
        setResorts(response.data);
      } catch (error) {
        console.error('Error fetching resorts:', error);
      }
    };

    fetchResorts();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3 >= resorts.length ? 0 : prevIndex + 3));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 < 0 ? resorts.length - 3 : prevIndex - 3));
  };

  return (
    <div className="container mt-5" id="list">
      <h1 className="LatestResort">LATEST RESORTS</h1>
      <p className="ResortSelect">Please select a resort</p>
      <div className="resorts-carousel">
        {resorts.length === 0 ? (
          <p>No resorts found</p>
        ) : (
          <>
            <div className="resorts-list" style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}>
              {resorts.map((resort) => (
                <div key={resort.id} className="resort-item">
                  <img
                    src={resort.image_url}
                    alt={resort.name}
                    className="img-thumbnail resort-image"
                  />
                  <h2>{resort.name}</h2>
                  <p>
                    <strong>Location:</strong>
                    {resort.location}
                  </p>
                  <p>
                    <strong>Price:</strong>
                    $
                    {resort.price}
                  </p>
                  <p>
                    <strong>Guests:</strong>
                    {resort.guests_amount}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <button
        type="button"
        className={`carousel-button prev-button ${currentIndex === 0 ? 'gray-button' : 'limegreen-button'}`}
        onClick={handlePrev}
      >
        &lt;
      </button>
      <button
        type="button"
        className={`carousel-button next-button ${currentIndex >= resorts.length - 3 ? 'gray-button' : 'limegreen-button'}`}
        onClick={handleNext}
      >
        &gt;
      </button>
    </div>
  );
};

export default MainPage;