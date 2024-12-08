import React, { useContext } from 'react';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ExpenseContext } from '../Context/ExpenseProvider';

const MyBarChart = () => {

  
  const {chartData} =useContext(ExpenseContext);
  
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", backgroundColor:"white", width:"30vw", borderRadius:"1rem"}}>
      <BarChart
        width={400}
        height={300}
        data={chartData}
        layout="vertical" // Makes the bars horizontal
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} /> {/* Optional Grid */}
        <XAxis type="number" hide /> {/* Hides the X-Axis */}
        <YAxis type="category" dataKey="name" width={100} /> {/* Category labels */}
        <Tooltip /> {/* Tooltip on hover */}
        <Bar
          dataKey="value"
          fill="#9b8be9"
          radius={[10, 10, 10, 10]} // Rounded corners
          barSize={20}
        />
      </BarChart>
    </div>
  );
};

export default MyBarChart;
