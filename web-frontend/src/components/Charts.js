//import React from "react";
//import { Bar, Line } from "react-chartjs-2";
//import {
//  Chart as ChartJS,
//  CategoryScale,
//  LinearScale,
//  BarElement,
//  LineElement,
//  PointElement,
//} from "chart.js";
//
//ChartJS.register(
//  CategoryScale,
//  LinearScale,
//  BarElement,
//  LineElement,
//  PointElement
//);
//
//function Charts({ data }) {
//  const labels = data.map((d) => d["Equipment Name"]);
//
//  const flowrateData = {
//    labels,
//    datasets: [
//      {
//        label: "Flowrate",
//        data: data.map((d) => d.Flowrate),
//      },
//    ],
//  };
//
//  const temperatureData = {
//    labels,
//    datasets: [
//      {
//        label: "Temperature",
//        data: data.map((d) => d.Temperature),
//      },
//    ],
//  };
//
//  return (
//      <div className="charts">
//        <div style={{ height: "300px" }}>
//          <Bar data={flowrateData} options={{ maintainAspectRatio: false }} />
//        </div>
//
//        <div style={{ height: "300px", marginTop: "30px" }}>
//          <Line data={temperatureData} options={{ maintainAspectRatio: false }} />
//        </div>
//      </div>
//  );
//
//}
//
//export default Charts;

import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function Charts({ data }) {
  const labels = data.map((d) => d["Equipment Name"]);

  const flowrateData = {
    labels,
    datasets: [
      {
        label: "Flowrate",
        data: data.map((d) => d.Flowrate),
        backgroundColor: "rgba(54, 162, 235, 0.6)", // light blue bars
        borderColor: "rgba(255, 99, 132, 1)", // dark blue border
        borderWidth: 1.6,
      },
    ],
  };

  const temperatureData = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: data.map((d) => d.Temperature),
        borderColor: "rgba(255, 99, 132, 1)", // red line
        backgroundColor: "rgba(255, 99, 132, 0.2)", // light red fill under line
        pointBackgroundColor: "#000", // red points
        pointBorderColor: "#fff",
        pointRadius: 4,
        tension: 0.17, // makes line slightly curved
      },
    ],
  };

  return (
    <div className="charts">
      <div style={{ height: "300px" }}>
        <Bar
          data={flowrateData}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: { display: true },
            },
          }}
        />
      </div>

      <div style={{ height: "300px", marginTop: "30px" }}>
        <Line
          data={temperatureData}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: { display: true },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Charts;
