import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function BarChart() {

  return (
      <>

      <div className="  p-5 border border-neutral-300 rounded-lg w-2/3">
        <Bar 
        data={{
            labels: ["January", "February", "March", "April"],
            datasets: [
              {
                // Label for bars
                label: "Number of recruited candidates",
                // Data or value of your each variable
                data: [35, 20, 10 , 19, 50],
                // Color of each bar
                backgroundColor: ["#1D96DC", "#1D96DC", "#1D96DC", "#1D96DC"],
                // Border color of each bar
                borderColor: ["aqua", "green", "red", "yellow"],
                borderWidth: 0.5,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' ,
              },
              title: {
                display: true,
                text: 'Monthly view of Recruitment',
              },
            },
          }}
          height={100}
          />
      </div>

      </>
  )
}