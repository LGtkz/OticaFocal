import './estoque.css';
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["800"],
});

export default function Estoque() {
  return (
    <div className="estoque-page">
      <div className="estoque-container">
        <div className="titulo-estoque">
          <div style={{ background: "#000", padding: 10, display: "inline-block" }}>
            <img src="/estoque.svg" alt="Ícone" width={50} height={50} />
          </div>
          <h1 className={inter.className}>Estoque</h1>
        </div>
      </div>

      <div className="estoque-search-wrap">
        <div className="estoque-search">
          <input
            type="text"
            placeholder="Pesquisar por código, descrição ou GTIN"
          />

          <button className="estoque-search-btn" aria-label="Pesquisar">
            <Image
              src="/search-button-svgrepo-com.svg"
              alt=""
              width={18}
              height={18}
            />
          </button>
        </div>
      </div>
    </div>
  );
}