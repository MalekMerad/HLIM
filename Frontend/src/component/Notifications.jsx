import React, { useState, useEffect } from 'react';
import '../styles/Notifications.scss';
import { useTranslation } from "react-i18next";
import ProfileImage from '../assets/images/ProfileImage.jpg';
import Chat from '../component/Chat';

function Notifications() {
    const { t , i18n} = useTranslation();
    const [statusMessage, setStatusMessage] = useState("");
    const [showStatusPanel, setShowStatusPanel] = useState(false);
    const [userNotifications, setUserNotifications] = useState([]);

    const userID = localStorage.getItem("userID");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchNotif = async () => {
            if (!userID || !token) {
                setStatusMessage("User not authenticated. Please log in.");
                setShowStatusPanel(true);
                return;
            }
    
            try {
                const response = await fetch(`http://localhost:5000/api/auth/getNotifs/${userID}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });
    
                if (response.status === 404) {
                    return;
                }
    
                if (!response.ok) {
                    throw new Error("Failed to fetch notifications");
                }
    
                const result = await response.json();
    
                if (!Array.isArray(result)) {
                    throw new Error("Invalid response format");
                }
                console.log("Notifcations result",result)
                setUserNotifications(result.length > 0 ? result : []);
            } catch (error) {
                console.error("Fetch error:", error);
                setStatusMessage("An error occurred while fetching notifications. Please try again later!");
                setShowStatusPanel(true);
            }
        };
    
        fetchNotif();
    }, []);
    

    const [showChatBox, setShowChatBox] = useState(false);

    return (
        <div className='notif-container'>
            <div className='header-Container'>
                <h1>{t("daily_notifications")}</h1>
            </div>

            <div className='Notifications-container'>
                {userNotifications.length > 0 ? (
                  userNotifications.map((notif) => (
                        <div key={notif.idNotif} className='notif-container'>
                            <div className='img-notif-container'>
                                <img src={notif.image || ProfileImage} alt="User Profile" />
                            </div>
                            <div className='info-notif-container'>
                                <p><strong>{t("from")}: {notif.FullName}</strong></p>
                                <h3>{t("content")}: {notif.Context}</h3>
                            </div>
                            <button className='reply-btn'>{t("reply")}</button>
                        </div>
                    ))
                ) : (
                    <p>{t("no_notifications")}</p>
                )}
            </div>

            {showChatBox && (
                <div className='ChatBox-container'>
                    <Chat />
                </div>
            )}

            {showStatusPanel && (
                <div className="Info-Panel">
                    <button className="closeContact-btn" onClick={() => setShowStatusPanel(false)}>x</button>
                    <h1>Notifications Status</h1>
                    <p>{statusMessage}</p>
                </div>
            )}
        </div>
    );
}

export default Notifications;
