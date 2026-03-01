"use client";

import { useState, useEffect, useRef } from 'react';
import './vendas.css';
import Link from 'next/link';
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["800"] });

function CardVenda({ venda }) {
    const [aberto, setAberto] = useState(false);

    // Função que força a inversão do estado sem interferência
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
                    <p><strong>O.S. Selecionadas:</strong> {venda.os_selecionadas ?? '-'}</p>
                 </div>

                <div className="venda-status-valor">
                    <span className="venda-status">Vendido</span>
                    <span className="venda-valor">
                        {typeof venda.valor_total === 'number'
                        ? venda.valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                        : 'R$0,00'}
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

            {/* CONTEÚDO EXPANSÍVEL */}
            {/* ÁREA EXPANSÍVEL: Agora com os nomes exatos do seu banco */}
{aberto && (
    <div className="venda-detalhes-extra">
        <div className="divisor-card"></div>
        <div className="grid-detalhes">
            <div>
                {/* Aqui usamos 'Genero' e 'DataNasc' com as iniciais maiúsculas conforme seu SQL */}
                <p><strong>Gênero:</strong> {venda.Genero || '-'}</p>
                <p><strong>Data Nasc:</strong> {venda.DataNasc ? new Date(venda.DataNasc).toLocaleDateString('pt-BR') : '-'}</p>
            </div>
            <div>
                {/* 'endereco', 'rua' e 'numero' em minúsculo conforme seu SQL */}
                <p><strong>Endereço:</strong> {venda.endereco || '-'}, {venda.numero || 'S/N'}</p>
                <p><strong>Rua:</strong> {venda.rua || '-'}</p>
            </div>
            <div>
                {/* 'Bairro', 'Cidade', 'Estado' e 'CEP' com iniciais maiúsculas conforme seu SQL */}
                <p><strong>Bairro:</strong> {venda.Bairro || '-'}</p>
                <p><strong>Cidade:</strong> {venda.Cidade || '-'} / {venda.Estado || '-'}</p>
                <p><strong>CEP:</strong> {venda.CEP || '-'}</p>
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
                const response = await fetch('http://localhost:3001/venda');
                const data = await response.json();
                setVendas (Array.isArray(data) ? data : []);
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
          <div style={{ background: "#000", padding: 10, display: "inline-block" }}>
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