import Image from "next/image";
import Link from 'next/link';
import './novo-produto.css'; 

export default function NovoProduto() {
    return (
        <div className="page-produto-wrapper">

            <div className="card-branco ">
                <Image
                    src="/produto.svg" 
                    alt="Ícone de produto"
                    width={70}  
                    height={70} 
                    className="icon-titulo"
                />
                <h1>Novo Produto</h1>
            </div>

            <div className="card-branco">
                <h2>Principais dados</h2>

                <div className="form-linha">
                    <div className="input-group col-full">
                        <label>Nome do produto*</label>
                        <input type="text" />
                    </div>

                    <div className="input-group col-media">
                        <label>Referência*</label>
                        <input type="text" />
                    </div>

                    <div className="input-group col-media">
                        <label>Categoria</label>
                        <div className="select-com-botao">
                            <select><option>Selecione</option></select>
                            <button className="btn-adicionar">+</button>
                        </div>
                    </div>

                    <div className="input-group col-media">
                        <label>Marca</label>
                        <div className="select-com-botao">
                            <select><option>Selecione</option></select>
                            <button className="btn-adicionar">+</button>
                        </div>
                    </div>
                </div>

                <div className="form-linha">
                    <div className="input-group col-curta">
                        <label>Unidade</label>
                        <div className="select-com-botao">
                            <select><option>UN</option></select>
                            <button className="btn-adicionar">+</button>
                        </div>
                    </div>

                    <div className="input-group col-media">
                        <label>Fornecedor*</label>
                        <input type="text" />
                    </div>
                </div>
            </div>

            <div className="card-branco">
                <h2>Dados de preço e estoque</h2>

                <table className="tabela-custom">
                    <thead>
                        <tr>
                            <th style={{ width: '50px' }}>Ativar</th>
                            <th>Ótica</th>
                            <th>Custo</th>
                            <th>Venda</th>
                            <th>Estoque</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'center' }}>
                                <input type="checkbox" defaultChecked />
                            </td>
                            <td>Ótica Marata</td>
                            <td>
                                <div className="input-moeda">
                                    <span className="simbolo">R$</span>
                                    <input type="text" className="input-sem-borda" />
                                </div>
                            </td>
                            <td>
                                <div className="input-moeda">
                                    <span className="simbolo">R$</span>
                                    <input type="text" className="input-sem-borda" />
                                </div>
                            </td>
                            <td>
                                <div className="input-moeda">
                                    <input type="text" className="input-sem-borda" placeholder="Estoque" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="card-branco">
                <h2>Informações para emissão de NFe e NFCe</h2>
                <div className="form-linha">
                    <div className="input-group col-full">
                        <label>NCM</label>
                        <input type="text" />
                    </div>
                    <div className="input-group col-full">
                        <label>Origem da mercadoria</label>
                        <input type="text" />
                    </div>
                </div>
            </div>

            <div className="card-branco">
                <h2>Imagem do produto</h2>
                <div className="area-upload">
                    <p>Clique para adicionar<br />uma imagem</p>
                </div>
            </div>

            <div className="area-botoes">
                <button className="btn-salvar-final">Salvar</button>
                <Link href="/produtos">
                    <button className="btn-cancelar-final">Cancelar</button>
                </Link>
            </div>

        </div>
    );
}