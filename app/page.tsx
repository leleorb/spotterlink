"use client";

import { useState, useRef } from "react";
import { useExercises, MUSCLE_GROUPS, EQUIPMENT_OPTIONS } from "@/lib/useExercises";
import { SpotterLogo } from "./SpotterLogo";
import MarketingLanding from "./MarketingLanding";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Difficulty = "Iniciante" | "Intermediário" | "Avançado";
type Tab = "criar" | "comunidade" | "competicao";

interface Exercise {
  id: number; name: string; muscle: string;
  equipment: string; difficulty: Difficulty; icon: string;
}
interface BuiltExercise extends Exercise {
  sets: string; reps: string; rest: string;
}
interface CommunityWorkout {
  id: number; title: string; creator: string; avatar: string;
  likes: number; comments: number; difficulty: Difficulty;
  duration: string; exercises: number; tags: string[]; liked: boolean;
}
interface Friend {
  id: number; name: string; avatar: string;
  workouts: number; goal: number; streak: number; isMe?: boolean;
}
interface FeedItem {
  id: number; user: string; avatar: string; workout: string;
  date: string; duration: string; hasMedia: boolean;
  mediaType?: "photo" | "video"; mediaPreview?: string;
  likes: number; comment?: string;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const CATALOG: Exercise[] = [
  { id:1,  name:"Supino Reto",          muscle:"Peito",   equipment:"Barra",         difficulty:"Intermediário", icon:"🏋️" },
  { id:2,  name:"Supino Inclinado",     muscle:"Peito",   equipment:"Halteres",      difficulty:"Intermediário", icon:"💪" },
  { id:3,  name:"Crossover",            muscle:"Peito",   equipment:"Cabo",          difficulty:"Iniciante",     icon:"🔗" },
  { id:4,  name:"Flexão de Braços",     muscle:"Peito",   equipment:"Peso Corporal", difficulty:"Iniciante",     icon:"🙌" },
  { id:5,  name:"Peck Deck",            muscle:"Peito",   equipment:"Máquina",       difficulty:"Iniciante",     icon:"⚙️" },
  { id:6,  name:"Barra Fixa",           muscle:"Costas",  equipment:"Barra",         difficulty:"Avançado",      icon:"🏃" },
  { id:7,  name:"Remada Curvada",       muscle:"Costas",  equipment:"Barra",         difficulty:"Intermediário", icon:"🔄" },
  { id:8,  name:"Puxada Alta",          muscle:"Costas",  equipment:"Cabo",          difficulty:"Iniciante",     icon:"⬇️" },
  { id:9,  name:"Remada Unilateral",    muscle:"Costas",  equipment:"Halteres",      difficulty:"Intermediário", icon:"↩️" },
  { id:10, name:"Serrote",              muscle:"Costas",  equipment:"Halteres",      difficulty:"Iniciante",     icon:"🪚" },
  { id:11, name:"Agachamento Livre",    muscle:"Pernas",  equipment:"Barra",         difficulty:"Intermediário", icon:"🦵" },
  { id:12, name:"Leg Press 45°",       muscle:"Pernas",  equipment:"Máquina",       difficulty:"Iniciante",     icon:"🔩" },
  { id:13, name:"Cadeira Extensora",    muscle:"Pernas",  equipment:"Máquina",       difficulty:"Iniciante",     icon:"🪑" },
  { id:14, name:"Mesa Flexora",         muscle:"Pernas",  equipment:"Máquina",       difficulty:"Iniciante",     icon:"🛏️" },
  { id:15, name:"Stiff",               muscle:"Pernas",  equipment:"Barra",         difficulty:"Intermediário", icon:"🏗️" },
  { id:16, name:"Panturrilha em Pé",   muscle:"Pernas",  equipment:"Máquina",       difficulty:"Iniciante",     icon:"👟" },
  { id:17, name:"Afundo",              muscle:"Pernas",  equipment:"Halteres",      difficulty:"Intermediário", icon:"🎯" },
  { id:18, name:"Desenvolvimento",     muscle:"Ombros",  equipment:"Barra",         difficulty:"Intermediário", icon:"🎖️" },
  { id:19, name:"Elevação Lateral",    muscle:"Ombros",  equipment:"Halteres",      difficulty:"Iniciante",     icon:"🦅" },
  { id:20, name:"Elevação Frontal",    muscle:"Ombros",  equipment:"Halteres",      difficulty:"Iniciante",     icon:"⬆️" },
  { id:21, name:"Arnold Press",        muscle:"Ombros",  equipment:"Halteres",      difficulty:"Avançado",      icon:"🌀" },
  { id:22, name:"Encolhimento",        muscle:"Ombros",  equipment:"Halteres",      difficulty:"Iniciante",     icon:"🤷" },
  { id:23, name:"Rosca Direta",        muscle:"Bíceps",  equipment:"Barra",         difficulty:"Iniciante",     icon:"💪" },
  { id:24, name:"Rosca Alternada",     muscle:"Bíceps",  equipment:"Halteres",      difficulty:"Iniciante",     icon:"🔁" },
  { id:25, name:"Rosca Martelo",       muscle:"Bíceps",  equipment:"Halteres",      difficulty:"Iniciante",     icon:"🔨" },
  { id:26, name:"Rosca Scott",         muscle:"Bíceps",  equipment:"Máquina",       difficulty:"Intermediário", icon:"📐" },
  { id:27, name:"Tríceps Testa",       muscle:"Tríceps", equipment:"Barra",         difficulty:"Intermediário", icon:"🧠" },
  { id:28, name:"Tríceps Corda",       muscle:"Tríceps", equipment:"Cabo",          difficulty:"Iniciante",     icon:"🎗️" },
  { id:29, name:"Tríceps Francês",     muscle:"Tríceps", equipment:"Halteres",      difficulty:"Intermediário", icon:"🗼" },
  { id:30, name:"Mergulho no Banco",   muscle:"Tríceps", equipment:"Peso Corporal", difficulty:"Iniciante",     icon:"🏊" },
  { id:31, name:"Crunch",              muscle:"Core",    equipment:"Peso Corporal", difficulty:"Iniciante",     icon:"🌊" },
  { id:32, name:"Prancha",             muscle:"Core",    equipment:"Peso Corporal", difficulty:"Iniciante",     icon:"📋" },
  { id:33, name:"Abdominal Oblíquo",  muscle:"Core",    equipment:"Peso Corporal", difficulty:"Iniciante",     icon:"↗️" },
  { id:34, name:"Elevação de Pernas", muscle:"Core",    equipment:"Peso Corporal", difficulty:"Intermediário", icon:"🦿" },
  { id:35, name:"Esteira",            muscle:"Cardio",  equipment:"Máquina",       difficulty:"Iniciante",     icon:"🏃" },
  { id:36, name:"Bicicleta Ergométrica", muscle:"Cardio", equipment:"Máquina",     difficulty:"Iniciante",     icon:"🚴" },
  { id:37, name:"Elíptico",           muscle:"Cardio",  equipment:"Máquina",       difficulty:"Iniciante",     icon:"🔄" },
  { id:38, name:"Corda de Pular",     muscle:"Cardio",  equipment:"Corda",         difficulty:"Intermediário", icon:"🪢" },
];

const MUSCLES = [
  "Todos",
  "Peito",
  "Costas",
  "Pernas",
  "Ombros",
  "Bíceps",
  "Tríceps",
  "Core",
  "Antebraços",
  "Glúteos",
  "Trapézio",
];

const COMMUNITY: CommunityWorkout[] = [
  { id:1, title:"Push Day Devastador",       creator:"Carlos Lima",  avatar:"CL", likes:347, comments:42, difficulty:"Avançado",      duration:"75min", exercises:8, tags:["Peito","Ombros"],   liked:false },
  { id:2, title:"Leg Day do Inferno",        creator:"Ana Ferreira", avatar:"AF", likes:289, comments:31, difficulty:"Intermediário", duration:"60min", exercises:7, tags:["Pernas","Glúteos"], liked:false },
  { id:3, title:"Full Body Iniciante",       creator:"Pedro Santos", avatar:"PS", likes:512, comments:87, difficulty:"Iniciante",     duration:"45min", exercises:6, tags:["Full Body"],        liked:true  },
  { id:4, title:"Costas e Bíceps",          creator:"Julia Costa",  avatar:"JC", likes:203, comments:19, difficulty:"Intermediário", duration:"55min", exercises:7, tags:["Costas","Bíceps"],  liked:false },
  { id:5, title:"Core Challenger 30 dias",  creator:"Rafael Neves", avatar:"RN", likes:445, comments:63, difficulty:"Intermediário", duration:"30min", exercises:8, tags:["Core","Desafio"],   liked:false },
  { id:6, title:"Pump de Braços Express",   creator:"Marcos Souza", avatar:"MS", likes:178, comments:14, difficulty:"Iniciante",     duration:"25min", exercises:4, tags:["Bíceps","Tríceps"], liked:true  },
];

const FRIENDS: Friend[] = [
  { id:1, name:"Rafael Neves", avatar:"RN", workouts:27, goal:20, streak:14 },
  { id:2, name:"Ana Ferreira", avatar:"AF", workouts:22, goal:20, streak:12 },
  { id:3, name:"Carlos Lima",  avatar:"CL", workouts:18, goal:20, streak:7  },
  { id:4, name:"Pedro Santos", avatar:"PS", workouts:15, goal:20, streak:5  },
  { id:5, name:"Você",         avatar:"EU", workouts:13, goal:20, streak:6, isMe:true },
  { id:6, name:"Julia Costa",  avatar:"JC", workouts:9,  goal:20, streak:3  },
];

const FEED: FeedItem[] = [
  { id:1, user:"Ana Ferreira", avatar:"AF", workout:"Push Day Devastador", date:"Hoje, 08:30", duration:"72min", hasMedia:true,  mediaType:"photo", likes:8,  comment:"Arrasando! 💪" },
  { id:2, user:"Rafael Neves", avatar:"RN", workout:"Leg Day do Inferno",  date:"Hoje, 06:15", duration:"65min", hasMedia:true,  mediaType:"video", likes:12, comment:"Mais um dia de dedicação 🔥" },
  { id:3, user:"Carlos Lima",  avatar:"CL", workout:"Core Challenger",     date:"Ontem, 19h",  duration:"31min", hasMedia:false,                    likes:5,  comment:"Prancha por 3 min — novo recorde!" },
  { id:4, user:"Pedro Santos", avatar:"PS", workout:"Full Body Iniciante", date:"Ontem, 17h",  duration:"47min", hasMedia:true,  mediaType:"photo", likes:7,  comment:"Consistência é tudo! 💯" },
];

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

// Paleta de gradientes por usuário — colorize: identidade visual individual
const AVATAR_COLORS: Record<string, string> = {
  EU: "linear-gradient(135deg, #1e40af, #3b82f6)",   // Você — azul marca
  RN: "linear-gradient(135deg, #5b21b6, #a78bfa)",   // Rafael — violeta
  AF: "linear-gradient(135deg, #9d174d, #f472b6)",   // Ana — rosa
  CL: "linear-gradient(135deg, #065f46, #34d399)",   // Carlos — esmeralda
  PS: "linear-gradient(135deg, #92400e, #fbbf24)",   // Pedro — âmbar
  JC: "linear-gradient(135deg, #1e3a8a, #818cf8)",   // Julia — índigo
  MS: "linear-gradient(135deg, #155e75, #22d3ee)",   // Marcos — ciano
};

function Av({ initials, size = 36 }: { initials: string; size?: number }) {
  const bg = AVATAR_COLORS[initials] ?? "linear-gradient(135deg, #1e40af, #3b82f6)";
  return (
    <div className="avatar" style={{ width: size, height: size, minWidth: size, fontSize: size < 32 ? "var(--text-xs)" : "var(--text-sm)", background: bg }}>
      {initials}
    </div>
  );
}

function DiffChip({ d }: { d: Difficulty }) {
  const cls = d === "Iniciante" ? "chip-green" : d === "Intermediário" ? "chip-yellow" : "chip-red";
  return <span className={`chip ${cls}`}>{d}</span>;
}

// ─── TAB: CRIAR TREINO ────────────────────────────────────────────────────────

// Map ExerciseDB muscle/target names (English) to Portuguese
const MUSCLE_MAP: Record<string, string> = {
  // body parts
  "chest": "Peito",
  "back": "Costas",
  "legs": "Pernas",
  "upper legs": "Pernas",
  "lower legs": "Pernas",
  "upper arms": "Braços",
  "lower arms": "Antebraços",
  "shoulders": "Ombros",
  "waist": "Core",
  "cardio": "Cardio",
  "neck": "Pescoço",
  // targets / muscles
  "pectorals": "Peito",
  "lats": "Dorsais",
  "upper back": "Costas",
  "spine": "Coluna",
  "biceps": "Bíceps",
  "triceps": "Tríceps",
  "forearms": "Antebraços",
  "delts": "Ombros",
  "serratus anterior": "Serrátil",
  "abs": "Abdômen",
  "abdominals": "Core",
  "glutes": "Glúteos",
  "quads": "Quadríceps",
  "quadriceps": "Quadríceps",
  "hamstrings": "Posteriores",
  "calves": "Panturrilha",
  "traps": "Trapézio",
  "levator scapulae": "Pescoço",
  "adductors": "Adutores",
  "abductors": "Abdutores",
  "cardiovascular system": "Cardio",
};

// Reverse map: Portuguese to English for API
const MUSCLE_REVERSE_MAP: Record<string, string> = {
  "Peito": "chest",
  "Costas": "back",
  "Pernas": "legs",
  "Ombros": "shoulders",
  "Bíceps": "biceps",
  "Tríceps": "triceps",
  "Antebraços": "forearms",
  "Core": "abdominals",
  "Glúteos": "glutes",
  "Quadríceps": "quadriceps",
  "Posteriores": "hamstrings",
  "Panturrilha": "calves",
  "Trapézio": "traps",
};

// Translate ExerciseDB difficulty → PT label
function mapDifficulty(d: string): Difficulty {
  const v = (d || "").toLowerCase();
  if (v === "beginner") return "Iniciante";
  if (v === "advanced" || v === "expert") return "Avançado";
  return "Intermediário";
}

const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

// Exercise enriched with ExerciseDB detail (image id, instructions, etc.)
interface DisplayExercise extends Exercise {
  exDbId?: string;
  instructions?: string[];
  description?: string;
  secondaryMuscles?: string[];
  bodyPart?: string;
  target?: string;
}

// ─── EXERCISE DETAIL SHEET ────────────────────────────────────────────────────

function ExerciseDetail({
  ex, added, onToggle, onClose,
}: {
  ex: DisplayExercise; added: boolean; onToggle: () => void; onClose: () => void;
}) {
  const [imgState, setImgState] = useState<"loading" | "ok" | "error">(
    ex.exDbId ? "loading" : "error"
  );

  const ytQuery = encodeURIComponent(`como fazer ${ex.name} academia`);
  const ytUrl = `https://www.youtube.com/results?search_query=${ytQuery}`;

  const muscles = [
    ...(ex.target ? [MUSCLE_MAP[ex.target] || cap(ex.target)] : []),
    ...((ex.secondaryMuscles || []).map(m => MUSCLE_MAP[m] || cap(m))),
  ];

  return (
    <div className="sheet-overlay" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div style={{ padding: "0 20px 24px" }}>
          {/* GIF / visual */}
          <div style={{
            position: "relative", width: "100%", aspectRatio: "1 / 1",
            maxHeight: 320, borderRadius: 18, overflow: "hidden", marginBottom: 18,
            background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {ex.exDbId && imgState !== "error" && (
              <img
                src={`/api/exercise-image?id=${ex.exDbId}&resolution=360`}
                alt={ex.name}
                onLoad={() => setImgState("ok")}
                onError={() => setImgState("error")}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            )}
            {imgState === "loading" && (
              <div style={{ position: "absolute", color: "#0c1f3f", fontSize: "var(--text-sm)", fontWeight: "var(--weight-bold)" as unknown as number }}>
                Carregando demonstração…
              </div>
            )}
            {imgState === "error" && (
              <div style={{ textAlign: "center", color: "#0c1f3f" }}>
                <div style={{ fontSize: 56 }}>{ex.icon}</div>
                <p style={{ fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)" as unknown as number, opacity: 0.6, marginTop: 4 }}>
                  Demonstração indisponível
                </p>
              </div>
            )}
          </div>

          {/* Title + difficulty */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
            <h2 style={{ fontSize: "var(--text-xl)", fontWeight: "var(--weight-extrabold)" as unknown as number, color: "#fff", lineHeight: 1.2 }}>
              {ex.name}
            </h2>
            <DiffChip d={ex.difficulty} />
          </div>

          {/* Muscle + equipment chips */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
            {muscles.map((m, i) => (
              <span key={m + i} className={`chip ${i === 0 ? "chip-blue" : ""}`}
                style={i === 0 ? undefined : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)" }}>
                {m}
              </span>
            ))}
            <span className="chip" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)" }}>
              🛠 {ex.equipment}
            </span>
          </div>

          {/* Description */}
          {ex.description && (
            <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 20 }}>
              {ex.description}
            </p>
          )}

          {/* Instructions */}
          {ex.instructions && ex.instructions.length > 0 && (
            <div style={{ marginBottom: 22 }}>
              <p style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-bold)" as unknown as number, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 12 }}>
                Como executar
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {ex.instructions.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{
                      flexShrink: 0, width: 24, height: 24, borderRadius: "50%",
                      background: "rgba(59,130,246,0.15)", color: "#60a5fa",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "var(--text-xs)", fontWeight: "var(--weight-extrabold)" as unknown as number,
                    }}>{i + 1}</span>
                    <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video tutorial */}
          <a href={ytUrl} target="_blank" rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "12px", borderRadius: 12, marginBottom: 12,
              background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)",
              color: "#f87171", fontWeight: "var(--weight-bold)" as unknown as number,
              fontSize: "var(--text-sm)", textDecoration: "none",
            }}>
            ▶ Ver tutorial em vídeo
          </a>

          {/* Add / remove */}
          <button onClick={onToggle}
            className={added ? "btn-secondary" : "btn-primary"}
            style={{ width: "100%" }}>
            {added ? "✓ Adicionado — remover do treino" : "+ Adicionar ao treino"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CreateWorkout() {
  const [step, setStep] = useState<"catalog" | "builder">("catalog");
  const [search, setSearch] = useState("");
  const [muscle, setMuscle] = useState("Todos");
  const [selected, setSelected] = useState<BuiltExercise[]>([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [success, setSuccess] = useState(false);
  const [detail, setDetail] = useState<DisplayExercise | null>(null);

  // Fetch exercises from API based on search/filter
  const apiMuscle = muscle === "Todos" ? undefined : MUSCLE_REVERSE_MAP[muscle];
  const { exercises: apiExercises, loading } = useExercises(search || undefined, apiMuscle);

  // Transform API exercises → display format, carrying full detail
  const exercises: DisplayExercise[] = apiExercises.map((ex, idx) => ({
    id: idx + 1000, // Avoid collision with CATALOG ids
    name: cap(ex.name),
    muscle: MUSCLE_MAP[ex.target] || cap(ex.target),
    equipment: cap(ex.equipment),
    difficulty: mapDifficulty(ex.difficulty),
    icon: "🏋️",
    exDbId: ex.id,
    instructions: ex.instructions,
    description: ex.description,
    secondaryMuscles: ex.secondaryMuscles,
    bodyPart: ex.bodyPart,
    target: ex.target,
  }));

  // Show fallback to CATALOG if no API results
  const filtered: DisplayExercise[] = exercises.length > 0 ? exercises :
    CATALOG.filter(e =>
      (muscle === "Todos" || e.muscle === muscle) &&
      (e.name.toLowerCase().includes(search.toLowerCase()) || e.equipment.toLowerCase().includes(search.toLowerCase()))
    );

  const toggle = (ex: Exercise) => {
    setSelected(prev =>
      prev.find(s => s.id === ex.id)
        ? prev.filter(s => s.id !== ex.id)
        : [...prev, { ...ex, sets: "3", reps: "12", rest: "60s" }]
    );
  };

  const update = (id: number, field: string, val: string) =>
    setSelected(prev => prev.map(s => s.id === id ? { ...s, [field]: val } : s));

  const publish = () => {
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setSelected([]); setName(""); setDesc(""); setStep("catalog"); }, 2200);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center text-center fade-up" style={{ paddingTop: 80 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <p className="section-title">Treino Publicado!</p>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "var(--text-base)", marginTop: 8 }}>
          Compartilhado com a comunidade Spotter.
        </p>
      </div>
    );
  }

  return (
    <div className="fade-up">
      {/* Step indicator */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["catalog", "builder"] as const).map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            style={{
              flex: 1, padding: "10px", borderRadius: 12, border: "none", cursor: "pointer",
              background: step === s ? "#2563eb" : "rgba(255,255,255,0.07)",
              color: step === s ? "#fff" : "rgba(255,255,255,0.45)",
              fontWeight: "var(--weight-bold)" as unknown as number, fontSize: "var(--text-sm)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8
            }}
          >
            <span style={{
              width: 20, height: 20, borderRadius: "50%", display: "inline-flex",
              alignItems: "center", justifyContent: "center",
              fontSize: "var(--text-xs)", fontWeight: "var(--weight-extrabold)" as unknown as number,
              background: step === s ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)"
            }}>{i + 1}</span>
            {s === "catalog" ? "Exercícios" : `Montar${selected.length > 0 ? ` (${selected.length})` : ""}`}
          </button>
        ))}
      </div>

      {step === "catalog" ? (
        <>
          {/* Search */}
          <div style={{ position: "relative", marginBottom: 12 }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
            <input className="input" placeholder="Buscar exercício..." style={{ paddingLeft: 42 }}
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          {/* Muscle filter */}
          <div className="scroll-row" style={{ marginBottom: 16 }}>
            {MUSCLES.map(m => (
              <button key={m} className={`filter-pill ${muscle === m ? "active" : ""}`}
                onClick={() => setMuscle(m)}>{m}</button>
            ))}
          </div>

          {/* Selected summary bar */}
          {selected.length > 0 && (
            <div className="card-sm slide-up" style={{ padding: "12px 16px", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.6)" }}>
                {selected.length} selecionado{selected.length > 1 ? "s" : ""}
              </span>
              <button
                onClick={() => setStep("builder")}
                style={{
                  background: "#2563eb", color: "#fff",
                  fontWeight: "var(--weight-bold)" as unknown as number,
                  fontSize: "var(--text-sm)",
                  padding: "7px 16px", borderRadius: 10, border: "none", cursor: "pointer"
                }}
              >
                Montar treino →
              </button>
            </div>
          )}

          {/* Exercise grid */}
          <div className="exercise-grid">
            {filtered.map((ex, gi) => {
              const added = !!selected.find(s => s.id === ex.id);
              return (
                <div
                  key={ex.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setDetail(ex)}
                  onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setDetail(ex); } }}
                  className="card grid-item"
                  style={{
                    "--i": gi,
                    padding: "14px 12px", textAlign: "left", cursor: "pointer", border: "none",
                    outline: added ? "2px solid #3b82f6" : "2px solid transparent",
                    background: added ? "rgba(37,99,235,0.15)" : undefined,
                    transition: "all 0.15s", position: "relative",
                  } as React.CSSProperties}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <span style={{ fontSize: 26 }}>{ex.icon}</span>
                    {/* Quick add / remove */}
                    <button
                      aria-label={added ? "Remover do treino" : "Adicionar ao treino"}
                      onClick={e => { e.stopPropagation(); toggle(ex); }}
                      style={{
                        width: 28, height: 28, borderRadius: "50%", border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "var(--text-base)", fontWeight: "var(--weight-extrabold)" as unknown as number,
                        background: added ? "#2563eb" : "rgba(255,255,255,0.1)",
                        color: added ? "#fff" : "rgba(255,255,255,0.7)",
                        transition: "all 0.15s",
                      }}
                    >{added ? "✓" : "+"}</button>
                  </div>
                  <p style={{ fontWeight: "var(--weight-bold)" as unknown as number, fontSize: "var(--text-sm)", color: "#fff", marginBottom: 4, lineHeight: 1.3 }}>{ex.name}</p>
                  <p style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>{ex.equipment}</p>
                  <DiffChip d={ex.difficulty} />
                </div>
              );
            })}
          </div>

          {/* Exercise detail sheet */}
          {detail && (
            <ExerciseDetail
              ex={detail}
              added={!!selected.find(s => s.id === detail.id)}
              onToggle={() => toggle(detail)}
              onClose={() => setDetail(null)}
            />
          )}

          {loading ? (
            <div style={{ textAlign: "center", padding: "48px 0", color: "rgba(255,255,255,0.35)" }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>⏳</div>
              <p style={{ fontSize: "var(--text-base)" }}>Carregando exercícios...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0", color: "rgba(255,255,255,0.35)" }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🔍</div>
              <p style={{ fontSize: "var(--text-base)" }}>Nenhum exercício encontrado</p>
              <p style={{ fontSize: "var(--text-sm)", marginTop: 8, color: "rgba(255,255,255,0.25)" }}>Tente outra busca ou músculo</p>
            </div>
          ) : null}
        </>
      ) : (
        /* BUILDER STEP */
        <>
          <div style={{ marginBottom: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            <input className="input" placeholder="Nome do treino *" value={name} onChange={e => setName(e.target.value)} />
            <textarea className="input" placeholder="Descrição (opcional)" rows={2}
              style={{ resize: "none" }} value={desc} onChange={e => setDesc(e.target.value)} />
          </div>

          {selected.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(255,255,255,0.35)" }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>📋</div>
              <p style={{ fontSize: "var(--text-base)" }}>Nenhum exercício adicionado</p>
              <button onClick={() => setStep("catalog")}
                style={{ marginTop: 12, color: "#60a5fa", fontWeight: "var(--weight-semibold)" as unknown as number, fontSize: "var(--text-sm)", background: "none", border: "none", cursor: "pointer" }}>
                ← Voltar ao catálogo
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {selected.map((ex, i) => (
                <div key={ex.id} className="card" style={{ padding: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 20 }}>{ex.icon}</span>
                      <div>
                        <p style={{ fontWeight: "var(--weight-bold)" as unknown as number, fontSize: "var(--text-sm)", color: "#fff" }}>{ex.name}</p>
                        <p style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.35)" }}>Exercício {i + 1}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelected(prev => prev.filter(s => s.id !== ex.id))}
                      style={{ color: "rgba(255,255,255,0.3)", fontSize: 18, background: "none", border: "none", cursor: "pointer", padding: "4px 8px" }}>
                      ✕
                    </button>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                    {(["sets","reps","rest"] as const).map((f, fi) => (
                      <div key={f}>
                        <p style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.35)", marginBottom: 4, fontWeight: "var(--weight-semibold)" as unknown as number, textTransform: "uppercase" }}>
                          {["Séries","Reps","Descanso"][fi]}
                        </p>
                        <input className="input" style={{ padding: "8px", textAlign: "center", fontSize: "var(--text-base)", fontWeight: "var(--weight-bold)" as unknown as number }}
                          value={ex[f]} onChange={e => update(ex.id, f, e.target.value)} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {selected.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ textAlign: "center", fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.35)" }}>
                {selected.length} exercício{selected.length > 1 ? "s" : ""} · ~{selected.length * 8} min estimado
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-secondary" style={{ flex: 1 }}>Salvar rascunho</button>
                <button className="btn-primary" style={{ flex: 1, opacity: !name ? 0.4 : 1 }}
                  onClick={publish} disabled={!name}>
                  Publicar 🚀
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── TAB: COMUNIDADE ──────────────────────────────────────────────────────────

function Community() {
  const [workouts, setWorkouts] = useState(COMMUNITY);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Destaques");
  const [likeAnim, setLikeAnim] = useState<number | null>(null);

  const like = (id: number) => {
    setLikeAnim(id); setTimeout(() => setLikeAnim(null), 280);
    setWorkouts(ws => ws.map(w => w.id === id ? { ...w, liked: !w.liked, likes: w.liked ? w.likes - 1 : w.likes + 1 } : w));
  };

  const visible = workouts
    .filter(w => {
      const q = search.toLowerCase();
      return w.title.toLowerCase().includes(q) || w.creator.toLowerCase().includes(q);
    })
    .filter(w => ["Destaques","Recentes"].includes(filter) ? true : w.difficulty === filter)
    .sort((a, b) => filter === "Recentes" ? b.id - a.id : b.likes - a.likes);

  return (
    <div className="fade-up">
      {/* Search */}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
        <input className="input" placeholder="Buscar treino ou criador..." style={{ paddingLeft: 42 }}
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Filters */}
      <div className="scroll-row" style={{ marginBottom: 20 }}>
        {["Destaques","Recentes","Iniciante","Intermediário","Avançado"].map(f => (
          <button key={f} className={`filter-pill ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
            {f === "Destaques" ? "🏆 Destaques" : f}
          </button>
        ))}
      </div>

      {/* Top 3 podium — only on Destaques */}
      {filter === "Destaques" && search === "" && (
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.4)", fontWeight: "var(--weight-semibold)" as unknown as number, marginBottom: 10 }}>
            MAIS CURTIDOS DO MÊS
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[...COMMUNITY].sort((a,b) => b.likes - a.likes).slice(0,3).map((w, i) => (
              <div key={w.id} className="card stagger-item" style={{ "--i": i, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 } as React.CSSProperties}>
                <span style={{ fontSize: 24, width: 28, textAlign: "center" }}>
                  {["🥇","🥈","🥉"][i]}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: "var(--weight-bold)" as unknown as number, fontSize: "var(--text-lg)", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {w.title}
                  </p>
                  <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{w.creator}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontWeight: "var(--weight-extrabold)" as unknown as number, fontSize: "var(--text-xl)", color: "#60a5fa", fontVariant: "tabular-nums" }}>{w.likes}</p>
                  <p style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.35)" }}>curtidas</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Workout cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {visible.map((w, wi) => (
          <div key={w.id} className="card stagger-item" style={{ "--i": wi, padding: 16 } as React.CSSProperties}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <Av initials={w.avatar} size={38} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: "var(--weight-bold)" as unknown as number, fontSize: "var(--text-lg)", color: "#fff" }}>{w.title}</p>
                <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
                  {w.creator} · {w.exercises} exercícios · {w.duration}
                </p>
              </div>
              <DiffChip d={w.difficulty} />
            </div>

            {/* Tags */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
              {w.tags.map(t => <span key={t} className="chip chip-blue">{t}</span>)}
            </div>

            {/* Actions */}
            <hr className="divider" style={{ marginBottom: 12 }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 16 }}>
                <button
                  onClick={() => like(w.id)}
                  className={likeAnim === w.id ? "like-pop" : ""}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 6, padding: "4px 0",
                    color: w.liked ? "#f87171" : "rgba(255,255,255,0.4)",
                    fontSize: "var(--text-base)", fontWeight: "var(--weight-semibold)" as unknown as number
                  }}
                >
                  {w.liked ? "❤️" : "🤍"} {w.likes}
                </button>
                <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, padding: "4px 0", color: "rgba(255,255,255,0.4)", fontSize: "var(--text-base)" }}>
                  💬 {w.comments}
                </button>
              </div>
              <button className="btn-secondary" style={{ width: "auto", padding: "8px 16px", fontSize: "var(--text-sm)" }}>
                Ver treino
              </button>
            </div>
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 0", color: "rgba(255,255,255,0.35)" }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔍</div>
          <p style={{ fontSize: "var(--text-base)" }}>Nenhum resultado para &ldquo;{search}&rdquo;</p>
        </div>
      )}
    </div>
  );
}

// ─── TAB: COMPETIÇÃO ──────────────────────────────────────────────────────────

function Competition({ userName, userInitials }: { userName: string; userInitials: string }) {
  const [friends, setFriends] = useState(FRIENDS);
  const [feed, setFeed] = useState<FeedItem[]>(FEED);
  const [feedLiked, setFeedLiked] = useState<Record<number, boolean>>({});
  const [view, setView] = useState<"ranking" | "feed">("ranking");
  const [showSheet, setShowSheet] = useState(false);
  const [form, setForm] = useState({ workout: "", duration: "", note: "", preview: "", mediaType: "" as "" | "photo" | "video" });
  const [toast, setToast] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const sorted = [...friends].sort((a, b) => b.workouts - a.workouts);
  const me = friends.find(f => f.isMe)!;
  const myRank = sorted.findIndex(f => f.isMe) + 1;
  const leader = sorted[0];
  const daysLeft = 30 - new Date().getDate();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setForm(f => ({ ...f, preview: URL.createObjectURL(file), mediaType: file.type.startsWith("video") ? "video" : "photo" }));
  };

  const submitLog = () => {
    if (!form.workout) return;
    setFeed(prev => [{
      id: Date.now(), user: userName, avatar: userInitials, workout: form.workout,
      date: "Agora", duration: form.duration || "—", hasMedia: !!form.preview,
      mediaType: form.mediaType || undefined, mediaPreview: form.preview || undefined,
      likes: 0, comment: form.note || "Mais um treino concluído! 💪",
    } as FeedItem, ...prev]);
    setFriends(prev => prev.map(f => f.isMe ? { ...f, workouts: f.workouts + 1 } : f));
    setForm({ workout: "", duration: "", note: "", preview: "", mediaType: "" });
    setShowSheet(false);
    setToast(true);
    setTimeout(() => setToast(false), 2800);
  };

  const toggleLike = (id: number) => {
    const was = feedLiked[id];
    setFeedLiked(p => ({ ...p, [id]: !p[id] }));
    setFeed(prev => prev.map(f => f.id === id ? { ...f, likes: was ? f.likes - 1 : f.likes + 1 } : f));
  };

  return (
    <div className="fade-up">
      {/* My stats hero */}
      <div className="card" style={{ padding: 20, marginBottom: 16, background: "rgba(37,99,235,0.12)", border: "1px solid rgba(59,130,246,0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <Av initials={userInitials} size={48} />
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: "var(--weight-extrabold)" as unknown as number, fontSize: "var(--text-lg)", color: "#fff" }}>{userName}</p>
            <p style={{ fontSize: "var(--text-sm)", color: "#fb923c", marginTop: 2 }}>🔥 {me.streak} dias seguidos</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "var(--text-2xl)", fontWeight: "var(--weight-extrabold)" as unknown as number, color: "#60a5fa", lineHeight: 1, fontVariant: "tabular-nums" }}>{myRank}º</p>
            <p style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.4)" }}>lugar</p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.5)" }}>Progresso — Junho</span>
          <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-bold)" as unknown as number, color: "#60a5fa", fontVariant: "tabular-nums" }}>{me.workouts}/{me.goal} treinos</span>
        </div>
        <div className="progress-track" style={{ height: 8 }}>
          <div className="progress-fill" style={{ width: `${Math.min(100, (me.workouts / me.goal) * 100)}%` }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.35)", marginBottom: 2 }}>Líder</p>
            <p style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-bold)" as unknown as number, color: "#fff" }}>{leader.name}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.35)", marginBottom: 2 }}>Treinos dele</p>
            <p style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-bold)" as unknown as number, color: "#fff", fontVariant: "tabular-nums" }}>{leader.workouts}</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.35)", marginBottom: 2 }}>Dias restantes</p>
            <p style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-bold)" as unknown as number, color: "#fff", fontVariant: "tabular-nums" }}>{daysLeft}</p>
          </div>
        </div>
      </div>

      {/* Registrar button */}
      <button className="btn-primary" style={{ marginBottom: 20 }} onClick={() => setShowSheet(true)}>
        ➕ Registrar treino de hoje
      </button>

      {/* Sub tabs: ranking / feed */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(["ranking", "feed"] as const).map(v => (
          <button key={v} onClick={() => setView(v)}
            style={{
              flex: 1, padding: "10px", borderRadius: 12, border: "none", cursor: "pointer",
              background: view === v ? "#2563eb" : "rgba(255,255,255,0.07)",
              color: view === v ? "#fff" : "rgba(255,255,255,0.45)",
              fontWeight: "var(--weight-bold)" as unknown as number, fontSize: "var(--text-base)",
            }}
          >
            {v === "ranking" ? "🏆 Ranking" : "📸 Feed"}
          </button>
        ))}
      </div>

      {/* RANKING */}
      {view === "ranking" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {sorted.map((f, i) => (
            <div key={f.id}
              className={`card stagger-item${i === 0 ? " card-rank-first" : ""}`}
              style={{
                "--i": i,
                padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
                outline: f.isMe ? "2px solid rgba(59,130,246,0.4)" : i === 0 ? "1px solid rgba(251,191,36,0.25)" : "none",
                background: f.isMe ? "rgba(37,99,235,0.08)" : undefined,
              } as React.CSSProperties}
            >
              <div style={{ width: 28, textAlign: "center", flexShrink: 0 }}>
                {i < 3
                  ? <span style={{ fontSize: 20 }}>{["🥇","🥈","🥉"][i]}</span>
                  : <span style={{ fontSize: "var(--text-sm)", fontWeight: "var(--weight-bold)" as unknown as number, color: "rgba(255,255,255,0.35)", fontVariant: "tabular-nums" }}>{i+1}º</span>}
              </div>
              <Av initials={f.isMe ? userInitials : f.avatar} size={36} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: "var(--weight-bold)" as unknown as number, fontSize: "var(--text-lg)", color: f.isMe ? "#93c5fd" : "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {f.isMe ? userName : f.name}
                </p>
                <div className="progress-track" style={{ height: 4, marginTop: 6 }}>
                  <div className="progress-fill" style={{ width: `${Math.round((f.workouts / leader.workouts) * 100)}%` }} />
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ fontWeight: "var(--weight-extrabold)" as unknown as number, fontSize: "var(--text-xl)", color: "#fff", fontVariant: "tabular-nums" }}>{f.workouts}</p>
                <p style={{ fontSize: "var(--text-xs)", color: "#fb923c", fontVariant: "tabular-nums" }}>🔥{f.streak}d</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FEED */}
      {view === "feed" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {feed.map((item, fi) => (
            <div key={item.id} className="card stagger-item" style={{ "--i": fi, padding: 16 } as React.CSSProperties}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Av initials={item.avatar} size={38} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: "var(--weight-bold)" as unknown as number, fontSize: "var(--text-lg)", color: "#fff" }}>{item.user}</span>
                    <span style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.35)" }}>· {item.date}</span>
                  </div>
                  <div className="card-sm" style={{ padding: "10px 12px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ fontWeight: "var(--weight-bold)" as unknown as number, fontSize: "var(--text-base)", color: "#fff" }}>{item.workout}</p>
                      <p style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>⏱ {item.duration}</p>
                    </div>
                    <span style={{ fontSize: 22 }}>💪</span>
                  </div>
                  {item.comment && (
                    <p style={{ fontSize: "var(--text-base)", color: "rgba(255,255,255,0.65)", marginBottom: 10, fontStyle: "italic" }}>
                      &ldquo;{item.comment}&rdquo;
                    </p>
                  )}
                  {item.hasMedia && (
                    <div style={{ borderRadius: 12, overflow: "hidden", height: 160, marginBottom: 12, background: "#122a54", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {item.mediaPreview ? (
                        item.mediaType === "video"
                          ? <video src={item.mediaPreview} style={{ width: "100%", height: "100%", objectFit: "cover" }} controls />
                          : <img src={item.mediaPreview} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                      ) : (
                        <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)" }}>
                          <div style={{ fontSize: 32, marginBottom: 4 }}>{item.mediaType === "video" ? "🎬" : "📸"}</div>
                          <p style={{ fontSize: "var(--text-sm)" }}>{item.mediaType === "video" ? "Vídeo do treino" : "Foto do treino"}</p>
                        </div>
                      )}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 16 }}>
                    <button onClick={() => toggleLike(item.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontSize: "var(--text-base)", fontWeight: "var(--weight-semibold)" as unknown as number, color: feedLiked[item.id] ? "#f87171" : "rgba(255,255,255,0.4)", padding: "4px 0" }}>
                      {feedLiked[item.id] ? "❤️" : "🤍"} {item.likes}
                    </button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "var(--text-base)", color: "rgba(255,255,255,0.4)", padding: "4px 0" }}>
                      💬 Comentar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BOTTOM SHEET: registrar treino */}
      {showSheet && (
        <div className="sheet-overlay" onClick={e => e.target === e.currentTarget && setShowSheet(false)}>
          <div className="sheet">
            <div className="sheet-handle" />
            <div style={{ padding: "0 20px 24px" }}>
              <h3 style={{ fontWeight: "var(--weight-extrabold)" as unknown as number, fontSize: "var(--text-xl)", color: "#fff", marginBottom: 20 }}>Registrar treino</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input className="input" placeholder="Nome do treino *"
                  value={form.workout} onChange={e => setForm(f => ({ ...f, workout: e.target.value }))} />
                <input className="input" placeholder="Duração (ex: 60min)"
                  value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} />
                <textarea className="input" placeholder="Comentário sobre o treino..." rows={2}
                  style={{ resize: "none" }} value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} />

                {/* Media */}
                <input type="file" accept="image/*,video/*" ref={fileRef} onChange={handleFile} style={{ display: "none" }} />
                {form.preview ? (
                  <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", height: 140 }}>
                    {form.mediaType === "video"
                      ? <video src={form.preview} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <img src={form.preview} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />}
                    <button onClick={() => setForm(f => ({ ...f, preview: "", mediaType: "" }))}
                      style={{ position: "absolute", top: 8, right: 8, width: 28, height: 28, borderRadius: "50%", background: "rgba(0,0,0,0.7)", border: "none", color: "#fff", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      ✕
                    </button>
                  </div>
                ) : (
                  <button onClick={() => fileRef.current?.click()}
                    style={{ padding: "18px", borderRadius: 12, border: "2px dashed rgba(255,255,255,0.12)", background: "transparent", color: "rgba(255,255,255,0.35)", cursor: "pointer", fontSize: "var(--text-base)", textAlign: "center", width: "100%" }}>
                    📷  Adicionar foto ou vídeo
                  </button>
                )}

                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  <button className="btn-secondary" onClick={() => setShowSheet(false)}>Cancelar</button>
                  <button className="btn-primary" onClick={submitLog}
                    style={{ opacity: !form.workout ? 0.4 : 1, cursor: !form.workout ? "not-allowed" : "pointer" }}>
                    Registrar 💪
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast">
          <span style={{ fontSize: 20 }}>✅</span>
          <div>
            <p style={{ fontWeight: "var(--weight-bold)" as unknown as number, fontSize: "var(--text-base)", color: "#4ade80" }}>Treino registrado!</p>
            <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.45)" }}>+1 no seu ranking de junho</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── LANDING / LOGIN ─────────────────────────────────────────────────────────

function Landing({ onLogin }: { onLogin: (name: string) => void }) {
  const [name, setName] = useState("");
  const [exiting, setExiting] = useState(false);

  const submit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setExiting(true);
    setTimeout(() => onLogin(trimmed), 340);
  };

  const features = [
    { icon: "⚡", title: "Crie treinos únicos", desc: "Monte do seu jeito com 38 exercícios de academia" },
    { icon: "🌎", title: "Descubra a comunidade", desc: "Inspire-se e compartilhe treinos com outros atletas" },
    { icon: "🏆", title: "Compita com seus amigos", desc: "Ranking mensal de quem mais treina no mês" },
  ];

  return (
    <div className={`landing fade-up${exiting ? " landing-exit" : ""}`}>

      {/* ── Hero ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", paddingBottom: 16 }}>
        {/* Logo com glow radial */}
        <div style={{ position: "relative", marginBottom: 22 }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 150, height: 150, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <SpotterLogo size={80} />
        </div>

        <h1 style={{
          fontSize: "var(--text-2xl)", fontWeight: "var(--weight-extrabold)" as unknown as number,
          color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.05, marginBottom: 10,
        }}>
          Spotter
        </h1>
        <p style={{
          fontSize: "var(--text-base)", color: "rgba(255,255,255,0.45)",
          fontWeight: "var(--weight-medium)" as unknown as number, letterSpacing: "0.02em",
        }}>
          Seu Treino na Palma da Mão
        </p>
      </div>

      {/* ── Features ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 36 }}>
        {features.map((f, i) => (
          <div key={f.title} className="stagger-item"
            style={{ "--i": i + 1, display: "flex", alignItems: "flex-start", gap: 16 } as React.CSSProperties}
          >
            <span style={{
              fontSize: 20, width: 42, height: 42, borderRadius: 13, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.18)",
            }}>{f.icon}</span>
            <div>
              <p style={{ fontWeight: "var(--weight-bold)" as unknown as number, fontSize: "var(--text-base)", color: "#fff", marginBottom: 2 }}>
                {f.title}
              </p>
              <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.4)" }}>
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Login ── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 28 }}>
        <p style={{ fontSize: "var(--text-lg)", fontWeight: "var(--weight-bold)" as unknown as number, color: "#fff", marginBottom: 4 }}>
          Como posso te chamar?
        </p>
        <p style={{ fontSize: "var(--text-sm)", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>
          Só seu primeiro nome, sem complicação.
        </p>
        <input
          className="input"
          placeholder="Seu primeiro nome"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === "Enter" && submit()}
          style={{ marginBottom: 12 }}
          autoFocus
        />
        <button
          className="btn-primary"
          onClick={submit}
          style={{ opacity: !name.trim() ? 0.45 : 1 }}
          disabled={!name.trim()}
        >
          Entrar no Spotter →
        </button>
      </div>
    </div>
  );
}

// ─── APP SHELL ────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "criar",      label: "Criar",      icon: "🏋️" },
  { id: "comunidade", label: "Comunidade", icon: "🌎" },
  { id: "competicao", label: "Competição", icon: "🏆" },
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("criar");

  // ── Landing de marketing (primeira tela) ──
  if (!started) {
    return <MarketingLanding onEnter={() => setStarted(true)} />;
  }

  // ── Tela de login (escolha do nome) ──
  if (!userName) {
    return <Landing onLogin={setUserName} />;
  }

  const initials = userName.slice(0, 2).toUpperCase();

  const titles: Record<Tab, string> = {
    criar:      "Criar Treino",
    comunidade: "Comunidade",
    competicao: "Competição",
  };

  return (
    <div className="app-shell fade-up">
      {/* Top bar */}
      <header className="topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <SpotterLogo size={30} />
          <div>
            <p style={{ fontWeight: "var(--weight-extrabold)" as unknown as number, fontSize: "var(--text-lg)", color: "#fff", lineHeight: 1 }}>Spotter</p>
            <p style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.35)", lineHeight: 1, marginTop: 2 }}>
              {titles[tab]}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button className="btn-icon" style={{ fontSize: 18 }}>🔔</button>
          <Av initials={initials} size={34} />
        </div>
      </header>

      {/* Page content */}
      <main className="page-content">
        {tab === "criar"      && <CreateWorkout />}
        {tab === "comunidade" && <Community />}
        {tab === "competicao" && <Competition userName={userName} userInitials={initials} />}
      </main>

      {/* Bottom nav */}
      <nav className="bottom-nav">
        {TABS.map(t => (
          <button key={t.id} className={`nav-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
            <span className="nav-icon">{t.icon}</span>
            <span className="nav-label">{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
