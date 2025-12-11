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
        <div className='cadastra-cliente' >
            <div className={'clientes-page'}>
                <Image
                    src="/Cliente.svg"
                    alt="Ícone de Clientes"
                    width={48}
                    height={48}
                />
                <h1 className="titulo-clientes">Novo cliente</h1>
            </div>
            <div className='form-cliente'>
                <h2>Principais dados</h2>
                <div className='form-grupo'>
                    <div className='input-imagem'>
                        <label htmlFor='imagem' className='input-imagem-label'>Clique para adicionar uma imagem</label>
                        <input type="file" id='imagem' name='imagem' accept='image/*'></input>
                    </div>
                    <div className='input-texto'>
                        <div className='label-nome'>
                            <label htmlFor='nome-cliente'>Nome completo*</label>
                            <input type='text' id='nome-cliente' name='nome-cliente' required></input>
                        </div>
                        <div className='label-tipo-cliente'>
                            <label htmlFor='tipo-cliente'>Tipo de cliente</label>
                            <select id='tipo-cliente' name='tipo cliente'>
                                <option value="contribuinte">Contribuinte</option>
                                <option value="nao-contribuinte">Não contribuinte</option>
                            </select>
                        </div>
                        <div className='label-tipo-pessoa'>
                            <label htmlFor='tipo-pessoa'>Tipo de pessoa</label>
                            <select id='tipo-pessoa' name='tipo-pessoa'>
                                <option value="fisica">Física</option>
                                <option value="juridica">Jurídica</option>
                            </select>
                        </div>
                        <div className='label-cpf'>
                            <label htmlFor='cpf-cliente'>CPF*</label>
                            <input type='text' id='cpf-cliente' name='cpf-cliente' maxLength={14} placeholder="000.000.000-00" required></input>
                        </div>
                        <div className='label-genero'>
                            <label htmlFor='genero'>Gênero</label>
                            <select id='genero' name='genero'>
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                                <option value="outro">Outro</option>
                            </select>
                        </div>
                        <div className='label-data-nascimento'>
                            <label htmlFor='data-nascimento'>Data de nascimento</label>
                            <input type='text' id='data-nascimento' name='data-nascimento' maxLength={10} placeholder="DD/MM/AAAA" onChange={handleDateChange}></input>
                        </div>
                        <div className='label-cnpj'>
                            <label htmlFor='cnpj-cliente'>CNPJ</label>
                            <input type='text' id='cnpj-cliente' name='cnpj-cliente' maxLength={18} placeholder="00.000.000/0000-00"></input>
                        </div>
                    </div>
                </div>
                <div className='form-endereco'>
                    <h2>Endereço</h2>
                    <div className='form-grupo-endereco'>
                        <div className='label-cep'>
                            <label htmlFor='cep'>CEP</label>
                            <input type='text' id='cep' name='cep' maxLength={9} placeholder="00000-000"></input>
                        </div>
                        <div className='label-endereco'>
                            <label htmlFor='endereco'>Endereço</label>
                            <input type='text' id='endereco' name='endereco'></input>
                        </div>
                        <div className='label-numero'>
                            <label htmlFor='numero'>Número</label>
                            <input type='text' id='numero' name='numero'></input>
                        </div>
                        <div className='label-bairro'>
                            <label htmlFor='bairro'>Bairro</label>
                            <input type='text' id='bairro' name='bairro'></input>
                        </div>
                        <div className='label-complemento'>
                            <label htmlFor='complemento'>Complemento</label>
                            <input type='text' id='complemento' name='complemento'></input>
                        </div>
                        <div className='label-cidade'>
                            <label htmlFor='cidade'>Cidade</label>
                            <input type='text' id='cidade' name='cidade'></input>
                        </div>
                        <div className='label-estado'>
                            <label htmlFor='estado'>Estado</label>
                            <input type='text' id='estado' name='estado'></input>
                        </div>
                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className='form-contato'>
                    <h2>Contato</h2>
                    <div className='form-grupo-contato'>
                        <div className='label-telefone'>
                            <label htmlFor='telefone'>Telefone</label>
                            <input type='text' id='telefone' name='telefone' maxLength={15} placeholder="(00)00000-0000"></input>
                        </div>
                        <div className='label-email'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' id='email' name='email'></input>
                        </div>
                    </div>
                </div>
                <div className='form-botoes'>
                    <button className='botao-cancelar' type='reset'>Cancelar</button>
                    <button className='botao-salvar' type='submit'>Salvar</button>
                </div>
            </div>
        </div >
    );
}

