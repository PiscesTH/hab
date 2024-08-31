import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    total: 2400
  },
  {
    name: 'Page B',
    total: 1398
  },
  {
    name: 'Page C',
    total: 9800
  },
  {
    name: 'Page D',
    total: 3908
  },
  {
    name: 'Page E',
    total: 4800
  },
  {
    name: 'Page F',
    total: 3800
  },
  {
    name: 'Page G',
    total: 4300
  },
];

export default class Example extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width="95%" height="65%">
        <LineChart
          width={400}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
