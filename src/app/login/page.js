"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importação correta
import './login.css';

export default function Login() {
    const router = useRouter(); // <--- VOCÊ PRECISA DISSO AQUI!
    const [cpf, setCpf] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!cpf || !password) {
            setError('Por favor, preencha todos os campos');
            return;
        }


        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cpf: cpf, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Bem-vindo, ${data.user.nome}!`);
                localStorage.setItem('user', JSON.stringify(data.user));
                router.push('/'); // Agora o router está definido e funcionará
            } else {
                setError(data.error || 'Falha na autenticação');
            }
        } catch (err) {
            setError('Erro de conexão com o servidor.');
        }
    };

    const aplicarMascaraCPF = (valor) => {
        return valor
            .replace(/\D/g, '') // Remove tudo que não é dígito
            .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após os 3 primeiros dígitos
            .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após os 6 primeiros dígitos
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Coloca hífen antes dos últimos 2 dígitos
            .slice(0, 14); // Limita o tamanho máximo (000.000.000-00)
    };


    const validarCPF = (cpf) => {
        // Remove caracteres não numéricos
        const limpo = cpf.replace(/\D/g, '');

        // Verifica se tem 11 dígitos ou se todos os números são iguais (ex: 111.111.111-11)
        if (limpo.length !== 11 || /^(\d)\1+$/.test(limpo)) return false;

        // Cálculo do primeiro dígito verificador
        let soma = 0;
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(limpo.substring(i - 1, i)) * (11 - i);
        }
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(limpo.substring(9, 10))) return false;

        // Cálculo do segundo dígito verificador
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(limpo.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(limpo.substring(10, 11))) return false;

        return true;
    };



    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <span></span>
                        <label htmlFor="cpf">CPF</label>
                        <input
                            id="cpf"
                            type="text"
                            value={cpf}
                            onChange={(e) => {
                                const valorComMascara = aplicarMascaraCPF(e.target.value);
                                setCpf(valorComMascara);
                                if (error) setError(''); // Limpa o erro ao digitar
                            }}

                            placeholder="000.000.000-00"

                        />
                    </div>

                    <div className="form-group">
                        <span></span>
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Sua senha"
                            className={error && !password ? 'input-error' : ''}
                        />
                    </div>

                    {error && <p className="error">{error}</p>}

                    <button type="submit" className="btn-login">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}