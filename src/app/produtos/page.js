import './produtos.css';
import Link from 'next/link';
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["800"],
});

export default function Produto() {
    return (
        <div className="produto-page">
            <div className="produto-container">
                <div className="titulo-produto">
                    <Image
                        src="/Produto.svg"
                        alt="Ícone"
                        width={70}
                        height={70}
                    />
                    <h1 className={inter.className}>Produtos</h1>
                </div>
            </div>

            <div className="produto-box">
                <Link href="/produtos/novo">
                    <button className="btn-novo-produto">Novo Produto +</button>
                </Link>

                <label className="label-buscar">Buscar produto</label>

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

            <div className="produto-lista-container">
                <p className="contador-produto">Foi encontrado 1 produto</p>

                <div className="produto-card produto-card--ativo">
                    <div className="produto-info-principal">
                        <h2>Oculos ray-ban</h2>
                        <p>id: 2345</p>
                    </div>

                    <div className="produto-info-secundaria">
                        <p>Categoria: Armação</p>
                        <p>Quantidade: 54</p>
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