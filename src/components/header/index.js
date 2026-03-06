"use client";

import Image from 'next/image';
import './header.css';
import { useRouter, usePathname } from "next/navigation";

export function Header() {
    const router = useRouter();
    const pathname = usePathname();
    
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
                        src="/igorIcon.svg"
                        alt="Ícone do Usuário"
                        width={42}
                        height={42}
                    />
                </div>
                <div className='nomeUsuario'>
                    <p id='nomeUsuario'>Igor Mariz</p>
                    <p id='perfil'>Gestor</p>
                </div>
            </div>
        </div>
    )
}