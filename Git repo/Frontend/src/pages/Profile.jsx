import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faListCheck, faMagnifyingGlass, faChartSimple, 
        faRightFromBracket, faGear, faBell } from '@fortawesome/free-solid-svg-icons';
import ProfileImage from '../assets/images/ProfileImage.jpg';
import HouseImage from '../assets/images/houseImage.jpg';
import '../styles/Profile.scss';
import { useNavigate } from 'react-router-dom';
import Create from '../component/Create';
import Posts from '../component/Posts';
import { useTranslation } from 'react-i18next';

function Profile() {
  const { t } = useTranslation();
  const userProfile = { name: "John Doe", pic: ProfileImage };
  const posts = [
    { price: '1000.0,00', pic: HouseImage },
    { price: '2020.00,00', pic: HouseImage },
    { price: '3003.0,00', pic: HouseImage },
    { price: '2020.00,00', pic: HouseImage },
    { price: '2020.00,00', pic: HouseImage },
    { price: '2020.00,00', pic: HouseImage },
    { price: '2020.00,00', pic: HouseImage },
    { price: '2020.00,00', pic: HouseImage },
    { price: '2020.00,00', pic: HouseImage },
    { price: '2020.00,00', pic: HouseImage },
    { price: '2020.00,00', pic: HouseImage },
    { price: '2020.00,00', pic: HouseImage },
    { price: '2020.00,00', pic: HouseImage },
    { price: '2020.00,00', pic: HouseImage },
    { price: '2020.00,00', pic: HouseImage },
    { price: '2020.00,00', pic: HouseImage },
    { price: '2020.00,00', pic: HouseImage },
    { price: '2020.00,00', pic: HouseImage },
    { price: '2020.00,00', pic: HouseImage },
    { price: '2020.00,00', pic: HouseImage },
    { price: '2020.00,00', pic: HouseImage },
  ];


  // For test only u can del
  const emptyPosts = []

  const navigate = useNavigate();
  const [section, setSelectedSection] = useState("create");

  useEffect(() => {
    setSelectedSection("create");
  }, []);

  const renderContent = () => {
    switch (section) {
      case "create":
        return <Create />;
      case "posts":
        return <Posts tableData={posts}/>;
      case "stats":
        return <h2>{t('stats')}</h2>;
      case "browse":
        navigate('/browse');
        return null;
      default:
        return <Create />;
    }
  };

  return (
    <div className='profile-container'>
      <div className='sideNavBar'>
        <div className='UserCredits-container'>
          <div className='profileImg-container'>
            <img src={userProfile.pic} alt='profile' />
          </div>
          <div className='profilInfo-container'>
            <p className='username'>{userProfile.name}</p>
          </div>
        </div>
        <div className='NavBarFuncs-container'>
          <div className='NavBarFunc' onClick={() => setSelectedSection("create")}>
            <FontAwesomeIcon icon={faPlus} />
            <p className='FuncName'>{t('create')}</p>
          </div>
          <div className='NavBarFunc' onClick={() => setSelectedSection("posts")}>
            <FontAwesomeIcon icon={faListCheck} />
            <p className='FuncName'>{t('posts')}</p>
          </div>
          <div className='NavBarFunc' onClick={() => setSelectedSection("browse")}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <p className='FuncName'>{t('browse')}</p>
          </div>
          <div className='NavBarFunc' onClick={() => setSelectedSection("stats")}>
            <FontAwesomeIcon icon={faChartSimple} />
            <p className='FuncName'>{t('stats')}</p>
          </div>
          <div className='NavBarFunc' onClick={() => setSelectedSection("notifications")}>
            <FontAwesomeIcon icon={faBell} />
            <p className='FuncName'>{t('notifications')}</p>
          </div>
          <div className='NavBarFunc' onClick={() => setSelectedSection("settings")}>
            <FontAwesomeIcon icon={faGear} />
            <p className='FuncName'>{t('settings')}</p>
          </div>
          <button className='logOut-btn' onClick={() => navigate('/')}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            <p className='FuncName'>{t('logout')}</p>
          </button>
        </div>
      </div>
      <div className='profileContent-container'>
        {renderContent()}
      </div>
    </div>
  );
}

export default Profile;
