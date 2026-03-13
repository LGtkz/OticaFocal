"use client";
import "./blocoVenda.css";

export default function BlocoVendas({ month, setMonth, data }) {
  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Calcula o valor total vendido no mês a partir dos dados reais da API
  const totalVendido = data.reduce((acc, curr) => acc + Number(curr.total_dia), 0);

  const handlePrevMonth = () => {
    // Se o mês for maior que 1 (Janeiro), subtrai 1.
    if (month > 1) setMonth(month - 1);
  };

  const handleNextMonth = () => {
    // Se o mês for menor que 12 (Dezembro), soma 1.
    if (month < 12) setMonth(month + 1);
  };

  return (
    <div className="bloco-vendas-container">
      <div className="nav">
        <span className="arrow" onClick={handlePrevMonth} style={{ cursor: 'pointer' }}>{"< "}</span>
        {/* Usamos [month - 1] porque o array começa em 0, mas nosso estado começa em 1 */}
        {monthNames[month - 1]} 
        <span className="arrow" onClick={handleNextMonth} style={{ cursor: 'pointer' }}>{" >"}</span>
      </div>

      <h2>Volume de vendas</h2>
      {/* Exibe o valor real calculado dos dados da API */}
      <h2>{totalVendido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
    </div>
  );
}