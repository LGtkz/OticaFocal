'use client';
import './novo-os.css';
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700", "800"],
});

export default function NovaOS() {
    return (
        <div className={`nos-container ${inter.className}`}>

            
            <div className="titulo-os">
                <Image
                    src="/ordem-servico.svg"
                    alt="Ícone de Ordem de Serviço"
                    width={70}
                    height={70}
                />
                <h1>Ordem de serviço</h1>
            </div>

            
            <div className="nos-form-card">{/* card principal branco */}

                
                <div className="nos-grid">

                    
                    <div className="nos-input-wrapper">
                        <label>Pesquisar cliente*</label>
                        <div className="nos-input-group">
                            <input type="text" />
                            <button type="button">▼</button>
                        </div>
                    </div>

                    <div className="nos-input-wrapper">
                        <label>Data de registro*</label>
                        <input type="text" className="nos-input" placeholder="__/__/____" />
                    </div>

                    <div className="nos-input-wrapper">
                        <label>Data de entrega*</label>
                        <input type="text" className="nos-input" placeholder="__/__/____" />
                    </div>

                    <div className="nos-input-wrapper">
                        <label>Funcionário*</label>
                        <div className="nos-input-group">
                            <select>
                                <option></option>
                            </select>
                            <button type="button">▼</button>
                        </div>
                    </div>

                    
                    <div className="nos-input-wrapper">
                        <label>Produtos/Serviços</label>
                        <div className="nos-input-group">
                            <input type="text" />
                            <button type="button">+</button>
                        </div>
                    </div>

                    <div className="nos-input-wrapper">
                        <label>Valor unitário</label>
                        <div className="nos-input-moeda">
                            <span>R$</span>
                            <input type="text" />
                        </div>
                    </div>

                    <div className="nos-input-wrapper">
                        <label>Quantidade*</label>
                        <div className="nos-input-group">
                            <input type="number" />
                            <button type="button">+</button>
                        </div>
                    </div>

                    <div className="nos-input-wrapper">
                        <label>Valor total</label>
                        <div className="nos-input-moeda">
                            <span>R$</span>
                            <input type="text" readOnly />
                        </div>
                    </div>

                </div>

                
                <div className="nos-btn-container">
                    <button className="nos-btn-incluir">
                        Incluir
                    </button>
                </div>

                
                <div className="nos-receita">
                    
                    <h2>Receita</h2>

                    
                    <div className="nos-receita-top">
                        <div className="nos-receita-radio-box">
                            <label className="nos-receita-label-principal">Cliente possui receita</label>
                            <div className="nos-radio-group">
                                <label>
                                    <input type="radio" name="receita" /> Sim
                                </label>
                                <label>
                                    <input type="radio" name="receita" /> Não
                                </label>
                            </div>
                        </div>

                        <button className="nos-btn-secundario">
                            Anexar receita
                        </button>
                    </div>

                    
                    <div className="nos-receita-tabelas">
                        
                        
                        <table className="receita-table">
                            <thead>
                                <tr>
                                    <th colSpan="2" style={{ border: 'none' }}></th>
                                    <th>Esférico</th>
                                    <th>Cilíndrico</th>
                                    <th>Eixo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td rowSpan="2" className="cell-header">Longe</td>
                                    <td className="cell-header">OD</td>
                                    <td><input type="text" /></td>
                                    <td><input type="text" /></td>
                                    <td><input type="text" /></td>
                                </tr>
                                <tr>
                                    <td className="cell-header">OE</td>
                                    <td><input type="text" /></td>
                                    <td><input type="text" /></td>
                                    <td><input type="text" /></td>
                                </tr>
                            </tbody>
                        </table>

                        
                        <table className="receita-table">
                            <thead>
                                <tr>
                                    <th colSpan="2" style={{ border: 'none' }}></th>
                                    <th>Esférico</th>
                                    <th>Cilíndrico</th>
                                    <th>Eixo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td rowSpan="2" className="cell-header">Longe</td>
                                    <td className="cell-header">OD</td>
                                    <td><input type="text" /></td>
                                    <td><input type="text" /></td>
                                    <td><input type="text" /></td>
                                </tr>
                                <tr>
                                    <td className="cell-header">OE</td>
                                    <td><input type="text" /></td>
                                    <td><input type="text" /></td>
                                    <td><input type="text" /></td>
                                </tr>
                                <tr>
                                    
                                    <td style={{ border: 'none' }}></td>
                                    <td className="cell-header">Adição</td>
                                    <td><input type="text" /></td>
                                    <td colSpan="2" style={{ border: 'none' }}></td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>

            {/* fim do card principal */}
            </div> 

        </div>
    );
}