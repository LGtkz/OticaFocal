"use client";
import "./grafico.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Grafico({ month }) {

  const monthNames = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ];

  const mockData = [
    {name: 'Dia 1', vendas: 3000},
    {name: 'Dia 2', vendas: 4000},
    {name: 'Dia 3', vendas: 1000},
    {name: 'Dia 4', vendas: 2780},
    {name: 'Dia 5', vendas: 1500},
    {name: 'Dia 6', vendas: 2390},
    {name: 'Dia 7', vendas: 3490},
  ];

  return (
    <div className="grafico">
      <h3 className="tituloGrafico">Vendas {monthNames[month]}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444a59" /> 
          <XAxis dataKey="name" stroke="#a0a0a0" /> 
          <YAxis stroke="#a0a0a0" /> =
          <Tooltip contentStyle={{ backgroundColor: '#2e3340', border: '1px solid #444a59' }} /> 
          <Line type="linear" dataKey="vendas" stroke="#8884d8" strokeWidth={2} dot={false} /> 
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
