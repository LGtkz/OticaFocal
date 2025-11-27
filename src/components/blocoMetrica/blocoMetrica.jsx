"use client";
import "./blocoMetrica.css";

export default function BlocoMetrica({ title, content, status }) {
  return (
    <div className="bloco-metrica">
      <div className="metrica-header">
        <h4 className="metrica-titulo">{title}</h4>
        <p className="metrica-status">{status}</p>
      </div>

      <p className="metrica-conteudo">{content}</p>
    </div>

  );
}
