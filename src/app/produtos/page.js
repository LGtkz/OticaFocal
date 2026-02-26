"use client"; // Resolve o erro de hooks do React

import { useState, useEffect, useRef } from 'react';
import './produtos.css';
import Link from 'next/link'; // Resolve o erro "Link is not defined"
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["800"],
});

export default function Produto() {
    const inputBuscaRef = useRef(null);
    const [busca, setBusca] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    // Função para dar foco no input ao clicar na lupa
    const focarInput = () => {
        if (inputBuscaRef.current) {
            inputBuscaRef.current.focus();
        }
    };

    // Busca produtos do banco (API)
    useEffect(() => {
        async function fetchProdutos() {
            try {
                const response = await fetch('/api/produtos');
                const data = await response.json();
                setProdutos(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            } finally {
                setCarregando(false);
            }
        }
        fetchProdutos();
    }, []);

    // Filtra por nome (descrição), marca ou ID
    const produtosFiltrados = produtos.filter(p => {
        const termo = busca.toLowerCase();
        return (
            p.descricao?.toLowerCase().includes(termo) ||
            p.marca?.toLowerCase().includes(termo) ||
            p.id_produto?.toString().includes(termo)
        );
    });

    return (
        <div className="produto-page">
            <div className="produto-container">
                <div className="titulo-produto">
                    <Image
                        src="/Produto.svg"
                        alt="Ícone de produtos"
                        width={70}
                        height={70}
                    />
                    <h1 className={inter.className}>Produtos</h1>
                </div>
            </div>

            <div className="produto-box">
                <Link href="/produtos/novo">
                    <button className="btn-novo-produto">Novo Produto +</button>
                </Link>

                <label className="label-buscar">Buscar produto</label>

                <div className="input-busca">
                    <Image
                        src="/search-button-svgrepo-com.svg"
                        alt="Lupa de busca"
                        width={22}
                        height={22}
                        className="icone-busca"
                        onClick={focarInput}
                        style={{ cursor: 'pointer' }}
                    />
                    <input 
                        ref={inputBuscaRef}
                        type="text" 
                        placeholder="Nome, marca ou ID do produto..." 
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
            </div>

            <div className="produto-lista-container">
                {carregando ? (
                    <p className="contador-produto">Carregando estoque...</p>
                ) : (
                    <>
                        <p className="contador-produto">
                            {produtosFiltrados.length === 1 
                                ? "Foi encontrado 1 produto" 
                                : `Foram encontrados ${produtosFiltrados.length} produtos`}
                        </p>

                        {produtosFiltrados.map(prod => (
                            <div key={prod.id_produto} className="produto-card produto-card--ativo">
                                <div className="produto-info-principal">
                                    <h2>{prod.descricao}</h2>
                                    <p>ID: {prod.id_produto} | Marca: {prod.marca || 'Não informada'}</p>
                                </div>

                                <div className="produto-info-secundaria">
                                    <p>Categoria: {prod.categoria || 'Geral'}</p>
                                    <p>Estoque: <strong>{prod.estoque_atual}</strong> un.</p>
                                    <p>Preço: R$ {Number(prod.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                </div>

                                <button className="btn-receita" aria-label="Abrir">
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