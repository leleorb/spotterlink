"use client";

import { Dumbbell, Flame, Trophy, TrendingUp, Users, Sparkles, ArrowRight } from "lucide-react";
import { SpotterLogo } from "./SpotterLogo";

// Landing page de marketing — porte do projeto Lovable (spotterproject).
// Os CTAs de conversão chamam `onEnter` para avançar até a tela de login do app.
export default function MarketingLanding({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="landing-page min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5">
            <SpotterLogo size={34} />
            <span className="font-display font-bold text-xl tracking-tight">Spotter</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">Recursos</a>
            <a href="#trends" className="hover:text-foreground transition">Trends</a>
            <a href="#compete" className="hover:text-foreground transition">Competição</a>
          </nav>
          <button
            onClick={onEnter}
            className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition"
          >
            Entrar na lista <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/40 text-xs text-muted-foreground mb-8">
            <Sparkles className="h-3.5 w-3.5" /> Em breve · Lista de espera aberta
          </div>
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl mx-auto">
            Seu foco.<br />
            <span className="bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">Seu progresso.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            O Spotter monta seus treinos, mostra os <strong className="text-foreground">trends do momento</strong> e transforma sua jornada na academia numa competição com os amigos.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onEnter}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-semibold hover:opacity-90 transition"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              Garantir meu acesso <ArrowRight className="h-4 w-4" />
            </button>
            <a href="#features" className="inline-flex items-center justify-center gap-2 border border-border bg-card/40 px-7 py-3.5 rounded-full font-semibold hover:bg-card transition">
              Ver como funciona
            </a>
          </div>

          {/* Logo float */}
          <div className="mt-20 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl opacity-40 bg-accent rounded-full" />
              <div className="relative animate-pulse" style={{ animationDuration: "4s" }}>
                <SpotterLogo size={176} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-28">
        <div className="max-w-2xl mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Recursos</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl">Tudo que você precisa para evoluir na academia.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: Dumbbell, title: "Criador de treinos", desc: "Monte rotinas personalizadas em segundos. Por grupo muscular, objetivo ou nível." },
            { icon: TrendingUp, title: "Treinos Trends", desc: "Descubra o que está bombando na comunidade — as rotinas mais populares do momento." },
            { icon: Trophy, title: "Competição entre amigos", desc: "Rankings, streaks e desafios com sua turma. Quem treinar mais, vence." },
          ].map((f) => (
            <div key={f.title} className="group p-8 rounded-2xl border border-border hover:border-accent/50 transition" style={{ background: "var(--gradient-card)" }}>
              <div className="inline-flex p-3 rounded-xl bg-accent/15 text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-2xl mb-2">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trends */}
      <section id="trends" className="relative py-28 border-y border-border" style={{ background: "var(--gradient-card)" }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4 flex items-center gap-2">
              <Flame className="h-4 w-4" /> Treinos Trends
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">As rotinas mais quentes da semana.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Descubra as rotinas mais populares da comunidade — as trending workouts da semana, curadas e prontas para você salvar e executar.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              {["Top 50 — Peito & Tríceps", "Em alta na sua academia", "Recomendado para você", "Releituras dos atletas"].map((i) => (
                <li key={i} className="flex items-center gap-3"><div className="h-1.5 w-1.5 rounded-full bg-accent" />{i}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            {[
              { rank: "01", name: "Push Day Brutal", plays: "12.4k", trend: "+18%" },
              { rank: "02", name: "Leg Day Sem Mercy", plays: "9.8k", trend: "+24%" },
              { rank: "03", name: "Full Body 45min", plays: "8.1k", trend: "+12%" },
              { rank: "04", name: "Costas Espessura", plays: "6.7k", trend: "+9%" },
              { rank: "05", name: "Ombro Cabeçudo", plays: "5.2k", trend: "+31%" },
            ].map((t) => (
              <div key={t.rank} className="flex items-center gap-4 p-4 rounded-xl bg-background/40 border border-border hover:border-accent/50 transition">
                <div className="font-display font-bold text-2xl text-muted-foreground w-10">{t.rank}</div>
                <div className="flex-1">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.plays} treinos esta semana</div>
                </div>
                <div className="text-sm font-semibold text-accent">{t.trend}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compete */}
      <section id="compete" className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
            {[
              { label: "Streak", value: "47", unit: "dias" },
              { label: "Ranking", value: "#3", unit: "entre amigos" },
              { label: "Treinos", value: "184", unit: "este ano" },
              { label: "PRs", value: "12", unit: "novos recordes" },
            ].map((s) => (
              <div key={s.label} className="p-6 rounded-2xl border border-border" style={{ background: "var(--gradient-card)" }}>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{s.label}</div>
                <div className="font-display font-bold text-4xl">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.unit}</div>
              </div>
            ))}
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4 flex items-center gap-2">
              <Users className="h-4 w-4" /> Competição
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">Treinar sozinho cansa. Competir vicia.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Crie ligas com seus amigos, mantenha sua streak viva e suba no ranking. Cada treino registrado é um ponto a mais — e uma desculpa a menos.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative py-28" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <SpotterLogo size={64} />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-6xl mb-6">
            Pronto pra travar o foco?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Entre na lista de espera e seja um dos primeiros a usar o Spotter.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => { e.preventDefault(); onEnter(); }}
          >
            <input type="email" required placeholder="seu@email.com" className="flex-1 px-5 py-3.5 rounded-full bg-card border border-border focus:border-accent focus:outline-none text-foreground placeholder:text-muted-foreground" />
            <button type="submit" className="bg-primary text-primary-foreground px-6 py-3.5 rounded-full font-semibold hover:opacity-90 transition" style={{ boxShadow: "var(--shadow-glow)" }}>
              Quero acesso
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <SpotterLogo size={28} />
            <span className="font-display font-semibold">Spotter</span>
            <span className="text-sm text-muted-foreground ml-3">Seu foco, seu progresso.</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Spotter. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
