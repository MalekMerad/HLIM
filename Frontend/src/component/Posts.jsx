import React, { useState } from 'react';
import '../styles/Posts.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function Posts({ tableData }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState(tableData); 

  const pageRows = 6; 
  const cardsPerRow = 4; 

  if (posts.length === 0) {
    return <div className='no-posts'>{t('no_posts_text')}</div>;
  }

  const totalPage = Math.ceil(posts.length / pageRows);
  const startIndex = (currentPage - 1) * pageRows;
  const endIndex = startIndex + pageRows;
  const currentPageData = posts.slice(startIndex, endIndex);

  
  const rows = [];
  for (let i = 0; i < currentPageData.length; i += cardsPerRow) {
    rows.push(currentPageData.slice(i, i + cardsPerRow));
  }

  const handleDelete = (postIndex) => {
    setPosts(posts.filter((_, index) => index !== postIndex));
    // Use del fetch here for future me matnsach
  };

  return (
    <div className='posts-container'>
        <h1>{t('posts_container_title')}</h1>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className='posts-row'>
          {row.map((item, index) => (
            <div key={index} className='post-card'>
              <button className='delete-btn' onClick={() => handleDelete(startIndex + index)}>
                ✖
              </button>
              <img src={item.pic} alt='property pic' />
              <button className='post-btn' onClick={()=>navigate(`/post/${index}`)}>{t('details_btn_text')}</button>
            </div>
          ))}
        </div>
      ))}

      <div className='pagination'>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPage}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPage))}
          disabled={currentPage === totalPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Posts;
