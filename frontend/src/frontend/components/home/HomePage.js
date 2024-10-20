import React from 'react';
import boto from '../../assets/frontimage.png'
import './Homepage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
    const handleClick = () =>{
        navigate("/login");
    }
    return (
        <div className="homelanding-page">
        
        <main className="homemain-content">
            <div>
                    <img
                    className="left-content"
                    src={boto}
                    alt="Varala Poda"
                    />
            </div>
            <div className="right-content">
            <h1>
                UNLOCK INSIGHTS <br />
                ELEVATE YOUR "BRAND"{<span className="highlight">FAVOURITE INFUENCER</span>}
            </h1>
            <button className="register-btn" onClick={handleClick}>Login</button>
            </div>
        </main>
        </div>
    );
}

export default HomePage;