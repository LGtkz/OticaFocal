'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './novo-produto.css'; 
import Image from "next/image";
import Link from 'next/link';
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["800"],
});

export default function NovoProduto() {
    const router = useRouter();
    const fileInputRef = useRef(null);
    
    // Estados para Imagem
    const [preview, setPreview] = useState(null);
    const [foto, setFoto] = useState(null);

    // Estado com os atributos exatos do seu banco de dados
    const [formData, setFormData] = useState({
        descricao: '',       // Nome do produto
        tipo: '',            // Unidade (UN/PC)
        categoria: '',
        marca: '',
        fornecedor: '',
        preco: '',           // Preço de Venda
        estoque_atual: '',   // Estoque Inicial
        preco_custo: '',     // Atributo auxiliar
        referencia: ''       // Atributo auxiliar
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        // VALIDAÇÃO: Apenas números para Estoque
        if (name === 'estoque_atual') {
            newValue = value.replace(/\D/g, '');
        }

        // VALIDAÇÃO: Preço aceita apenas números, ponto e vírgula
        if (name === 'preco' || name === 'preco_custo') {
            newValue = value.replace(/[^0-9.,]/g, '').replace(',', '.');
        }

        setFormData(prev => ({ ...prev, [name]: newValue }));
    };

    const handleSalvar = async (e) => {
        e.preventDefault();
        console.log("Produto pronto para o MySQL:", formData);
        // Aqui você chamará sua API POST futuramente
    };

    return (
        <div className="novo-produto-container">
            <div className="titulo-produtos">
                <Image src="/produto.svg" alt="Ícone de produto" width={70} height={70} />
                <h1 className={inter.className}>Novo Produto</h1>
            </div>

            <form className="np-form-card" onSubmit={handleSalvar}>
                <div className="np-section-block">
                    <h2 className="np-section-title">Principais dados</h2>
                    <div className="np-content-wrapper">
                        <div className="np-image-col">
                            <div className="np-image-upload" onClick={handleDivClick} style={{ cursor: 'pointer', overflow: 'hidden' }}>
                                {preview ? (
                                    <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <p>Clique para adicionar<br />uma imagem</p>
                                )}
                            </div>
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
                        </div>

                        <div className="np-fields-col">
                            <div className="np-input-wrapper np-span-2">
                                <label>Nome do produto*</label>
                                <input type="text" name="descricao" className="np-input" required value={formData.descricao} onChange={handleChange} />
                            </div>

                            <div className="np-input-wrapper">
                                <label>Referência*</label>
                                <input type="text" name="referencia" className="np-input" value={formData.referencia} onChange={handleChange} />
                            </div>

                            <div className="np-input-wrapper">
                                <label>Categoria</label>
                                <select name="categoria" className="np-input" value={formData.categoria} onChange={handleChange}>
                                    <option value="">Selecione</option>
                                    <option value="Solar">Solar</option>
                                    <option value="Grau">Grau</option>
                                </select>
                            </div>

                            <div className="np-input-wrapper">
                                <label>Marca</label>
                                <select name="marca" className="np-input" value={formData.marca} onChange={handleChange}>
                                    <option value="">Selecione</option>
                                    <option value="RayBan">RayBan</option>
                                    <option value="Oakley">Oakley</option>
                                </select>
                            </div>

                            <div className="np-input-wrapper">
                                <label>Unidade</label>
                                <select name="tipo" className="np-input" value={formData.tipo} onChange={handleChange}>
                                    <option value="UN">UN</option>
                                    <option value="PC">PC</option>
                                </select>
                            </div>

                            <div className="np-input-wrapper np-span-2">
                                <label>Fornecedor*</label>
                                <input type="text" name="fornecedor" className="np-input" value={formData.fornecedor} onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="np-section-block">
                    <h2 className="np-section-title">Dados de preço e estoque</h2>
                    <div className="np-preco-grid">
                        <div className="np-input-wrapper">
                            <label>Preço de Custo</label>
                            <input type="text" name="preco_custo" className="np-input" placeholder="R$ 0,00" value={formData.preco_custo} onChange={handleChange} />
                        </div>
                        <div className="np-input-wrapper">
                            <label>Preço de Venda</label>
                            <input type="text" name="preco" className="np-input" placeholder="R$ 0,00" required value={formData.preco} onChange={handleChange} />
                        </div>
                        <div className="np-input-wrapper">
                            <label>Estoque Inicial</label>
                            <input type="text" name="estoque_atual" className="np-input" placeholder="0" value={formData.estoque_atual} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="np-actions-row">
                    <button type="submit" className="np-btn-save">Salvar</button>
                    <Link href="/produtos">
                        <button type="button" className="np-btn-cancel">Cancelar</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}