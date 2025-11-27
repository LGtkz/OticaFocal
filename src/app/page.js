
"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Bloco from "@/components/quadroDashboard/bloco";
import BlocoAcesso from "@/components/blocosAcesso/bloco";
import Grafico from "@/components/grafico/grafico"; 
import BlocoVendas from "@/components/blocoVenda/bloco"; 
import BlocoInferior from "@/components/blocoInferior/blocoInferior";

export default function Home() {

const [currentMonth, setCurrentMonth] = useState(10);
  return (
    <main className={styles.main}>
       
      <Bloco />
      <BlocoAcesso />

      <div className={styles.line2}>
        <Grafico month={currentMonth} />
        <BlocoVendas month={currentMonth} setMonth={setCurrentMonth} />
      </div>

      <BlocoInferior />
     
    </main>
  );
}