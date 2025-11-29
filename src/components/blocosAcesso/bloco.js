import "./bloco.css";
import Image from "next/image";

export default function BlocoAcesso() {
    return (
        <div className="bloco-acesso">
            <div className="bloco-clientes">
                <Image
                    src="/userIcon.svg"
                    alt="Ícone de Clientes"
                    width={32}
                    height={32}
                />
                <p>Clientes</p>
            </div>
            <div className="bloco-produtos">
                <Image
                    src="/produtosIcon2.svg"
                    alt="Ícone de Produtos"
                    width={32}
                    height={32}
                />
                <p>Produtos</p>
            </div>
            <div className="bloco-ordem-servico">
                <Image
                    src="/osIcon.svg"
                    alt="Ícone de Ordem de Serviço"
                    width={32}
                    height={32}
                />
                <p>Ordem de Serviço</p>
            </div>
            <div className="bloco-vendas">
                <Image
                    src="/entregasIcon.svg"
                    alt="Ícone de entregas"
                    width={32}
                    height={32}
                />
                <p>Entregas Pendentes</p>
            </div>
            
        </div>
    )
}


