import Image from "next/image";
import Link from 'next/link';
import { Inter } from "next/font/google";
import './configuracoes.css'; 

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "600", "800"],
});

export default function Configuracoes() {
    return (
        <div className={`pagina-scroll ${inter.className}`}>
            
            <div className="header-topo">
                <Image
                    src="/Group.svg" 
                    alt="Ícone Configurações"
                    width={40}  
                    height={40} 
                />
                <h1>Configurações</h1>
            </div>

            <div className="card-padrao">
                
                <h2 className="titulo-secao">Logotipo da ótica</h2>
                
                <div className="linha-conteudo">
                    <div className="box-upload">
                        <p className="texto-upload">
                            Clique para<br/>
                            adicionar<br/>
                            uma imagem
                        </p>
                    </div>

                    <div className="grupo-input">
                        <label>Nome</label>
                        <input type="text" />
                    </div>
                </div>

                

            </div>

        </div>
    );
}