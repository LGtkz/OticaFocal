'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './novo-cliente.css';
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["800"],
});

// Sua função de validação de CPF integrada
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    for (let t = 9; t < 11; t++) {
        let soma = 0;
        for (let i = 0; i < t; i++) soma += parseInt(cpf[i]) * (t + 1 - i);
        let digito = (soma * 10) % 11;
        if (digito === 10 || digito === 11) digito = 0;
        if (digito !== parseInt(cpf[t])) return false;
    }
    return true;
}

export default function NovoCliente() {
    const router = useRouter();
    const fileInputRef = useRef(null);
    
    // Estados para imagem
    const [preview, setPreview] = useState(null);
    const [foto, setFoto] = useState(null);

    // Estado com os atributos da sua tabela Cliente
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        genero: '',
        data_nascimento: '',
        email: '',
        endereco: '',
        numero: '',
        bairro: '',
        complemento: '',
        cidade: '',
        estado: '',
        telefone: ''
    });

    // Manipulação da Imagem
    const handleDivClick = () => fileInputRef.current.click();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFoto(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    // Máscaras e Validações de entrada
    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        // Regra: Apenas números para campo Número
        if (name === 'numero') newValue = value.replace(/\D/g, '');

        // Regra: Apenas letras para Nome, Bairro, Cidade e Estado
        if (['nome', 'bairro', 'cidade', 'estado'].includes(name)) {
            newValue = value.replace(/[0-9]/g, '');
        }

        // Máscara de CPF
        if (name === 'cpf') {
            newValue = value
                .replace(/\D/g, '')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                .replace(/(-\d{2})\d+?$/, '$1');
        }

        // Máscara de Data de Nascimento
        if (name === 'data_nascimento') {
            newValue = value
                .replace(/\D/g, '')
                .replace(/(\d{2})(\d)/, '$1/$2')
                .replace(/(\d{2})(\d)/, '$1/$2')
                .replace(/(\d{4})\d+?$/, '$1');
        }

        // UF limitada a 2 letras
        if (name === 'estado') newValue = newValue.toUpperCase().substring(0, 2);

        setFormData(prev => ({ ...prev, [name]: newValue }));
    };

    const handleSalvar = async (e) => {
        e.preventDefault();
        
        if (!validarCPF(formData.cpf)) {
            alert("CPF inválido! Por favor, verifique.");
            return;
        }

        console.log("Dados prontos para o banco:", formData);
        console.log("Arquivo de imagem:", foto);
        // Aqui você faria o fetch para sua rota de API
    };

    return (
        <div className="novo-cliente-container">
            <div className="titulo-clientes">
                <Image src="/Cliente.svg" alt="Ícone de cliente" width={70} height={70} />
                <h1 className={inter.className}>Clientes</h1>
            </div>

            <form className="nc-form-card" onSubmit={handleSalvar}>
                <div className="nc-section-block">
                    <h2 className="nc-section-title">Principais dados</h2>
                    <div className="nc-content-wrapper">
                        <div className="nc-image-col">
                            <div className="nc-image-upload" onClick={handleDivClick} style={{ cursor: 'pointer', overflow: 'hidden' }}>
                                {preview ? (
                                    <img src={preview} alt="Foto do cliente" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <p>Clique para adicionar<br />uma imagem</p>
                                )}
                            </div>
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
                        </div>

                        <div className="nc-fields-col">
                            <div className="nc-input-wrapper nc-span-2">
                                <label>Nome*</label>
                                <input type="text" name="nome" className="nc-input" value={formData.nome} onChange={handleChange} required />
                            </div>
                            <div className="nc-input-wrapper">
                                <label>Gênero</label>
                                <select name="genero" className="nc-input" value={formData.genero} onChange={handleChange}>
                                    <option value="">Selecione</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                </select>
                            </div>
                            <div className="nc-input-wrapper">
                                <label>CPF*</label>
                                <input type="text" name="cpf" className="nc-input" value={formData.cpf} onChange={handleChange} required placeholder="000.000.000-00" />
                            </div>
                            <div className="nc-input-wrapper">
                                <label>Data de nascimento</label>
                                <input type="text" name="data_nascimento" className="nc-input" placeholder="DD/MM/AAAA" value={formData.data_nascimento} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="nc-section-block">
                    <h2 className="nc-section-title">Endereço</h2>
                    <div className="nc-endereco-grid">
                        <div className="nc-input-wrapper nc-span-2">
                            <label>Endereço</label>
                            <input type="text" name="endereco" className="nc-input" value={formData.endereco} onChange={handleChange} />
                        </div>
                        <div className="nc-input-wrapper">
                            <label>Número</label>
                            <input type="text" name="numero" className="nc-input" value={formData.numero} onChange={handleChange} />
                        </div>
                        <div className="nc-input-wrapper">
                            <label>Bairro</label>
                            <input type="text" name="bairro" className="nc-input" value={formData.bairro} onChange={handleChange} />
                        </div>
                        <div className="nc-input-wrapper">
                            <label>Complemento</label>
                            <input type="text" name="complemento" className="nc-input" value={formData.complemento} onChange={handleChange} />
                        </div>
                        <div className="nc-input-wrapper">
                            <label>Cidade</label>
                            <input type="text" name="cidade" className="nc-input" value={formData.cidade} onChange={handleChange} />
                        </div>
                        <div className="nc-input-wrapper">
                            <label>Estado</label>
                            <input type="text" name="estado" className="nc-input" value={formData.estado} onChange={handleChange} maxLength="2" placeholder="UF" />
                        </div>
                    </div>
                </div>

                <div className="nc-section-block">
                    <h2 className="nc-section-title">Informações de contato</h2>
                    <div className="nc-contato-grid">
                        <div className="nc-input-wrapper">
                            <label>Telefone*</label>
                            <input type="text" name="telefone" className="nc-input" value={formData.telefone} onChange={handleChange} required />
                        </div>
                        <div className="nc-input-wrapper nc-span-2">
                            <label>Email</label>
                            <input type="email" name="email" className="nc-input" value={formData.email} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="nc-actions-row">
                    <button type="submit" className="nc-btn-save">Salvar</button>
                    <button type="button" className="nc-btn-cancel" onClick={() => router.back()}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}