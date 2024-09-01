import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

/* const data = [
  { name: "Group A", total: 400 },
  { name: "Group B", total: 300 },
  { name: "Group C", total: 300 },
  { name: "Group D", total: 200 },
]; */

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042" /* , "#ECB2F8" */];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const drawChart = (props) => {
  const data = props.data || [];
  console.log(data);
  return (
    <ResponsiveContainer width={"80%"} height={"80%"}>
      <PieChart>
        <Pie
          data={data}
          cx={"50%"}
          cy={"42%"}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
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
