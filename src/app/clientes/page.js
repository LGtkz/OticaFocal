"use client"; 

import { useState, useEffect, useRef } from 'react'; // Adicionado useRef
import './clientes.css';
import Link from 'next/link';
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["800"],
});

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    for (let t = 9; t < 11; t++) {
        let soma = 0;
        for (let i = 0; i < t; i++) {
            soma += parseInt(cpf[i]) * (t + 1 - i);
        }
        let digito = (soma * 10) % 11;
        if (digito === 10 || digito === 11) digito = 0;
        if (digito !== parseInt(cpf[t])) return false;
    }
    return true;
}

export default function Cliente() {
    const inputBuscaRef = useRef(null); // Referência para o input
    const [busca, setBusca] = useState('');
    const [clientes, setClientes] = useState([]);
    const [carregando, setCarregando] = useState(true);

    // Função para dar foco no input ao clicar na imagem da lupa
    const focarInput = () => {
        if (inputBuscaRef.current) {
            inputBuscaRef.current.focus();
        }
    };

    useEffect(() => {
        async function fetchClientes() {
            try {
                const response = await fetch('/api/clientes');
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

    const clientesFiltrados = clientes.filter(c => {
        const termoBusca = busca.toLowerCase();
        return c.nome?.toLowerCase().includes(termoBusca) || c.cpf?.includes(busca);
    });

    const isBuscaCpf = /^\d|[\.\-]/.test(busca) && busca.length >= 11;
    const cpfInvalido = isBuscaCpf && !validarCPF(busca);

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

                <label className="label-buscar">
                    Buscar cliente {cpfInvalido && <span style={{color: 'red', fontSize: '12px'}}> - CPF Inválido</span>}
                </label>

                <div className={`input-busca ${cpfInvalido ? 'input-erro' : ''}`}>
                    <Image
                        src="/search-button-svgrepo-com.svg"
                        alt="Ícone de busca"
                        width={22}
                        height={22}
                        className="icone-busca"
                        onClick={focarInput} // Torna a lupa clicável
                        style={{ cursor: 'pointer' }}
                    />
                    <input 
                        ref={inputBuscaRef} // Conecta a referência
                        type="text" 
                        placeholder="Nome ou CPF" 
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
            </div>

            <div className="cliente-lista-container">
                {carregando ? (
                    <p className="contador-cliente">Carregando dados da Ótica Focal...</p>
                ) : (
                    <>
                        <p className="contador-cliente">
                            {clientesFiltrados.length === 1 
                                ? "Foi encontrado 1 cliente" 
                                : `Foram encontrados ${clientesFiltrados.length} clientes`}
                        </p>

                        {clientesFiltrados.map(cliente => (
                            <div key={cliente.id_cliente} className="cliente-card cliente-card--ativo">
                                <div className="cliente-info-principal">
                                    <h2>{cliente.nome}</h2>
                                    <p>CPF: {cliente.cpf}</p>
                                </div>

                                <div className="cliente-info-secundaria">
                                    <p>Tel: {cliente.telefone || "Sem telefone"}</p>
                                    <p>Email: {cliente.email || "Sem e-mail"}</p> 
                                </div>

                                <button className="btn-receita" aria-label="Ver Detalhes">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}