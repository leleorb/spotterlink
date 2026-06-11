"use client";

/* ───────────────────────────────────────────────────────────────────────────
   PÁGINA-BASE DO SEU SITE
   Esqueleto reutilizável construído sobre o design system Apple-light do
   Spotter (definido em app/globals.css). Use isto como ponto de partida:
   troque os textos, ícones e seções pelo conteúdo do seu site.

   Acesse em: /base

   Blocos reaproveitáveis do design system já disponíveis globalmente:
   - Tokens de cor/typo: var(--ink), var(--accent), var(--bg), .text-display…
   - Componentes: .card, .btn-primary, .btn-secondary, .btn-icon, .chip,
     .input, .filter-pill, .section-title, .section-sub, .topbar, .divider
   - Animações: .fade-up, .grid-item, .stagger-item
   ─────────────────────────────────────────────────────────────────────────── */

import { useState } from "react";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowRight,
  Check,
} from "lucide-react";

// Edite estes dados — eles alimentam as seções abaixo.
const FEATURES = [
  {
    icon: Zap,
    title: "Rápido de verdade",
    desc: "Substitua por uma frase curta que vende o benefício principal do seu produto.",
  },
  {
    icon: ShieldCheck,
    title: "Confiável",
    desc: "Outro diferencial. Mantenha frases diretas, no estilo apple.com.",
  },
  {
    icon: Sparkles,
    title: "Bonito por padrão",
    desc: "O terceiro pilar. Três cards costumam ser o número ideal aqui.",
  },
];

const PLANS = [
  { name: "Grátis", price: "R$ 0", perks: ["Recurso um", "Recurso dois", "Recurso três"], highlight: false },
  { name: "Pro", price: "R$ 29", perks: ["Tudo do Grátis", "Recurso avançado", "Suporte prioritário"], highlight: true },
];

export default function BasePage() {
  const [email, setEmail] = useState("");

  return (
    <div className="landing-page" style={{ minHeight: "100dvh", background: "var(--bg-pure)" }}>
      {/* ── Topbar / Navegação ───────────────────────────────────────────── */}
      <header className="topbar" style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "var(--ink)",
              display: "grid",
              placeItems: "center",
              color: "#fff",
              fontWeight: 800,
            }}
          >
            S
          </div>
          <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: "-0.01em" }}>SeuSite</span>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href="#features" className="filter-pill" style={{ textDecoration: "none" }}>
            Recursos
          </a>
          <a href="#pricing" className="filter-pill" style={{ textDecoration: "none" }}>
            Planos
          </a>
          <button className="btn-primary" style={{ width: "auto", padding: "9px 18px" }}>
            Começar
          </button>
        </nav>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="fade-up"
        style={{
          position: "relative",
          background: "var(--gradient-hero)",
          padding: "88px 24px 96px",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative" }}>
          <span className="chip chip-blue" style={{ marginBottom: 24 }}>
            <Sparkles size={13} style={{ marginRight: 5 }} /> Novidade · 2026
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              margin: "0 0 20px",
            }}
          >
            O título principal
            <br />
            <span style={{ color: "var(--ink-3)" }}>do seu site aqui.</span>
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
              color: "var(--ink-2)",
              maxWidth: 540,
              margin: "0 auto 32px",
              lineHeight: 1.5,
            }}
          >
            Uma frase de subtítulo que explica, em uma respiração, o que você
            oferece e para quem. Curta e clara.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" style={{ width: "auto", padding: "14px 28px" }}>
              Começar agora <ArrowRight size={17} />
            </button>
            <button className="btn-secondary" style={{ width: "auto", padding: "14px 28px" }}>
              Saber mais
            </button>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section id="features" style={{ maxWidth: 1120, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 className="section-title" style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}>
            Por que escolher você
          </h2>
          <p className="section-sub" style={{ maxWidth: 460, margin: "8px auto 0" }}>
            Três motivos curtos e diretos. Edite o array FEATURES no topo do arquivo.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="card grid-item"
                style={{ padding: 28, ["--i" as string]: i }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    background: "var(--accent-soft)",
                    color: "var(--accent)",
                    display: "grid",
                    placeItems: "center",
                    marginBottom: 18,
                  }}
                >
                  <Icon size={22} />
                </div>
                <h3 className="text-title" style={{ marginBottom: 8 }}>
                  {f.title}
                </h3>
                <p className="text-body" style={{ color: "var(--ink-2)", margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────────────────── */}
      <section id="pricing" style={{ background: "var(--surface-2)", padding: "72px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 className="section-title" style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}>
              Planos simples
            </h2>
            <p className="section-sub" style={{ marginTop: 8 }}>
              Edite o array PLANS para ajustar preços e benefícios.
            </p>
          </div>

          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {PLANS.map((p) => (
              <div
                key={p.name}
                className="card"
                style={{
                  padding: 28,
                  border: p.highlight ? "1.5px solid var(--accent)" : undefined,
                }}
              >
                {p.highlight && (
                  <span className="chip chip-blue" style={{ marginBottom: 14 }}>
                    Mais popular
                  </span>
                )}
                <h3 className="text-title" style={{ marginBottom: 4 }}>
                  {p.name}
                </h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 20 }}>
                  <span className="text-display" style={{ fontSize: "2rem" }}>
                    {p.price}
                  </span>
                  <span style={{ color: "var(--ink-3)", fontSize: 14 }}>/mês</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "grid", gap: 10 }}>
                  {p.perks.map((perk) => (
                    <li key={perk} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Check size={16} style={{ color: "var(--go-ink)", flexShrink: 0 }} />
                      <span className="text-body" style={{ color: "var(--ink-2)" }}>
                        {perk}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className={p.highlight ? "btn-primary" : "btn-secondary"}>
                  Escolher {p.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / Captura de email ───────────────────────────────────────── */}
      <section style={{ maxWidth: 560, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <h2 className="section-title" style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}>
          Entre na lista de espera
        </h2>
        <p className="section-sub" style={{ marginTop: 8, marginBottom: 24 }}>
          Conecte este formulário ao seu backend (ex.: Supabase já está no projeto).
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(`Email capturado: ${email}`);
          }}
          style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
        >
          <input
            className="input"
            type="email"
            required
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ flex: "1 1 220px", width: "auto" }}
          />
          <button className="btn-primary" type="submit" style={{ width: "auto", padding: "13px 24px" }}>
            Entrar
          </button>
        </form>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid var(--border-soft)", padding: "32px 24px" }}>
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ color: "var(--ink-3)", fontSize: 13 }}>© 2026 SeuSite. Todos os direitos reservados.</span>
          <div style={{ display: "flex", gap: 16 }}>
            <a href="#" style={{ color: "var(--ink-2)", fontSize: 13, textDecoration: "none" }}>Privacidade</a>
            <a href="#" style={{ color: "var(--ink-2)", fontSize: 13, textDecoration: "none" }}>Termos</a>
            <a href="#" style={{ color: "var(--ink-2)", fontSize: 13, textDecoration: "none" }}>Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
