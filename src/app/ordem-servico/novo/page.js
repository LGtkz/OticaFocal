'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './novo-os.css';
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700", "800"],
});

export default function NovaOS() {
    const router = useRouter();

    // ESTADO GIGANTE PARA ARMAZENAR TODA A O.S.
    const [formData, setFormData] = useState({
        // Dados Principais
        id_cliente: '', // Idealmente, a busca preencheria o ID aqui
        id_produto: '',
        data_abertura: '',
        data_entrega: '',
        id_usuario_abertura: '',
        // // Item (Para o botão Incluir)
        // produto_servico: '',
        valor_entrada: '',
        // quantidade: '',
        valor_total: '',

        // // Receita
        // possui_receita: '',
        // receita_longe_od_esf: '', receita_longe_od_cil: '', receita_longe_od_eixo: '',
        // receita_longe_oe_esf: '', receita_longe_oe_cil: '', receita_longe_oe_eixo: '',
        // receita_adicao: '',

        // // Lente
        // tipo_lente: '',
        // material: '',
        // coloracao: '',
        // tratamento: '',
        // local_montagem: '',

        // // Armação
        // segue_armacao: '',
        // armacao_propria: '',
        // tipo_armacao: '',

        // // Observação
        observacao: ''
    });

    // FUNÇÃO GENÉRICA DE ATUALIZAÇÃO
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => {
            const newData = { ...prev, [name]: value };

            // Cálculo automático do Valor Total
            if (name === 'valor_entrada' || name === 'quantidade') {
                const preco = parseFloat(newData.valor_entrada.replace(',', '.')) || 0;
                const qtd = parseInt(newData.quantidade) || 0;
                newData.valor_total = (preco * qtd).toFixed(2);
            }

            return newData;
        });
    };

    // MÁSCARA PARA DATAS
    const handleDateChange = (e) => {
        const { name } = e.target;
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) value = value.slice(0, 8);
        if (value.length > 4) value = value.replace(/(\d{2})(\d{2})(\d+)/, '$1/$2/$3');
        else if (value.length > 2) value = value.replace(/(\d{2})(\d+)/, '$1/$2');

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // FUNÇÃO PARA ENVIAR PARA A API
    const handleSalvar = async (e) => {
        e.preventDefault();

        let dataParaEnviar = { ...formData };
        if (formData.data_abertura) {
            const partes = formData.data_abertura.split('/');
            if (partes.length === 3) {
                // CORREÇÃO: Uso de crases para Template String
                dataParaEnviar.data_abertura = `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
            }
        }

        // Veja no console do navegador (F12) o JSON completinho!
        console.log("JSON da O.S. pronto para envio:", JSON.stringify(dataParaEnviar, null, 2));

         // COMO ISSO VAI FUNCIONAR COM SUA API NO FUTURO:
        // Como a O.S. afeta várias tabelas, o ideal é enviar para uma rota customizada.
        try {
            const response = await fetch('http://localhost:3001/ordem_servico', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataParaEnviar)
            });

            if (response.ok) {
                alert('Ordem de Serviço criada!');
                router.push('/ordem-servico');
            } else {
                const erro = await response.json();
                // CORREÇÃO: Uso de crases para o erro dinâmico
                alert(`Erro ao salvar: ${erro.error || 'Verifique os dados enviados.'}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        // CORREÇÃO: Uso de crases para interpolação de classes CSS
        <div className={`nos-container ${inter.className}`}>
            <div className="titulo-os">
                <Image src="/ordem-servico.svg" alt="Ícone de Ordem de Serviço" width={70} height={70} />
                <h1>Ordem de serviço</h1>
            </div>

            <form className="nos-form-card" onSubmit={handleSalvar}>

                {/* 1. PRINCIPAIS DADOS */}
                <div className="nos-grid">
                    <div className="nos-input-wrapper">
                        <label>Pesquisar cliente (ID)*</label>
                        {/* Veja que adicionei o className="nos-input" aqui */}
                        <input type="text" name="id_cliente" className="nos-input" value={formData.id_cliente} onChange={handleChange} required />
                    </div>

                    <div className="nos-input-wrapper">
                        <label>Data de registro*</label>
                        <input type="text" name="data_abertura" className="nos-input" placeholder="_//_" value={formData.data_abertura} onChange={handleDateChange} />
                    </div>

                    <div className="nos-input-wrapper">
                        <label>Data de entrega*</label>
                        <input type="text" name="data_entrega" className="nos-input" placeholder="_//_" value={formData.data_entrega} onChange={handleDateChange} />
                    </div>

                    <div className="nos-input-wrapper">
                        <label>Funcionário*</label>
                        {/* Veja que adicionei o className="nos-input" no select */}
                        <select name="id_usuario_abertura" className="nos-input" value={formData.id_usuario_abertura} onChange={handleChange} required>
                            <option value="">Selecione...</option>
                            <option value="1">Vendedor 1</option>
                            <option value="2">Vendedor 2</option>
                        </select>
                    </div>

                    <div className="nos-input-wrapper">
                        <label>Produtos/Serviços</label>
                        {/* Veja que adicionei o className="nos-input" aqui também */}
                        <input type="text" name="id_produto" className="nos-input" value={formData.id_produto} onChange={handleChange} />
                    </div>

                    <div className="nos-input-wrapper">
                        <label>Valor de entrada</label>
                        <div className="nos-input-moeda">
                            <span>R$</span>
                            <input type="number" name="valor_entrada" value={formData.valor_entrada} onChange={handleChange} />
                        </div>
                    </div>

                    {/* <div className="nos-input-wrapper">
                        <label>Quantidade*</label>
                        <div className="nos-input-group">
                            <input type="number" name="quantidade" value={formData.quantidade} onChange={handleChange} />
                            <button type="button">+</button>
                        </div>
                    </div> */}

                    <div className="nos-input-wrapper">
                        <label>Valor total</label>
                        <div className="nos-input-moeda">
                            <span>R$</span>
                            <input type="number" name="valor_total" value={formData.valor_total} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                {/*} <div className="nos-btn-container">
                    <button type="button" className="nos-btn-incluir">Incluir Item</button>
                </div>

                <div className="nos-receita-top">
                    <div className="nos-titulo">
                        <h2>Receita</h2>
                    </div>
                    <div className="nos-receita-radio-box">
                        <label className="nos-label-principal">Cliente possui receita?</label>
                        <div className="nos-radio-group">
                            <label><input type="radio" name="possui_receita" value="Sim" checked={formData.possui_receita === 'Sim'} onChange={handleChange} /> Sim</label>
                            <label><input type="radio" name="possui_receita" value="Não" checked={formData.possui_receita === 'Não'} onChange={handleChange} /> Não</label>
                        </div>
                    </div>
                    <button type="button" className="nos-btn-secundario">Anexar receita</button>
                </div>

                <div className="nos-receita-tabelas">
                    <table className="receita-table">
                        <thead>
                            <tr>
                                <th colSpan="2" style={{ border: 'none' }}></th>
                                <th>Esférico</th><th>Cilíndrico</th><th>Eixo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowSpan="2" className="cell-header">Longe</td>
                                <td className="cell-header">OD</td>
                                <td><input type="text" name="receita_longe_od_esf" value={formData.receita_longe_od_esf} onChange={handleChange}/></td>
                                <td><input type="text" name="receita_longe_od_cil" value={formData.receita_longe_od_cil} onChange={handleChange}/></td>
                                <td><input type="text" name="receita_longe_od_eixo" value={formData.receita_longe_od_eixo} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td className="cell-header">OE</td>
                                <td><input type="text" name="receita_longe_oe_esf" value={formData.receita_longe_oe_esf} onChange={handleChange}/></td>
                                <td><input type="text" name="receita_longe_oe_cil" value={formData.receita_longe_oe_cil} onChange={handleChange}/></td>
                                <td><input type="text" name="receita_longe_oe_eixo" value={formData.receita_longe_oe_eixo} onChange={handleChange}/></td>
                            </tr>
                            <tr>
                                <td colSpan="2" style={{ border: 'none' }}></td>
                                <td className="cell-header">Adição</td>
                                <td><input type="text" name="receita_adicao" value={formData.receita_adicao} onChange={handleChange}/></td>
                                <td style={{ border: 'none' }}></td>
                            </tr>
                        </tbody>
                    </table>
                </div>*/}

                {/*<div className="nos-secao-lente">
                    <div className="nos-titulo"><h2>Lente</h2></div>
                    <div className="nos-grid-lente">
                        <div className="nos-input-wrapper">
                            <label className="nos-label-principal">Tipo da lente</label>
                            <div className="nos-radio-group-lente">
                                <label><input type="radio" name="tipo_lente" value="Pronta" checked={formData.tipo_lente === 'Pronta'} onChange={handleChange} /> Pronta</label>
                                <label><input type="radio" name="tipo_lente" value="Surfaçada" checked={formData.tipo_lente === 'Surfaçada'} onChange={handleChange} /> Surfaçada</label>
                            </div>
                        </div>

                        <div className="nos-input-wrapper">
                            <label>Material*</label>
                            <select className="nos-input" name="material" value={formData.material} onChange={handleChange}><option></option><option>Resina</option></select>
                        </div>

                        <div className="nos-input-wrapper">
                            <label>Coloração</label>
                            <input type="text" className="nos-input" name="coloracao" value={formData.coloracao} onChange={handleChange} />
                        </div>

                        <div className="nos-input-wrapper">
                            <label>Tratamento*</label>
                            <select className="nos-input" name="tratamento" value={formData.tratamento} onChange={handleChange}><option></option><option>Antirreflexo</option></select>
                        </div>

                        <div className="nos-input-wrapper">
                            <label className="nos-label-principal">Local da montagem</label>
                            <div className="nos-radio-group-lente">
                                <label><input type="radio" name="local_montagem" value="Loja" checked={formData.local_montagem === 'Loja'} onChange={handleChange} /> Loja</label>
                                <label><input type="radio" name="local_montagem" value="Laboratório" checked={formData.local_montagem === 'Laboratório'} onChange={handleChange} /> Laboratório</label>
                            </div>
                        </div>
                    </div>
                </div>*/}

                {/*<div className="nos-secao-armacao">
                    <div className="nos-titulo"><h2>Armação</h2></div>
                    <div className="nos-grid-armacao">
                        <div className="nos-input-wrapper">
                            <label className="nos-label-principal">Segue armação</label>
                            <div className="nos-radio-group-lente">
                                <label><input type="radio" name="segue_armacao" value="Sim" checked={formData.segue_armacao === 'Sim'} onChange={handleChange} /> Sim</label>
                                <label><input type="radio" name="segue_armacao" value="Não" checked={formData.segue_armacao === 'Não'} onChange={handleChange} /> Não</label>
                            </div>
                        </div>

                        <div className="nos-input-wrapper">
                            <label className="nos-receita-label-principal">Armação própria</label>
                            <div className="nos-radio-group-lente">
                                <label><input type="radio" name="armacao_propria" value="Sim" checked={formData.armacao_propria === 'Sim'} onChange={handleChange} /> Sim</label>
                                <label><input type="radio" name="armacao_propria" value="Não" checked={formData.armacao_propria === 'Não'} onChange={handleChange} /> Não</label>
                            </div>
                        </div>

                        <div className="nos-input-wrapper">
                            <label>Tipo de armação</label>
                            <select className="nos-input" name="tipo_armacao" value={formData.tipo_armacao} onChange={handleChange}>
                                <option></option>
                                <option>Acetato</option>
                                <option>Metal</option>
                            </select>
                        </div>

                        <div className="nos-input-wrapper">
                            <label>Modelos de armações</label>
                            <div style={{ marginTop: '15px' }}>
                                <Image src="/modelos.svg" alt="Modelos" width={400} height={45} />
                            </div>
                        </div>
                    </div>
                </div>*/}

                <div className="nos-secao-observacao">
                    <div className="nos-titulo"><h2>Observação</h2></div>
                    <textarea 
                        name="observacao" 
                        className="nos-textarea" 
                        placeholder="Digite as observações aqui..." 
                        value={formData.observacao} 
                        onChange={handleChange}>
                    </textarea>
                </div>


                <div className="nos-acoes-finais">
                    <button type="submit" className="nos-btn-salvar">Salvar</button>
                    <button type="button" className="nos-btn-cancelar" onClick={() => router.push('/ordem-servico')}>Cancelar</button>
                </div>


            </form>
        </div>
    );
}