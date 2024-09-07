import "./App.css";
import { useState, useEffect } from "react";
import PieChart from "./PieChart.js";
import LineChart from "./LineChart.js";
import { Route, Routes,} from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import axios from "./axios";
import LoginPage from "./LoginPage.js";
import SignupPage from "./SignupPage.js";
import Header from "./header.js";
import { AuthProvider } from "./AuthContext.js";
import Cookies from "js-cookie";

function MainPage() {
  const [statistics, setStatistics] = useState({
    monthly: [],
    weekly: [],
    income: [],
  });
  const [expenditure, setExpenditure] = useState(0);

  const splitDataByName = (data, targetName) => {
    const result = {
      included: [],
      excluded: [],
    };
    let sum = 0;
    data.forEach((item) => {
      if (item.name === targetName) {
        result.excluded.push(item);
      } else {
        result.included.push(item);
        sum += item.total;
      }
    });
    setExpenditure(sum);

    return result;
  };
  useEffect(() => {
    const getStatisticsData = async () => {
      try {
        const res = await axios.get("/history/statistics");
        const data = res.data.data;

        const { included: filteredItems, excluded: removedItems } =
          splitDataByName(data.monthly, "수입");

        setStatistics({
          monthly: filteredItems,
          weekly: data.weekly,
          income: removedItems,
        });
      } catch (err) {
        console.log(err); // 에러 처리
      }
    };
    getStatisticsData();
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      alert("비로그인 시 보이는 데이터는 샘플용 데이터입니다.");

      localStorage.setItem("hasVisited", "true");
    }
    
    console.log(Cookies.get("accessToken"));
    console.log(Cookies.get("refreshToken"));
  }, []);

  return (
    <div className="main-container">
      <div className="income">
        <div>
          <p className="a">이번달 수입</p>
          <p className="b">
            {statistics.income.length > 0 ? statistics.income[0].total : 0} 원
          </p>
        </div>
      </div>
      <div className="expenditure">
        <div>
          <p className="a">이번달 지출</p>
          <p className="b">{expenditure} 원</p>
        </div>
      </div>
      <div className="ratio">
        <div>
          <p>지출 비율</p>
          <PieChart data={statistics.monthly}></PieChart>
        </div>
      </div>
      <div className="graph">
        <div>
          <p>주간 지출</p>
          <LineChart data={statistics.weekly}></LineChart>
        </div>
      </div>
    </div>
  );
}

function SelectOption(props) {
  return <option value={props.icategory}>{props.category}</option>;
}

function MyForm(props) {
  /*   const changeTitle = (event) => {
    // const targetValue = event.target.value;
    const targetValue = event.target.options[event.target.selectedIndex].text;
    // document.querySelector('form-title').setAttribute('value', {targetValue});
    setSelectedValue(targetValue);
  }; */

  const changeSelect = (event) => {
    const { name, value } = event.target; // select 태그의 name과 value를 가져옴
    setSelectedValue(event.target.options[event.target.selectedIndex].text); // 선택된 텍스트를 업데이트
    props.setFormData({ target: { name, value } }); // 이름과 값을 올바르게 설정하여 handleInputChange 호출
  };

  const [selectedValue, setSelectedValue] = useState();

  // 폼 제출 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    try {
      const res = await axios.post("/history", props.formData);
      const addedHistory = {
        ihistory: res.data.data.result,
        amount: props.formData.amount,
        purpose: props.formData.purpose,
        date: props.formData.date,
        category: {},
      };

      const matchedCategory = props.category.find(
        (cat) => cat.icategory == props.formData.icategory
      );
      if (matchedCategory) {
        addedHistory.category = matchedCategory;
      }
      props.addHistory(addedHistory);
      alert("등록 완료 !");
    } catch (error) {
      alert("등록 실패...");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <input
          type="date"
          id="date"
          name="date"
          className="form-date"
          value={props.formData.date}
          onChange={props.setFormData}
          required
        ></input>
        <select
          id="icategory"
          name="icategory"
          value={props.formData.icategory}
          onChange={changeSelect}
        >
          {props.category.map((item, index) => (
            <SelectOption
              key={item.icategory}
              icategory={item.icategory}
              category={item.category}
            ></SelectOption>
          ))}
        </select>
        <input
          type="text"
          className="form-title"
          id="purpose"
          name="purpose"
          placeholder="메모"
          value={props.formData.purpose}
          onChange={props.setFormData}
          required
          autoComplete="off"
        />
        <input
          className="form-expense"
          placeholder="금액"
          id="amount"
          name="amount"
          value={props.formData.amount}
          onChange={props.setFormData}
          required
          autoComplete="off"
        ></input>
        <button className="form-submit" type="submit">
          SUBMIT
        </button>
      </div>
    </form>
  );
}

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
  const [filterType, setFilterType] = useState("byDate"); // 필터 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/history");
        setHistoryList(res.data.data); // 데이터를 상태에 설정
        const res2 = await axios.get("/category");
        setCategory(res2.data.data);
      } catch (err) {
        console.log(err); // 에러 처리
      }
    };
    fetchData();
  }, []);

  const addHistory = (newHistory) => {
    setHistoryList((prevList) => {
      if (!Array.isArray(prevList)) {
        return [newHistory];
      }
      return [...prevList, newHistory];
    });
  };

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
        addHistory={addHistory}
        category={category}
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
            <div className="list-item-category">{item.category.category}</div>
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

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <div className="body">
          <div className="container">
            <header>
              <Header />
            </header>
            <main>
              <Routes>
                <Route exact="true" path="/" element={<MainPage />}></Route>
                <Route path="/list" element={<SecondPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<SignupPage />}></Route>
              </Routes>
            </main>
            <footer>Copyright 2024. TH All rights reserved.</footer>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
