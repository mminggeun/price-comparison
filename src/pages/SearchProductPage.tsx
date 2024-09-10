import React from "react";
import searchpage from "../assets/searchpage_2.png"; // 이미지를 import
import searchpagetitle from "../assets/searchpagetitle.png";
import lenzeicon from "../assets/lenzeicon.png"; // lenzeicon 이미지를 import
import '../styles/SearchProductPage.css';

const SearchProductPage: React.FC = () => {
  return (
    <div className="searchproduct-container">
      <div className="left-column">
        {/* 검색 페이지 타이틀 이미지 */}
        <img src={searchpagetitle} alt="Search Page Title" className="title-image" />

        {/* 검색창과 아이콘을 감싸는 div */}
        <div className="search-input-wrapper">
          <input type="text" placeholder="어떤 제품을 찾고 계신가요?" className="search-input" />
          <img src={lenzeicon} alt="Search Icon" className="search-icon" /> {/* lenzeicon 이미지 */}
        </div>

        <div className="suggestions-container">
          <div className="suggestion">#아이폰 se11</div>
          <div className="suggestion">#애플 워치</div>
          <div className="suggestion">#TV</div>
          <div className="suggestion">#건조기</div>
          <div className="suggestion">#노트북</div>
          <div className="suggestion">#충전기</div>
          <div className="suggestion">#이어폰</div>
        </div>
      </div>

      <div className="right-column">
        {/* 배경 이미지 */}
        <img src={searchpage} alt="Search Page" className="background-image" />
      </div>
    </div>
  );
};

export default SearchProductPage;
