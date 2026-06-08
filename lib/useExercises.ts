import { useState, useEffect } from "react";

export interface Exercise {
  id: string;
  name: string;
  target: string;
  equipment: string;
  bodyPart: string;
  gifUrl: string;
  instructions: string[];
  description: string;
  secondaryMuscles: string[];
  difficulty: string;
  category: string;
}

export function useExercises(query?: string, muscle?: string, equipment?: string) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (query) params.append("search", query);
        if (muscle) params.append("muscle", muscle);
        if (equipment) params.append("equipment", equipment);

        const res = await fetch(`/api/exercises?${params}`);
        if (!res.ok) throw new Error("Failed to fetch exercises");

        const data = await res.json();
        setExercises(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setExercises([]);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we have at least one search parameter
    if (query || muscle || equipment) {
      fetchExercises();
    }
  }, [query, muscle, equipment]);

  return { exercises, loading, error };
}

// Muscle groups for filter options
export const MUSCLE_GROUPS = [
  "abdominals",
  "adductors",
  "biceps",
  "calves",
  "chest",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "lower back",
  "middle back",
  "neck",
  "quadriceps",
  "shoulders",
  "traps",
  "triceps",
];

// Equipment options
export const EQUIPMENT_OPTIONS = [
  "barbell",
  "dumbbell",
  "cable",
  "machine",
  "bodyweight",
  "medicine ball",
  "kettlebell",
];
