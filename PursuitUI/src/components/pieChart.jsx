import React from "react";
import { PieChart } from '@rsuite/charts';

export default function Piechart(){

  return (
    <div className=" w-1/3 border border-neutral-200 p-4 m-5 rounded-xl">
    <div className=" my-10 mx-6 ">
    <PieChart
    name="PieChart"
    data={[['Men' , 60],['Women' , 40]]

    }/>
    </div>
    
    
     </div>
  )
}