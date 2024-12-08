import React, { useContext } from 'react';

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
} from 'recharts';

import { ExpenseContext } from '../Context/ExpenseProvider';

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
];

const COLORS = ["#d48cff", "#fde006", "#ff9304"];

const Chart = () => {
  const {chartData} =useContext(ExpenseContext);
  return (
    
    <PieChart width={400} height={270} >
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        // label={(entry) => `${entry.name}: ${entry.value}`} // Label for each slice
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip /> 
      <Legend />  
    </PieChart>
    
  );
};

export default Chart;
