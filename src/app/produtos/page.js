import './produtos.css';
import Link from 'next/link';
import Image from "next/image";
import { Inter } from "next/font/google";


const inter = Inter({
    subsets: ["latin"],
    weight: ["800"],
});

export default function Produtos() {
    return (
        <div className="produtos-page">
            <div className="produtos-container">
                <div className="titulo-produtos">
                    <Image
                        src="/produto.svg"
                        alt="Ícone de produto"
                        width={70}
                        height={70}
                    />

                    <h1 className={inter.className}>Produtos</h1>
                </div>
            </div>

            <div className="produtos-box">

                <Link href="/produtos/novo">
                    <button className="btn-novo-produto">Novo Produto +</button>
                </Link>

                <label className="label-buscar">Buscar Produto</label>


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

            <div className="produtos-lista-container">
                <p className="contador-produtos">Foi encontrado 1 produtos</p>



                <div className="produto-card">
                    <div className="produto-info-principal">
                        <h2>Oculos Ray Ban</h2>
                        <p>id:23453</p>
                    </div>

                    <div className="produto-info-secundaria">
                        <p>Categoria: Armação de acetato</p>

                    </div>


                    <button className="btn-preco">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

        </div>



    );
}