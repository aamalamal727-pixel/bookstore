import React from "react";
import Adminheader from "../components/Adminheader";
import Adminsidebar from "../components/Adminsidebar";
import { PiBookOpenTextBold } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer, Pie, PieChart } from 'recharts';
function Adminhome() {
  const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
  },
];
const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];

  return (
    <>
      <Adminheader />
      <div className="md:grid grid-cols-5 gap-2">
        <div className="col-span-1">
          <Adminsidebar />
        </div>
        <div className="col-span-4 p-10">
          <div className="md:grid grid-cols-3">
            <div className="md:px-5 my-5 md:my-0">
              <div className="bg-blue-900 p-4 flex items-center text-5xl rounded text-white">
                <PiBookOpenTextBold />
                <div className="text-center ms-10 md:ms-0">
                  <h3 className="text-xl">Total Number of Books</h3>
                  <h3 className="text-4xl">100+</h3>
                </div>
              </div>
            </div>
            <div className="md:px-5 my-5 md:my-0">
              <div className="bg-green-900 p-4 flex items-center text-5xl rounded text-white">
                <CiUser />
                <div className="text-center ms-10 md:ms-0">
                  <h3 className="text-xl">Total Number of Users</h3>
                  <h3 className="text-4xl">100+</h3>
                </div>
              </div>
            </div>
            <div className="md:px-5 my-5 md:my-0">
              <div className="bg-yellow-900 p-4 flex items-center text-5xl rounded text-white">
                <CiUser />
                <div className="text-center ms-10 md:ms-0">
                  <h3 className="text-xl">Total Number of Employees</h3>
                  <h3 className="text-4xl">100+</h3>
                </div>
              </div>
            </div>
          </div>
          {/* charts title */}
          <div className="md:grid grid-cols-2 p-5 mt-10 text-lg">
            <div>
              Book Purchasing Ratio
            </div>
            <div>
              Growth Ratio - (Yearly)
            </div>
          </div>
          <div className="md:grid grid-cols-2 p-5 mt-10">
            <div className="my-5 md:my-10">
              <ResponsiveContainer width={'500'} height={'400'}>
                <BarChart  data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis width="auto" />
    <Tooltip />
    <Legend />
    <Bar dataKey="pv" fill="#8884d8"  />
    <Bar dataKey="uv" fill="#82ca9d"  />
    
  </BarChart>

              </ResponsiveContainer>
            </div>
            <div className="my-5 md:my-10 md:ms-10 w-100 h-80">
              <ResponsiveContainer width={'500'} height={'400'}>
                <PieChart
      
    >
      <Pie
        data={data01}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius="50%"
        fill="#8884d8"
        
      />
      <Pie
        data={data02}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius="60%"
        outerRadius="80%"
        fill="#82ca9d"
        label
        
      />
      <Tooltip />
      
    </PieChart>
                

              </ResponsiveContainer></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Adminhome;
