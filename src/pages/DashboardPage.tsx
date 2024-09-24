import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/DashboardPage.css';

// Item 타입 정의
interface Item {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}

const DashboardPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItems = (location.state?.selectedItems || []) as Item[];

  const [desiredPrices, setDesiredPrices] = useState<{ [key: number]: string }>({});

  const handlePriceChange = (id: number, value: string) => {
    setDesiredPrices((prevPrices) => ({
      ...prevPrices,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    // 알림 설정 완료 메시지 출력
    alert('알림 설정이 완료되었습니다.');

    // 알림 데이터를 localStorage에 저장 (이미지 URL 추가)
    const notificationItems = selectedItems.map((item) => ({
      id: item.id,
      name: item.name,
      currentPrice: item.price,
      desiredPrice: desiredPrices[item.id] || '',
      imageUrl: item.imageUrl, // 이미지 URL 추가
    }));
    
    localStorage.setItem('notificationItems', JSON.stringify(notificationItems));

    // 홈 화면으로 이동
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>희망가격 설정하기</h1>
        <small className="dash-header-small-text">
          <span className="highlight">희망 가격을 설정하고 </span><br /> 
          <span className="highlight">알림을 받아보세요!</span>
        </small>
      </div>
      {selectedItems.length > 0 ? (
        <div className="items-container">
          {selectedItems.map((item: Item) => (
            <div key={item.id} className="item">
              <img src={item.imageUrl} alt={item.name} className="item-image" />
              <div className="item-details">
                <p>{item.name}</p>
                <p>𐃘 {item.price}</p>
                <div className="desired-price-container">
                  <label htmlFor={`desired-price-${item.id}`}>희망가격 :</label>
                  <input
                    type="text"
                    id={`desired-price-${item.id}`}
                    value={desiredPrices[item.id] || ''}
                    onChange={(e) => handlePriceChange(item.id, e.target.value)}
                    className="desired-price-input"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No items selected</p>
      )}
      <div className="dashboard-submit">
        <button onClick={handleSubmit}>알림 받기</button>
      </div>
    </div>
  );
};

export default DashboardPage;
