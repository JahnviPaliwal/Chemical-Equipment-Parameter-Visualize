import React from "react";
//import { getSummary } from "../api/api";


function SummaryCards({ summary }) {
  return (
    <div className="summary">
      <div><pk>Total Equipment:</pk> {summary.total_equipment}</div>
      <div><pk>Average Flowrate:</pk> {summary.average_flowrate}</div>
      <div><pk>Average Pressure:</pk> {summary.average_pressure}</div>
      <div><pk>Average Temperature:</pk> {summary.average_temperature}</div>
    </div>
  );
}

export default SummaryCards;
