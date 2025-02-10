import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { TrendingUp } from 'lucide-react';
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const data = [
    { name: 'اول يوم', order: 5000, pv: 5000, amt: 2400 },
    { name: 'ثاني يوم', order: 900, pv: 1398, amt: 2210 },
    { name: 'ثالاث يوم', order: 1000, pv: 9800, amt: 2290 },
    { name: 'رابع يوم', order: 500, pv: 3908, amt: 2000 },
    { name: 'خامس يوم', order: 2000, pv: 4800, amt: 2181 },
    { name: 'سادس يوم', order: 250, pv: 3800, amt: 2500 },
    { name: 'سابع يوم', order: 3490, pv: 4300, amt: 2100 },
  ];
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const CustomBarChart = () => {
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-md shadow-lg w-full">

    <div className="flex justify-between border-b-2 pb-4 border-black">
        <div className='flex items-center gap-2 bg-[#2095e4] p-2 rounded-md text-white'>
        <TrendingUp size={20}/>
        </div>
        <h2>اداء التسليمات خلال الاسبوع</h2>
    </div>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="order" fill="#8884d8" shape={<TriangleBar />} label={{ position: "top" }}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
