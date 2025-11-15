
import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

interface ChartData {
  name: string;
  entradas: number;
  saidas: number;
}

interface ChartProps {
  data: ChartData[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md" style={{ height: '400px' }}>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Visão Geral de Movimentações</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="entradas" fill="#34d399" name="Entradas" />
          <Bar dataKey="saidas" fill="#f87171" name="Saídas" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
