// Utilitário `cn` no padrão shadcn — junta classes condicionais.
// Implementação leve (sem clsx/tailwind-merge) para evitar dependências extras;
// cobre os casos usados pelos componentes (string | false | null | undefined).
export type ClassValue = string | number | false | null | undefined;

export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}
