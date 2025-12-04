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
        <div className="novo-cliente-page">
            <div className="novo-cliente-container">
                <div className="titulo-novo-cliente">
                    <Image
                        src="/Cliente.svg"
                        alt="Ícone de cliente"
                        width={70}
                        height={70}
                    />
                    <h1 className={inter.className}>Novo cliente</h1>
                </div>
            </div>

            <div className="form-container">
                <h2>Principais dados</h2>

                <div className="form-content">
                    <div className="image-upload-placeholder">
                        Clique para adicionar uma imagem
                    </div>

                    <div className="form-fields">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Nome*</label>
                                <input type="text" className="input-nome" />
                            </div>

                            <div className="form-group">
                                <label>Tipo de cliente</label>
                                <div className="radio-group">
                                    <label><input type="radio" name="tipo_pessoa" /> Pessoa Física</label>
                                    <label><input type="radio" name="tipo_pessoa" /> Pessoa Jurídica</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Tipo de cliente</label>
                                <input type="text" placeholder="Não contribuinte" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>CPF*</label>
                                <input type="text" className="input-cpf" />
                            </div>

                            <div className="form-group">
                                <label>RG*</label>
                                <input type="text" className="input-rg" />
                            </div>

                            <div className="form-group">
                                <label>Data de nascimento</label>
                                <input
                                    type="text"
                                    placeholder="__/__/____"
                                    className="input-data"
                                    onChange={handleDateChange}
                                    maxLength={10}
                                />
                            </div>

                            <div className="form-group">
                                <label>Gênero</label>
                                <input type="text" placeholder="Genero" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-container">
                <h2>Endereço</h2>
                <div className="form-content-full">
                    <div className="form-row">
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>CEP</label>
                            <input type="text" className="input-cep" />
                        </div>
                        <div className="form-group" style={{ flex: 3 }}>
                            <label>Endereço</label>
                            <input type="text" className="input-endereco" />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Número</label>
                            <input type="text" className="input-numero" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Bairro</label>
                            <input type="text" className="input-bairro" />
                        </div>
                        <div className="form-group">
                            <label>Estado</label>
                            <input type="text" className="input-estado" />
                        </div>
                        <div className="form-group">
                            <label>Cidade</label>
                            <input type="text" className="input-cidade" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-container">
                <h2>Informações de contato</h2>
                <div className="form-content-full">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Celular*</label>
                            <input type="text" className="input-celular" />
                        </div>
                        <div className="form-group">
                            <label>Telefone*</label>
                            <input type="text" className="input-telefone" />
                        </div>
                        <div className="form-group" style={{ flex: 2 }}>
                            <label>Email</label>
                            <input type="email" className="input-email" />
                        </div>
                    </div>
                </div>
            </div>


            <div class="botoes-container">
                <button class="btn-acao btn-cancelar">Cancelar</button>
                <button class="btn-acao btn-salvar">Salvar</button>
            </div>
        </div>
    );
}

