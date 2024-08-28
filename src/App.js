import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import React, { PureComponent } from "react";
import Chart from "./Chart.js";
import LineChart from "./LineChart.js";
import { NavLink, Route, Routes, Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

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
          <Chart></Chart>
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
  const [date, setDate] = useState(new Date());
  const tmpData = [
    {
      expense: "5000",
      title: "택시비",
      date: "2024-08-25",
      category: "교통비",
    },
    {
      expense: "10000",
      title: "점심",
      date: "2024-08-26",
      category: "식비",
    },
    {
      date: "2024-08-26",
      expense: "15000",
      title: "Groceries",
      category: "Food",
    },
    {
      date: "2024-08-27",
      expense: "7500",
      title: "Transport",
      category: "Travel",
    },
    {
      date: "2024-08-28",
      expense: "120000",
      title: "Electricity Bill",
      category: "Utilities",
    },
  ];

  return (
    <div className="second-page-container">
      <Calendar
        onChange={setDate}
        value={date}
        formatDay={(locale, date) => moment(date).format("D")}
        formatYear={(locale, date) => moment(date).format("YYYY")}
        formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
        calendarType="gregory"
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
      ></Calendar>
      <MyForm date={date} setDate={setDate} />
      <div className="read">
        <List data={tmpData}></List>
      </div>
    </div>
  );
}

function MyForm(props) {
  const formattedDate = moment(props.date).format("YYYY-MM-DD");

  const handleDateChange = (event) => {
    props.setDate(event.target.value);
  };

  const changeTitle = (event) => {
    // const targetValue = event.target.value;
    const targetValue = event.target.options[event.target.selectedIndex].text;
    // document.querySelector('form-title').setAttribute('value', {targetValue});
    setSelectedValue(targetValue);
  };

  const [selectedValue, setSelectedValue] = useState();

  return (
    // <form>
    <div className="form-container">
      <input
        type="date"
        className="form-date"
        value={formattedDate}
        onChange={handleDateChange}
      ></input>
      <select onChange={changeTitle}>
        <option value="food">식비</option>
        <option value="banana">교통비</option>
        <option value="orange">공과금</option>
        <option value="melon">기타</option>
      </select>
      <input
        type="text"
        className="form-title"
        placeholder="사용처"
        value={selectedValue}
      />
      <input className="form-expense" placeholder="금액"></input>
      <button className="form-submit">SUBMIT</button>
    </div>
    // </form>
  );
}

function List({ data }) {
  return (
    <div className="list-container">
      {data.map((item, index) => (
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
            <div className="list-item-expense">{item.expense} 원</div>
            <div className="list-item-title">{item.title}</div>
            <div className="list-item-category">{item.category}</div>
          </div>
        </div>
      ))}
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
                        <NavLink to="/list">통계</NavLink>
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
