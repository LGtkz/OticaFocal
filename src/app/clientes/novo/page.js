'use client';
import './novo-cliente.css';
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["800"],
});

export default function NovoCliente() {
    const handleDateChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) value = value.slice(0, 8);

        if (value.length > 4) {
            value = value.replace(/(\d{2})(\d{2})(\d+)/, '$1/$2/$3');
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d+)/, '$1/$2');
        }

        e.target.value = value;
    };

    return (
        <div className="novo-cliente-container">

            <div className="titulo-clientes">
                <Image
                    src="/Cliente.svg"
                    alt="Ícone de cliente"
                    width={70}
                    height={70}
                />

                <h1 className={inter.className}>Clientes</h1>
            </div>

            <div className="nc-form-card">


                <div className="nc-section-block">
                    <h2 className="nc-section-title">Principais dados</h2>

                    <div className="nc-content-wrapper">
                        <div className="nc-image-col">
                            <div className="nc-image-upload">
                                <p>Clique para adicionar<br />uma imagem</p>
                            </div>
                        </div>

                        <div className="nc-fields-col">

                            <div className="nc-input-wrapper nc-span-2">
                                <label>Nome*</label>
                                <input type="text" className="nc-input" />
                            </div>
                            <div className="nc-input-wrapper">
                                <label>Tipo de cliente</label>
                                <select className="nc-input">
                                    <option>Não contribuinte</option>
                                    <option>Contribuinte</option>
                                </select>
                            </div>


                            <div className="nc-input-wrapper">
                                <label>CPF*</label>
                                <input type="text" className="nc-input" />
                            </div>
                            <div className="nc-input-wrapper">
                                <label>RG</label>
                                <input type="text" className="nc-input" />
                            </div>
                            <div className="nc-input-wrapper">
                                <label>Genero</label>
                                <select className="nc-input">
                                    <option>Genero</option>
                                    <option>Masculino</option>
                                    <option>Feminino</option>
                                </select>
                            </div>


                            <div className="nc-input-wrapper">
                                <label>Tipo de cliente</label>
                                <div className="nc-radio-group">
                                    <label className="nc-radio-label">
                                        <input type="radio" name="tipo_pessoa" defaultChecked />
                                        <span>Pessoa física</span>
                                    </label>
                                    <label className="nc-radio-label">
                                        <input type="radio" name="tipo_pessoa" />
                                        <span>Pessoa juridica</span>
                                    </label>
                                </div>
                            </div>
                            <div className="nc-input-wrapper">
                                <label>Data de nascimento</label>
                                <input type="text" className="nc-input" placeholder="__/__/____" onChange={handleDateChange} />
                            </div>
                            <div className="nc-input-wrapper">
                                <label>CNPJ</label>
                                <input type="text" className="nc-input" />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="nc-section-block">
                    <h2 className="nc-section-title">Endereço</h2>
                    <div className="nc-endereco-grid">

                        <div className="nc-input-wrapper">
                            <label>CEP</label>
                            <input type="text" className="nc-input" />
                        </div>
                        <div className="nc-input-wrapper">
                            <label>Endereço</label>
                            <input type="text" className="nc-input" />
                        </div>
                        <div className="nc-input-wrapper">
                            <label>Número</label>
                            <input type="text" className="nc-input" />
                        </div>
                        <div className="nc-input-wrapper">
                            <label>Bairro</label>
                            <input type="text" className="nc-input" />
                        </div>


                        <div className="nc-input-wrapper">
                            <label>Complemento</label>
                            <input type="text" className="nc-input" />
                        </div>
                        <div className="nc-input-wrapper">
                            <label>Cidade</label>
                            <input type="text" className="nc-input" />
                        </div>
                        <div className="nc-input-wrapper">
                            <label>Estado</label>
                            <input type="text" className="nc-input" />
                        </div>
                    </div>
                    <button className="nc-btn-add-endereco">Adicionar endereço</button>
                </div>


                <div className="nc-section-block">
                    <h2 className="nc-section-title">Informações de contato</h2>
                    <div className="nc-contato-grid">
                        <div className="nc-input-wrapper">
                            <label>Celular*</label>
                            <input type="text" className="nc-input" />
                        </div>
                        <div className="nc-input-wrapper">
                            <label>Email</label>
                            <input type="text" className="nc-input" />
                        </div>
                        <div className="nc-input-wrapper">
                            <label>Telefone*</label>
                            <input type="text" className="nc-input" />
                        </div>
                    </div>
                </div>


                <div className="nc-actions-row">
                    <button className="nc-btn-save">Salvar</button>
                    <button className="nc-btn-cancel">Cancelar</button>
                </div>

            </div>
        </div>



    );
}
