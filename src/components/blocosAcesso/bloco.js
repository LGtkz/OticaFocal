"use client";
import "./bloco.css";
import Image from "next/image";
import Link from "next/link"; // Importação necessária para navegação

export default function BlocoAcesso() {
    return (
        <div className="bloco-acesso">
            {/* Cada div agora é envolvida por um Link apontando para a rota respectiva */}
            <Link href="/clientes" className="bloco-clientes link-acesso">
                <Image
                    src="/userIcon.svg"
                    alt="Ícone de Clientes"
                    width={32}
                    height={32}
                />
                <p>Clientes</p>
            </Link>

            <Link href="/produtos" className="bloco-produtos link-acesso">
                <Image
                    src="/produtosIcon2.svg"
                    alt="Ícone de Produtos"
                    width={32}
                    height={32}
                />
                <p>Produtos</p>
            </Link>

            <Link href="/ordem-servico" className="bloco-ordem-servico link-acesso">
                <Image
                    src="/osIcon.svg"
                    alt="Ícone de Ordem de Serviço"
                    width={32}
                    height={32}
                />
                <p>Ordem de Serviço</p>
            </Link>

            {/* Substituído para a página de Relatórios */}
            <Link href="/relatorios" className="bloco-vendas link-acesso">
                <Image
                    src="/entregasIcon.svg" 
                    alt="Ícone de Relatórios"
                    width={32}
                    height={32}
                />
                <p>Relatórios</p>
            </Link>
        </div>
    );
}