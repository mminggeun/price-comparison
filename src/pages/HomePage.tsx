import React from "react";
import mainImage from "../assets/mainpage.png"; // 이미지를 import
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="image-container">
      <img src={mainImage} alt="Main Page" /> {/* 이미지를 렌더링 */}
    </div>
  );
};

export default HomePage;
