"use client";

import { useState, useEffect, useRef } from 'react';
import './produtos.css';
import Link from 'next/link';
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["800"] });

// SUBCOMPONENTE PARA O CARD DE PRODUTO
function CardProduto({ prod }) {
    const [aberto, setAberto] = useState(false);

    return (
        <div className={`produto-card ${aberto ? 'card-aberto' : ''}`}>
            <div className="produto-card-header">
                <div className="produto-info-principal">
                    {/* Note que 'descricao' e 'id_produto' costumam ser minúsculos na tabela original */}
                    <h2>{prod.descricao}</h2>
                    <p>ID: {prod.id_produto} | Marca: {prod.Marca || 'Não informada'}</p>
                </div>

                <div className="produto-info-secundaria">
                    <p>Estoque: <strong>{prod.estoque_atual}</strong> un.</p>
                    <p>Preço Venda: R$ {Number(prod.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>

                <button 
                    type="button" 
                    className="btn-receita" 
                    onClick={() => setAberto(!aberto)}
                    style={{ transform: aberto ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* ÁREA DE DETALHES - Nomes corrigidos conforme o seu SQL */}
            {aberto && (
                <div className="produto-detalhes-extra">
                    <div className="grid-detalhes">
                        <div>
                            <p><strong>Categoria:</strong> {prod.Categoria || '-'}</p>
                            <p><strong>Referência:</strong> {prod.Referencia || '-'}</p>
                        </div>
                        <div>
                            {/* Ajustado para Preco_custo com 'P' maiúsculo conforme seu ALTER TABLE */}
                            <p><strong>Custo:</strong> R$ {Number(prod.Preco_custo || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            <p><strong>Fornecedor:</strong> {prod.Fornecedor || 'Não informado'}</p>
                        </div>
                        <div>
                            {/* Caso queira manter informações de localização ou tipo que já existiam */}
                            <p><strong>Marca:</strong> {prod.Marca || '-'}</p>
                            <p><strong>Status:</strong> Ativo</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Produto() {
    const inputBuscaRef = useRef(null);
    const [busca, setBusca] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const focarInput = () => inputBuscaRef.current?.focus();

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const response = await fetch('http://localhost:3001/produto');
                const data = await response.json();
                setProdutos(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            } finally {
                setCarregando(false);
            }
        }
        fetchProdutos();
    }, []);

    const produtosFiltrados = produtos.filter(p => {
        const termo = busca.toLowerCase();
        return (
            p.descricao?.toLowerCase().includes(termo) ||
            p.Marca?.toLowerCase().includes(termo) || // 'Marca' com M maiúsculo
            p.id_produto?.toString().includes(termo)
        );
    });

    return (
        <div className="produto-page">
            <div className="produto-container">
                <div className="titulo-produto">
                    <Image src="/Produto.svg" alt="Produtos" width={70} height={70} />
                    <h1 className={inter.className}>Produtos</h1>
                </div>
            </div>

            <div className="produto-box">
                <Link href="/produtos/novo">
                    <button className="btn-novo-produto">Novo Produto +</button>
                </Link>
                <div className="input-busca">
                    <Image src="/search-button-svgrepo-com.svg" alt="Busca" width={22} height={22} onClick={focarInput} style={{ cursor: 'pointer' }} />
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
                            {produtosFiltrados.length === 1 ? "1 produto encontrado" : `${produtosFiltrados.length} produtos encontrados`}
                        </p>
                        {produtosFiltrados.map(prod => (
                            <CardProduto key={prod.id_produto} prod={prod} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}