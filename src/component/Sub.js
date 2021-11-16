import { useLocation } from "react-router";
import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';



const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
export default function Sub() {
    const location = useLocation();
    console.log(location.state);
    const data = [
        {
            name: "Negative",
            value: location.state.neg
        },
        {
            name: "Positive",
            value: location.state.pos
        },
        {
            name: 'Death',
            value: location.state.death
        }
    ]    
    return (
        <div className=''>


            <PieChart width={800} height={400}>
                <Pie
                    data={data}
                    cx={120}
                    cy={200}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie> 
            </PieChart>
        </div>
    )
}
