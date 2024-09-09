import { useState, useEffect } from "react";
import moment from "moment";
import axios from "./axios";
import Calendar from "react-calendar";
import List from "./List";
import MyForm from "./MyForm";
import { historyDummy, categoryDummy } from "./dummyData";

function SecondPage() {
  const [formData, setFormData] = useState({
    icategory: "1",
    amount: "",
    purpose: "",
    date: moment(new Date()).format("YYYY-MM-DD"),
  });

  const handleDateChange = (date) => {
    // Calendar에서 날짜 선택 시 호출되는 함수
    const formattedDate = moment(date).format("YYYY-MM-DD"); // 날짜 포맷팅
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: formattedDate, // date 필드만 업데이트
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target; // name과 value를 e.target에서 추출

    // 기존 formData를 복사하고, 변경된 name 필드의 값을 업데이트
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const [historyList, setHistoryList] = useState([]);
  const [category, setCategory] = useState([]);
  const [filterType, setFilterType] = useState("all"); // 필터 상태 추가


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (sessionStorage.getItem("accessToken")) {
          const [res, res2] = await Promise.all([
            axios.get("/history"),
            axios.get("/category")
          ]);
          setHistoryList(res.data.data);
          setCategory(res2.data.data);
        } else {
          setHistoryList(historyDummy);
          setCategory(categoryDummy);
        }
      } catch (err) {
        alert("서버에 문제가 발생했습니다. 페이지를 새로고침해주세요.")
      }
    };
    fetchData();
  }, []);

/*   const addHistory = (newHistory) => {
    setHistoryList((prevList) => {
      if (!Array.isArray(prevList)) {
        return [newHistory];
      }
      return [...prevList, newHistory];
    });
  }; */

  // 필터 변경 핸들러
  const handleFilterChange = (filter) => {
    setFilterType(filter);
  };

  // 필터링된 리스트 생성 함수
  const filterHistory = (targetDate) => {
    if (!Array.isArray(historyList)) {
      return [];
    }

    if (filterType === "all") {
      return historyList;
    } else if (filterType === "byDate") {
      return historyList.filter((item) => item.date === targetDate);
    }

    return [];
  };

  return (
    <div className="second-page-container">
      <Calendar
        onChange={handleDateChange}
        value={new Date(formData.date)}
        formatDay={(locale, date) => moment(date).format("D")}
        formatYear={(locale, date) => moment(date).format("YYYY")}
        formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
        calendarType="gregory"
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
      ></Calendar>
      <MyForm
        formData={formData}
        setFormData={handleInputChange}
        category={category}
        setHistoryList={setHistoryList}
      />
      <div className="read">
        <div className="filter-buttons">
          <button
            className={`filter-button ${filterType === "all" ? "active" : ""}`}
            onClick={() => handleFilterChange("all")}
          >
            전체
          </button>
          <button
            className={`filter-button ${
              filterType === "byDate" ? "active" : ""
            }`}
            onClick={() => handleFilterChange("byDate")}
          >
            날짜별
          </button>
        </div>
        <List
          data={filterHistory(formData.date)}
          setHistoryList={setHistoryList}
        ></List>
      </div>
    </div>
  );
}

export default SecondPage;
