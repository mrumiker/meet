import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {

  function getData(events) {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
    const data = genres.map((genre) => {
      const value = (events.filter(e => {
        return e.summary.split(' ').includes(genre);
      })).length;
      return { name: genre, value };
    });
    return data;
  }

  return (

    <ResponsiveContainer height={400} >
      <PieChart width={400} height={400}>
        <Pie
          data={getData(events)}
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
  );
}




export default EventGenre;
