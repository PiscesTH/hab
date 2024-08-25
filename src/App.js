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

function MainPage() {
  return (
    <div className="main-container">
      <div className="income">
        <div>
          <p className="a">이번달 수입</p>
          <p className="b">1000000</p>
        </div>
      </div>
      <div className="ratio">
        <p>지출 비율</p>
        <Chart></Chart>
      </div>
      <div className="expenditure">
        <div>
          <p className="a">이번달 지출</p>
          <p className="b">500000</p>
        </div>
      </div>
      <div className="graph">
        <p>일별 지출</p>
        <LineChart></LineChart>
      </div>
    </div>
  );
}

function List() {
  const [date, selectDate] = useState(new Date());

  return (
    <div className="list-container">
      <Calendar
        onChange={selectDate}
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
      {/* useEffect(() => {
        console.log(date)
      }, [date]); */}
      <MyForm date={date} />
      <div className="read">read</div>
    </div>
  );
}

function MyForm(props) {
  const [date, setDate] = useState(moment(props.date).format("YYYY-MM-DD"));

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div className="form-container">
      <input
        type="text"
        className="form-date"
        value={date}
        onChange={handleDateChange}
      ></input>
      <input type="text" className="form-title" placeholder="Title" />
      <textarea
        className="form-textarea"
        placeholder="Write something..."
      ></textarea>
      <button className="form-submit">SUBMIT</button>
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
                        <NavLink exact to="/">
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
              <Route exact path="/" element={<MainPage />}></Route>
              <Route path="/list" element={<List />}></Route>
            </Routes>
          </main>
          <footer></footer>
        </div>
      </div>
    </div>
  );
}

export default App;
