"use client";
 import { useState } from "react";
import "./blocoVenda.css";

export default function BlocoVendas({ month, setMonth }) {

  const monthNames = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ];


 const handlePrevMonth = () => {
    setMonth((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setMonth((prev) => (prev === 11 ? 0 : prev + 1));
  };

  return (
    <div className="bloco-vendas-container">
      
      <div className="nav">
        <span className="arrow" onClick={handlePrevMonth}>{"< "}</span>
        {monthNames[month]}
        <span className="arrow" onClick={handleNextMonth}>{" >"}</span>
      </div>

      <h2>Volume de vendas</h2>
      <h2>R$ 12.234,32</h2>
    </div>
  );
}
