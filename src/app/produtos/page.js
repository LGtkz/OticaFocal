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

            <div className='busca-produtos'>
                <div className='btnAbreCliente'>
                    <Link href="/produtos/novo" className="botao-novo-cliente">
                        Novo Produto +
                    </Link>
                </div>
                <p id='busca'>Buscar produtos</p>
                <div className='cliente-input-pesquisa'>
                    <Image
                        src="/search-button-svgrepo-com.svg"
                        alt="Ícone de busca"
                        width={22}
                        height={22}
                        className="icone-busca"
                    />
                    <input
                        type="text"
                        placeholder="Nome"
                        className='input-pesquisa-cliente'
                    />
                </div>
            </div>
            <div className='cliente-busca-resultado'>
                <h3>Foram encontrados 1 produtos</h3>
                <div className='cliente-lista'>
                    <div className='cliente-item'>
                        <div className='cliente-info-principal'>
                            <div className='cliente-barra'></div>
                            <div className='cliente-info-nome'>
                                <p className='cliente-nome'>Oculos ray-ban</p>
                                <p className='cliente-cpf'>id: 2345</p>
                            </div>
                        </div>
                        <div className='cliente-info-contato'>
                            <p className='cliente-telefone'>Categoria: Armação</p>
                            <p className='cliente-email'>Quantidade: 54</p>
                        </div>
                        <Image
                            src="/verMais.svg"
                            alt="Ver todas informações"
                            width={88}
                            height={80}
                            className="icone-verMais"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}