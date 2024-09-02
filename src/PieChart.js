import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#ECB2F8"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  payload,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const labelLines = [
    `${payload.name}`,
    `${(percent * 100).toFixed(0)}%`
  ];

  return (
    // <g>그룹태그
    <g>
      {labelLines.map((line, i) => (
        <text
          key={`line-${i}`}
          x={x}
          y={y + i * 16} // 줄 간격 조절.
          fill="black"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={14}
        >
          {line}
        </text>
      ))}
    </g>
  );
};

const valueFormatter = (value, name, props) => {
  return [`${value.toLocaleString()}원`, name]; // 값에 "원" 단위를 추가하고 콤마 형식 적용
};

const drawChart = (props) => {
  const data = props.data || [];
  return (
    <ResponsiveContainer width={"80%"} height={"80%"}>
      <PieChart>
        <Tooltip formatter={valueFormatter}/>
        <Pie
          data={data}
          cx={"50%"}
          cy={"42%"}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          innerRadius={30}
          dataKey="total"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default React.memo(drawChart);
