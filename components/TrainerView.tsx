import React, { useState, useRef } from 'react';
import { WorkoutsMap, WorkoutHistoryEntry, BodyMeasurement, CardioSession } from '../types';
import HistoryView from './HistoryView';
import ProgressView from './ProgressView';
import MeasurementsView from './MeasurementsView';
import CardioView from './CardioView';

type Tab = 'history' | 'progress' | 'measurements' | 'cardio';

export default function TrainerView() {
  const [importedData, setImportedData] = useState<{
    workouts: WorkoutsMap;
    history: { [key: string]: WorkoutHistoryEntry[] };
    measurements: BodyMeasurement[];
    cardio: CardioSession[];
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
        let foundCardio: CardioSession[] = [];
        const foundHistory: { [key: string]: WorkoutHistoryEntry[] } = {};
        
        Object.keys(rawJson).forEach(key => {
            let content = rawJson[key];
            if (typeof content === 'string') {
                try { content = JSON.parse(content); } catch { return; }
            }
            if (!content) return;

            // 1. Wykrywanie Planu
            if (!foundWorkouts && typeof content === 'object' && !Array.isArray(content)) {
                const keys = Object.keys(content);
                if (keys.length > 0) {
                    const firstItem = content[keys[0]];
                    if (firstItem && firstItem.title && Array.isArray(firstItem.exercises)) {
                        foundWorkouts = content;
                        return;
                    }
                }
            }
            // 2. Wykrywanie Historii
            if (Array.isArray(content) && content.length > 0) {
                const firstItem = content[0];
                if (firstItem.date && firstItem.results && firstItem.timestamp) {
                    const parts = key.split('_history_');
                    if (parts.length > 1) foundHistory[parts[1]] = content;
                    else foundHistory[key] = content;
                }
            }
            // 3. Wykrywanie Pomiarów
            if (Array.isArray(content) && content.length > 0) {
                const firstItem = content[0];
                if (firstItem.weight !== undefined && (firstItem.waist !== undefined || firstItem.biceps !== undefined)) {
                    foundMeasurements = content;
                }
            }
            // 4. Wykrywanie Cardio
            if (Array.isArray(content) && content.length > 0) {
                const firstItem = content[0];
                if (firstItem.type && firstItem.duration && !firstItem.results) {
                     if (['rowerek', 'bieznia', 'schody', 'orbitrek'].includes(firstItem.type) || key.includes('_cardio')) {
                        foundCardio = content;
                     }
                }
            }
        });

        if (foundWorkouts) {
            setImportedData({
                workouts: foundWorkouts,
                history: foundHistory,
                measurements: foundMeasurements,
                cardio: foundCardio
            });
        } else {
            alert("Nie rozpoznano struktury pliku.");
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
        <p className="text-gray-400 mb-8 max-w-xs">Wgraj plik kopii zapasowej podopiecznego.</p>
        <button onClick={() => fileInputRef.current?.click()} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition flex items-center">
            <i className="fas fa-file-upload mr-3 text-xl"></i> WCZYTAJ DANE
        </button>
        <input type="file" ref={fileInputRef} accept=".json" className="hidden" onChange={handleFileLoad} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-10">
      <div className="flex justify-between items-center mb-6 bg-blue-900/30 p-4 rounded-xl border border-blue-800">
        <div>
            <h2 className="text-xl font-bold text-white">Podgląd Podopiecznego</h2>
            <p className="text-blue-400 text-xs">Znaleziono dane.</p>
        </div>
        <button onClick={() => setImportedData(null)} className="text-gray-400 hover:text-white"><i className="fas fa-times-circle text-2xl"></i></button>
      </div>
      <div className="flex space-x-1 mb-6 bg-[#1e1e1e] p-1 rounded-lg">
        {['progress', 'history', 'measurements', 'cardio'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab as Tab)} className={`flex-1 py-2 text-[10px] md:text-xs font-bold rounded transition ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>
                {tab === 'progress' ? 'WYKRESY' : tab.toUpperCase()}
            </button>
        ))}
      </div>
      <div className="bg-[#1e1e1e] rounded-xl p-1 min-h-[50vh] shadow-inner border border-gray-800">
        {activeTab === 'progress' && <ProgressView overrideWorkouts={importedData.workouts} overrideHistory={importedData.history} />}
        {activeTab === 'history' && <HistoryView overrideWorkouts={importedData.workouts} overrideHistory={importedData.history} />}
        {activeTab === 'measurements' && <MeasurementsView overrideMeasurements={importedData.measurements} />}
        {activeTab === 'cardio' && <CardioView overrideSessions={importedData.cardio} />}
      </div>
    </div>
  );
}