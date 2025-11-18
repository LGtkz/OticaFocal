import Link from "next/link";
import './menu.css';
import Image from 'next/image';

export function Menu() {
    return (
        <nav>
            <ul>
                <li>
                    <Image
                        src="/homeIcon.svg"
                        alt="Ícone de Home"
                        width={20}
                        height={20}
                    />
                    <Link href='\'>
                        Home
                    </Link>
                </li>
                <li>
                    <Image
                        src="/userIcon.svg"
                        alt="Ícone de Clientes"
                        width={20}
                        height={20}
                    />
                    <Link href='/clientes'>
                        Clientes
                    </Link>
                </li>
                <li>
                    <Image
                        src="/produtosIcon.svg"
                        alt="Ícone de Produtos"
                        width={20}
                        height={20}
                    />
                    <Link href='/produtos'>
                        Produtos
                    </Link>
                </li>
                <li>
                    <Image
                        src="/osIcon.svg"
                        alt="Ícone de Ordem de Serviço"
                        width={20}
                        height={20}
                    />
                    <Link href='/ordemservico'>
                        Ordem de serviço
                    </Link>
                </li>
                <li>
                    <Image
                        src="/estoqueIcon.svg"
                        alt="Ícone de Estoque"
                        width={20}
                        height={20}
                    />
                    <Link href='/estoque'>
                        Estoque
                    </Link>
                </li>
                <li>
                    <Image
                        src="/relatorioIcon.svg"
                        alt="Ícone de Relatórios"
                        width={20}
                        height={20}
                    />
                    <Link href='/relatorios'>
                        Relatórios
                    </Link>
                </li>
                <li>
                    <Image
                        src="/cfgIcon.svg"
                        alt="Ícone de Configurações"
                        width={20}
                        height={20}
                    />
                    <Link href='/configuracoes'>
                        Configurações
                    </Link>
                </li>
                <li>

                    <Image
                        src="/sairIcon.svg"
                        alt="Ícone de Sair"
                        width={20}
                        height={20}
                    />
                    <Link href='/sair'>
                        Sair
                    </Link>
                </li>
            </ul>
        </nav>
        
    )
}