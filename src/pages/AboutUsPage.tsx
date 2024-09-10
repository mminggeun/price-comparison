import React from "react";
import aboutusImage from "../assets/aboutus4.png"; // 이미지를 import
import '../styles/AboutUsPage.css';

const AboutUsPage: React.FC = () => {
  return (
    <div className="aboutus-container">
      <img src={aboutusImage} alt="About Us" /> {/* 이미지를 렌더링 */}
    </div>
  );
};

export default AboutUsPage;
