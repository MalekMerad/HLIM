import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar ,faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import HouseImage from '../assets/images/houseImage.jpg';
import noProfilePicture from '../assets/images/emptyImagePlaceHolder.png';
import HomeBluePrint from '../assets/images/home-blueprints.jpeg';
import landBluePrint from '../assets/images/lands-bluePrint.jpg';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, MapPin, Home, DollarSign, Landmark, Calendar } from "lucide-react";
import { useNavigate , useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/Browse.scss';

function Browse() {
  const { t } = useTranslation();
  const {i18n} = useTranslation();

  const categories = [
    { title: t('houses_title'), description: t('findYourDreamHome'), img: HomeBluePrint },
    { title: t('lands_title'), description: t('exploreAvailableLands'), img: landBluePrint },
  ];
   const [currentPage, setCurrentPage] = useState(1);
   const [posts, setPosts] = useState([]); 
   const [loading, setLoading] = useState(false); 
   const [error, setError] = useState(null);
   
   const navigate = useNavigate();
   const userID = localStorage.getItem("userID");

   useEffect(() => {
     const fetchData = async () => {
       try {
         console.log("Before fetching...");
   
         const response = await fetch("http://localhost:5000/api/auth/all-posts", {
           method: "POST",  // Changed to POST to send data in the body
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ userID })
         });
   
         if (!response.ok) {
           throw new Error("Failed to fetch posts");
         }
   
         const result = await response.json();
         console.log("All posts fetch result:", result);
   
         
         setPosts(result.data || []);
       } catch (error) {
         console.error("Failed to fetch posts:", error);
         setError("Failed to fetch posts");
       } finally {
         setLoading(false);
       }
     };
   
     fetchData();
   }, []);

   const formatPostDate = (postDate) => {
    if (!postDate) return "Date inconnue"; 
  
    const postDateObj = new Date(postDate);
    if (isNaN(postDateObj)) return "Date inconnue";
  
    const today = new Date();
    
    postDateObj.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
  
    const differenceInDays = Math.floor((today - postDateObj) / (1000 * 60 * 60 * 24));
  
    if (differenceInDays === 0) {
      return "Aujourd'hui";
    } else if (differenceInDays === 1) {
      return "Il y a 1 jour";
    } else if (differenceInDays < 7) {
      return `Il y a ${differenceInDays} jours`;
    } else if (differenceInDays < 14) {
      return "Il y a une semaine";
    } else {
      return "Il y a plus d'une semaine";
    }
  };
   
   const pageRows = 3;
   const cardsPerRow = 5;
 
   const totalPage = Math.max(1, Math.ceil(posts.length / pageRows));
   const startIndex = (currentPage - 1) * pageRows;
   const currentPageData = posts.slice(startIndex, startIndex + pageRows);
 
   const rows = [];
   for (let i = 0; i < currentPageData.length; i += cardsPerRow) {
     rows.push(currentPageData.slice(i, i + cardsPerRow));
   }
 
   if (loading) {
     return (
       <div className="loading">
         <div className="spinner"></div>
       </div>
     );
   }
 
  
  return (
    <div className="browse-container">
        <div className="options-section">
        <h2>{t('categorie_title')}</h2>
        <div className="options-container">
          {categories.map((option, index) => (
            <div className={`category-row ${index % 2 === 0 ? 'row-reverse' : ''}`} key={index}>
              <div className="text-content">
                <h3>{option.title}</h3>
                <p>{option.description}</p>
              </div>
              <div className="option-card" style={{ backgroundImage: `url(${option.img})` }}>
                <div className="overlay">
                  <img src={option.img} alt={option.title} />
                </div>
              </div>
            </div>
          ))}

        <div className="contact-panel suggest-category">
              <div className="description">
                <h3>{t('description_title')}</h3>
                  <p>{t('descritption_context')}</p>
        </div>
  <div className="input-section">
    <input 
      type="text" 
      placeholder={t('suggest-placeholder')} 
      className="suggestion-input"
    />
    <button className="submit-btn">{t('subm-btn')}</button>
  </div>
</div>
        </div>
      </div>
      <div className="products-container" id="products-container">
        <h2>{t('product_list_title')}</h2>
 
        {rows.length === 0 && <h3 className="no-posts">{t('No_Offers_to_be_displayed')}</h3>}

        {rows.map((row, index) => (
          <div className="browse-row" key={index}>
            {row.map((item) => (
              <div className="product-card" key={item.postID}>
                <img
                  src={item.pic1 || noProfilePicture}
                  alt="property pic"
                />
                <div className="post_info">
                  <div className="info-row">
                    <p className="title"><MapPin size={16} color="#cccccc" /> {t('state_text')}</p>
                    <p className="text">{item.state}</p>
                  </div>
                  <div className="info-row">
                    <p className="title"><Landmark size={16} color="#cccccc" /> {t('muniplicit_text')}</p>
                    <p className="text">{item.Muniplicyt}</p>
                  </div>
                  <div className="info-row">
                    <p className="title"><Home size={16} color="#cccccc" /> {t('street_text')}</p>
                    <p className="text">{item.street}</p>
                  </div>
                  <div className="info-row">
                    <p className="title"><Calendar size={16} color="#cccccc" /> {t('Date')}</p>
                    <p className='date'> {formatPostDate(item.created_at)}</p>
                  </div>
                  <div className="info-row">
                    <p className="title"><DollarSign size={16} color="#cccccc" /> {t('price_text')}</p>
                    <p className="price">{item.price}Da</p>
                  </div>
                </div>
                <button
                  className="det-btn"
                  onClick={() => navigate(`/post/${item.postID}`, { state: { from: "/browse" } })}>
                  <FontAwesomeIcon icon={faArrowLeft} /> {t('det_btn_text')}
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="pagination">
  <button
    onClick={() => {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
      document.getElementById("products-container")?.scrollIntoView({ behavior: "smooth" });
    }}
    disabled={currentPage === 1}
  >
    <ArrowLeft size={20}  />
  </button>

  <span>{t('Page')} {currentPage} {t('of')} {totalPage}</span>

  <button
    onClick={() => {
      setCurrentPage((prev) => Math.min(prev + 1, totalPage));
      document.getElementById("products-container")?.scrollIntoView({ behavior: "smooth" });
    }}
    disabled={currentPage === totalPage}
  >
    <ArrowRight size={20} />
  </button>
</div>


    </div>
  );
}

export default Browse;
