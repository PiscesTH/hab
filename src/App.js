import "./App.css";
import { useState, useEffect } from "react";
import React, { PureComponent } from "react";
import PieChart from "./PieChart.js";
import LineChart from "./LineChart.js";
import { NavLink, Route, Routes, Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function MainPage() {
  return (
    <div className="main-container">
      <div className="income">
        <div>
          <p className="a">이번달 수입</p>
          <p className="b">1000000 원</p>
        </div>
      </div>
      <div className="ratio">
        <div>
          <p>지출 비율</p>
          <PieChart></PieChart>
        </div>
      </div>
      <div className="expenditure">
        <div>
          <p className="a">이번달 지출</p>
          <p className="b">500000 원</p>
        </div>
      </div>
      <div className="graph">
        <div>
          <p>일별 지출</p>
          <LineChart></LineChart>
        </div>
      </div>
    </div>
  );
}

function SecondPage() {
  const [formData, setFormData] = useState({
    icategory: "",
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
    console.log(formattedDate);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/history");
        setHistoryList(res.data.data); // 데이터를 상태에 설정
      } catch (err) {
        console.log(err); // 에러 처리
      }
    };
    fetchData(); // 함수 호출
  }, []);

  const addHistory = (newHistory) => {
    setHistoryList((prevList) => [...prevList, newHistory]);
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
      <MyForm formData={formData} setFormData={handleInputChange} addHistory = {addHistory} />
      <div className="read">
        <List data={historyList}></List>
      </div>
    </div>
  );
}

function MyForm(props) {
  // const formattedDate = moment(props.formData.date).format("YYYY-MM-DD");

  // const handleDateChange = (event) => {
  //   props.setDate(event.target.value);
  // };

  const changeTitle = (event) => {
    // const targetValue = event.target.value;
    const targetValue = event.target.options[event.target.selectedIndex].text;
    // document.querySelector('form-title').setAttribute('value', {targetValue});
    setSelectedValue(targetValue);
  };

  const changeSelect = (event) => {
    const { name, value } = event.target; // select 태그의 name과 value를 가져옴
    setSelectedValue(event.target.options[event.target.selectedIndex].text); // 선택된 텍스트를 업데이트
    props.setFormData({ target: { name, value } }); // 이름과 값을 올바르게 설정하여 handleInputChange 호출
  };

  const [selectedValue, setSelectedValue] = useState();

  /*   const [formData, setFormData] = useState({
    icategory: "",
    amount: "",
    purpose: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target; // name과 value를 e.target에서 추출

    // 기존 formData를 복사하고, 변경된 name 필드의 값을 업데이트
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }; */

      // 폼 제출 시 실행되는 함수
    const handleSubmit = async (e) => {
      e.preventDefault(); // 기본 폼 제출 동작 방지
      console.log(props.formData);
      try {
        const response = await axios.post("http://localhost:8080/api/history", props.formData);
        console.log("Response from server:", response.data);
        props.addHistory(response.data.data)
        alert("등록 완료 !");
      } catch (error) {
        console.error("There was an error submitting the form!", error);
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
        <option value="1" selected>식비</option>
        <option value="2">교통비</option>
        <option value="3">공과금</option>
        <option value="4">기타</option>
      </select>
      <input
        type="text"
        className="form-title"
        id="purpose"
        name="purpose"
        placeholder="사용처"
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

function List({ data }) {
  // 처음에 보여줄 아이템 수 설정
  const [visibleItems, setVisibleItems] = useState(5);

  // 더보기 버튼 클릭 시 5개씩 더 보여주기
  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 5);
  };

  return (
    <div className="list-container">
      {data.slice(0, visibleItems).map((item, index) => (
        <div className="list-item" key={index}>
          <div className="list-item-buttons">
            <button className="edit-button">
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button className="delete-button">
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
    <div className="App">
      <div className="body">
        <div className="container">
          <header>
            <div className="header-container">
              <h1 className="th">
                <Link to="/">TH</Link>
              </h1>
              <div className="menu">
                <nav>
                  <ul className="header-nav">
                    <li>
                      <button>
                        <NavLink exact="true" to="/">
                          홈
                        </NavLink>
                      </button>
                    </li>
                    <li>
                      <button>
                        <NavLink to="/list">내역</NavLink>
                      </button>
                    </li>
                    <li>
                      <button>로그인</button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
          <main>
            <Routes>
              <Route exact="true" path="/" element={<MainPage />}></Route>
              <Route path="/list" element={<SecondPage />}></Route>
            </Routes>
          </main>
          <footer>Copyright 2024. TH All rights reserved.</footer>
        </div>
      </div>
    </div>
  );
}

export default App;
