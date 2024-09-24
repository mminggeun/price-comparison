import React, { useEffect, useState } from 'react';
import '../styles/NotificationPage.css';

const NotificationPage: React.FC = () => {
  const [notificationItems, setNotificationItems] = useState<any[]>([]);

  // 컴포넌트가 마운트될 때 localStorage에서 데이터 불러오기
  useEffect(() => {
    const storedItems = localStorage.getItem('notificationItems');
    if (storedItems) {
      setNotificationItems(JSON.parse(storedItems));
    }
  }, []);

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
            <p>상품명 : {item.name}</p>
            <p>현재 가격 : {item.currentPrice}</p>
            <p>희망 알림 가격 : {item.desiredPrice}</p>
          </div>
        ))
      ) : (
        <p>알림 설정된 상품이 없습니다.</p>
      )}
    </div>
  );
};

export default NotificationPage;
