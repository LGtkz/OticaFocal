"use client";

import "./novo-vendas.css";
import { Inter } from "next/font/google";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Vendas() {
  const router = useRouter();

  // ===== BOX 1 (Cliente) =====
  const [cliente, setCliente] = useState("");
  const [dataVenda, setDataVenda] = useState("");
  const [funcionario, setFuncionario] = useState("");
  const [erros, setErros] = useState({});

  // ===== BOX 3 (Pagamento) =====
  const [formaPagamento, setFormaPagamento] = useState("");
  const [valorPagamento, setValorPagamento] = useState("");
  const [qtParcela, setQtParcela] = useState("1");
  const [dataPagamento, setDataPagamento] = useState("");


  const hojeISO = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  function validarData(valor) {
    if (!valor) return "Informe a data da venda.";
    if (valor > hojeISO) return "A data da venda não pode ser futura.";
    return "";
  }

  function handleBlurData() {
    const msg = validarData(dataVenda);
    setErros((prev) => ({ ...prev, dataVenda: msg }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const novosErros = {};
    if (!cliente.trim()) novosErros.cliente = "Informe o cliente.";
    const msgData = validarData(dataVenda);
    if (msgData) novosErros.dataVenda = msgData;
    if (!funcionario) novosErros.funcionario = "Selecione um funcionário.";

    setErros(novosErros);

    if (Object.keys(novosErros).length === 0) {
      console.log({ cliente, dataVenda, funcionario });
    }
  }

  function handleIncluirPagamento() {
    console.log({
      formaPagamento,
      valorPagamento,
      qtParcela,
      dataPagamento,
    });
  }

  function fmtBRL(v) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function handleSalvar() {
    console.log("SALVAR", {
      cliente,
      dataVenda,
      funcionario,
      formaPagamento,
      valorPagamento,
      qtParcela,
      dataPagamento,
      valorCarrinho,
      valorPago,
      restante,
    });
  }

  function handleCancelar() {
    router.back();
  }

  return (
    <div className="venda-page">
      <div className="venda-container">
        <div className="titulo-venda">
          <div style={{ background: "#000", padding: 10, display: "inline-block" }}>
            <img src="/estoque.svg" alt="Ícone" width={50} height={50} />
          </div>
          <h1 className={inter.className}>Vendas</h1>
        </div>
      </div>

      {/* ===== BOX 1: DADOS DO CLIENTE ===== */}
      <form className="nova-venda-box" onSubmit={handleSubmit}>
        <div className="box-titulo">Dados do Cliente</div>

        <div className="grid-campos">
          <div className="campo">
            <label className="label">
              Pesquisar Cliente<span className="obrigatorio">*</span>
            </label>

            <div className={`input-icone ${erros.cliente ? "input-erro" : ""}`}>
              <input
                type="text"
                placeholder="Pesquisar cliente..."
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
              />

              <button type="button" className="btn-mais" aria-label="Adicionar cliente">
                +
              </button>
            </div>

            {erros.cliente && <p className="msg-erro">{erros.cliente}</p>}
          </div>

          <div className="campo">
            <label className="label">
              Data Venda<span className="obrigatorio">*</span>
            </label>

            <div className={`input-icone ${erros.dataVenda ? "input-erro" : ""}`}>
              <input
                type="date"
                value={dataVenda}
                max={hojeISO}
                onChange={(e) => {
                  setDataVenda(e.target.value);
                  setErros((prev) => ({ ...prev, dataVenda: "" }));
                }}
                onBlur={handleBlurData}
              />
            </div>

            {erros.dataVenda && <p className="msg-erro">{erros.dataVenda}</p>}
          </div>

          <div className="campo">
            <label className="label">
              Funcionário<span className="obrigatorio">*</span>
            </label>

            <select
              className={`select ${erros.funcionario ? "input-erro" : ""}`}
              value={funcionario}
              onChange={(e) => {
                setFuncionario(e.target.value);
                setErros((prev) => ({ ...prev, funcionario: "" }));
              }}
            >
              <option value="">Selecione...</option>
              <option value="vendedor1">Vendedor 1</option>
              <option value="vendedor2">Vendedor 2</option>
            </select>

            {erros.funcionario && <p className="msg-erro">{erros.funcionario}</p>}
          </div>
        </div>

        <button className="btn-salvar" type="submit">
          Continuar
        </button>
      </form>

      {/* ===== BOX 2: PRODUTOS / SERVIÇOS ===== */}
      <div className="produtos-box">
        <div className="box-titulo box-titulo-left">Produtos / Serviços</div>

        <div className="produtos-grid">
          <div className="campo">
            <label className="label">Pesquisar Produto</label>

            <div className="input-icone">
              <input type="text" placeholder="Pesquisar Produto" />
              <button type="button" className="btn-mais" aria-label="Adicionar produto">
                +
              </button>
            </div>
          </div>

          <div className="campo">
            <label className="label">Valor Unitário</label>

            <div className="input-icone">
              <span className="prefixo">$</span>
              <input type="text" />
            </div>
          </div>

          <div className="campo">
            <label className="label">
              Quantidade<span className="obrigatorio">*</span>
            </label>

            <div className="quantidade-wrap">
              <input className="quantidade-input" type="number" min="1" defaultValue="1" />
              <button type="button" className="quantidade-btn">
                +
              </button>
            </div>
          </div>

          <div className="campo">
            <label className="label">Valor Total</label>

            <div className="input-icone">
              <span className="prefixo">$</span>
              <input type="text" placeholder="0,00" />
            </div>
          </div>

          <div className="campo campo-incluir">
            <label className="label label-vazio">.</label>
            <button type="button" className="btn-incluir">
              Incluir <span className="btn-incluir-mais">+</span>
            </button>
          </div>
        </div>
      </div>

      {/* ===== BOX 3: DADOS DO PAGAMENTO ===== */}
      <div className="pagamento-box">
        <div className="box-titulo box-titulo-left">Dados do Pagamento</div>

        <div className="pagamento-grid">
          <div className="campo">
            <label className="label">Forma de Pagamento</label>
            <select
              className="select"
              value={formaPagamento}
              onChange={(e) => setFormaPagamento(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="dinheiro">Dinheiro</option>
              <option value="pix">PIX</option>
              <option value="debito">Cartão Débito</option>
              <option value="credito">Cartão Crédito</option>
            </select>
          </div>

          <div className="campo">
            <label className="label">Valor</label>
            <div className="input-icone">
              <span className="prefixo">$</span>
              <input
                type="text"
                value={valorPagamento}
                onChange={(e) => setValorPagamento(e.target.value)}
              />
            </div>
          </div>

          <div className="campo">
            <label className="label">Qt. Parcela</label>
            <input
              className="input-simples"
              type="number"
              min="1"
              value={qtParcela}
              onChange={(e) => setQtParcela(e.target.value)}
            />
          </div>

          <div className="campo">
            <label className="label">Data Pagamento</label>
            <div className="input-icone">
              <input
                type="date"
                value={dataPagamento}
                max={hojeISO}
                onChange={(e) => setDataPagamento(e.target.value)}
              />
            </div>
          </div>

          <div className="campo campo-incluir">
            <label className="label label-vazio">.</label>
            <button type="button" className="btn-incluir" onClick={handleIncluirPagamento}>
              Incluir <span className="btn-incluir-mais">+</span>
            </button>
          </div>
        </div>
      </div>


      <div className="acoes-final">
        <button type="button" className="btn-acao btn-salvar-final" onClick={handleSalvar}>
          Salvar
        </button>

        <button type="button" className="btn-acao btn-cancelar" onClick={handleCancelar}>
          Cancelar
        </button>
      </div>
    </div>
  );
}