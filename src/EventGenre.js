import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {

  const [data, setData] = useState([]);

  function getData() {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
    const data = genres.map((genre) => {
      const value = (events.filter(e => {
        return e.summary.split(' ').includes(genre);
      })).length;
      return { name: genre, value };
    });
    return data;
  }

  useEffect(() => {
    setData(() => getData());
  }, [events]);

  return (

    <div style={{ width: "33.3333%" }}>
      <ResponsiveContainer height={400} >
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}




export default EventGenre;
