'use client';

import './novo-produto.css'; 
import Image from "next/image";
import Link from 'next/link';
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["800"],
});

export default function NovoProduto() {
    return (
        <div className="novo-produto-container">
            
            <div className="titulo-produtos">
                <Image
                    src="/produto.svg"
                    alt="Ícone de produto"
                    width={70}
                    height={70}
                />
                <h1 className={inter.className}>Novo Produto</h1>
            </div>

            <div className="np-form-card">

                <div className="np-section-block">
                    <h2 className="np-section-title">Principais dados</h2>

                    <div className="np-content-wrapper">
                        <div className="np-image-col">
                            <div className="np-image-upload">
                                <p>Clique para adicionar<br />uma imagem</p>
                            </div>
                        </div>

                        <div className="np-fields-col">
                            
                            <div className="np-input-wrapper np-span-2">
                                <label>Nome do produto*</label>
                                <input type="text" className="np-input" />
                            </div>

                            <div className="np-input-wrapper">
                                <label>Referência*</label>
                                <input type="text" className="np-input" />
                            </div>

                            <div className="np-input-wrapper">
                                <label>Categoria</label>
                                <select className="np-input">
                                    <option>Selecione</option>
                                    <option>Solar</option>
                                    <option>Grau</option>
                                </select>
                            </div>

                            <div className="np-input-wrapper">
                                <label>Marca</label>
                                <select className="np-input">
                                    <option>Selecione</option>
                                    <option>RayBan</option>
                                    <option>Oakley</option>
                                </select>
                            </div>

                            <div className="np-input-wrapper">
                                <label>Unidade</label>
                                <select className="np-input">
                                    <option>UN</option>
                                    <option>PC</option>
                                </select>
                            </div>

                            <div className="np-input-wrapper np-span-2">
                                <label>Fornecedor*</label>
                                <input type="text" className="np-input" />
                            </div>

                            <div className="np-input-wrapper">
                                <label>Status</label>
                                <div className="np-radio-group">
                                    <label className="np-radio-label">
                                        <input type="checkbox" defaultChecked />
                                        <span>Ativar produto</span>
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="np-section-block">
                    <h2 className="np-section-title">Dados de preço e estoque</h2>
                    
                    <div className="np-preco-grid">
                        <div className="np-input-wrapper">
                            <label>Ótica</label>
                            <input type="text" className="np-input" placeholder="Ex: Ótica Marata" />
                        </div>
                        <div className="np-input-wrapper">
                            <label>Preço de Custo</label>
                            <input type="text" className="np-input" placeholder="R$ 0,00" />
                        </div>
                        <div className="np-input-wrapper">
                            <label>Preço de Venda</label>
                            <input type="text" className="np-input" placeholder="R$ 0,00" />
                        </div>
                        <div className="np-input-wrapper">
                            <label>Estoque Inicial</label>
                            <input type="number" className="np-input" placeholder="0" />
                        </div>
                    </div>
                </div>

            
                <div className="np-actions-row">
                    <button className="np-btn-save">Salvar</button>
                    <Link href="/produtos">
                        <button className="np-btn-cancel">Cancelar</button>
                    </Link>
                </div>

            </div>
        </div>
    );
}