import React, { useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { ChartSpline } from 'lucide-react';
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";



const AreaChartComponent = ({sales}) => {

  const data = Object.entries(sales).length > 0 ?
  Object.entries(sales).map(([key, value]) => ({
    name: key,
    order: value,
    pv: 1000,
    amt: 1000,
  })) : []

  const gradientOffset = useMemo(() => {
    const dataMax = Math.max(...data.map(i => i.order));
    const dataMin = Math.min(...data.map(i => i.order));

    if (dataMax <= 0) return 0;
    if (dataMin >= 0) return 1;
    return dataMax / (dataMax - dataMin);
  }, [data]);



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

  return (
    <div id="capture" className="flex flex-col gap-4 bg-white p-4 rounded-md shadow-lg w-full overflow-x-auto">
 <Button className="w-fit"  onClick={takeScreenshot}>Capture</Button>
    <div className="flex justify-between border-b-2 pb-4 border-black">
        <div className='flex items-center gap-2 bg-[red] p-2 rounded-md text-white'>
        <ChartSpline size={20} />
        </div>
        <h2>اداء المبيعات</h2>
    </div>
    <ResponsiveContainer width={data.length * 94} height={400}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={gradientOffset} stopColor="blue" stopOpacity={1} />
            <stop offset={gradientOffset} stopColor="red" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="order" stroke="#000" fill="url(#splitColor)" />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;
