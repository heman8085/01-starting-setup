import React, { useContext } from "react";
import "./Chart.css";
import { DataContext } from "../../store/DataContext";

const Chart = () => {
  const { filteredExpenses } = useContext(DataContext);

  const chartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  for (const expense of filteredExpenses) {
    const expenseMonth = new Date(expense.date).getMonth();
    chartDataPoints[expenseMonth].value += parseInt(expense.amount);
  }

  const dataPointValues = chartDataPoints.map((dataPoint) => dataPoint.value);
  const totalMaximum = Math.max(...dataPointValues);

  return (
    <div className="chart">
      {chartDataPoints.map((dataPoint) => (
        <div key={dataPoint.label} className="chart-bar">
          <div className="chart-bar__inner">
            <div
              className="chart-bar__fill"
              style={{
                height:
                  dataPoint.value > 0
                    ? Math.round((dataPoint.value / totalMaximum) * 100) + "%"
                    : "0%",
              }}
            ></div>
          </div>
          <div className="chart-bar__label">{dataPoint.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Chart;
