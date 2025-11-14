import Link from "next/link";

export function Menu() {
    return (
        <nav>
            <ul>
                <li>
                    <Link href='\'>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href='/clientes'>
                        Clientes
                    </Link>
                </li>
                <li>
                    <Link href='/produtos'>
                        Produtos
                    </Link>
                </li>
                <li>
                    <Link href='/ordem-servico'>
                        Ordem de serviço
                    </Link>
                </li>
            </ul>
        </nav>
    )
}