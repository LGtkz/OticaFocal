"use client";
import { useState, useEffect } from "react"; 
import styles from "./page.module.css";
import Bloco from "@/components/quadroDashboard/bloco";
import BlocoAcesso from "@/components/blocosAcesso/bloco";
import Grafico from "@/components/grafico/grafico"; 
import BlocoVendas from "@/components/blocoVenda/bloco"; 
import BlocoInferior from "@/components/blocoInferior/blocoInferior";

export default function Home() {
  const [vendasMensais, setVendasMensais] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // Mês atual (1-12)
  const [loading, setLoading] = useState(true);

  // Função que busca dados filtrados por mês
  const carregarDadosDashboard = async () => {
    try {
      setLoading(true);
      // Chamada para a View que criamos na API
      const response = await fetch(`http://localhost:3001/vw_vendas_grafico_mensal`);
      const data = await response.json();
      
      // Filtra os dados para o mês selecionado nas setinhas
      const dadosDoMes = data.filter(item => item.mes === currentMonth);
      setVendasMensais(dadosDoMes);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  // O array de dependências [currentMonth] garante que a função rode ao clicar na setinha
  useEffect(() => {
    carregarDadosDashboard();
  }, [currentMonth]);

  

  return (
    <main className={styles.main}>
      <Bloco data={vendasMensais} /> 
      <BlocoAcesso />

      <div className={styles.line2}>
        {/* O Gráfico recebe os dados filtrados e atualiza visualmente */}
        <Grafico month={currentMonth} data={vendasMensais} isLoading={loading} />
        
        {/* BlocoVendas gerencia a troca do mês (setMonth) */}
        <BlocoVendas month={currentMonth} setMonth={setCurrentMonth} data={vendasMensais} />
      </div>

      <BlocoInferior />
    </main>
  );
}