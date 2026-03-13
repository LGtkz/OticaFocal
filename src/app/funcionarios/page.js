'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import './novo-funcionario.css'; 

export default function NovoFuncionario() {
    const router = useRouter();

    // 1. Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        DataNasc: '',
        telefone: '',
        endereco: '',
        cargo: '',
        salario: '',
        login: '',
        senha: '',
        perfil: ''
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if(user.perfil !== 'Admin') {
            alert('Acesso negado. Apenas administradores podem acessar esta página.');
            router.push('/'); 
        }
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dadosParaEnviar = {
            ...formData,
            salario: parseFloat(formData.salario.replace('R$', '').replace('.', '').replace(',', '.')) || 0
        };

        try {
            const response = await fetch('http://localhost:3001/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosParaEnviar),
            });

            if (response.ok) {
                alert('Funcionário cadastrado com sucesso!');
                router.push('/funcionarios'); // Redireciona para a lista
            } else {
                const erro = await response.json();
                alert(`Erro ao cadastrar: ${erro.error || 'Verifique se o CPF ou Login já existem.'}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro de conexão com a API. Verifique se o servidor está rodando na porta 3001.');
        }
    };

    return (
        <div className="nf-container">
            <div className="titulo-funcionario">
                <Image src="/Cliente.svg" alt="Ícone de Funcionários" width={70} height={70} />
                <h1>Novo Funcionário</h1>
            </div>

            <form className="nf-form-card" onSubmit={handleSubmit}>
                
                <div className="nf-titulo">
                    <h2>Dados pessoais</h2>
                </div>
                
                <div className="nf-content-wrapper">
                    <div className="nf-image-col">
                        <div className="nf-foto-upload">
                            <span>Clique para adicionar<br/>uma imagem</span>
                            <input type="file" accept="image/*" style={{ display: 'none' }} />
                        </div>
                    </div>

                    <div className="nf-fields-col">
                        <div className="nf-input-wrapper">
                            <label>Nome completo*</label>
                            <input 
                                type="text" name="nome" className="nf-input" required 
                                value={formData.nome} onChange={handleChange} 
                            />
                        </div>
                        <div className="nf-input-wrapper">
                            <label>CPF*</label>
                            <input 
                                type="text" name="cpf" className="nf-input" placeholder="000.000.000-00" required 
                                value={formData.cpf} onChange={handleChange}
                            />
                        </div>
                        <div className="nf-input-wrapper">
                            <label>Data de nascimento</label>
                            <input 
                                type="date" name="DataNasc" className="nf-input" 
                                value={formData.DataNasc} onChange={handleChange}
                            />
                        </div>
                        <div className="nf-input-wrapper">
                            <label>Telefone</label>
                            <input 
                                type="tel" name="telefone" className="nf-input" placeholder="(00) 00000-0000" 
                                value={formData.telefone} onChange={handleChange}
                            />
                        </div>
                        
                        <div className="nf-input-wrapper nf-span-2">
                            <label>Endereço completo</label>
                            <input 
                                type="text" name="endereco" className="nf-input" placeholder="Rua, Bairro, Número, Cidade..." 
                                value={formData.endereco} onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <hr style={{ border: '0.5px solid #e5e7eb', marginBottom: '40px' }} />

                <div className="nf-titulo">
                    <h2>Contrato e acesso</h2>
                </div>

                <div className="nf-fields-col">
                    <div className="nf-input-wrapper">
                        <label>Cargo*</label>
                        <input 
                            type="text" name="cargo" className="nf-input" placeholder="Ex: Vendedor" required 
                            value={formData.cargo} onChange={handleChange}
                        />
                    </div>
                    <div className="nf-input-wrapper">
                        <label>Salário</label>
                        <input 
                            type="text" name="salario" className="nf-input" placeholder="R$ 0,00" 
                            value={formData.salario} onChange={handleChange}
                        />
                    </div>
                    <div className="nf-input-wrapper">
                        <label>Login de Acesso*</label>
                        <input 
                            type="text" name="login" className="nf-input" placeholder="Digite o usuário" required 
                            value={formData.login} onChange={handleChange}
                        />
                    </div>
                    <div className="nf-input-wrapper">
                        <label>Senha*</label>
                        <input 
                            type="password" name="senha" className="nf-input" placeholder="••••••••" required 
                            value={formData.senha} onChange={handleChange}
                        />
                    </div>
                    <div className="nf-input-wrapper">
                        <label>Perfil de Acesso*</label>
                        <select 
                            name="perfil" className="nf-input" required 
                            value={formData.perfil} onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            <option value="Admin">Administrador (Gestor)</option>
                            <option value="Padrao">Padrão (Vendedor)</option>
                        </select>
                    </div>
                </div>

                <div className="nf-acoes-finais">
                    <button type="submit" className="nf-btn-salvar">Salvar</button>
                    <button type="button" className="nf-btn-cancelar" onClick={() => router.back()}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}