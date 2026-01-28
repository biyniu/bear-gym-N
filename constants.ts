import { WorkoutsMap, AppSettings } from './types';

// ==========================================
// KONFIGURACJA KLIENTA (TUTAJ ZMIENIASZ DANE)
// ==========================================

export const CLIENT_CONFIG = {
  name: "Plan NIEDŹWIEDŹ", 
  // Zmiana klucza wymusza załadowanie nowego planu (omija cache starych treningów)
  storageKey: 'workout_app_damian_v3' 
};

export const DEFAULT_SETTINGS: AppSettings = {
  volume: 0.5,
  soundType: 'beep2',
};

// Definicja nowego planu PUSH / PULL / LEGS (x2)
export const DEFAULT_WORKOUTS: WorkoutsMap = {
  "push1": {
      title: "PUSH 1",
      warmup: [
          { name: "Bieżnia", pl: "Rozgrzewka Cardio", link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", reps: "10 min" },
          { name: "Rozciąganie", pl: "Mobilizacja / Rozciąganie", link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", reps: "10x" }
      ],
      exercises: [
          { id: "p1_1", name: "Peck dek", pl: "Rozpiętki na maszynie", sets: 3, reps: "10-12", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", type: "standard" },
          { id: "p1_2", name: "Smith Incline Press", pl: "Wyciskanie skos dodatni suwnica Smitha", sets: 2, reps: "1x 8-10 | 1x 12-15", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/watch?v=LIVJZZyZ2qM", type: "standard" },
          { id: "p1_3", name: "Hammer Incline Press", pl: "Wyciskanie hammer skos dodatni", sets: 2, reps: "1x 8-10 | 1x 12-15", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/results?search_query=band+dislocation", type: "standard" },
          { id: "p1_4", name: "Cable Flys", pl: "Rozpiętki w bramie linkami", sets: 3, reps: "10-12 | drop", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/M5DeSgxNyKQ", type: "standard" },
          { id: "p1_5", name: "Cable Lateral Raise (Single)", pl: "Unoszenie na boki linki wyciągu jednorącz", sets: 3, reps: "10-12", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/qB_bC7-CQjI", type: "standard" },
          { id: "p1_6", name: "Machine Lateral Raise", pl: "Unoszenie na boki maszyna", sets: 3, reps: "8-10", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/YuLqw3kHPaw", type: "standard" },
          { id: "p1_7", name: "Cable Pulldown/Pushdown", pl: "Ściąganie drążka wyciągu w bramie", sets: 4, reps: "10-12 | drop", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/5orOHJL2qS4", type: "standard" }
      ]
  },
  "legs1": {
      title: "LEGS 1",
      warmup: [
          { name: "Bieżnia", pl: "Rozgrzewka Cardio", link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", reps: "10 min" },
          { name: "Rozciąganie", pl: "Mobilizacja / Rozciąganie", link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", reps: "10x" }
      ],
      exercises: [
          { id: "l1_1", name: "Abductors", pl: "Odwodziciele", sets: 3, reps: "12-15", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", type: "standard" },
          { id: "l1_2", name: "Seated Leg Curl", pl: "Uginanie nóg siedząc", sets: 3, reps: "2x 8-10 | 1x 12-15", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/watch?v=LIVJZZyZ2qM", type: "standard" },
          { id: "l1_3", name: "Stiff Leg Deadlift", pl: "Martwy ciąg na prostych nogach sztangą", sets: 2, reps: "6-8", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/results?search_query=band+dislocation", type: "standard" },
          { id: "l1_4", name: "Belt Squat", pl: "Przysiad w pasie (Belt Squat)", sets: 2, reps: "12-15", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/M5DeSgxNyKQ", type: "standard" },
          { id: "l1_5", name: "Glute Kick Back", pl: "Wykopy w tył (pośladek)", sets: 2, reps: "10-12", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/qB_bC7-CQjI", type: "standard" },
          { id: "l1_6", name: "Leg Press / Hack Variant", pl: "Suwnica (obok maszyny do hack siadów)", sets: 3, reps: "12-15", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/YuLqw3kHPaw", type: "standard" },
          { id: "l1_7", name: "Single Leg Extension", pl: "Prostowanie na maszynie jednonóż", sets: 3, reps: "10-12 (kontrola)", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/5orOHJL2qS4", type: "standard" }
      ]
  },
  "pull1": {
      title: "PULL 1",
      warmup: [
          { name: "Bieżnia", pl: "Rozgrzewka Cardio", link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", reps: "10 min" },
          { name: "Rozciąganie", pl: "Mobilizacja / Rozciąganie", link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", reps: "10x" }
      ],
      exercises: [
          { id: "pu1_1", name: "Lat Pulldown Overhand", pl: "Ściąganie drążka wyciągu górnego (nachwyt)", sets: 3, reps: "10-12", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", type: "standard" },
          { id: "pu1_2", name: "T-Bar / Landmine Row", pl: "Wiosłowanie półsztangą", sets: 2, reps: "6-8", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/watch?v=LIVJZZyZ2qM", type: "standard" },
          { id: "pu1_3", name: "Hammer Row Underhand", pl: "Wiosłowanie podchwytem jednorącz hammer", sets: 2, reps: "8-10", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/results?search_query=band+dislocation", type: "standard" },
          { id: "pu1_4", name: "Dumbbell Row", pl: "Wiosłowanie hantlem", sets: 2, reps: "8-10", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/M5DeSgxNyKQ", type: "standard" },
          { id: "pu1_5", name: "Rack Pull (Pause)", pl: "Rack pull z pauzą", sets: 2, reps: "6-8", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/qB_bC7-CQjI", type: "standard" },
          { id: "pu1_6", name: "Reverse Butterfly", pl: "Odwrotne rozpiętki (tył barku)", sets: 3, reps: "10-12", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/YuLqw3kHPaw", type: "standard" },
          { id: "pu1_7", name: "Barbell Bicep Curl", pl: "Uginanie sztangą na biceps (10x10)", sets: 10, reps: "10", tempo: "-", rir: "-", rest: 10, link: "https://www.youtube.com/shorts/5orOHJL2qS4", type: "standard" }
      ]
  },
  "push2": {
      title: "PUSH 2",
      warmup: [
          { name: "Bieżnia", pl: "Rozgrzewka Cardio", link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", reps: "10 min" },
          { name: "Rozciąganie", pl: "Mobilizacja / Rozciąganie", link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", reps: "10x" }
      ],
      exercises: [
          { id: "p2_1", name: "DB Lateral Raise", pl: "Unoszenie na boki hantlami", sets: 3, reps: "12-15", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", type: "standard" },
          { id: "p2_2", name: "Hammer Shoulder Press", pl: "Wyciskanie na barki na hammerze", sets: 3, reps: "2x 8-10 | 1x 12-15", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/watch?v=LIVJZZyZ2qM", type: "standard" },
          { id: "p2_3", name: "Machine Lateral Raise", pl: "Unoszenie na maszynie (tam gdzie klatka)", sets: 3, reps: "10-12", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/results?search_query=band+dislocation", type: "standard" },
          { id: "p2_4", name: "Seated DB Press (Neutral)", pl: "Wyciskanie hantli siedząc chwyt neutralny", sets: 2, reps: "10-12", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/M5DeSgxNyKQ", type: "standard" },
          { id: "p2_5", name: "Multiflight Fly", pl: "Multiflight Fly", sets: 3, reps: "10-12", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/qB_bC7-CQjI", type: "standard" },
          { id: "p2_6", name: "Flat DB Press", pl: "Wyciskanie hantli płasko", sets: 3, reps: "2x 8-10 | 1x 12-15", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/YuLqw3kHPaw", type: "standard" },
          { id: "p2_7", name: "Lying Barbell Tricep Ext", pl: "Francuz sztangą leżąc", sets: 4, reps: "8-10", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/5orOHJL2qS4", type: "standard" }
      ]
  },
  "legs2": {
      title: "LEGS 2",
      warmup: [
          { name: "Bieżnia", pl: "Bieżnia", link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", reps: "10 min" },
          { name: "Rozciąganie", pl: "Mobilizacja / Rozciąganie", link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", reps: "10x" }
      ],
      exercises: [
          { id: "l2_1", name: "Adductors", pl: "Przywodziciele", sets: 3, reps: "10-12", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", type: "standard" },
          { id: "l2_2", name: "Leg Extension", pl: "Prostowanie na maszynie obunóż", sets: 3, reps: "10-12", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/watch?v=LIVJZZyZ2qM", type: "standard" },
          { id: "l2_3", name: "Hack Squat", pl: "Hack Squat", sets: 3, reps: "6-8", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/results?search_query=band+dislocation", type: "standard" },
          { id: "l2_4", name: "Pendulum Squat", pl: "Pendulum Squat (podwójne dno)", sets: 2, reps: "10-12", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/M5DeSgxNyKQ", type: "standard" },
          { id: "l2_5", name: "Lunges", pl: "Wykroki", sets: 2, reps: "12-15", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/qB_bC7-CQjI", type: "standard" },
          { id: "l2_6", name: "Lying Leg Curl", pl: "Uginanie nóg leżąc", sets: 3, reps: "2x 8-10 | 1x 12-15", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/YuLqw3kHPaw", type: "standard" },
          { id: "l2_7", name: "Kneeling Leg Curl", pl: "Uginanie klęcząc jednonóż", sets: 2, reps: "10-12", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/5orOHJL2qS4", type: "standard" }
      ]
  },
  "pull2": {
      title: "PULL 2",
      warmup: [
          { name: "Bieżnia", pl: "Rozgrzewka Cardio", link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", reps: "10 min" },
          { name: "Rozciąganie", pl: "Mobilizacja / Rozciąganie", link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", reps: "10x" }
      ],
      exercises: [
          { id: "pu2_1", name: "Skier", pl: "Narciarz", sets: 3, reps: "10-12", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/watch?v=LIVJZZyZ2qM", type: "standard" },
          { id: "pu2_2", name: "Single Arm Pulldown", pl: "Ściąganie z góry jednorącz", sets: 2, reps: "8-10", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/results?search_query=band+dislocation", type: "standard" },
          { id: "pu2_3", name: "Seated Row Neutral", pl: "Przyciąganie drążka siedząc (neutral)", sets: 2, reps: "10-12", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/M5DeSgxNyKQ", type: "standard" },
          { id: "pu2_4", name: "Barbell Row Overhand", pl: "Wiosłowanie sztangą nachwytem", sets: 3, reps: "2x 8-10 | 1x 12-15", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/qB_bC7-CQjI", type: "standard" },
          { id: "pu2_5", name: "Shrugs", pl: "Szrugsy", sets: 3, reps: "12-10", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/YuLqw3kHPaw", type: "standard" },
          { id: "pu2_6", name: "Cable Hammer Curl", pl: "Uginanie linką młotkowo w bramie", sets: 4, reps: "8-10", tempo: "-", rir: "-", rest: 120, link: "https://www.youtube.com/shorts/5orOHJL2qS4", type: "standard" }
      ]
  }
};
