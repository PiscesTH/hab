import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import React, { PureComponent } from "react";
import Chart from "./Chart.js";
import LineChart from "./LineChart.js";
import { NavLink, Route, Routes, Link } from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function MainPage() {
  return <div className="main-container">
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
    </div>;
}

function List() {
  return <div className="list-container">
      <Calendar></Calendar>
    </div>;
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
              <Route exact path="/" element={<MainPage/>}></Route>
              <Route path="/list" element={<List/>}></Route>
            </Routes>
          </main>
          <footer></footer>
        </div>
      </div>
    </div>
  );
}

export default App;
