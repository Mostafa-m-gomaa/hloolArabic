import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', sales: 400 },
  { name: 'Feb', sales: 300 },
  { name: 'Mar', sales: 500 },
  { name: 'Apr', sales: 700 },
];

const MyChart = () => {
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-md shadow-lg w-full">

    <div className="flex justify-between border-b-2 pb-4 border-black">
        <div className='flex items-center gap-2 bg-[#2095e4] p-2 rounded-md text-white'>
        {/* <TrendingUp size={20}/> */}
        </div>
        <h2>اداء التسليمات خلال الاسبوع</h2>
    </div>
   
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
    </div>

  );
};

export default MyChart;
