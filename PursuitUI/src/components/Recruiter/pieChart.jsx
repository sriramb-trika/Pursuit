import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);
export default function Piechart(){

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' 
      },
      title: {
        display: true,
        text: 'Gender Ratio',
      },
    },
  };
  const data = {
    labels: ['She', 'He'],
    datasets: [
      {
        label: '# of Votes',
        data: [12,15],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
         
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          
        ],
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <div className=" w-1/3 border border-neutral-200 p-4 m-5 rounded-xl">
    <div className=" my-10 mx-6 ">
    <Pie data={data} options={options} />
    </div> </div>
  )
}
