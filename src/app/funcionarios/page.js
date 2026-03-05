'use client';
import React from 'react';
import Image from 'next/image';
import './novo-funcionario.css'; 

export default function NovoFuncionario() {
    return (
        <div className="nf-container">
            <div className="titulo-funcionario">
                <Image src="/Cliente.svg" alt="Ícone de Funcionários" width={70} height={70} />
                <h1>Novo Funcionário</h1>
            </div>

            <form className="nf-form-card">
                
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
                            <input type="text" name="nome" className="nf-input" required />
                        </div>
                        <div className="nf-input-wrapper">
                            <label>CPF*</label>
                            <input type="text" name="cpf" className="nf-input" placeholder="000.000.000-00" required />
                        </div>
                        <div className="nf-input-wrapper">
                            <label>Data de nascimento</label>
                            <input type="date" name="data_nascimento" className="nf-input" />
                        </div>
                        <div className="nf-input-wrapper">
                            <label>Telefone</label>
                            <input type="tel" name="telefone" className="nf-input" placeholder="(00) 00000-0000" />
                        </div>
                        
                        <div className="nf-input-wrapper nf-span-2">
                            <label>Endereço completo</label>
                            <input type="text" name="endereco" className="nf-input" placeholder="Rua, Bairro, Número, Cidade..." />
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
                        <input type="text" name="cargo" className="nf-input" placeholder="Ex: Vendedor" required />
                    </div>
                    <div className="nf-input-wrapper">
                        <label>Salário</label>
                        <input type="text" name="salario" className="nf-input" placeholder="R$ 0,00" />
                    </div>
                    <div className="nf-input-wrapper">
                        <label>Vale Alimentação?</label>
                        <select name="vale_alimentacao" className="nf-input">
                            <option value="1">Sim</option>
                            <option value="0">Não</option>
                        </select>
                    </div>
                    
                    <div className="nf-input-wrapper">
                        <label>Login de Acesso*</label>
                        <input type="text" name="login" className="nf-input" placeholder="Digite o usuário" required />
                    </div>
                    <div className="nf-input-wrapper">
                        <label>Senha*</label>
                        <input type="password" name="senha" className="nf-input" placeholder="••••••••" required />
                    </div>
                    <div className="nf-input-wrapper">
                        <label>Perfil de Acesso*</label>
                        <select name="perfil" className="nf-input" required>
                            <option value="">Selecione</option>
                            <option value="Admin">Administrador (Gestor)</option>
                            <option value="Padrao">Padrão (Vendedor)</option>
                        </select>
                    </div>
                </div>

                <div className="nf-acoes-finais">
                    <button type="submit" className="nf-btn-salvar">Salvar</button>
                    <button type="button" className="nf-btn-cancelar">Cancelar</button>
                </div>
            </form>
        </div>
    );
}