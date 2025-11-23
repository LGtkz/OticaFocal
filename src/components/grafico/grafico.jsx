"use client";
import "./grafico.css";

export default function Grafico({ month }) {

  const monthNames = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ];

  return (
    <div className="grafico">
      <h3 className="tituloGrafico">Vendas {monthNames[month]}</h3>
    </div>
  );
}
