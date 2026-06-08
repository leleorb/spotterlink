"use client";

import { useEffect, useState } from "react";
import { Dumbbell, FileDown, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

interface Exercicio {
  nome: string;
  series: string;
  repeticoes: string;
  descanso: string;
  observacao?: string;
}

interface DiaTreino {
  dia: string;
  foco: string;
  exercicios: Exercicio[];
}

interface Treino {
  resumo: string;
  divisao: string;
  dias: DiaTreino[];
  dicas: string[];
}

export default function Resultado() {
  const [nome, setNome] = useState("");
  const [treino, setTreino] = useState<Treino | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [abertos, setAbertos] = useState<number[]>([0]);

  useEffect(() => {
    const nomeSalvo = sessionStorage.getItem("spotter_nome") || "atleta";
    const respostasSalvas = sessionStorage.getItem("spotter_respostas");
    setNome(nomeSalvo);

    if (!respostasSalvas) {
      setErro("Respostas não encontradas. Por favor, refaça o questionário.");
      setCarregando(false);
      return;
    }

    const respostas = JSON.parse(respostasSalvas);

    fetch("/api/gerar-treino", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nomeSalvo, respostas }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.treino) {
          setTreino(data.treino);
          setAbertos([0]);
        } else {
          setErro("Erro ao gerar treino. Tente novamente.");
        }
        setCarregando(false);
      })
      .catch(() => {
        setErro("Erro de conexão. Tente novamente.");
        setCarregando(false);
      });
  }, []);

  function toggleDia(index: number) {
    setAbertos((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }

  async function baixarPDF() {
    if (!treino) return;
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const verde = [34, 197, 94] as [number, number, number];
    const branco = [255, 255, 255] as [number, number, number];
    const cinzaEscuro = [30, 30, 30] as [number, number, number];
    const cinzaMedio = [80, 80, 80] as [number, number, number];

    let y = 0;

    function novaPaginaSeNecessario(altura: number) {
      if (y + altura > 280) {
        doc.addPage();
        y = 15;
      }
    }

    // Cabeçalho
    doc.setFillColor(...cinzaEscuro);
    doc.rect(0, 0, 210, 35, "F");
    doc.setFillColor(...verde);
    doc.rect(0, 0, 8, 35, "F");
    doc.setTextColor(...branco);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("SPOTTER", 18, 15);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 180, 180);
    doc.text("Planilha de Treino Personalizada", 18, 23);
    doc.text(`Atleta: ${nome}`, 18, 30);

    y = 45;

    // Resumo
    doc.setTextColor(...cinzaEscuro);
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    const resumoLines = doc.splitTextToSize(`"${treino.resumo}"`, 175);
    doc.text(resumoLines, 15, y);
    y += resumoLines.length * 5 + 5;

    // Divisão
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...cinzaMedio);
    doc.text(`Divisão: ${treino.divisao}`, 15, y);
    y += 10;

    // Dias de treino
    treino.dias.forEach((dia) => {
      novaPaginaSeNecessario(20);

      // Header do dia
      doc.setFillColor(...verde);
      doc.roundedRect(15, y, 180, 10, 2, 2, "F");
      doc.setTextColor(...branco);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(dia.dia, 20, y + 7);
      doc.text(dia.foco, 130, y + 7);
      y += 14;

      // Header da tabela
      doc.setFillColor(240, 240, 240);
      doc.rect(15, y, 180, 7, "F");
      doc.setTextColor(...cinzaMedio);
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.text("EXERCÍCIO", 18, y + 5);
      doc.text("SÉRIES", 105, y + 5);
      doc.text("REPS", 125, y + 5);
      doc.text("DESCANSO", 145, y + 5);
      y += 9;

      // Exercícios
      dia.exercicios.forEach((ex, i) => {
        novaPaginaSeNecessario(16);
        const bg = i % 2 === 0 ? [255, 255, 255] as [number, number, number] : [248, 248, 248] as [number, number, number];
        doc.setFillColor(...bg);
        doc.rect(15, y, 180, 8, "F");
        doc.setTextColor(...cinzaEscuro);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        const nomeLines = doc.splitTextToSize(ex.nome, 82);
        doc.text(nomeLines[0], 18, y + 5);
        doc.text(ex.series, 107, y + 5);
        doc.text(ex.repeticoes, 127, y + 5);
        doc.text(ex.descanso, 147, y + 5);
        y += 8;

        if (ex.observacao) {
          novaPaginaSeNecessario(6);
          doc.setTextColor(120, 120, 120);
          doc.setFontSize(7);
          doc.setFont("helvetica", "italic");
          const obsLines = doc.splitTextToSize(`  → ${ex.observacao}`, 170);
          doc.text(obsLines, 18, y + 4);
          y += obsLines.length * 4 + 2;
        }
      });
      y += 8;
    });

    // Dicas
    novaPaginaSeNecessario(30);
    doc.setFillColor(240, 255, 244);
    doc.roundedRect(15, y, 180, 8, 2, 2, "F");
    doc.setTextColor(...verde);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("💡 Dicas do seu Personal IA", 20, y + 6);
    y += 12;

    treino.dicas.forEach((dica) => {
      novaPaginaSeNecessario(10);
      doc.setTextColor(...cinzaEscuro);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      const dicaLines = doc.splitTextToSize(`• ${dica}`, 170);
      doc.text(dicaLines, 18, y);
      y += dicaLines.length * 5 + 3;
    });

    // Rodapé
    doc.setTextColor(180, 180, 180);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("Gerado por SPOTTER • spotter.app", 105, 290, { align: "center" });

    doc.save(`treino-spotter-${nome.toLowerCase()}.pdf`);
  }

  // LOADING
  if (carregando) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6">
        <div className="flex items-center gap-2 mb-12">
          <Dumbbell className="text-green-400 w-7 h-7 animate-pulse" />
          <span className="text-2xl font-black">SPOTTER</span>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-black mb-2">Gerando seu treino, {nome}...</h2>
          <p className="text-gray-400">Nossa IA está analisando seu perfil. Isso pode levar alguns segundos.</p>
        </div>
      </main>
    );
  }

  // ERRO
  if (erro) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 text-center">
        <Dumbbell className="text-green-400 w-10 h-10 mb-4" />
        <h2 className="text-2xl font-black mb-2">Algo deu errado</h2>
        <p className="text-gray-400 mb-6">{erro}</p>
        <Link href="/questionario" className="bg-green-400 text-black font-bold px-6 py-3 rounded-full hover:bg-green-300 transition">
          Tentar novamente
        </Link>
      </main>
    );
  }

  // RESULTADO
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-20">
      {/* Header */}
      <div className="bg-[#111] border-b border-white/5 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="text-green-400 w-6 h-6" />
            <span className="text-xl font-black">SPOTTER</span>
          </div>
          <button
            onClick={baixarPDF}
            className="flex items-center gap-2 bg-green-400 text-black font-bold px-4 py-2 rounded-full text-sm hover:bg-green-300 transition"
          >
            <FileDown className="w-4 h-4" />
            Baixar PDF
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 pt-8">
        {/* Boas-vindas */}
        <div className="bg-green-400/10 border border-green-400/30 rounded-2xl p-5 mb-8">
          <p className="text-green-400 font-bold text-sm mb-1">✅ Treino pronto, {nome}!</p>
          <p className="text-white/80 text-sm leading-relaxed">{treino?.resumo}</p>
          <p className="text-gray-500 text-xs mt-2">Divisão: <span className="text-gray-300">{treino?.divisao}</span></p>
        </div>

        {/* Dias de treino */}
        <div className="flex flex-col gap-4 mb-8">
          {treino?.dias.map((dia, index) => (
            <div key={index} className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden">
              {/* Header do dia */}
              <button
                onClick={() => toggleDia(index)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition"
              >
                <div className="text-left">
                  <p className="font-black text-green-400 text-sm">{dia.dia}</p>
                  <p className="text-white font-bold">{dia.foco}</p>
                  <p className="text-gray-500 text-xs">{dia.exercicios.length} exercícios</p>
                </div>
                {abertos.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {/* Exercícios */}
              {abertos.includes(index) && (
                <div className="border-t border-white/5">
                  {/* Header da tabela */}
                  <div className="grid grid-cols-12 px-5 py-2 text-xs text-gray-500 font-bold uppercase">
                    <span className="col-span-5">Exercício</span>
                    <span className="col-span-2 text-center">Séries</span>
                    <span className="col-span-3 text-center">Reps</span>
                    <span className="col-span-2 text-center">Desc.</span>
                  </div>
                  {dia.exercicios.map((ex, i) => (
                    <div
                      key={i}
                      className={`px-5 py-3 ${i % 2 === 0 ? "bg-white/[0.02]" : ""} border-t border-white/5`}
                    >
                      <div className="grid grid-cols-12 items-center">
                        <span className="col-span-5 font-medium text-sm">{ex.nome}</span>
                        <span className="col-span-2 text-center text-green-400 font-bold text-sm">{ex.series}</span>
                        <span className="col-span-3 text-center text-white/80 text-sm">{ex.repeticoes}</span>
                        <span className="col-span-2 text-center text-gray-400 text-xs">{ex.descanso}</span>
                      </div>
                      {ex.observacao && (
                        <p className="text-xs text-gray-500 mt-1 italic">→ {ex.observacao}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dicas */}
        {treino?.dicas && treino.dicas.length > 0 && (
          <div className="bg-[#111] border border-green-400/20 rounded-2xl p-5 mb-8">
            <h3 className="font-black text-green-400 mb-4">💡 Dicas do seu Personal IA</h3>
            <ul className="flex flex-col gap-2">
              {treino.dicas.map((dica, i) => (
                <li key={i} className="text-sm text-gray-300 flex gap-2">
                  <span className="text-green-400 flex-shrink-0">•</span>
                  <span>{dica}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Ações */}
        <div className="flex flex-col gap-3">
          <button
            onClick={baixarPDF}
            className="w-full flex items-center justify-center gap-2 bg-green-400 text-black font-black py-4 rounded-2xl hover:bg-green-300 transition"
          >
            <FileDown className="w-5 h-5" />
            Baixar meu treino em PDF
          </button>
          <Link
            href="/questionario"
            className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] text-white font-bold py-4 rounded-2xl hover:bg-white/10 transition border border-white/10"
          >
            <RotateCcw className="w-4 h-4" />
            Gerar novo treino
          </Link>
        </div>
      </div>
    </main>
  );
}
