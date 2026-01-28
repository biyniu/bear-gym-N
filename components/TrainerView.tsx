import React, { useState, useRef } from 'react';
import { WorkoutsMap, WorkoutHistoryEntry, BodyMeasurement } from '../types';
import HistoryView from './HistoryView';
import ProgressView from './ProgressView';
import MeasurementsView from './MeasurementsView';

type Tab = 'history' | 'progress' | 'measurements';

export default function TrainerView() {
  const [importedData, setImportedData] = useState<{
    workouts: WorkoutsMap;
    history: { [key: string]: WorkoutHistoryEntry[] };
    measurements: BodyMeasurement[];
    clientName?: string;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<Tab>('progress');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const rawJson = JSON.parse(event.target?.result as string);
        
        let foundWorkouts: WorkoutsMap | null = null;
        let foundMeasurements: BodyMeasurement[] = [];
        const foundHistory: { [key: string]: WorkoutHistoryEntry[] } = {};
        let foundName = "Nieznany Klient";

        // INTELIGENTNE PARSOWANIE
        // Zamiast polegać na nazwach kluczy (które się zmieniły na 'niedzwiedz_v1'),
        // sprawdzamy strukturę danych wewnątrz wartości.
        
        Object.keys(rawJson).forEach(key => {
            let content = rawJson[key];
            
            // Jeśli dane są stringiem (z LocalStorage), parsujemy je
            if (typeof content === 'string') {
                try { content = JSON.parse(content); } catch { return; }
            }

            if (!content) return;

            // 1. Wykrywanie Głównego Planu Treningowego
            // Szukamy obiektu, którego wartości mają pole 'exercises' będące tablicą
            if (!foundWorkouts && typeof content === 'object' && !Array.isArray(content)) {
                const keys = Object.keys(content);
                if (keys.length > 0) {
                    // Sprawdzamy pierwszy element, czy wygląda jak plan
                    const firstItem = content[keys[0]];
                    if (firstItem && firstItem.title && Array.isArray(firstItem.exercises)) {
                        foundWorkouts = content;
                        return; // Znaleziono plan, idziemy dalej
                    }
                }
            }

            // 2. Wykrywanie Historii
            // Szukamy tablicy, która zawiera obiekty z polami 'date' i 'results'
            if (Array.isArray(content) && content.length > 0) {
                const firstItem = content[0];
                if (firstItem.date && firstItem.results && firstItem.timestamp) {
                    // To jest historia. Musimy ustalić ID treningu.
                    // Próbujemy wyciągnąć ID z nazwy klucza (np. ..._history_push1)
                    const parts = key.split('_history_');
                    if (parts.length > 1) {
                        foundHistory[parts[1]] = content;
                    } else {
                        // Jeśli klucz jest dziwny, próbujemy zgadnąć ID na podstawie pasujących ćwiczeń (opcjonalne, tutaj uproszczone)
                        // Używamy całego klucza jako ID w ostateczności, ale zazwyczaj split zadziała
                        foundHistory[key] = content;
                    }
                }
            }

            // 3. Wykrywanie Pomiarów
            // Szukamy tablicy z polami 'weight', 'waist' itp.
            if (Array.isArray(content) && content.length > 0) {
                const firstItem = content[0];
                if (firstItem.weight !== undefined && (firstItem.waist !== undefined || firstItem.biceps !== undefined)) {
                    foundMeasurements = content;
                }
            }
        });

        if (foundWorkouts) {
            setImportedData({
                workouts: foundWorkouts,
                history: foundHistory,
                measurements: foundMeasurements,
                clientName: foundName
            });
        } else {
            alert("Nie udało się rozpoznać struktury planu treningowego w pliku.\n\nUpewnij się, że plik nie jest pusty i pochodzi z tej aplikacji.");
        }

      } catch (err) {
        console.error(err);
        alert("Błąd odczytu pliku JSON.");
      }
    };
    reader.readAsText(file);
  };

  if (!importedData) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6 border-4 border-blue-600 shadow-xl">
            <i className="fas fa-user-graduate text-4xl text-blue-500"></i>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Strefa Trenera</h2>
        <p className="text-gray-400 mb-8 max-w-xs">
            Wgraj plik kopii zapasowej otrzymany od podopiecznego, aby przejrzeć jego postępy.
        </p>
        
        <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition transform active:scale-95 flex items-center"
        >
            <i className="fas fa-file-upload mr-3 text-xl"></i> WCZYTAJ DANE
        </button>
        <input 
            type="file" 
            ref={fileInputRef} 
            accept=".json" 
            className="hidden" 
            onChange={handleFileLoad} 
        />
        <p className="text-xs text-gray-600 mt-6">
            Logika importu oparta na strukturze danych,<br/>niezależna od nazw plików.
        </p>
      </div>
    );
  }

  // Oblicz ile historii znaleziono dla debugowania
  const historyCount = Object.keys(importedData.history).length;

  return (
    <div className="animate-fade-in pb-10">
      <div className="flex justify-between items-center mb-6 bg-blue-900/30 p-4 rounded-xl border border-blue-800">
        <div>
            <h2 className="text-xl font-bold text-white">Podgląd Podopiecznego</h2>
            <p className="text-blue-400 text-xs">
                Znaleziono: {Object.keys(importedData.workouts).length} planów, {historyCount} historii.
            </p>
        </div>
        <button 
            onClick={() => setImportedData(null)}
            className="text-gray-400 hover:text-white"
        >
            <i className="fas fa-times-circle text-2xl"></i>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-[#1e1e1e] p-1 rounded-lg">
        <button 
            onClick={() => setActiveTab('progress')}
            className={`flex-1 py-2 text-xs font-bold rounded transition ${activeTab === 'progress' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
        >
            WYKRESY
        </button>
        <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 text-xs font-bold rounded transition ${activeTab === 'history' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
        >
            HISTORIA
        </button>
        <button 
            onClick={() => setActiveTab('measurements')}
            className={`flex-1 py-2 text-xs font-bold rounded transition ${activeTab === 'measurements' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
        >
            POMIARY
        </button>
      </div>

      <div className="bg-[#1e1e1e] rounded-xl p-1 min-h-[50vh] shadow-inner border border-gray-800">
        {activeTab === 'progress' && (
            <ProgressView 
                overrideWorkouts={importedData.workouts} 
                overrideHistory={importedData.history} 
            />
        )}
        {activeTab === 'history' && (
            <HistoryView 
                overrideWorkouts={importedData.workouts} 
                overrideHistory={importedData.history} 
            />
        )}
        {activeTab === 'measurements' && (
            <MeasurementsView 
                overrideMeasurements={importedData.measurements} 
            />
        )}
      </div>
    </div>
  );
}