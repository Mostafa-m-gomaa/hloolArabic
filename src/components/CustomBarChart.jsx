import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { TrendingUp } from 'lucide-react';
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";

const CustomBarChart = ({delivered}) => {

  const takeScreenshot = () => {
    const element = document.getElementById("capture");

    html2canvas(element, {
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      windowWidth: element.scrollWidth, // Capture full width
      windowHeight: element.scrollHeight, // Capture full height
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "screenshot.png";
      link.click();
    });
  };


  const data = Object.entries(delivered).length > 0 ?
  Object.entries(delivered).map(([key, value]) => ({
    name: key,
    order: value,
    pv: 1000,
    amt: 1000,
  })) : []








  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];


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
  return (
    <div id="capture" className="flex flex-col gap-4 bg-white p-4 rounded-md shadow-lg w-full overflow-x-auto">
 <Button className="w-fit"  onClick={takeScreenshot}>Capture</Button>
    <div className="flex justify-between border-b-2 pb-4 border-black">
        <div className='flex items-center gap-2 bg-[#2095e4] p-2 rounded-md text-white'>
        <TrendingUp size={20}/>
        </div>
        <h2>اداء التسليمات </h2>
    </div>
    <ResponsiveContainer width={data.length * 94} height={400}>
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
