"use client";
import "./grafico.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Grafico({ month, data, isLoading }) {
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Formatamos os dados da API para o formato que o Recharts entende
  // 'dia' vira 'name' e 'total_dia' vira 'vendas'
  const chartData = data && data.length > 0 
    ? data.map(item => ({
        name: `Dia ${item.dia}`,
        vendas: Number(item.total_dia)
      }))
    : [];

  return (
    <div className="grafico">
      {/* O título agora é dinâmico baseado no mês selecionado */}
      <h3 className="tituloGrafico">
        Vendas {monthNames[month - 1]} 
        {isLoading && " (Carregando...)"}
      </h3>
      
      <ResponsiveContainer width="100%" height={250}>
        {chartData.length > 0 ? (
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444a59" vertical={false} /> 
            <XAxis dataKey="name" stroke="#a0a0a0" tick={{fontSize: 12}} /> 
            <YAxis stroke="#a0a0a0" tick={{fontSize: 12}} /> 
            <Tooltip 
              contentStyle={{ backgroundColor: '#2e3340', border: '1px solid #444a59', borderRadius: '5px' }} 
              formatter={(value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            /> 
            <Line 
              type="monotone" 
              dataKey="vendas" 
              stroke="#8884d8" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#8884d8' }} 
              activeDot={{ r: 8 }}
            /> 
          </LineChart>
        ) : (
          <div className="no-data-message">Nenhuma venda registrada neste mês.</div>
        )}
      </ResponsiveContainer>
    </div>
  );
}