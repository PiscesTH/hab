import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useMediaQuery } from "react-responsive";

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

  const labelLines = [`${payload.name}`, `${(percent * 100).toFixed(0)}%`];

  return (
    <g>
      {labelLines.map((line, i) => (
        <text
          key={`line-${i}`}
          x={x}
          y={y + i * 16}
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
  return [`${value.toLocaleString()}원`, name];
};

const DrawChart = (props) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 532px)" });
  const isSmallestScreen = useMediaQuery({ query: "(max-width: 360px)" });
  const data = props.data || [];

  const getOuterRadius = () => {
    if (isSmallestScreen) {
      return 90;
    }
    if (isSmallScreen) {
      return 100;
    }
    return 120;
  };
  return (
    <ResponsiveContainer width={"80%"} height={"80%"}>
      <PieChart>
        <Tooltip formatter={valueFormatter} />
        <Pie
          data={data}
          cx={"50%"}
          cy={"42%"}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={getOuterRadius}
          innerRadius={isSmallestScreen ? 20 : 30}
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

export default React.memo(DrawChart);
