import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/SearchResultPage.css';

const ITEMS_PER_PAGE = 5; // 한 페이지에 보여줄 데이터 개수

const SearchResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ebayResults, setEbayResults] = useState<any[]>([]);
  const [amazonResults, setAmazonResults] = useState<any[]>([]);
  const [checkedItems, setCheckedItems] = useState<any[]>([]); // 선택된 항목 관리
  const [currentEbayPage, setCurrentEbayPage] = useState<number>(1);
  const [currentAmazonPage, setCurrentAmazonPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  // URL에서 query 파라미터 추출
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  // 임의의 검색 결과를 설정하는 함수
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        // eBay 및 Amazon의 임의의 데이터 설정
        const mockEbayResults = [
          {
            id: 1,
            name: `12345678912asfasfasfasf3135 ${searchQuery}`,
            price: "$50",
            imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTHb5vHxKPexPgvBsPlGVIS7ot1am0t1L0sz-dESXVXhGQyvZP6wIbCy9HA8aLijpe7GrBPkAUa73Y62jvJAL2CMUjnuvnwX3aGNedDZBdIwD-mMJRUJOUSfomQiUKQx73p1s31GpA5tw&usqp=CAc",
          },
          {
            id: 2,
            name: `eBaasfasfasfasfasfasfasfasfsafy Product 2 for ${searchQuery}`,
            price: "$30",
            imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRQcnQGy5-jy-Nv0ByfRvpNS673jddURCOL7G1N6fVsCVf-cg8zcIHYNOv40n71UEf0E9iSbazNTBtUH7zBs9P4tZ0bXZXM8fZwBUWHNuk58molS0AgdbYOhhaXZe8jopW2vTXn5y-PHw&usqp=CAc",
          },
          {
            id: 3,
            name: `12345678912asfasfasfasf3135 ${searchQuery}`,
            price: "$50",
            imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTHb5vHxKPexPgvBsPlGVIS7ot1am0t1L0sz-dESXVXhGQyvZP6wIbCy9HA8aLijpe7GrBPkAUa73Y62jvJAL2CMUjnuvnwX3aGNedDZBdIwD-mMJRUJOUSfomQiUKQx73p1s31GpA5tw&usqp=CAc",
          },
          {
            id: 4,
            name: `eBaasfasfasfasfasfasfasfasfsafy Product 2 for ${searchQuery}`,
            price: "$30",
            imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRQcnQGy5-jy-Nv0ByfRvpNS673jddURCOL7G1N6fVsCVf-cg8zcIHYNOv40n71UEf0E9iSbazNTBtUH7zBs9P4tZ0bXZXM8fZwBUWHNuk58molS0AgdbYOhhaXZe8jopW2vTXn5y-PHw&usqp=CAc",
          },
          {
            id: 5,
            name: `12345678912asfasfasfasf3135 ${searchQuery}`,
            price: "$50",
            imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTHb5vHxKPexPgvBsPlGVIS7ot1am0t1L0sz-dESXVXhGQyvZP6wIbCy9HA8aLijpe7GrBPkAUa73Y62jvJAL2CMUjnuvnwX3aGNedDZBdIwD-mMJRUJOUSfomQiUKQx73p1s31GpA5tw&usqp=CAc",
          },
          {
            id: 6,
            name: `eBaasfasfasfasfasfasfasfasfsafy Product 2 for ${searchQuery}`,
            price: "$30",
            imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRQcnQGy5-jy-Nv0ByfRvpNS673jddURCOL7G1N6fVsCVf-cg8zcIHYNOv40n71UEf0E9iSbazNTBtUH7zBs9P4tZ0bXZXM8fZwBUWHNuk58molS0AgdbYOhhaXZe8jopW2vTXn5y-PHw&usqp=CAc",
          }
        ];

        const mockAmazonResults = [
          {
            id: 1,
            name: `AmazonProduct 1 for ${searchQuery}`,
            price: "$45",
            imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTHb5vHxKPexPgvBsPlGVIS7ot1am0t1L0sz-dESXVXhGQyvZP6wIbCy9HA8aLijpe7GrBPkAUa73Y62jvJAL2CMUjnuvnwX3aGNedDZBdIwD-mMJRUJOUSfomQiUKQx73p1s31GpA5tw&usqp=CAc",
          },
          {
            id: 2,
            name: `Amazon Product 2 for ${searchQuery}`,
            price: "$35",
            imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRQcnQGy5-jy-Nv0ByfRvpNS673jddURCOL7G1N6fVsCVf-cg8zcIHYNOv40n71UEf0E9iSbazNTBtUH7zBs9P4tZ0bXZXM8fZwBUWHNuk58molS0AgdbYOhhaXZe8jopW2vTXn5y-PHw&usqp=CAc",
          },
          {
            id: 3,
            name: `AasfasfzonProduct 3 for ${searchQuery}`,
            price: "$45",
            imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTHb5vHxKPexPgvBsPlGVIS7ot1am0t1L0sz-dESXVXhGQyvZP6wIbCy9HA8aLijpe7GrBPkAUa73Y62jvJAL2CMUjnuvnwX3aGNedDZBdIwD-mMJRUJOUSfomQiUKQx73p1s31GpA5tw&usqp=CAc",
          },
          {
            id: 4,
            name: `Amazon Product 4 for ${searchQuery}`,
            price: "$35",
            imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRQcnQGy5-jy-Nv0ByfRvpNS673jddURCOL7G1N6fVsCVf-cg8zcIHYNOv40n71UEf0E9iSbazNTBtUH7zBs9P4tZ0bXZXM8fZwBUWHNuk58molS0AgdbYOhhaXZe8jopW2vTXn5y-PHw&usqp=CAc",
          }, {
            id: 5,
            name: `AmazonProducasfasfasfaft 5 for ${searchQuery}`,
            price: "$45",
            imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTHb5vHxKPexPgvBsPlGVIS7ot1am0t1L0sz-dESXVXhGQyvZP6wIbCy9HA8aLijpe7GrBPkAUa73Y62jvJAL2CMUjnuvnwX3aGNedDZBdIwD-mMJRUJOUSfomQiUKQx73p1s31GpA5tw&usqp=CAc",
          },
          {
            id: 6,
            name: `Amazon Product 6 for ${searchQuery}`,
            price: "$35",
            imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRQcnQGy5-jy-Nv0ByfRvpNS673jddURCOL7G1N6fVsCVf-cg8zcIHYNOv40n71UEf0E9iSbazNTBtUH7zBs9P4tZ0bXZXM8fZwBUWHNuk58molS0AgdbYOhhaXZe8jopW2vTXn5y-PHw&usqp=CAc",
          }, {
            id: 7,
            name: `AmazonProduct 7 for ${searchQuery}`,
            price: "$45",
            imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTHb5vHxKPexPgvBsPlGVIS7ot1am0t1L0sz-dESXVXhGQyvZP6wIbCy9HA8aLijpe7GrBPkAUa73Y62jvJAL2CMUjnuvnwX3aGNedDZBdIwD-mMJRUJOUSfomQiUKQx73p1s31GpA5tw&usqp=CAc",
          },
          {
            id: 8,
            name: `Amazon Prodasfasfasuct 8 for ${searchQuery}`,
            price: "$35",
            imageUrl: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRQcnQGy5-jy-Nv0ByfRvpNS673jddURCOL7G1N6fVsCVf-cg8zcIHYNOv40n71UEf0E9iSbazNTBtUH7zBs9P4tZ0bXZXM8fZwBUWHNuk58molS0AgdbYOhhaXZe8jopW2vTXn5y-PHw&usqp=CAc",
          }
        ];

        setEbayResults(mockEbayResults);
        setAmazonResults(mockAmazonResults);
      } catch (error) {
        console.error("임의의 검색 결과를 설정하는 중 오류 발생:", error);
      }
      setLoading(false);
    };

    if (searchQuery) {
      fetchResults();
    }
  }, [searchQuery]);

  // 현재 페이지에 보여줄 eBay 결과 데이터
  const ebayResultsForPage = ebayResults.slice(
    (currentEbayPage - 1) * ITEMS_PER_PAGE,
    currentEbayPage * ITEMS_PER_PAGE
  );

  // 현재 페이지에 보여줄 Amazon 결과 데이터
  const amazonResultsForPage = amazonResults.slice(
    (currentAmazonPage - 1) * ITEMS_PER_PAGE,
    currentAmazonPage * ITEMS_PER_PAGE
  );

  const handleCheckboxChange = (item: any) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(item)) {
        return prevCheckedItems.filter((i) => i.id !== item.id); // 체크 해제
      } else {
        return [...prevCheckedItems, item]; // 체크 추가
      }
    });
  };

  const handleSubmit = () => {
    // 최저가 찾기 버튼을 누를 때 checkedItems 데이터를 DashboardPage로 보냄
    navigate("/dashboardpage", { state: { selectedItems: checkedItems } });
  };

  return (
    <div className="searchresult-container">
      <div className="header-container">
        <h1>검색 결과: {searchQuery}</h1>
        <small className="header-small-text">체크박스를 누르고 희망가격 <br />
        설정하기 버튼을 누르면 희망가격이 <br />됬을때 알람을 보내드려요!</small>
      </div>

      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div className="results-container">
          {/* eBay 결과 표시 */}
          <div className="ebay-results">
            <h2>eBay 검색 결과</h2>
            {ebayResultsForPage.length > 0 ? (
              <div>
                {ebayResultsForPage.map((item) => (
                  <div key={item.id} className="result-item">
                    <img src={item.imageUrl} alt={item.name} className="result-image" />
                    <div className="result-info">
                      <p>{item.name}</p>
                      <p>가격: {item.price}</p>
                      <input
                        type="checkbox"
                        className="result-checkbox"
                        checked={checkedItems.includes(item)}
                        onChange={() => handleCheckboxChange(item)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>eBay에서 검색 결과가 없습니다.</p>
            )}
            {/* eBay 페이지네이션 버튼 */}
            <div className="pagination">
              {currentEbayPage > 1 && (
                <button onClick={() => setCurrentEbayPage(currentEbayPage - 1)}>이전 페이지</button>
              )}
              {ebayResults.length > currentEbayPage * ITEMS_PER_PAGE && (
                <button onClick={() => setCurrentEbayPage(currentEbayPage + 1)}>다음 페이지</button>
              )}
            </div>
          </div>

          {/* Amazon 결과 표시 */}
          <div className="amazon-results">
            <h2>Amazon 검색 결과</h2>
            {amazonResultsForPage.length > 0 ? (
              <div>
                {amazonResultsForPage.map((item) => (
                  <div key={item.id} className="result-item">
                    <img src={item.imageUrl} alt={item.name} className="result-image" />
                    <div className="result-info">
                      <p>{item.name}</p>
                      <p>가격: {item.price}</p>
                      <input
                        type="checkbox"
                        className="result-checkbox"
                        checked={checkedItems.includes(item)}
                        onChange={() => handleCheckboxChange(item)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Amazon에서 검색 결과가 없습니다.</p>
            )}
            {/* Amazon 페이지네이션 버튼 */}
            <div className="pagination">
              {currentAmazonPage > 1 && (
                <button onClick={() => setCurrentAmazonPage(currentAmazonPage - 1)}>이전 페이지</button>
              )}
              {amazonResults.length > currentAmazonPage * ITEMS_PER_PAGE && (
                <button onClick={() => setCurrentAmazonPage(currentAmazonPage + 1)}>다음 페이지</button>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="searchresult-submit">
        <button onClick={handleSubmit}>희망 가격 설정하기</button>
      </div>
    </div>
  );
};

export default SearchResultPage;