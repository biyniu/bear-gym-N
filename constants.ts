import { WorkoutsMap, AppSettings } from './types';

// ==========================================
// KONFIGURACJA KLIENTA (TUTAJ ZMIENIASZ DANE)
// ==========================================

export const CLIENT_CONFIG = {
  name: "Niedźwiedź Trener", 
  // Zmieniony klucz, aby wczytać nową konfigurację
  storageKey: 'workout_app_niedzwiedz_v1' 
};

export const DEFAULT_SETTINGS: AppSettings = {
  volume: 0.5,
  soundType: 'beep2',
};

// Tutaj definiujesz strukturę treningów. 
export const DEFAULT_WORKOUTS: WorkoutsMap = {
  "push1": {
      title: "PUSH 1",
      warmup: [
          { name: "Bieżnia", pl: "", link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", reps: "10 min" }
      ],
      exercises: [
          { 
            id: "push1_1", 
            name: "Peck dek", 
            pl: "", 
            sets: 3, 
            reps: "10-12", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", 
            type: "standard" 
          },
          { 
            id: "push1_2", 
            name: "Wyciskanie skos dodatni suwnica shmita", 
            pl: "", 
            sets: 2, 
            reps: "1x 8-10 | 1x 12-15", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/watch?v=LIVJZZyZ2qM", 
            type: "standard" 
          },
          { 
            id: "push1_3", 
            name: "Wyciskanie hammer skos dodatni", 
            pl: "", 
            sets: 2, 
            reps: "1x 8-10 | 1x 12-15", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/results?search_query=band+dislocation", 
            type: "standard" 
          },
          { 
            id: "push1_4", 
            name: "Rozpiętki w bramie linkami", 
            pl: "", 
            sets: 3, 
            reps: "10-12 | podwójny drop", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/M5DeSgxNyKQ", 
            type: "standard" 
          },
          { 
            id: "push1_5", 
            name: "Unoszenie na boki linki wyciągu jednorącz", 
            pl: "", 
            sets: 3, 
            reps: "10-12", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/qB_bC7-CQjI", 
            type: "standard" 
          },
          { 
            id: "push1_6", 
            name: "Unoszenie na boki maszyna", 
            pl: "", 
            sets: 3, 
            reps: "8-10", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/YuLqw3kHPaw", 
            type: "standard" 
          },
          { 
            id: "push1_7", 
            name: "Ściąganie drążka wyciągu w bramie", 
            pl: "", 
            sets: 4, 
            reps: "10-12 | podwójny drop", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/5orOHJL2qS4", 
            type: "standard" 
          }
      ]
  },
  "legs1": {
      title: "LEGS 1",
      warmup: [
            { name: "Bieżnia", pl: "", link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", reps: "10 min" }
      ],
      exercises: [
          { 
            id: "legs1_1", 
            name: "Odwodziciele", 
            pl: "", 
            sets: 3, 
            reps: "12-15", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", 
            type: "standard" 
          },
          { 
            id: "legs1_2", 
            name: "Uginanie siedząc", 
            pl: "", 
            sets: 3, 
            reps: "2x8-10 | 1x 12-15", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/watch?v=LIVJZZyZ2qM", 
            type: "standard" 
          },
          { 
            id: "legs1_3", 
            name: "Martwy ciąg na prostych nogach sztangą", 
            pl: "", 
            sets: 2, 
            reps: "6-8", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/results?search_query=band+dislocation", 
            type: "standard" 
          },
          { 
            id: "legs1_4", 
            name: "BELT SQUAT", 
            pl: "", 
            sets: 2, 
            reps: "12-15", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/M5DeSgxNyKQ", 
            type: "standard" 
          },
          { 
            id: "legs1_5", 
            name: "GLUTE KICK BACK", 
            pl: "", 
            sets: 2, 
            reps: "10-12", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/qB_bC7-CQjI", 
            type: "standard" 
          },
          { 
            id: "legs1_6", 
            name: "Suwnica ta od razu obok maszyny di hack siadów", 
            pl: "", 
            sets: 3, 
            reps: "12-15", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/YuLqw3kHPaw", 
            type: "standard" 
          },
          { 
            id: "legs1_7", 
            name: "prostowanie na maszynie jednonóż", 
            pl: "PEŁNA KONTROLA", 
            sets: 3, 
            reps: "10-12", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/5orOHJL2qS4", 
            type: "standard" 
          }
      ]
  },
  "pull1": {
      title: "PULL 1",
      warmup: [
            { name: "Bieżnia", pl: "", link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", reps: "10 min" }
      ],
      exercises: [
          { 
            id: "pull1_1", 
            name: "Sciąganie drążka wyciągu górnego siedzać nachwytem", 
            pl: "", 
            sets: 3, 
            reps: "10-12", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", 
            type: "standard" 
          },
          { 
            id: "pull1_2", 
            name: "Wiosłowanie pół sztangą", 
            pl: "", 
            sets: 2, 
            reps: "6-8", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/watch?v=LIVJZZyZ2qM", 
            type: "standard" 
          },
          { 
            id: "pull1_3", 
            name: "Wiosłowanie podchwytem jednorącz hammer", 
            pl: "", 
            sets: 2, 
            reps: "8-10", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/results?search_query=band+dislocation", 
            type: "standard" 
          },
          { 
            id: "pull1_4", 
            name: "Wiosłowanie hantlem", 
            pl: "", 
            sets: 2, 
            reps: "8-10", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/M5DeSgxNyKQ", 
            type: "standard" 
          },
          { 
            id: "pull1_5", 
            name: "Rack pull z pauzą", 
            pl: "", 
            sets: 2, 
            reps: "6-8", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/qB_bC7-CQjI", 
            type: "standard" 
          },
          { 
            id: "pull1_6", 
            name: "Odwrotne butter flay", 
            pl: "", 
            sets: 3, 
            reps: "10-12", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/YuLqw3kHPaw", 
            type: "standard" 
          },
          { 
            id: "pull1_7", 
            name: "Uginanie sztanga na biceps", 
            pl: "", 
            sets: 1, 
            reps: "10 X 10 pow - 10s przerwy", 
            tempo: "-", 
            rir: "-", 
            rest: 10, 
            link: "https://www.youtube.com/shorts/5orOHJL2qS4", 
            type: "standard" 
          }
      ]
  },
  "push2": {
      title: "PUSH 2",
      warmup: [
            { name: "Bieżnia", pl: "", link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", reps: "10 min" }
      ],
      exercises: [
          { 
            id: "push2_1", 
            name: "Unoszenie na boki hantlami", 
            pl: "", 
            sets: 3, 
            reps: "12-15", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", 
            type: "standard" 
          },
          { 
            id: "push2_2", 
            name: "Wyciskanie na barki na hamerze", 
            pl: "", 
            sets: 3, 
            reps: "2x8-10 | 1x12-15", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/watch?v=LIVJZZyZ2qM", 
            type: "standard" 
          },
          { 
            id: "push2_3", 
            name: "Unoszenie na maszynie - tam gdzie też można robić klatkę", 
            pl: "", 
            sets: 3, 
            reps: "10-12", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/results?search_query=band+dislocation", 
            type: "standard" 
          },
          { 
            id: "push2_4", 
            name: "wyciskanie neutral hantli siedząc", 
            pl: "", 
            sets: 2, 
            reps: "10-12", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/M5DeSgxNyKQ", 
            type: "standard" 
          },
          { 
            id: "push2_5", 
            name: "MULTIFLIGHT FLY", 
            pl: "to jest ćwiczenie na klatę takie ściskanie na tej maszynie co robisz c numer 3", 
            sets: 3, 
            reps: "10-12", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/qB_bC7-CQjI", 
            type: "standard" 
          },
          { 
            id: "push2_6", 
            name: "Wyciskanie hantli płasko", 
            pl: "", 
            sets: 3, 
            reps: "2x8-10 | 1x12-15", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/YuLqw3kHPaw", 
            type: "standard" 
          },
          { 
            id: "push2_7", 
            name: "francuz sztangą leżąc", 
            pl: "", 
            sets: 4, 
            reps: "8-10", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/5orOHJL2qS4", 
            type: "standard" 
          }
      ]
  },
  "legs2": {
      title: "LEGS 2",
      warmup: [
            { name: "Bieżnia", pl: "", link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", reps: "10 min" }
      ],
      exercises: [
          { 
            id: "legs2_1", 
            name: "Przywodziciel", 
            pl: "", 
            sets: 3, 
            reps: "10-12", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", 
            type: "standard" 
          },
          { 
            id: "legs2_2", 
            name: "Prostowanie na maszynie obunóż", 
            pl: "", 
            sets: 3, 
            reps: "10-12", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/watch?v=LIVJZZyZ2qM", 
            type: "standard" 
          },
          { 
            id: "legs2_3", 
            name: "HACK SQUAT", 
            pl: "", 
            sets: 3, 
            reps: "6-8", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/results?search_query=band+dislocation", 
            type: "standard" 
          },
          { 
            id: "legs2_4", 
            name: "PENDULUM SQUAT", 
            pl: "z podwójnym dnem", 
            sets: 2, 
            reps: "10-12", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/M5DeSgxNyKQ", 
            type: "standard" 
          },
          { 
            id: "legs2_5", 
            name: "Wykroki", 
            pl: "", 
            sets: 2, 
            reps: "12-15", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/qB_bC7-CQjI", 
            type: "standard" 
          },
          { 
            id: "legs2_6", 
            name: "Uginanie leżąc", 
            pl: "", 
            sets: 3, 
            reps: "2x8-10 | 1x12-15", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/YuLqw3kHPaw", 
            type: "standard" 
          },
          { 
            id: "legs2_7", 
            name: "Uginanie klęcząc jednonóż", 
            pl: "", 
            sets: 2, 
            reps: "10-12", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/5orOHJL2qS4", 
            type: "standard" 
          }
      ]
  },
  "pull2": {
      title: "PULL 2",
      warmup: [
            { name: "Bieżnia", pl: "", link: "https://www.youtube.com/watch?v=_tKPIDhGPIM", reps: "10 min" }
      ],
      exercises: [
          { 
            id: "pull2_1", 
            name: "Narciarz", 
            pl: "", 
            sets: 3, 
            reps: "10-12", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/watch?v=LIVJZZyZ2qM", 
            type: "standard" 
          },
          { 
            id: "pull2_2", 
            name: "Ściąganie z góry jednorącz", 
            pl: "", 
            sets: 2, 
            reps: "8-10", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/results?search_query=band+dislocation", 
            type: "standard" 
          },
          { 
            id: "pull2_3", 
            name: "Przyciąganie drążka siedzać neutral", 
            pl: "", 
            sets: 2, 
            reps: "10-12", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/M5DeSgxNyKQ", 
            type: "standard" 
          },
          { 
            id: "pull2_4", 
            name: "Wiosło nachwytem sztangą", 
            pl: "", 
            sets: 3, 
            reps: "2x8-10 | 1x12-15", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/qB_bC7-CQjI", 
            type: "standard" 
          },
          { 
            id: "pull2_5", 
            name: "Szrugsy", 
            pl: "", 
            sets: 3, 
            reps: "12-10", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/YuLqw3kHPaw", 
            type: "standard" 
          },
          { 
            id: "pull2_6", 
            name: "Uginanie linką młotkowo w bramie", 
            pl: "", 
            sets: 4, 
            reps: "8-10", 
            tempo: "-", 
            rir: "-", 
            rest: 120, 
            link: "https://www.youtube.com/shorts/5orOHJL2qS4", 
            type: "standard" 
          }
      ]
  }
};