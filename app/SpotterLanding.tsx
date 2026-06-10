"use client";

/* ───────────────────────────────────────────────────────────────────────────
   Landing page do Spotter — layout vindo do 21st.dev (Magic Chat).
   Mantém os efeitos originais (header animado, FloatingPaths no hero,
   contadores animados, accordion de FAQ) e conecta os CTAs "Começar" ao app
   via a prop `onEnter`. Responsivo desktop + mobile.
   ─────────────────────────────────────────────────────────────────────────── */

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Dumbbell,
  TrendingUp,
  Users,
  Trophy,
  Flame,
  RotateCcw,
  Music,
  Globe,
  CheckCircle,
  Star,
  ArrowRight,
  ChevronDown,
  Play,
  Zap,
  Heart,
  MessageCircle,
  Share2,
  CreditCard,
  HelpCircle,
  Sun,
  Moon,
} from "lucide-react";
import { SpotterLogo } from "./SpotterLogo";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { AuroraBackground } from "@/components/ui/aurora-background";

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ── Button ────────────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    const variants = {
      default: "bg-slate-900 text-white hover:bg-slate-800",
      outline: "border border-slate-300 bg-transparent hover:bg-slate-100",
      ghost: "hover:bg-slate-100 hover:text-slate-900",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// ── Card ──────────────────────────────────────────────────────────────────
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-slate-500", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

// ── Accordion ─────────────────────────────────────────────────────────────
const Accordion = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("space-y-2", className)}>{children}</div>
);

const AccordionItem = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("border border-slate-200 rounded-lg", className)}>{children}</div>
);

const AccordionTrigger = ({
  children,
  onClick,
  isOpen,
}: {
  children: React.ReactNode;
  onClick: () => void;
  isOpen: boolean;
}) => (
  <button
    onClick={onClick}
    className="flex w-full items-center justify-between p-4 text-left font-medium hover:bg-slate-50 transition-colors cursor-pointer"
  >
    {children}
    <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
  </button>
);

const AccordionContent = ({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4 pt-0 text-slate-600">{children}</div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ── Input / Textarea ────────────────────────────────────────────────────────
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

// ── Floating Paths Background ────────────────────────────────────────────────
function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
    // Duração determinística (evita Math.random no render) mantendo variação suave.
    duration: 20 + (i % 10),
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full text-slate-950" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: path.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// ── Stat Counter ──────────────────────────────────────────────────────────
interface StatCounterProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  delay: number;
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
  const countRef = useRef(null);
  const isInView = useInView(countRef, { once: false });

  const springValue = useSpring(0, { stiffness: 50, damping: 10 });

  // Anima até o valor quando entra na viewport; volta a zero ao sair.
  useEffect(() => {
    springValue.set(isInView ? value : 0);
  }, [isInView, value, springValue]);

  const displayValue = useTransform(springValue, (latest) => Math.floor(latest));

  return (
    <motion.div
      className="bg-white/50 backdrop-blur-sm p-6 rounded-xl flex flex-col items-center text-center group hover:bg-white transition-colors duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="w-14 h-14 rounded-full bg-slate-900/5 flex items-center justify-center mb-4 text-slate-700 group-hover:bg-slate-900/10 transition-colors duration-300"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div ref={countRef} className="text-3xl font-bold text-slate-900 flex items-center">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="text-slate-600 text-sm mt-1">{label}</p>
      <motion.div className="w-10 h-0.5 bg-slate-700 mt-3 group-hover:w-16 transition-all duration-300" />
    </motion.div>
  );
}

// ── Landing principal ───────────────────────────────────────────────────────
export default function SpotterLanding({
  onEnter,
  theme = "light",
  onToggleTheme,
}: {
  onEnter?: () => void;
  theme?: "light" | "dark";
  onToggleTheme?: () => void;
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const enter = () => onEnter?.();

  // Itens do menu (tubelight navbar) — apontam para as seções da página.
  const navItems = [
    { name: "Recursos", url: "#features", icon: Zap },
    { name: "Depoimentos", url: "#testimonials", icon: Star },
    { name: "Preços", url: "#pricing", icon: CreditCard },
    { name: "FAQ", url: "#faq", icon: HelpCircle },
  ];

  const features = [
    {
      icon: <Music className="w-6 h-6" />,
      title: "Estilo Spotify para Esportes",
      description:
        "Playlists de tendências com os treinos mais curtidos, experiência personalizada e gamificada.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Treinos em Tendência",
      description: "Descubra playlists com os treinos mais visualizados e curtidos pela comunidade.",
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "Fitness Rewind",
      description:
        "Reviva seus treinos mais frequentes e acompanhe sua evolução com métricas inteligentes.",
    },
    {
      icon: <Flame className="w-6 h-6" />,
      title: "Competição Amigável",
      description: "Sistema de streaks e ranking entre amigos usando gamificação fitness.",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Evolução Homem-Campeão",
      description: "Evolução pessoal com conquistas visuais e recompensas digitais.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Marketplace de Coaches",
      description:
        "Conecta treinadores e modalidades esportivas em um só lugar, fitness sob demanda.",
    },
  ];

  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Atleta Amador",
      content:
        "O Spotter transformou minha rotina de treinos! A gamificação me mantém motivado todos os dias.",
      avatar: "CS",
    },
    {
      name: "Ana Paula",
      role: "Personal Trainer",
      content:
        "Finalmente uma plataforma que une social media e fitness de forma inteligente. Meus alunos adoram!",
      avatar: "AP",
    },
    {
      name: "Roberto Costa",
      role: "Entusiasta Fitness",
      content:
        "O Fitness Rewind é incrível! Ver minha evolução ao longo do tempo me motiva a continuar.",
      avatar: "RC",
    },
  ];

  const faqs = [
    {
      question: "O que é o Spotter?",
      answer:
        "Spotter é uma rede social fitness que combina o melhor dos apps de treino com a interação social, oferecendo uma experiência gamificada e personalizada para manter você consistente em seus objetivos.",
    },
    {
      question: "Como funciona o sistema de streaks?",
      answer:
        "O sistema de streaks rastreia seus dias consecutivos de treino e permite competir com amigos. Quanto mais consistente você for, maior será seu streak e sua posição no ranking!",
    },
    {
      question: "O que é o Fitness Rewind?",
      answer:
        "É uma funcionalidade que analisa seus treinos mais frequentes e mostra sua evolução ao longo do tempo com métricas inteligentes, similar ao Spotify Wrapped mas para fitness.",
    },
    {
      question: "Como funciona o Marketplace de Coaches?",
      answer:
        "Conectamos você com treinadores certificados de diversas modalidades esportivas. Você pode contratar sessões sob demanda ou programas personalizados diretamente pela plataforma.",
    },
    {
      question: "O app é gratuito?",
      answer:
        "Oferecemos um plano gratuito com funcionalidades básicas e planos premium com recursos avançados, acesso ao marketplace de coaches e análises detalhadas.",
    },
  ];

  const stats = [
    { icon: <Users />, value: 50000, label: "Usuários Ativos", suffix: "+" },
    { icon: <Dumbbell />, value: 1000000, label: "Treinos Realizados", suffix: "+" },
    { icon: <Trophy />, value: 500, label: "Coaches Certificados", suffix: "+" },
    { icon: <Star />, value: 98, label: "Satisfação", suffix: "%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="container mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <SpotterLogo size={32} />
            <span className="text-xl font-bold text-slate-900">Spotter</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Botão de tema sol/lua */}
            <button
              onClick={onToggleTheme}
              aria-label={theme === "dark" ? "Modo claro" : "Modo escuro"}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 bg-white/80 hover:bg-slate-100 text-slate-700 transition-colors"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            {/* CTA (desktop) */}
            <Button variant="default" className="hidden md:inline-flex" onClick={enter}>
              Começar Agora
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* Menu — tubelight navbar (fixo: topo no desktop, base no mobile).
          Fica fora da <header> animada: um ancestral com `transform` quebraria
          o posicionamento `fixed` (ancorando-o à header em vez da viewport). */}
      <NavBar items={navItems} />

      {/* Hero Section */}
      <section ref={heroRef} className="overflow-hidden pt-16">
        <AuroraBackground className="min-h-screen" showRadialGradient>
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-slate-900/5 backdrop-blur-sm mb-6 border border-slate-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Zap className="w-4 h-4 mr-2 text-slate-700" />
              <span className="text-sm font-medium text-slate-700">Fitness Social Media Revolucionário</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight text-slate-900">
              Transforme Seus Treinos em{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900">
                Experiências Sociais
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Combine apps de treino com redes sociais. Playlists de treinos, gamificação, e uma comunidade que te mantém motivado todos os dias.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button size="sm" className="w-auto px-6 py-2.5" onClick={enter}>
                Começar Gratuitamente
                <ArrowRight className="ml-2 w-3.5 h-3.5" />
              </Button>
              <Button size="sm" variant="outline" className="w-auto px-6 py-2.5" onClick={enter}>
                <Play className="mr-2 w-3.5 h-3.5" />
                Ver Demo
              </Button>
            </div>
          </motion.div>
        </div>
        </AuroraBackground>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Recursos Poderosos</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Tudo que você precisa para transformar sua jornada fitness em uma experiência social e motivadora.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-slate-900/5 flex items-center justify-center mb-4 text-slate-700">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Números que Impressionam</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCounter
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">O Que Dizem Nossos Usuários</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Milhares de pessoas já transformaram seus treinos com o Spotter.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <CardTitle className="text-lg" style={{ color: "var(--ink)" }}>{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{testimonial.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Planos Para Todos</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Escolha o plano ideal para sua jornada fitness.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Gratuito",
                price: "R$ 0",
                period: "/mês",
                features: ["Treinos básicos", "Comunidade", "Streaks", "Perfil público"],
                cta: "Começar Grátis",
              },
              {
                name: "Premium",
                price: "R$ 29,90",
                period: "/mês",
                features: ["Tudo do Gratuito", "Playlists personalizadas", "Fitness Rewind", "Análises avançadas", "Sem anúncios"],
                cta: "Assinar Premium",
                popular: true,
              },
              {
                name: "Coach",
                price: "R$ 99,90",
                period: "/mês",
                features: ["Tudo do Premium", "Marketplace de coaches", "Sessões ilimitadas", "Programas personalizados", "Suporte prioritário"],
                cta: "Começar Agora",
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={cn("h-full relative", plan.popular && "border-slate-900 shadow-xl")}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Mais Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                      <span className="text-slate-600">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-slate-600">
                          <CheckCircle className="w-5 h-5 mr-2 text-slate-700" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} onClick={enter}>
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Perguntas Frequentes</h2>
            <p className="text-lg text-slate-600">Tire suas dúvidas sobre o Spotter.</p>
          </motion.div>

          <Accordion>
            {faqs.map((faq, index) => (
              <AccordionItem key={index}>
                <AccordionTrigger
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  isOpen={openFaq === index}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent isOpen={openFaq === index}>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Entre em Contato</h2>
            <p className="text-lg text-slate-600">Tem alguma dúvida? Estamos aqui para ajudar!</p>
          </motion.div>

          <Card>
            <CardContent className="pt-6">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nome</label>
                  <Input placeholder="Seu nome completo" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <Input type="email" placeholder="seu@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Mensagem</label>
                  <Textarea placeholder="Como podemos ajudar?" rows={4} />
                </div>
                <Button className="w-full" size="lg" type="submit">Enviar Mensagem</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <SpotterLogo size={24} tone="light" />
                <span className="text-lg font-bold">Spotter</span>
              </div>
              <p className="text-slate-400 text-sm">Transformando treinos em experiências sociais desde 2024.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Download</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Social</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Share2 className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><MessageCircle className="w-5 h-5" /></a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors"><Heart className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 Spotter. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
