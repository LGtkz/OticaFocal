import Image from "next/image";
import styles from "./page.module.css";
import Bloco from "@/components/quadroDashboard/bloco";
import BlocoAcesso from "@/components/blocosAcesso/bloco";

export default function Home() {
  return (
    <main className={styles.main}>
      <Bloco />
      <BlocoAcesso />
    </main>
  );
}