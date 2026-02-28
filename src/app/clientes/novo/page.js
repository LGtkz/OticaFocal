'use client';
import './novo-cliente.css';
import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useRef } from 'react'; // Adicionado useRef

const inter = Inter({
    subsets: ["latin"],
    weight: ["800"],
});

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    for (let t = 9; t < 11; t++) {
        let soma = 0;
        for (let i = 0; i < t; i++) soma += parseInt(cpf[i]) * (t + 1 - i);
        let digito = (soma * 10) % 11;
        if (digito === 10 || digito === 11) digito = 0;
        if (digito !== parseInt(cpf[t])) return false;
    }
    return true;
}

export default function NovoCliente() {
    const fileInputRef = useRef(null); 
    const [imagePreview, setImagePreview] = useState(null); 
    
    const [formData, setFormData] = useState({
        nome: '',
        cpf: '',
        genero: '',
        endereco: '',
        numero: '',
        bairro: '',
        complemento: '',
        cidade: '',
        estado: '',
        cep: '',
        email: '',
        telefone: '',
        DataNasc: '', 
    });

    const [errors, setErrors] = useState({});

    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, foto: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    
    const handleCpfChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); 
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        setFormData(prev => ({ ...prev, cpf: value }));
        if (errors.cpf) setErrors(prev => ({ ...prev, cpf: null }));
    };

    
    const handleTelefoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 10) value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        else if (value.length > 5) value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        else if (value.length > 2) value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        else if (value.length > 0) value = value.replace(/^(\d*)/, '($1');
        setFormData(prev => ({ ...prev, telefone: value }));
    };

    
    const handleCepChange = async (e) => {
        let value = e.target.value.replace(/\D/g, ''); 
        if (value.length > 8) value = value.slice(0, 8);
        setFormData(prev => ({ ...prev, cep: value.replace(/(\d{5})(\d)/, '$1-$2') }));
        if (value.length === 8) {
            try {
                const res = await fetch(`https://viacep.com.br/ws/${value}/json/`);
                const data = await res.json();
                if (!data.erro) {
                    setFormData(prev => ({
                        ...prev, endereco: data.logradouro, bairro: data.bairro,
                        cidade: data.localidade, estado: data.uf
                    }));
                    document.getElementsByName('numero')[0]?.focus();
                }
            } catch (error) { console.error("Erro CEP:", error); }
        }
    };

    const handleEstadoChange = (e) => {
        let value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
        if (value.length > 2) value = value.slice(0, 2);
        setFormData(prev => ({ ...prev, estado: value }));
    };

    const handleNumeroChange = (e) => {
        setFormData(prev => ({ ...prev, numero: e.target.value.replace(/\D/g, '') }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleDateChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) value = value.slice(0, 8);
        if (value.length > 4) value = value.replace(/(\d{2})(\d{2})(\d+)/, '$1/$2/$3');
        else if (value.length > 2) value = value.replace(/(\d{2})(\d+)/, '$1/$2');
        setFormData(prevState => ({ ...prevState, DataNasc: value }));
    };

    const handleSalvar = async () => {
        if (!formData.nome || !formData.cpf || !formData.telefone) {
            alert("Nome, CPF e Telefone são obrigatórios!");
            return;
        }
        const cpfLimpo = formData.cpf.replace(/\D/g, '');
        if (!validarCPF(cpfLimpo)) {
            setErrors({ cpf: "CPF Inválido" });
            alert("O CPF informado é inválido!");
            return;
        }

    
        let dataParaEnviar = { ...formData };
        if (formData.DataNasc) {
            const partes = formData.DataNasc.split('/');
            if (partes.length === 3) dataParaEnviar.DataNasc = `${partes[2]}-${partes[1]}-${partes[0]}`;
        }

        try {
            const response = await fetch('http://localhost:3001/cliente', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataParaEnviar),
            });
            if (response.ok) alert('Cliente salvo com sucesso!');
            else alert('Erro ao salvar no servidor.');
        } catch (error) { console.error("Erro na requisição:", error); }
    };

    return (
        <div className="novo-cliente-container">
            <div className="titulo-clientes">
                <Image src="/Cliente.svg" alt="Ícone" width={70} height={70} />
                <h1 className={inter.className}>Clientes</h1>
            </div>

            <div className="nc-form-card">
                <div className="nc-section-block">
                    <h2 className="nc-section-title">Principais dados</h2>
                    <div className="nc-content-wrapper">
                        <div className="nc-image-col">
                            {/* Clique aqui ativa o input de arquivo */}
                            <div className="nc-image-upload" onClick={triggerFileInput} style={{ cursor: 'pointer', overflow: 'hidden', position: 'relative' }}>
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <p>Clique para adicionar<br />uma imagem</p>
                                )}
                                {/* Input escondido */}
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    onChange={handleImageChange} 
                                    accept="image/*" 
                                    style={{ display: 'none' }} 
                                />
                            </div>
                        </div>

                        <div className="nc-fields-col">
                            <div className="nc-input-wrapper nc-span-2">
                                <label>Nome*</label>
                                <input type="text" className="nc-input" name="nome" value={formData.nome} onChange={handleChange} />
                            </div>
                            <div className="nc-input-wrapper">
                                <label style={{ color: errors.cpf ? 'red' : 'inherit' }}>
                                    CPF* {errors.cpf && <span>({errors.cpf})</span>}
                                </label>
                                <input type="text" className="nc-input" name="cpf" placeholder="000.000.000-00" value={formData.cpf} onChange={handleCpfChange} />
                            </div>
                            <div className="nc-input-wrapper">
                                <label>Gênero</label>
                                <select className="nc-input" name="genero" value={formData.genero} onChange={handleChange}>
                                    <option value="">Selecione</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Feminino">Feminino</option>
                                </select>
                            </div>
                            <div className="nc-input-wrapper">
                                <label>Data de nascimento</label>
                                <input type="text" className="nc-input" placeholder="__/__/____" name="DataNasc" value={formData.DataNasc} onChange={handleDateChange} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seção Endereço */}
                <div className="nc-section-block">
                    <h2 className="nc-section-title">Endereço</h2>
                    <div className="nc-endereco-grid">
                        <div className="nc-input-wrapper">
                            <label>CEP</label>
                            <input type="text" className="nc-input" placeholder="00000-000" value={formData.cep} onChange={handleCepChange} />
                        </div> 
                        <div className="nc-input-wrapper">
                            <label>Endereço</label>
                            <input type="text" className="nc-input" name="endereco" value={formData.endereco} onChange={handleChange} />
                        </div>
                        <div className="nc-input-wrapper">
                            <label>Número</label>
                            <input type="text" className="nc-input" name="numero" placeholder="Nº" value={formData.numero} onChange={handleNumeroChange} />
                        </div>
                        <div className="nc-input-wrapper">
                            <label>Bairro</label>
                            <input type="text" className="nc-input" name="bairro" value={formData.bairro} onChange={handleChange} />
                        </div>
                        <div className="nc-input-wrapper">
                            <label>Complemento</label>
                            <input type="text" className="nc-input" name="complemento" value={formData.complemento} onChange={handleChange} />
                        </div>
                        <div className="nc-input-wrapper">
                            <label>Cidade</label>
                            <input type="text" className="nc-input" name="cidade" value={formData.cidade} onChange={handleChange} />
                        </div>
                        <div className="nc-input-wrapper">
                            <label>Estado</label>
                            <input type="text" className="nc-input" name="estado" placeholder="UF" value={formData.estado} onChange={handleEstadoChange} maxLength={2} />
                        </div>
                    </div>
                </div>

                {/* Seção Contato */}
                <div className="nc-section-block">
                    <h2 className="nc-section-title">Informações de contato</h2>
                    <div className="nc-contato-grid">
                        <div className="nc-input-wrapper">
                            <label>Email</label>
                            <input type="email" className="nc-input" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="nc-input-wrapper">
                            <label>Telefone*</label>
                            <input type="text" className="nc-input" placeholder="(00) 00000-0000" value={formData.telefone} onChange={handleTelefoneChange} />
                        </div>
                    </div>
                </div>

                <div className="nc-actions-row">
                    <button className="nc-btn-save" onClick={handleSalvar}>Salvar</button>
                    <button className="nc-btn-cancel">Cancelar</button>
                </div>
            </div>
        </div>
    );
}