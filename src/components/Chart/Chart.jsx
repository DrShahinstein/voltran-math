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

const generateChartData = (advEnergyUsage, stdEnergyUsage, years) => {
  const data = [];

  for (let i = 0; i < years; i++) {
    data.push({
      name: `${2023 + i}`,
      advanced: advEnergyUsage * i,
      standart: stdEnergyUsage * i,
    });
  }

  return data;
};

export default function Chart({ advancedUseOfEnergy, standartUseOfEnergy }) {
  const x = advancedUseOfEnergy;
  const y = standartUseOfEnergy;
  const data = generateChartData(x, y, 8);

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
