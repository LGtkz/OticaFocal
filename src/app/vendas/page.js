"use client";

import { useState, useEffect, useRef } from 'react';
import './vendas.css';
import Link from 'next/link';
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["800"] });

function CardVenda({ venda }) {
    const [aberto, setAberto] = useState(false);

    const handleToggle = (e) => {
        e.preventDefault();
        setAberto(!aberto);
    };

    return (
        <div className={`venda-card ${aberto ? 'card-aberto' : ''}`}>
            <div className="venda-card-header">
                <div className="venda-info-principal">
                    <h2>{venda.nome}</h2>
                    <p>CPF: {venda.cpf}</p>
                </div>

                <div className="venda-info-venda">
                    <p><strong>Nº Venda:</strong> {venda.id_venda ?? '-'}</p>
                    <p><strong>Data Venda:</strong> {venda.data_venda ? new Date(venda.data_venda).toLocaleDateString('pt-BR') : '-'}</p>
                    <p><strong>O.S. Selecionada:</strong> {venda.os_selecionadas ?? '-'}</p>
                </div>

                <div className="venda-status-valor">
                    <span className="venda-status">Finalizada</span>
                    <span className="venda-valor">
                        {venda.valor_total 
                        ? Number(venda.valor_total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                        : 'R$ 0,00'}
                    </span>
                </div>

                <button 
                    type="button"
                    className="btn-receita" 
                    onClick={handleToggle}
                >
                    <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        style={{ 
                            transform: aberto ? 'rotate(180deg)' : 'rotate(0deg)', 
                            transition: '0.3s' 
                        }}
                    >
                        <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* CONTEÚDO EXPANSÍVEL: Agora focado em informações da VENDA */}
            {aberto && (
                <div className="venda-detalhes-extra">
                    <div className="divisor-card"></div>
                    <div className="grid-detalhes">
                        <div>
                            <p><strong>Vendedor:</strong> {venda.funcionario_nome || 'Não informado'}</p>
                            <p><strong>ID Usuário:</strong> {venda.id_usuario_fechamento || '-'}</p>
                        </div>
                        <div>
                            <p><strong>Forma de Pagamento:</strong> {venda.tipo_pagamento || 'Pendente'}</p>
                            <p><strong>Status Pagamento:</strong> Concluído</p>
                        </div>
                        <div>
                            <p><strong>ID Cliente:</strong> {venda.id_cliente || '-'}</p>
                            <p><strong>E-mail:</strong> {venda.email || '-'}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Vendas() {
    const [busca, setBusca] = useState('');
    const [vendas, setVendas] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function fetchVendas() {
            try {
                const response = await fetch('http://localhost:3001/vw_vendas_detalhadas');
                
                if (!response.ok) {
                    throw new Error('Erro ao buscar vendas');
                }

                const data = await response.json();
                setVendas(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setCarregando(false);
            }
        }
        fetchVendas();
    }, []);

    const vendasFiltradas = vendas.filter(c => 
        c.nome?.toLowerCase().includes(busca.toLowerCase()) || c.cpf?.includes(busca)
    );

    return (
       <div className="venda-page">
      <div className="venda-container">
        <div className="titulo-venda">
          <div style={{ background: "#374151", padding: 10, display: "inline-block" }}>
            <img src="/estoque.svg" alt="Ícone" width={50} height={50} />
          </div>
          <h1 className={inter.className}>Vendas</h1>
        </div>
      </div>

            <div className="venda-box">
                <Link href="/vendas/novo">
                    <button className="btn-novo-venda">Nova Venda </button>
                </Link>
                <div className="input-busca">
                    <input 
                        type="text" 
                        placeholder="Nome ou CPF do Cliente" 
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
            </div>

            <div className="venda-lista-container">
                {carregando ? (
                    <p>Carregando...</p>
                ) : (
                    vendasFiltradas.map(venda => (
                        <CardVenda key={venda.id_venda} venda={venda} />
                    ))
                )}
            </div>
        </div>
    );
}