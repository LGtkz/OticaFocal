import './clientes.css';
import Image from "next/image";
import { Inter } from "next/font/google";


const inter = Inter({
subsets: ["latin"],
weight: ["800"],
});

export default function Clientes(){
    return(
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

<   button className="btn-novo-cliente">Novo cliente +</button>

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

    </div>
            

    
    );
}