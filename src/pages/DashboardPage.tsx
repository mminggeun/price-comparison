import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/DashboardPage.css';

// Item 타입 정의
interface Item {
  id: number;
  name: string;
  price: string;
  imageUrl: string; // imageUrl 추가
}

const DashboardPage: React.FC = () => {
  const location = useLocation();
  const selectedItems = (location.state?.selectedItems || []) as Item[];

  const [desiredPrices, setDesiredPrices] = useState<{ [key: number]: string }>({});

  const handlePriceChange = (id: number, value: string) => {
    setDesiredPrices((prevPrices) => ({
      ...prevPrices,
      [id]: value,
    }));
  };

  return (
    <div className="dashboard-container">
      <h1>희망가격 설정하기</h1>
      {selectedItems.length > 0 ? (
        <div className="items-container">
          {selectedItems.map((item: Item) => (
            <div key={item.id} className="item">
              <img src={item.imageUrl} alt={item.name} className="item-image" />
              <div className="item-details">
                <p>{item.name}</p>
                <p>{item.price}</p> {/* item.price가 item.name 아래에 배치 */}
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
    </div>
  );
};

export default DashboardPage;
