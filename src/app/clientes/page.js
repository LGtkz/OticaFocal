import './clientes.css';
import Link from 'next/link';
import Image from "next/image";
import { Inter } from "next/font/google";


const inter = Inter({
    subsets: ["latin"],
    weight: ["800"],
});

export default function Clientes() {
    return (
        <div className="clientes-page">
            <div className="clientes-container">
                <div className="titulo-clientes">
                    <Image
                        src="/Cliente.svg"
                        alt="Ícone de cliente"
                        width={70}
                        height={70}
                    />

                    <h1 className={inter.className}>Clientes</h1>
                </div>
            </div>

            <div className="clientes-box">

                <Link href="/clientes/novo">
                    <button className="btn-novo-cliente">Novo cliente +</button>
                </Link>

                <label className="label-buscar">Buscar cliente</label>


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

            <div className="clientes-lista-container">
                <p className="contador-clientes">Foi encontrado 1 clientes</p>

                <div className="cliente-card">
                    <div className="cliente-info-principal">
                        <h2>Francisco Pereira</h2>
                        <p>CPF: 992.185.426-23</p>
                    </div>

                    <div className="cliente-info-secundaria">
                        <p>Celular: (38) 999652156</p>
                        <p>Cadastro: 23/11/2025</p>
                    </div>

                    <button className="btn-receita">1 Receita</button>
                </div>
            </div>

        </div>



    );
}