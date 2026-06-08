import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { nome, respostas } = await req.json();

  const prompt = `Você é um personal trainer especialista. Com base nas respostas abaixo, crie uma planilha de treino personalizada e completa.

Nome do aluno: ${nome}
Objetivo: ${respostas.objetivo}
Nível: ${respostas.nivel}
Dias por semana: ${respostas.diasSemana}
Tempo por treino: ${respostas.tempoPorTreino}
Sexo: ${respostas.sexo}
Faixa de idade: ${respostas.idade}
Faixa de peso: ${respostas.peso}
Faixa de altura: ${respostas.altura}
Local de treino: ${respostas.localTreino}
Limitações: ${respostas.restricoes}

Retorne APENAS um JSON válido, sem texto extra, no seguinte formato:
{
  "resumo": "Frase motivacional personalizada para ${nome} com base no objetivo",
  "divisao": "Ex: Treino ABC, Upper/Lower, Full Body, etc.",
  "dias": [
    {
      "dia": "Dia A — Segunda-feira",
      "foco": "Ex: Peito e Tríceps",
      "exercicios": [
        {
          "nome": "Nome do Exercício",
          "series": "4",
          "repeticoes": "10-12",
          "descanso": "60s",
          "observacao": "Dica de execução ou variação"
        }
      ]
    }
  ],
  "dicas": ["Dica 1", "Dica 2", "Dica 3"]
}`;

  const message = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";

  // Extrai JSON da resposta
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return NextResponse.json({ error: "Erro ao gerar treino" }, { status: 500 });
  }

  const treino = JSON.parse(jsonMatch[0]);
  return NextResponse.json({ treino });
}
