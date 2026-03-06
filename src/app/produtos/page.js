"use client";

import { useState, useEffect, useRef } from 'react';
import './produtos.css';
import Link from 'next/link';
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["800"] });


function CardProduto({ prod, recarregar }) {
    const [aberto, setAberto] = useState(false);
    const [editando, setEditando] = useState(false);
    const [dados, setDados] = useState({ ...prod });

    useEffect(() => {
        setDados({ ...prod });
    }, [prod]);

    const handleToggle = () => {
        setAberto(!aberto);
        if (editando) setEditando(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDados(prev => ({ ...prev, [name]: value }));
    };

    const salvarEdicao = async () => {
        try {
            const response = await fetch(`http://localhost:3001/produto/${prod.id_produto}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            if (response.ok) {
                alert("Produto atualizado!");
                setEditando(false);
                recarregar(); 
            } else {
                const erro = await response.json();
                alert(`Erro: ${erro.error}`);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    return (
        <div className={`produto-card ${aberto ? 'card-aberto' : ''}`}>
            <div className="produto-card-header">
                <div className="produto-info-principal">
                    {editando ? (
                        <input name="descricao" value={dados.descricao} onChange={handleChange} className="input-inline" />
                    ) : (
                        <h2>{prod.descricao}</h2>
                    )}
                    <p>ID: {prod.id_produto} | Marca: {editando ? (
                        <input name="Marca" value={dados.Marca} onChange={handleChange} className="input-inline-small" />
                    ) : (prod.Marca || 'Não informada')}</p>
                </div>

                <div className="produto-info-secundaria">
                    <p>Estoque: {editando ? (
                        <input type="number" name="estoque_atual" value={dados.estoque_atual} onChange={handleChange} className="input-inline-number" />
                    ) : (<strong>{prod.estoque_atual}</strong>)} un.</p>
                    
                    <p>Preço Venda: {editando ? (
                        <input type="number" name="preco" value={dados.preco} onChange={handleChange} className="input-inline-number" />
                    ) : (`R$ ${Number(prod.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`)}</p>
                </div>

                <div className="produto-acoes">
                    <button 
                        type="button" 
                        className="btn-editar-inline" 
                        onClick={() => {
                            setEditando(!editando);
                            if (!aberto) setAberto(true); 
                        }}
                    >
                        {editando ? "✖" : "✏️"}
                    </button>

                    <button 
                        type="button" 
                        className="btn-receita" 
                        onClick={handleToggle}
                        style={{ transform: aberto ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            {aberto && (
                <div className="produto-detalhes-extra">
                    <div className="divisor-card"></div>
                    <div className="grid-detalhes">
                        <div>
                            <p><strong>Categoria:</strong> {editando ? (
                                <input name="Categoria" value={dados.Categoria} onChange={handleChange} className="input-inline" />
                            ) : prod.Categoria || '-'}</p>
                            <p><strong>Referência:</strong> {editando ? (
                                <input name="Referencia" value={dados.Referencia} onChange={handleChange} className="input-inline" />
                            ) : prod.Referencia || '-'}</p>
                        </div>
                        <div>
                            <p><strong>Custo:</strong> R$ {editando ? (
                                <input type="number" name="Preco_custo" value={dados.Preco_custo} onChange={handleChange} className="input-inline" />
                            ) : Number(prod.Preco_custo || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            <p><strong>Fornecedor:</strong> {editando ? (
                                <input name="Fornecedor" value={dados.Fornecedor} onChange={handleChange} className="input-inline" />
                            ) : prod.Fornecedor || 'Não informado'}</p>
                        </div>
                    </div>
                    {editando && (
                        <div className="area-salvar">
                            <button onClick={salvarEdicao} className="btn-salvar-confirmar">Confirmar Alterações</button>
                        </div>
                    )}
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

    const fetchProdutos = async () => {
        try {
            const response = await fetch('http://localhost:3001/produto');
            const data = await response.json();
            setProdutos(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    const produtosFiltrados = produtos.filter(p => {
        const termo = busca.toLowerCase();
        return (
            p.descricao?.toLowerCase().includes(termo) ||
            p.Marca?.toLowerCase().includes(termo) ||
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
                            <CardProduto key={prod.id_produto} prod={prod} recarregar={fetchProdutos} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}