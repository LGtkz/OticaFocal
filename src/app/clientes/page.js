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
        <div>
            <div className={'clientes-page'}>
                <Image
                    src="/Cliente.svg"
                    alt="Ícone de Clientes"
                    width={48}
                    height={48}
                />
                <h1 className="titulo-clientes">Clientes</h1>
            </div>

            <div className='input-pesquisa'>
                <div className='btnAbreCliente'>
                    <Link href="/clientes/novo" className="botao-novo-cliente">
                        Novo Cliente +
                    </Link>
                </div>
                <p id='busca'>Buscar clientes</p>
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
                <h3>Foram encontrados 1 clientes</h3>
                <div className='cliente-lista'>
                    <div className='cliente-item'>
                        <div className='cliente-info-principal'>
                            <div className='cliente-barra'></div>
                            <div className='cliente-info-nome'>
                                <p className='cliente-nome'>Francisco Pereira</p>
                                <p className='cliente-cpf'>CPF: 192.183.426-23</p>
                            </div>
                        </div>
                        <div className='cliente-info-contato'>
                            <p className='cliente-telefone'>Celular: (34)998432156</p>
                            <p className='cliente-email'>Cadastro: 23/11/2025</p>
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