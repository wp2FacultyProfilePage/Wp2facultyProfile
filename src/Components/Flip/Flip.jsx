import React, { useState } from 'react';
import FlipPage from 'react-pageflip';
import SwipeableViews from 'react-swipeable-views';
import './flip.css';

const Flip = () => {
  const [isFlipbookOpen, setIsFlipbookOpen] = useState(false); // Start with the flipbook closed
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([
    {
      title: 'Cover',
      content: 'This is the cover of the book. Click to open.',
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCoverClick = () => {
    // Open the flipbook when the cover is clicked
    setIsFlipbookOpen(true);
  };

  const addPage = () => {
    // Create a new page and insert it before the ending page
    const newPage = {
      title: `Page ${pages.length - 1}`,
      content: `This is the content of Page ${pages.length - 1}.`,
    };
    const updatedPages = [...pages.slice(0, -1), newPage, pages[pages.length - 1]];
    setPages(updatedPages);
  };

  const deletePage = () => {
    // Ensure there are at least three pages (including the ending page and at least one page before it) before deleting
    if (pages.length > 3) {
      const updatedPages = [...pages.slice(0, -2), pages[pages.length - 1]]; // Keep the ending page
      setPages(updatedPages);
    }
  };

  return (
    <div className="flipbook-container">
      {isFlipbookOpen ? (
        // Display the flipbook when it's open
        <>
          <FlipPage
            width={400}
            height={600}
            page={currentPage}
            onPageChange={handlePageChange}
            showSwipeHint
            showPageIndicator
          >
            {pages.map((page, index) => (
              <div className="page" key={index}>
                <h2>{page.title}</h2>
                <p>{page.content}</p>
              </div>
            ))}
          </FlipPage>

          <div className="button-container">
            <button onClick={addPage}>Add Page</button>
            <button onClick={deletePage}>Delete Page</button>
          </div>
        </>
      ) : (
        // Display the cover page as the only page in the flipbook
        <FlipPage width={400} height={600} page={0} onPageChange={handlePageChange}>
          <div className="page" key={0} onClick={handleCoverClick}>
            <h2>Cover</h2>
            <p>This is the cover of the book. Click to open.</p>
          </div>
        </FlipPage>
      )}
    </div>
  );
};

export default Flip;
