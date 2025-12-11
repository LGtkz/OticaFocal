'use client';

import './configuracoes.css'; 
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["800"],
});

export default function Configuracoes() {
    return (
        <div className="cfg-page">
            
            <div className="cfg-header-container">
                <div className="cfg-titulo-header">
                    <Image src="/Group.svg"
                     alt="Ícone Configurações"
                      width={70} 
                      height={70} /> 
                    <h1 className={inter.className}>Configurações</h1>
                </div>
            </div>

            
            <div className="cfg-form-container">
                <h2>Logotipo da ótica</h2>

                <div className="cfg-logo-section">
                    <div className="cfg-box-upload">
                        Clique para adicionar<br/>uma imagem
                    </div>

                    <div className="cfg-input-wrapper">
                        <label>Nome</label>
                        <input type="text" className="cfg-input-padrao" />
                    </div>

                </div>
            </div>

        
            <div className="cfg-botoes-container">
                <button className="cfg-btn-acao cfg-btn-salvar">Salvar</button>
                <button className="cfg-btn-acao cfg-btn-cancelar">Cancelar</button>
            </div>

        </div>
    );
}