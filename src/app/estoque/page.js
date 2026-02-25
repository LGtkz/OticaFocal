import './estoque.css';
import Link from 'next/link';
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["800"],
});

export default function Estoque() {
    return (
        <div className="estoque-page">
            <div className="estoque-container">
                <div className="titulo-estoque">
                    <Image
                        src="/Cliente.svg"
                        alt="Ícone"
                        width={70}
                        height={70}
                    />
                    <h1 className={inter.className}>Estoque</h1>
                </div>
            </div>

            <div className="estoque-box">
                <Link href="/estoque/novo">
                    <button className="btn-novo-estoque">Novo Estoque +</button>
                </Link>

                <label className="label-buscar">Buscar estoque</label>

                <div className="input-busca">
                    <Image
                        src="/search-button-svgrepo-com.svg"
                        alt="Ícone de busca"
                        width={22}
                        height={22}
                        className="icone-busca"
                    />
                    <input type="text" placeholder="Nome" />
                </div>
            </div>

            <div className="estoque-lista-container">
                <p className="contador-estoque">Foi encontrado 1 estoque</p>

                <div className="estoque-card estoque-card--ativo">
                    <div className="estoque-info-principal">
                        <h2>Francisco Pereira</h2>
                        <p>CPF: 992.185.426-23</p>
                    </div>

                    <div className="estoque-info-secundaria">
                        <p>Celular: (38) 999652156</p>
                        <p>Cadastro: 23/11/2025</p>
                    </div>

                    <button className="btn-receita" aria-label="Abrir">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}