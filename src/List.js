import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import axios from "./axios";
import { useState } from "react";

function List({ data, setHistoryList }) {
    // 처음에 보여줄 아이템 수 설정
    const [visibleItems, setVisibleItems] = useState(5);
  
    // 더보기 버튼 클릭 시 5개씩 더 보여주기
    const handleLoadMore = () => {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + 5);
    };
  
    const deleteHistory = async (ihistory) => {
      try {
        const res = await axios.delete(`/history/${ihistory}`);
        if (res.data.data.result == ihistory) {
          setHistoryList((prevList) => {
            return prevList.filter((item) => item.ihistory !== ihistory);
          });
        }
      } catch (error) {
        console.error("삭제 실패", error);
      }
    };
  
    /*   if (data.length == 0) {
      const targetEls = document.getElementsByClassName("read");
      for (let element of targetEls) {
        element.style.alignItems = "flex-start";
      }
    } */
    return (
      <div className="list-container">
        {data.slice(0, visibleItems).map((item, index) => (
          <div className="list-item" key={index}>
            <div className="list-item-buttons">
              {/*             <button className="edit-button">
                <FontAwesomeIcon icon={faPen} />
              </button> */}
              <button
                className="delete-button"
                onClick={() => deleteHistory(item.ihistory)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <div className="list-item-content">
              <div className="list-item-date">{item.date}</div>
              <div className="list-item-expense">{item.amount} 원</div>
              <div className="list-item-title">{item.purpose}</div>
              <div className="list-item-category">{item.category}</div>
            </div>
          </div>
        ))}
        {/* 더보기 버튼 */}
        {visibleItems < data.length && (
          <div className="load-more-container">
            <button onClick={handleLoadMore} className="load-more-button">
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
          </div>
        )}
      </div>
    );
  }

export default List;