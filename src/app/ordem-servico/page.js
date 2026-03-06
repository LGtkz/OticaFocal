"use client";

import { useState, useEffect, useRef } from 'react';
import './ordem-servico.css';
import Link from 'next/link';
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["800"] });


function CardOS({ os, recarregar }) {
    const [aberto, setAberto] = useState(false);
    const [editando, setEditando] = useState(false);
    const [dados, setDados] = useState({ ...os });

    useEffect(() => {
        setDados({ ...os });
    }, [os]);

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
            const response = await fetch(`http://localhost:3001/ordem_servico/${os.id_os}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            if (response.ok) {
                alert("Ordem de serviço atualizada!");
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
        <div className={`cliente-card ${aberto ? 'card-aberto' : ''}`} style={{ 
            borderLeftColor: os.status === 'Aberta' ? '#2ecc71' : '#e74c3c',
            height: aberto ? 'auto' : '100px',
            flexDirection: 'column',
            alignItems: 'stretch'
        }}>
            <div className="cliente-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div className="cliente-info-principal">
                    <h2>{os.nome_cliente || `Cliente ID: ${os.id_cliente}`}</h2>
                    <p>O.S Nº: {os.id_os}</p>
                </div>

                <div className="cliente-info-secundaria">
                    <p>Status: {editando ? (
                        <select name="status" value={dados.status} onChange={handleChange} className="input-inline">
                            <option value="Aberta">Aberta</option>
                            <option value="Finalizada">Finalizada</option>
                            <option value="Cancelada">Cancelada</option>
                        </select>
                    ) : (
                        <strong>{os.status || 'Não informado'}</strong>
                    )}</p>
                    <p>Abertura: {os.data_abertura ? new Date(os.data_abertura).toLocaleDateString('pt-BR') : '-'}</p>
                </div>

                <div className="cliente-info-secundaria" style={{ minWidth: '150px' }}>
                    <p>Total: R$ {editando ? (
                        <input type="number" name="valor_total" value={dados.valor_total} onChange={handleChange} className="input-inline-number" />
                    ) : Number(os.valor_total || 0).toFixed(2)}</p>
                    
                    <p>Entrada: R$ {editando ? (
                        <input type="number" name="valor_entrada" value={dados.valor_entrada} onChange={handleChange} className="input-inline-number" />
                    ) : Number(os.valor_entrada || 0).toFixed(2)}</p>
                </div>

                <div className="os-acoes" style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        type="button" 
                        className="btn-editar-inline" 
                        onClick={() => setEditando(!editando)}
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
                <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                    <p style={{ fontSize: '14px', color: '#444' }}>
                        <strong>Observações:</strong> 
                        {editando ? (
                            <textarea 
                                name="observacao" 
                                value={dados.observacao} 
                                onChange={handleChange} 
                                className="nos-textarea"
                                style={{ width: '100%', marginTop: '5px' }}
                            />
                        ) : (
                            ` ${os.observacao || 'Nenhuma observação cadastrada.'}`
                        )}
                    </p>
                    <p style={{ fontSize: '14px', color: '#444', marginTop: '10px' }}>
                        <strong>Data de Entrega Prevista:</strong> 
                        {editando ? (
                            <input 
                                type="date" 
                                name="data_entrega" 
                                value={dados.data_entrega ? dados.data_entrega.split('T')[0] : ''} 
                                onChange={handleChange} 
                            />
                        ) : (
                            ` ${os.data_entrega ? new Date(os.data_entrega).toLocaleDateString('pt-BR') : 'Não informada'}`
                        )}
                    </p>

                    {editando && (
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                            <button onClick={salvarEdicao} className="btn-salvar-confirmar">Salvar Alterações</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function OrdemServico() {
    const inputBuscaRef = useRef(null);
    const [busca, setBusca] = useState('');
    const [ordens, setOrdens] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const focarInput = () => inputBuscaRef.current?.focus();

    const fetchOS = async () => {
        try {
            const response = await fetch('http://localhost:3001/ordem_servico');
            const data = await response.json();
            setOrdens(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Erro ao carregar ordens de serviço:", error);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        fetchOS();
    }, []);

    const ordensFiltradas = ordens.filter(os => {
        const termo = busca.toLowerCase();
        return (
            String(os.id_os).includes(termo) ||
            os.nome_cliente?.toLowerCase().includes(termo) ||
            String(os.id_cliente).includes(termo) ||
            os.status?.toLowerCase().includes(termo)
        );
    });

    return (
        <div className="ordem-servico-page">
            <div className="ordem-servico-container">
                <div className="titulo-ordem-servico">
                    <Image src="/ordem-servico.svg" alt="Ícone O.S." width={70} height={70} />
                    <h1 className={inter.className}>Ordem de Serviço</h1>
                </div>
            </div>

            <div className="ordem-servico-box">
                <Link href="/ordem-servico/novo">
                    <button className="btn-nova-ordem-servico">Nova O.S +</button>
                </Link>
                <div className="input-busca">
                    <Image src="/search-button-svgrepo-com.svg" alt="Busca" width={22} height={22} onClick={focarInput} style={{ cursor: 'pointer' }} />
                    <input 
                        ref={inputBuscaRef}
                        type="text" 
                        placeholder="Nº da O.S ou nome do cliente..." 
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
            </div>

            <div className="os-lista-container">
                {carregando ? (
                    <p style={{ marginLeft: '30px' }}>Carregando ordens de serviço...</p>
                ) : (
                    <>
                        <p style={{ marginLeft: '30px', marginBottom: '10px', color: '#666', fontSize: '14px' }}>
                            {ordensFiltradas.length === 1 
                                ? "Foi encontrada 1 ordem" 
                                : `Foram encontradas ${ordensFiltradas.length} ordens`}
                        </p>

                        {ordensFiltradas.map(os => (
                            <CardOS key={os.id_os} os={os} recarregar={fetchOS} />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}