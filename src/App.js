import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://picsum.photos/v2/list';
const PAGE_SIZE = 18;

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const response = await fetch(`${API_URL}?page=${page}&limit=${PAGE_SIZE}`);
      const data = await response.json();
      setImages(prevImages => [...prevImages, ...data]);
      setLoading(false);
    };

    fetchImages();
  }, [page]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <header>
        <nav>
          <div className="logo"><img src="/logo_main.png" alt="Logo" /></div>
          <div className="title">aDMe Gallery</div>
        </nav>
        <div className="header-image">
          <img src="https://via.placeholder.com/1500x300" alt="Header" />
        </div>
      </header>
      <main>
        <div className="image-grid">
          {images.map((image, index) => (
            <div key={index} className={`image-item ${index % 2 === 0 ? 'big' : 'small'}`}>
              <img src={image.download_url} alt={image.author} loading="lazy"/>
            </div>
          ))}
        </div>
        {loading && <p>Loading...</p>}
        {!loading && (
          <button onClick={loadMore} disabled={loading}>
            Load More &rarr;
          </button>
        )}
      </main>
    </div>
  );
}

export default App;