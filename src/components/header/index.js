"use client";

import React, { useEffect, useState } from 'react'; // Importamos os hooks necessários
import Image from 'next/image';
import './header.css';
import { useRouter, usePathname } from "next/navigation";

export function Header() {
    const router = useRouter();
    const pathname = usePathname();
    
    // Criamos um estado para armazenar o usuário logado
    const [usuario, setUsuario] = useState({ nome: 'Carregando...', perfil: '...' });

    useEffect(() => {
        // Busca os dados que você salvou no localStorage lá no Login
        const userStorage = localStorage.getItem('user');
        
        if (userStorage) {
            try {
                const userParsed = JSON.parse(userStorage);
                setUsuario(userParsed);
            } catch (error) {
                console.error("Erro ao ler dados do usuário", error);
            }
        } else if (pathname !== '/login') {
            // Se não houver usuário no storage e não estivermos no login, 
            // opcionalmente podemos redirecionar para o login
            // router.push('/login');
        }
    }, [pathname]); // Recarrega se mudar de página

    // Esconde o header na página de login
    if (pathname === '/login') {
        return null;
    }

    return (
        <div className='header'>
            <div className='icones'>
                <Image
                    src="/voltarIcon.svg"
                    alt="Ícone de Voltar"
                    width={32}
                    height={32}
                    onClick={() => router.back()}
                    style={{ cursor: 'pointer' }}
                />
                <Image
                    src="/dinheiroIcon.svg"
                    alt="Ícone de Dinheiro"
                    width={32}
                    height={32}
                />
            </div>
            <div className='inforUsuario'>
                <div className='fotoUsuario'>
                    <Image
                        src="/OticaFocalIcon.svg"
                        alt="Ícone do Usuário"
                        width={42}
                        height={42}
                    />
                </div>
                <div className='nomeUsuario'>
                    {/* Agora usamos os valores do estado 'usuario' */}
                    <p id='nomeUsuario'>{usuario.nome}</p>
                    <p id='perfil'>{usuario.perfil}</p>
                </div>
                {/* Dica extra: Botão de Sair */}
                <button 
                    onClick={() => {
                        localStorage.removeItem('user');
                        router.push('/login');
                    }}
                    style={{marginLeft: '10px', fontSize: '12px', cursor: 'pointer'}}
                >
                    Sair
                </button>
            </div>
        </div>
    );
}