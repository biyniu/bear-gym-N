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
        
        // --- PARSING LOGIC ---
        // The backup file is a flat key-value object from localStorage.
        // We need to reconstruct the structured data.
        
        let foundWorkouts: WorkoutsMap | null = null;
        let foundMeasurements: BodyMeasurement[] = [];
        const foundHistory: { [key: string]: WorkoutHistoryEntry[] } = {};
        let foundName = "Nieznany Klient";

        // Iteracja po kluczach, aby znaleźć pasujące dane
        Object.keys(rawJson).forEach(key => {
            // Logika wykrywania głównego obiektu treningowego
            // Szukamy klucza zawierającego 'workout_app', ale wykluczamy klucze pomocnicze
            const isMainWorkoutKey = key.includes('workout_app') 
                && !key.includes('_history_') 
                && !key.includes('_measurements') 
                && !key.includes('_cardio') 
                && !key.includes('_last_');

            if (isMainWorkoutKey) {
                try {
                    // Obsługa zarówno stringified JSON (standard) jak i czystego obiektu (jeśli plik był ręcznie edytowany)
                    const content = rawJson[key];
                    if (typeof content === 'string') {
                        foundWorkouts = JSON.parse(content);
                    } else if (typeof content === 'object') {
                        foundWorkouts = content;
                    }
                } catch (e) {
                    console.warn("Błąd parsowania klucza treningów:", key, e);
                }
            }
            
            // Find Measurements
            if (key.includes('_measurements')) {
                try {
                    const content = rawJson[key];
                    if (typeof content === 'string') foundMeasurements = JSON.parse(content);
                    else if (typeof content === 'object') foundMeasurements = content;
                } catch {}
            }

            // Find History (keys like ..._history_push1)
            if (key.includes('_history_')) {
                const parts = key.split('_history_');
                if (parts.length > 1) {
                    const workoutId = parts[1];
                    try {
                        const content = rawJson[key];
                        if (typeof content === 'string') foundHistory[workoutId] = JSON.parse(content);
                        else if (typeof content === 'object') foundHistory[workoutId] = content;
                    } catch {}
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
            alert("Nie znaleziono głównej struktury planu treningowego w pliku.\n\nUpewnij się, że w aplikacji 'Ucznia' kliknięto 'Eksportuj' po zapisaniu zmian (wymuszony zapis).");
        }

      } catch (err) {
        console.error(err);
        alert("Błąd odczytu pliku. Upewnij się, że to poprawny plik kopii zapasowej JSON.");
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
            Twoje własne dane treningowe są bezpieczne.<br/>Ten tryb działa tylko "do odczytu".
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-10">
      <div className="flex justify-between items-center mb-6 bg-blue-900/30 p-4 rounded-xl border border-blue-800">
        <div>
            <h2 className="text-xl font-bold text-white">Podgląd Podopiecznego</h2>
            <p className="text-blue-400 text-xs">Tryb tylko do odczytu</p>
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