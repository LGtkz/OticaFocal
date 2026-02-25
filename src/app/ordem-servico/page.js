import './ordem-servico.css';
import Link from 'next/link';
import Image from "next/image";
import { Inter } from "next/font/google";


const inter = Inter({
    subsets: ["latin"],
    weight: ["800"],
});

export default function OrdemServico() {
    return (
        <div className="ordem-servico-page">
            <div className="ordem-servico-container">
                <div className="titulo-ordem-servico">
                    <Image
                        src="/ordem-servico.svg"
                        alt="Ícone de ordem de serviço"
                        width={70}
                        height={70}
                    />

                    <h1 className={inter.className}>Ordem de Serviço</h1>
                </div>
            </div>

            <div className="ordem-servico-box">

                <Link href="/ordem-servico/novo">
                    <button className="btn-nova-ordem-servico">Nova O.S +</button>
                </Link>

               <label className="label-buscar">Buscar O.S</label>
              
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
              



        </div>



    );
}