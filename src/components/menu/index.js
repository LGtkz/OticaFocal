"use client";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import './menu.css';
import Image from 'next/image';
import { usePathname } from "next/navigation";

export function Menu() {
    const pathname = usePathname();
    const [perfil, setPerfil] = useState('');

    useEffect(() => {
        // Busca o perfil do usuário logado
        const userStorage = localStorage.getItem('user');
        if (userStorage) {
            try {
                const userParsed = JSON.parse(userStorage);
                // Certifique-se de que o nome da propriedade é 'perfil'
                setPerfil(userParsed.perfil?.toLowerCase());
            } catch (error) {
                console.error("Erro ao ler perfil do menu", error);
            }
        }
    }, []);
    
    // Esconde o menu na página de login
    if (pathname === '/login') {
        return null;
    }

    // Função auxiliar para verificar se é admin
    // Ajuste o termo 'administrador' para o que estiver exatamente no seu banco
    const isAdmin = perfil === 'admin' || perfil === 'gestor';

    

    return (
        <nav>
            <ul>
                <li>
                    <Image src="/homeIcon.svg" alt="Ícone de Home" width={20} height={20} />
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Image src="/userIcon.svg" alt="Ícone de Clientes" width={20} height={20} />
                    <Link href='/clientes'>Clientes</Link>
                </li>
                <li>
                    <Image src="/produtosIcon.svg" alt="Ícone de Produtos" width={20} height={20} />
                    <Link href='/produtos'>Produtos</Link>
                </li>
                <li>
                    <Image src="/osIcon.svg" alt="Ícone de Ordem de Serviço" width={20} height={20} />
                    <Link href='/ordem-servico'>Ordem de serviço</Link>
                </li>
                <li>
                    <Image src="/estoqueIcon.svg" alt="Ícone de Estoque" width={20} height={20} />
                    <Link href='/vendas'>Vendas</Link>
                </li>

                {/* --- ÁREAS RESTRITAS --- */}
                {isAdmin && (
                    <>
                        <li>
                            <Image src="/relatorioIcon.svg" alt="Ícone de Relatórios" width={20} height={20} />
                            <Link href='/relatorios'>Relatórios</Link>
                        </li>
                        <li>
                            <Image src="/userIcon.svg" alt="Ícone de Funcionários" width={20} height={20} />
                            <Link href='/funcionarios'>Funcionários</Link>
                        </li>
                    </>
                )}
                {/* ----------------------- */}

                <li>
                    <Image src="/cfgIcon.svg" alt="Ícone de Configurações" width={20} height={20} />
                    <Link href='/configuracoes'>Configurações</Link>
                </li>
                <li>
                    <Image src="/sairIcon.svg" alt="Ícone de Sair" width={20} height={20} />
                    {/* Dica: em vez de um Link para /sair, você pode fazer uma função de logout direto */}
                    <Link href='/login' onClick={() => localStorage.removeItem('user')}>
                        Sair
                    </Link>
                </li>
            </ul>
        </nav>
    )
}