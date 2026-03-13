'use client';
import { useState } from 'react';
import './relatorios.css';
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700", "800"],
});

export default function Relatorios() {
    // Dados de teste (Inserts manuais)
    const [vendasFuncionario] = useState([
        { nome: "Igor Mariz", qtdVendas: 15, valorTotal: 7500.00 },
        { nome: "Ana Costa", qtdVendas: 22, valorTotal: 11200.50 },
        { nome: "Marcos Paulo", qtdVendas: 8, valorTotal: 3400.00 },
        { nome: "Beatriz Silva", qtdVendas: 12, valorTotal: 5900.25 },
        { nome: "Ricardo Alves", qtdVendas: 30, valorTotal: 18450.00 },
        { nome: "Julia Souza", qtdVendas: 5, valorTotal: 2100.00 }
    ]);

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
                                        {item.valorTotal.toLocaleString('pt-BR', { 
                                            style: 'currency', 
                                            currency: 'BRL' 
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}