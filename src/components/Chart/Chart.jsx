import React from "react";
import "./chart.css";
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

export default function Chart(props) {
  const data = [
    { name: "2023", advanced: 3000, standart: 5000 },
    { name: "2024", advanced: 4000, standart: 7000 },
    { name: "2025", advanced: 4800, standart: 10000 },
    { name: "2026", advanced: 5400, standart: 14000 },
  ];
  return (
    <ResponsiveContainer className="chart-container">
      <LineChart className="chart" width="100%" height="auto" data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="advanced"
          stroke="#0000ff"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="standart" stroke="#ff0000" />
      </LineChart>
    </ResponsiveContainer>
  );
}
