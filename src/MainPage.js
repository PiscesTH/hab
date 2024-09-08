import { useState, useEffect } from "react";
import PieChart from "./PieChart.js";
import LineChart from "./LineChart.js";
import axios from "./axios";
import { weeklyDummy, monthlyDummy } from "./dummyData.js";

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
        let data;
        if (sessionStorage.getItem("accessToken")) {
          const res = await axios.get("/history/statistics");
          data = res.data.data;
        } else {
            data = { monthly: monthlyDummy, weekly: weeklyDummy };
        }
        const { included: filteredItems, excluded: removedItems } =
          splitDataByName(data.monthly, "수입");

        setStatistics({
          monthly: filteredItems,
          weekly: data.weekly,
          income: removedItems,
        });
      } catch (err) {
        alert("서버에 문제가 발생했습니다. 페이지를 새로고침해주세요.")
      }
    };
    getStatisticsData();
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      alert("비로그인 시 보이는 데이터는 샘플용 데이터입니다.");

      localStorage.setItem("hasVisited", "true");
    }
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

export default MainPage;
