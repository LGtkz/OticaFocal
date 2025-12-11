'use client';

import './novo-produto.css'; 
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700", "800"],
});

export default function NovoProduto() {
    return (
        <div className={`np-page ${inter.className}`}>
            
           
            <div className="np-header">
                <Image src="/produto.svg" alt="Ícone"
                width={70}
                height={70} />
                <h1>Novo Produto</h1>
            </div>

            
            <div className="np-main-card">
                
                
                <div>
                    <h2 className="np-section-title">Principais dados</h2>
                    
                    <div className="np-content-wrapper">
                    
                        <div className="np-image-col">
                            <div className="np-upload-box">
                                <p>Clique para adicionar<br/>uma imagem</p>
                            </div>
                        </div>

                       
                        <div className="np-fields-col">
                            
                            <div className="np-input-group">
                                <label>Nome do produto*</label>
                                <input type="text" className="np-input" />
                            </div>
                            
                            <div className="np-input-group">
                                <label>Referência*</label>
                                <input type="text" className="np-input" />
                            </div>

                            <div className="np-input-group">
                                <label>Unidade</label>
                                <div className="np-input-combined">
                                    <select><option>UN</option></select>
                                    <button className="np-btn-plus">+</button>
                                </div>
                            </div>
                            
                            <div className="np-input-group">
                                <label>Fornecedor*</label>
                                <input type="text" className="np-input" />
                            </div>

                            <div className="np-input-group">
                                <label>Categoria</label>
                                <div className="np-input-combined">
                                    <select><option>Selecione</option></select>
                                    <button className="np-btn-plus">+</button>
                                </div>
                            </div>
                            
                            <div className="np-input-group">
                                <label>Marca</label>
                                <div className="np-input-combined">
                                    <select><option>Selecione</option></select>
                                    <button className="np-btn-plus">+</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                
                

            </div> 

        </div>
    );
}


