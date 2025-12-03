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
                    <button className="btn-novo-produto">Novo produto +</button>
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

            <div className="produtos-lista-container">
                <p className="contador-produtos">Foi encontrado 1 produtos</p>

                <div className="produto-card">
                    <div className="produto-info-principal">
                        <h2>Oculos Ray Ban</h2>
                        <p>id:23453</p>
                    </div>

                    <div className="produto-info-secundaria">
                        <p>Quantidade: 23</p>
                        <p>Marca: RayBan</p>
                        <p>Categoria: Armação de acetato</p>
                    </div>

                    <button className="btn-preco">300,00 R$</button>
                </div>
            </div>

        </div>



    );
}