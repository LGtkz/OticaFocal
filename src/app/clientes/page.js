"use client";

import { useState, useEffect, useRef } from 'react';
import './clientes.css';
import Link from 'next/link';
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["800"] });

function CardCliente({ cliente }) {
    const [aberto, setAberto] = useState(false);

    // Função que força a inversão do estado sem interferência
    const handleToggle = (e) => {
        e.preventDefault();
        setAberto(!aberto);
    };

    return (
        <div className={`cliente-card ${aberto ? 'card-aberto' : ''}`}>
            <div className="cliente-card-header">
                <div className="cliente-info-principal">
                    <h2>{cliente.nome}</h2>
                    <p>CPF: {cliente.cpf}</p>
                </div>

                <div className="cliente-info-secundaria">
                    <p>Tel: {cliente.telefone || "(34) 99999-9999"}</p>
                    <p>Email: {cliente.email || "exemplo@gmail.com"}</p> 
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
    <div className="cliente-detalhes-extra">
        <div className="divisor-card"></div>
        <div className="grid-detalhes">
            <div>
                {/* Aqui usamos 'Genero' e 'DataNasc' com as iniciais maiúsculas conforme seu SQL */}
                <p><strong>Gênero:</strong> {cliente.Genero || '-'}</p>
                <p><strong>Data Nasc:</strong> {cliente.DataNasc ? new Date(cliente.DataNasc).toLocaleDateString('pt-BR') : '-'}</p>
            </div>
            <div>
                {/* 'endereco', 'rua' e 'numero' em minúsculo conforme seu SQL */}
                <p><strong>Endereço:</strong> {cliente.endereco || '-'}, {cliente.numero || 'S/N'}</p>
                <p><strong>Rua:</strong> {cliente.rua || '-'}</p>
            </div>
            <div>
                {/* 'Bairro', 'Cidade', 'Estado' e 'CEP' com iniciais maiúsculas conforme seu SQL */}
                <p><strong>Bairro:</strong> {cliente.Bairro || '-'}</p>
                <p><strong>Cidade:</strong> {cliente.Cidade || '-'} / {cliente.Estado || '-'}</p>
                <p><strong>CEP:</strong> {cliente.CEP || '-'}</p>
            </div>
        </div>
    </div>
)}
        </div>
    );
}

export default function Cliente() {
    const [busca, setBusca] = useState('');
    const [clientes, setClientes] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function fetchClientes() {
            try {
                const response = await fetch('http://localhost:3001/cliente');
                const data = await response.json();
                setClientes(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setCarregando(false);
            }
        }
        fetchClientes();
    }, []);

    const clientesFiltrados = clientes.filter(c => 
        c.nome?.toLowerCase().includes(busca.toLowerCase()) || c.cpf?.includes(busca)
    );

    return (
        <div className="cliente-page">
            <div className="cliente-container">
                <div className="titulo-cliente">
                    <Image src="/Cliente.svg" alt="Ícone" width={70} height={70} />
                    <h1 className={inter.className}>Clientes</h1>
                </div>
            </div>

            <div className="cliente-box">
                <Link href="/clientes/novo">
                    <button className="btn-novo-cliente">Novo Cliente +</button>
                </Link>
                <div className="input-busca">
                    <input 
                        type="text" 
                        placeholder="Nome ou CPF" 
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
            </div>

            <div className="cliente-lista-container">
                {carregando ? (
                    <p>Carregando...</p>
                ) : (
                    clientesFiltrados.map(cliente => (
                        <CardCliente key={cliente.id_cliente} cliente={cliente} />
                    ))
                )}
            </div>
        </div>
    );
}