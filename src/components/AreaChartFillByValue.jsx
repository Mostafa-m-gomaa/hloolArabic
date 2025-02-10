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

const data = [
  { name: 'اول يوم', order: 5000, pv: 5000, amt: 2400 },
  { name: 'ثاني يوم', order: 900, pv: 1398, amt: 2210 },
  { name: 'ثالاث يوم', order: 1000, pv: 9800, amt: 2290 },
  { name: 'رابع يوم', order: 500, pv: 3908, amt: 2000 },
  { name: 'خامس يوم', order: 2000, pv: 4800, amt: 2181 },
  { name: 'سادس يوم', order: 250, pv: 3800, amt: 2500 },
  { name: 'سابع يوم', order: 3490, pv: 4300, amt: 2100 },
];

const AreaChartComponent = () => {
  const gradientOffset = useMemo(() => {
    const dataMax = Math.max(...data.map(i => i.order));
    const dataMin = Math.min(...data.map(i => i.order));

    if (dataMax <= 0) return 0;
    if (dataMin >= 0) return 1;
    return dataMax / (dataMax - dataMin);
  }, [data]);

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-md shadow-lg w-full">

    <div className="flex justify-between border-b-2 pb-4 border-black">
        <div className='flex items-center gap-2 bg-[red] p-2 rounded-md text-white'>
        <ChartSpline size={20} />
        </div>
        <h2>اداء المبيعات خلال الاسبوع</h2>
    </div>
    <ResponsiveContainer width="100%" height={400}>
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
