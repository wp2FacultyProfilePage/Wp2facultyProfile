import React, { useState } from 'react';
import FlipPage from 'react-pageflip';
import Front from './Front.png';
import Odd from './Odd.png';
import './flip.css';

const Flipbook = () => {
  const [currentPage, setCurrentPage] = useState(0); // Start with the cover page
  const [page] = useState([
    // Initial pages, including the ending page
    {
      title: '',
      content: (
        <img
          src={Front}
          alt="Front"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      ),
    },
    {
      title: '',
      content: (
        <div style={{
          position: 'fixed', // Make the div cover the whole page
          width: '100%', // Make the div full width
          height: '100%',
          backgroundImage: `url(${Odd})`, // Set the image as the background
          backgroundSize: 'cover', // Cover the entire container
          backgroundPosition: 'center',
        }}>
         <h1 id="department">CICT</h1>
        </div>
      ),
    },
    {
      title: 'Page 1',
      content: 'This is the content of Page 1.',
    },
    {
      title: 'Page 2',
      content: 'This is the content of Page 2.',
    },
    {
      title: 'The End',
      content: 'Thank you for reading!',
    },
  ]);

  const handlePageChange = (e) => {
    setCurrentPage(e.data);
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < page.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
   
      <div className="flipbook-container">
        <div className="navigation-buttons">
        <button onClick={goToPreviousPage} disabled={currentPage === 0}>
  Previous
</button>
<button onClick={goToNextPage} disabled={currentPage === page.length - 1}>
  Next
</button>

        </div>
  
        <FlipPage width={400} height={600} currentPage={currentPage} onPageChange={handlePageChange}>
          {page.map((page, index) => (
            <div className="page" key={index}>
              <h2>{page.title}</h2>
              <p>{page.content}</p>
            </div>
          ))}
        </FlipPage>
      </div>
    );
  };

export default Flipbook;
