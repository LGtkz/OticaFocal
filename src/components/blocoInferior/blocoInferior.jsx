"use client";
import "./blocoInferior.css";
import BlocoMetrica from "../blocoMetrica/blocoMetrica"; 


export default function BlocoInferior() {
    return (
        <div className="bloco-inferior-container">
        <BlocoMetrica                                                                                                                                   
          title="Contas a receber" 
          status="Últimos 7 dias"
          content="Nenhuma conta a receber nos últimos 7 dias."
        />
        <BlocoMetrica 
          title="Aniversariantes" 
          status="Do mês"
          content="Nenhum aniversariante hoje."
        />
        <BlocoMetrica 
          title="Ordem de serviços" 
          status="Pendentes 7 dias"
          content="Nenhuma O.S. pendente nos últimos 7 dias."
        />
      </div>
    );
}