import React from 'react';
import { useTranslation } from 'react-i18next';
import "../styles/Home.scss";
import Homora from '../assets/images/Homora-image.png';
import Propertie from '../assets/images/houseImage.jpg';
import { Search } from "lucide-react"; 
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { fadeIn } from '../variants';

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const properties = [
    { name: "Owner 1", location: "Alger", price: '100.000,00', size: { length: '190m', wide: '200m' }, image: Propertie },
    { name: "Owner 2", location: "Biskra", price: '200.000,00', size: { length: '90m', wide: '1200m' }, image: Propertie },
    { name: "Owner 3", location: "Alger", price: '1.900.000,00', size: { length: '1900m', wide: '2000m' }, image: Propertie },
    { name: "Owner 3", location: "Alger", price: '1.900.000,00', size: { length: '1900m', wide: '2000m' }, image: Propertie },
    { name: "Owner 3", location: "Alger", price: '1.900.000,00', size: { length: '1900m', wide: '2000m' }, image: Propertie },
  ];

  return (
    <div className='home-container'>
      <div className='search-section'>
         <motion.div 
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.7 }}
          className='search-container'
        > 
         <h1>{t('search_title')}</h1>
          <div className="search-bar">
            <Search className="search-icon" size={22} />
            <input type='text' placeholder={t('search_placeholder')} className='inpt-search'/>
            <button className='btn-search'>{t('search_button')}</button>
        </div>
        </motion.div>
      </div>
      
      <div className='first-section' id='Home'>
        <motion.div 
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.7 }}
          className='img-container-homora'
        >
          <img src={Homora} alt='Homora Logo' className='img img-logo' />
        </motion.div>

        <motion.div 
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.7 }}
          className='first-section-text'
        >
          <h1>{t('first_section_title')}</h1>
          <p>{t('first_section_desc')}</p>
          <button className='btn-explore' onClick={() => navigate('/browse')}>{t('explore_button')}</button>
        </motion.div>
      </div>

      <motion.div 
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
        className='second-section'
      >
        <h1>{t('about_title')}</h1>
        <div className='section-container' id='about'>
        {t('about_points', { returnObjects: true })?.map((text, index) => (
            <motion.div 
              key={index}
              variants={fadeIn("down", 0.3 + index * 0.1)} 
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.7 }}
              className="section-box"
            >
              <p>{text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <div className="recent-posts-section">
        <h2>{t('recent_posts_title')}</h2>
        <div className="recent-posts-container">
          {properties.map((property, index) => (
            <motion.div 
              key={index}
              variants={fadeIn("left", 0.3 + index * 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.7 }}
              className="post-card"
            >
              <div className="img-container">
                <img src={property.image} alt="property-img" />
              </div>
              <div className="info-container">
                <h3>{property.name}</h3>
                <p><strong>{t('location')}:</strong> {property.location}</p>
                <p><strong>{t('size')}:</strong> L = {property.size.length} | W = {property.size.wide}</p>
                <p><strong>{t('price')}:</strong> {property.price} DA</p>
                <button className="btn-read-more">{t('view_details')}</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="cta-section">
        <h2>{t('cta_title')}</h2>
        <p>{t('cta_description')}</p>
        <button className="btn-signup">{t('cta_button')}</button>
      </div>
    </div>
  );
}

export default Home;
