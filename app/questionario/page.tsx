"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dumbbell } from "lucide-react";

const perguntas = [
  {
    id: "objetivo",
    pergunta: "Qual é o seu principal objetivo?",
    opcoes: ["Emagrecer / Perder gordura", "Ganhar massa muscular", "Definir o corpo", "Melhorar condicionamento", "Saúde e bem-estar geral"],
  },
  {
    id: "nivel",
    pergunta: "Qual é o seu nível de experiência na academia?",
    opcoes: ["Iniciante (menos de 6 meses)", "Intermediário (6 meses a 2 anos)", "Avançado (mais de 2 anos)"],
  },
  {
    id: "diasSemana",
    pergunta: "Quantos dias por semana você pode treinar?",
    opcoes: ["2 dias", "3 dias", "4 dias", "5 dias", "6 dias"],
  },
  {
    id: "tempoPorTreino",
    pergunta: "Quanto tempo você tem por treino?",
    opcoes: ["Até 30 minutos", "45 minutos", "1 hora", "1h30 ou mais"],
  },
  {
    id: "sexo",
    pergunta: "Qual é o seu sexo biológico?",
    opcoes: ["Masculino", "Feminino"],
  },
  {
    id: "idade",
    pergunta: "Qual é a sua faixa de idade?",
    opcoes: ["Menos de 18 anos", "18 a 25 anos", "26 a 35 anos", "36 a 45 anos", "Acima de 45 anos"],
  },
  {
    id: "peso",
    pergunta: "Qual é a sua faixa de peso?",
    opcoes: ["Até 60kg", "60kg a 75kg", "76kg a 90kg", "91kg a 110kg", "Acima de 110kg"],
  },
  {
    id: "altura",
    pergunta: "Qual é a sua faixa de altura?",
    opcoes: ["Até 1,60m", "1,61m a 1,70m", "1,71m a 1,80m", "Acima de 1,80m"],
  },
  {
    id: "localTreino",
    pergunta: "Onde você vai treinar?",
    opcoes: ["Academia completa", "Academia simples (equipamentos básicos)", "Em casa (com halteres)", "Em casa (sem equipamentos)"],
  },
  {
    id: "restricoes",
    pergunta: "Você tem alguma limitação física ou lesão?",
    opcoes: ["Não tenho limitações", "Problema no joelho", "Problema na coluna / lombar", "Problema no ombro", "Outra limitação"],
  },
];

export default function Questionario() {
  const router = useRouter();
  const [etapa, setEtapa] = useState<"nome" | "perguntas">("nome");
  const [nome, setNome] = useState("");
  const [step, setStep] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, string>>({});

  const progresso = Math.round((step / perguntas.length) * 100);

  function handleNome() {
    if (nome.trim().length < 2) return;
    setEtapa("perguntas");
  }

  function handleOpcao(opcao: string) {
    const perguntaAtual = perguntas[step];
    const novasRespostas = { ...respostas, [perguntaAtual.id]: opcao };
    setRespostas(novasRespostas);

    if (step < perguntas.length - 1) {
      setStep(step + 1);
    } else {
      // Salva no sessionStorage e vai para resultado
      sessionStorage.setItem("spotter_nome", nome);
      sessionStorage.setItem("spotter_respostas", JSON.stringify(novasRespostas));
      router.push("/resultado");
    }
  }

  // TELA DE NOME
  if (etapa === "nome") {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6">
        <div className="flex items-center gap-2 mb-12">
          <Dumbbell className="text-green-400 w-7 h-7" />
          <span className="text-2xl font-black">SPOTTER</span>
        </div>
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-black mb-2 text-center">Olá! Vamos começar.</h1>
          <p className="text-gray-400 text-center mb-8">Qual é o seu primeiro nome?</p>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleNome()}
            placeholder="Digite seu nome..."
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl px-5 py-4 text-white text-lg outline-none focus:border-green-400 transition text-center"
            autoFocus
          />
          <button
            onClick={handleNome}
            disabled={nome.trim().length < 2}
            className="w-full mt-4 bg-green-400 text-black font-black text-lg py-4 rounded-2xl hover:bg-green-300 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continuar →
          </button>
        </div>
      </main>
    );
  }

  // TELA DE PERGUNTAS
  const perguntaAtual = perguntas[step];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <Dumbbell className="text-green-400 w-6 h-6" />
        <span className="text-xl font-black">SPOTTER</span>
      </div>

      {/* Progresso */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Pergunta {step + 1} de {perguntas.length}</span>
          <span>{progresso}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-green-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      {/* Pergunta */}
      <div className="flex-1 flex flex-col max-w-xl mx-auto w-full">
        <p className="text-gray-400 text-sm mb-2">Olá, {nome}!</p>
        <h2 className="text-2xl md:text-3xl font-black mb-8 leading-snug">
          {perguntaAtual.pergunta}
        </h2>

        {/* Opções */}
        <div className="flex flex-col gap-3">
          {perguntaAtual.opcoes.map((opcao) => (
            <button
              key={opcao}
              onClick={() => handleOpcao(opcao)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl px-5 py-4 text-left font-medium hover:border-green-400 hover:bg-green-400/5 transition text-sm md:text-base"
            >
              {opcao}
            </button>
          ))}
        </div>

        {/* Voltar */}
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="mt-6 text-gray-500 text-sm hover:text-gray-300 transition text-center"
          >
            ← Voltar
          </button>
        )}
      </div>
    </main>
  );
}
