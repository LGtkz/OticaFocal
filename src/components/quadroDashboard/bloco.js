"use client";

import React, { useEffect, useState } from 'react';
import "./bloco.css";

export default function Bloco() {
    // Iniciamos o estado com o valor que você já tinha, para não ficar vazio
    const [nome, setNome] = useState('Usuário');

    useEffect(() => {
        // Busca os dados do usuário salvos no login
        const userStorage = localStorage.getItem('user');

        if (userStorage) {
            try {
                const userParsed = JSON.parse(userStorage);
                const primeiroNome = userParsed.nome.split(' ')[0];
                setNome(primeiroNome);
            } catch (error) {
                console.error("Erro ao processar dados do usuário:", error);
            }
        }
    }, []);

    return (
        <div className="bloco">
            <h1>Olá {nome}, seja bem-vindo(a)!</h1>
        </div>
    );
}