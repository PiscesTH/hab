import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import Chart from "./Chart.js";

<bill>
  <div></div>
</bill>;

function App() {
  return (
    <div className="App">
      <body>
        <div className="container">
          <header>
            <div className="header-container">
              <h1 className="th">
                <a href="#">TH</a>
              </h1>
              <div className="menu">
                <nav>
                  <ul className="header-nav">
                    <li>
                      <button>
                        <a href="#">통계</a>
                      </button>
                    </li>
                    <li>
                      <button>로그인</button>
                    </li>
                    {/* <li>
                      <button>button3</button>
                    </li> */}
                  </ul>
                </nav>
              </div>
            </div>
          </header>
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
          <div className="graph">graph</div>
          <footer>footer</footer>
        </div>
        <div className="tmp"></div>
      </body>
    </div>
  );
}

export default App;
