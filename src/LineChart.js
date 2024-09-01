import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Example = (props) => {
  const transformData = (data) => {
    return data.map(item => {
      const dateParts = item.name.split('-'); 
      const transformedName = `${dateParts[1]}-${dateParts[2]}`;
  
      return {
        ...item,
        name: transformedName,
      };
    });
  };

  const yAxisTickFormatter = (value) => {
    if (value === 0) return ''; // 값이 0이면 빈 문자열 반환
    return `${value.toLocaleString()}원`;
  };

  return (
    <ResponsiveContainer width="95%" height="65%">
      <LineChart
        width={400}
        height={400}
        data={transformData(props.data)}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" interval={0}/>
        <YAxis tickFormatter={yAxisTickFormatter}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total" name="지출" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default React.memo(Example); // React.memo를 사용하여 메모이제이션
