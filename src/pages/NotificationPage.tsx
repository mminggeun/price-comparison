import React, { useEffect, useState } from 'react';
import PriceGraph from "../components/PriceGraph"; // PriceGraph 컴포넌트 가져오기
import '../styles/NotificationPage.css';

const NotificationPage: React.FC = () => {
  const [notificationItems, setNotificationItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // 임의로 시간에 따른 가격 변동 데이터를 생성하는 함수
  const generateFakePriceHistory = () => {
    const fakeData = [];
    for (let i = 1; i <= 10; i++) {
      fakeData.push({
        time: `2024-09-${i}`,
        price: Math.floor(Math.random() * 10000) + 1000,  // 1000원 ~ 10,000원 사이의 랜덤 가격
      });
    }
    return fakeData;
  };

  // 컴포넌트가 마운트될 때 localStorage에서 데이터 불러오기
  useEffect(() => {
    const storedItems = localStorage.getItem('notificationItems');
    if (storedItems) {
      const items = JSON.parse(storedItems).map((item: any) => ({
        ...item,
        priceHistory: generateFakePriceHistory(),  // 임의의 가격 변동 데이터 추가
      }));
      setNotificationItems(items);
    }
  }, []);

  // 모달 열기
  const openModal = (item: any) => {
    setSelectedItem(item); // 선택된 아이템 저장
    setIsModalOpen(true);  // 모달 열기
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);  // 모달 닫기
    setSelectedItem(null);  // 선택된 아이템 초기화
  };

  return (
    <div className="notification-container">
      <div className="notification-header">
        <h1>알림 설정된 상품</h1>
      </div>
      {notificationItems.length > 0 ? (
        notificationItems.map((item: any) => (
          <div key={item.id} className="notification-item">
            {/* 이미지 렌더링 */}
            <img src={item.imageUrl} alt={item.name} className="notification-item-image" />
            <p className="notification-item-name">상품명 : {item.name}</p>
            <div className="notification-price">
              <p>현재 가격 : {item.currentPrice}</p>
              <p>희망 알림 가격 : {item.desiredPrice}</p>
            </div>
            <button className="view-graph-button" onClick={() => openModal(item)}>
              가격 현황 그래프 보기
            </button>
          </div>
        ))
      ) : (
        <p>알림 설정된 상품이 없습니다.</p>
      )}

      {/* 모달 컴포넌트 */}
      {isModalOpen && selectedItem && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedItem.name} 가격 현황</h2>
            <p>희망 알림 가격: {selectedItem.desiredPrice}</p>
            {/* PriceGraph 컴포넌트에 임의의 가격 변동 데이터를 전달 */}
            {selectedItem.priceHistory && (
              <PriceGraph data={selectedItem.priceHistory} />
            )}
            {!selectedItem.priceHistory && <p>데이터가 없습니다.</p>}
            <button className="close-button" onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
