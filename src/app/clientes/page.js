"use client";

import { useState, useEffect } from 'react';
import './clientes.css';
import Link from 'next/link';
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["800"] });

function CardCliente({ cliente, recarregar }) {
    const [aberto, setAberto] = useState(false);
    const [editando, setEditando] = useState(false);
    const [dados, setDados] = useState({ ...cliente });

    // Sincroniza os dados caso a lista principal mude
    useEffect(() => {
        setDados({ ...cliente });
    }, [cliente]);

    const handleToggle = (e) => {
        e.preventDefault();
        setAberto(!aberto);
        // Se fechar o card, cancelamos a edição para não bugar a interface
        if (editando) setEditando(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDados(prev => ({ ...prev, [name]: value }));
    };

    const salvarEdicao = async () => {
        try {
            const response = await fetch(`http://localhost:3001/cliente/${cliente.id_cliente}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            if (response.ok) {
                alert("Cadastro atualizado com sucesso!");
                setEditando(false);
                recarregar(); 
            } else {
                const erro = await response.json();
                alert(`Erro ao atualizar: ${erro.error}`);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    return (
        <div className={`cliente-card ${aberto ? 'card-aberto' : ''}`}>
            <div className="cliente-card-header">
                <div className="cliente-info-principal">
                    {editando ? (
                        <input name="nome" value={dados.nome} onChange={handleChange} className="input-inline" placeholder="Nome" />
                    ) : (
                        <h2>{cliente.nome}</h2>
                    )}
                    <p>CPF: {cliente.cpf}</p>
                </div>

                <div className="cliente-info-secundaria">
                    {editando ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <input name="telefone" value={dados.telefone} onChange={handleChange} className="input-inline" placeholder="Telefone" />
                            <input name="email" value={dados.email} onChange={handleChange} className="input-inline" placeholder="E-mail" />
                        </div>
                    ) : (
                        <>
                            <p>Tel: {cliente.telefone || "(34) 99999-9999"}</p>
                            <p>Email: {cliente.email || "exemplo@gmail.com"}</p>
                        </>
                    )}
                </div>

                <div className="cliente-acoes">
                    <button 
                        type="button" 
                        className="btn-editar-inline" 
                        onClick={() => {
                            setEditando(!editando);
                            if (!aberto) setAberto(true);
                        }}
                        title={editando ? "Cancelar" : "Editar"}
                    >
                        {editando ? "✖" : "✏️"}
                    </button>
                    
                    <button type="button" className="btn-receita" onClick={handleToggle}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ transform: aberto ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }}>
                            <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            {aberto && (
                <div className="cliente-detalhes-extra">
                    <div className="divisor-card"></div>
                    <div className="grid-detalhes">
                        <div>
                            <p><strong>Gênero:</strong> 
                                {editando ? (
                                    <select name="Genero" value={dados.Genero} onChange={handleChange} className="input-inline">
                                        <option value="Masculino">Masculino</option>
                                        <option value="Feminino">Feminino</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                ) : cliente.Genero || '-'}</p>
                            <p><strong>Bairro:</strong> 
                                {editando ? (
                                    <input name="Bairro" value={dados.Bairro} onChange={handleChange} className="input-inline" />
                                ) : cliente.Bairro || '-'}</p>
                        </div>
                        <div>
                            <p><strong>Endereço:</strong> 
                                {editando ? (
                                    <input name="endereco" value={dados.endereco} onChange={handleChange} className="input-inline" />
                                ) : cliente.endereco || '-'}</p>
                            <p><strong>Número:</strong> 
                                {editando ? (
                                    <input name="numero" value={dados.numero} onChange={handleChange} className="input-inline" />
                                ) : cliente.numero || 'S/N'}</p>
                        </div>
                    </div>
                    
                    {/* BOTÃO SALVAR APARECE AQUI QUANDO ESTIVER EDITANDO */}
                    {editando && (
                        <div className="area-salvar">
                            <button type="button" onClick={salvarEdicao} className="btn-salvar-confirmar">
                                Salvar Alterações
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function Cliente() {
    const [busca, setBusca] = useState('');
    const [clientes, setClientes] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const fetchClientes = async () => {
        try {
            const response = await fetch('http://localhost:3001/cliente');
            const data = await response.json();
            setClientes(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
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
                        <CardCliente key={cliente.id_cliente} cliente={cliente} recarregar={fetchClientes} />
                    ))
                )}
            </div>
        </div>
    );
}