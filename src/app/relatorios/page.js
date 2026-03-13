'use client';
import { useState, useEffect } from 'react'; // Adicionado useEffect
import './relatorios.css';
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700", "800"],
});

export default function Relatorios() {
    // Iniciamos com um array vazio
    const [vendasFuncionario, setVendasFuncionario] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Função para buscar dados da API
    const buscarDados = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3001/vw_relatorio_vendas_funcionario');
            
            if (!response.ok) throw new Error('Falha ao buscar dados');
            
            const data = await response.json();
            setVendasFuncionario(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Executa a busca ao abrir a página
    useEffect(() => {
        buscarDados();
    }, []);

    return (
        <div className={`rel-container ${inter.className}`}>
            <header className="relatorio-header">
                <h1>Relatórios de Gestão</h1>
            </header>

            <section className="rel-section">
                <div className="rel-titulo-container">
                    <div className="rel-barra-azul"></div>
                    <h2>Vendas por Funcionário</h2>
                </div>
                
                <div className="rel-card">
                    {loading ? (
                        <p className="txt-center">Carregando dados...</p>
                    ) : error ? (
                        <p className="txt-center" style={{color: 'red'}}>Erro: {error}</p>
                    ) : (
                        <table className="rel-table">
                            <thead>
                                <tr>
                                    <th className="txt-left">Funcionário</th>
                                    <th className="txt-center">Qtd. Vendas</th>
                                    <th className="txt-right">Valor Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendasFuncionario.map((item, index) => (
                                    <tr key={index}>
                                        <td className="txt-left" style={{ color: '#111827', fontWeight: 'bold' }}>
                                            {item.nome}
                                        </td>
                                        <td className="txt-center" style={{ color: '#111827' }}>
                                            {item.qtdVendas}
                                        </td>
                                        <td className="txt-right" style={{ color: '#111827' }}>
                                            {Number(item.valorTotal).toLocaleString('pt-BR', { 
                                                style: 'currency', 
                                                currency: 'BRL' 
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </div>
    );
}