import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅
import searchpage from "../assets/searchpage_2.png"; // 이미지를 import
import searchpagetitle from "../assets/searchpagetitle.png";
import lenzeicon from "../assets/lenzeicon.png"; // lenzeicon 이미지를 import
import '../styles/SearchProductPage.css';

const SearchProductPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // 검색어 상태 추가
  const navigate = useNavigate();

  // 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // 검색어가 있으면 대시보드 페이지로 이동
      navigate(`/searchresult?query=${searchQuery}`);
    }
  };

  return (
    <div className="searchproduct-container">
      <div className="left-column">
        {/* 검색 페이지 타이틀 이미지 */}
        <img src={searchpagetitle} alt="Search Page Title" className="title-image" />

        {/* 검색창과 아이콘을 감싸는 div */}
        <div className="search-input-wrapper">
          <input 
            type="text" 
            placeholder="어떤 제품을 찾고 계신가요?" 
            className="search-input" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} // 검색어 입력 핸들러 추가
          />
          <img 
            src={lenzeicon} 
            alt="Search Icon" 
            className="search-icon" 
            onClick={handleSearch} // 아이콘 클릭 시 검색 실행
            style={{ cursor: 'pointer' }} // 클릭 가능한 상태로 보이게 스타일 추가
          />
        </div>

        <div className="suggestions-container">
          <div className="suggestion">#iphone se11</div>
          <div className="suggestion">#apple watch</div>
          <div className="suggestion">#PIXPRO AZ425</div>
          <div className="suggestion">#AirPods 3rd</div>
          <div className="suggestion">#lenova LOQ 15.6</div>
          <div className="suggestion">#galaxy s24</div>
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
