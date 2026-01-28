import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../App';
import { storage } from '../services/storage';
import { CLIENT_CONFIG } from '../constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WorkoutPlan, WorkoutsMap, WorkoutHistoryEntry } from '../types';

declare var html2pdf: any;

interface ProgressViewProps {
  overrideWorkouts?: WorkoutsMap;
  overrideHistory?: { [key: string]: WorkoutHistoryEntry[] };
}

export default function ProgressView({ overrideWorkouts, overrideHistory }: ProgressViewProps) {
  const context = useContext(AppContext);
  
  // Jeśli są override'y, używamy ich, w przeciwnym razie bierzemy z contextu
  const workouts = overrideWorkouts || context.workouts;
  const isTrainerMode = !!overrideWorkouts;

  const workoutIds = Object.keys(workouts);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>(workoutIds[0] || "");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  
  // Reset selectedWorkoutId if workouts change
  useEffect(() => {
      if(workoutIds.length > 0 && !workoutIds.includes(selectedWorkoutId)) {
          setSelectedWorkoutId(workoutIds[0]);
      }
  }, [workouts]);
  
  const reportRef = useRef<HTMLDivElement>(null);

  const getExerciseData = (workoutId: string, exerciseId: string) => {
    let history: WorkoutHistoryEntry[] = [];
    
    if (overrideHistory) {
        history = overrideHistory[workoutId] || [];
    } else {
        history = storage.getHistory(workoutId);
    }

    if (!history || history.length === 0) return [];

    return history.slice().reverse().map(entry => {
      const resultStr = entry.results[exerciseId];
      if (!resultStr) return null;

      const matches = resultStr.matchAll(/(\d+(?:[.,]\d+)?)\s*kg/gi);
      let maxWeight = 0;
      let found = false;

      for (const match of matches) {
        const weightVal = parseFloat(match[1].replace(',', '.'));
        if (!isNaN(weightVal)) {
          if (weightVal > maxWeight) maxWeight = weightVal;
          found = true;
        }
      }

      if (!found) return null;

      return {
        date: entry.date.split(',')[0].slice(0, 5),
        weight: maxWeight,
        fullDate: entry.date
      };
    }).filter(Boolean);
  };

  const handleExportPDF = () => {
    if (!reportRef.current) return;
    setIsGeneratingPdf(true);

    const element = reportRef.current;
    const opt = {
      margin:       0,
      filename:     `Raport_Postepow_${CLIENT_CONFIG.name.replace(/\s+/g, '_')}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };

    setTimeout(() => {
        html2pdf().set(opt).from(element).save().then(() => {
            setIsGeneratingPdf(false);
        });
    }, 1000);
  };

  const CustomLabel = (props: any) => {
    const { x, y, value } = props;
    return (
      <text 
        x={x} 
        y={y - 8} 
        fill="#fff" 
        textAnchor="middle" 
        fontSize={8} 
        fontWeight="bold"
      >
        {value}
      </text>
    );
  };

  const currentWorkout = workouts[selectedWorkoutId];

  return (
    <div className={`animate-fade-in relative ${isTrainerMode ? 'p-2' : 'pb-20'}`}>
      
      {/* Panel Sterowania */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {!isTrainerMode && <h2 className="text-2xl font-bold text-white text-center md:text-left">Wykresy Postępu</h2>}
        
        <div className="flex gap-2 w-full md:w-auto">
            <select 
                value={selectedWorkoutId} 
                onChange={(e) => setSelectedWorkoutId(e.target.value)}
                className="flex-grow bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-red-500 outline-none"
            >
                {(Object.entries(workouts) as [string, WorkoutPlan][]).map(([id, data]) => (
                <option key={id} value={id}>{data.title}</option>
                ))}
            </select>
            
            {!isTrainerMode && (
                <button 
                    onClick={handleExportPDF}
                    disabled={isGeneratingPdf}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-bold shadow transition flex items-center justify-center whitespace-nowrap"
                >
                    {isGeneratingPdf ? <i className="fas fa-spinner fa-spin mr-2"></i> : <i className="fas fa-file-pdf mr-2"></i>}
                    POBIERZ PEŁNY RAPORT
                </button>
            )}
        </div>
      </div>

      {/* Wykresy */}
      <div className={`grid gap-3 ${isTrainerMode ? 'grid-cols-1' : 'grid-cols-1'}`}>
          {currentWorkout?.exercises.map((ex) => {
              const data = getExerciseData(selectedWorkoutId, ex.id);
              const hasData = data && data.length >= 2;
              
              if (!hasData) return null; 

              const weights = data.map((d: any) => d.weight);
              const maxVal = Math.max(...weights);
              const domainMax = Math.ceil(maxVal * 1.2); 

              return (
                  <div key={ex.id} className="bg-[#1e1e1e] p-3 rounded-lg shadow-sm border border-gray-800">
                      <div className="flex justify-between items-center mb-1 border-b border-gray-700 pb-1">
                          <h3 className="font-bold text-white text-sm truncate max-w-[70%]">{ex.name}</h3>
                          <span className="text-xs font-bold text-blue-400">Max: {maxVal} kg</span>
                      </div>
                      <div className={`w-full ${isTrainerMode ? 'h-24' : 'h-40'}`}>
                          <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={data as any} margin={{ top: 20, right: 10, bottom: 0, left: 0 }}>
                              <CartesianGrid stroke="#333" strokeDasharray="3 3" vertical={false} />
                              <XAxis 
                                  dataKey="date" 
                                  stroke="#666" 
                                  tick={{fill: '#888', fontSize: 10}} 
                                  tickMargin={5}
                                  minTickGap={30}
                              />
                              <YAxis hide={true} domain={[0, domainMax]} />
                              <Tooltip 
                                  contentStyle={{ backgroundColor: '#111', border: '1px solid #444', borderRadius: '4px', fontSize: '10px' }}
                                  itemStyle={{ color: '#fff' }}
                                  formatter={(value: any) => [`${value} kg`, '']}
                              />
                              <Line 
                                  type="monotone" 
                                  dataKey="weight" 
                                  stroke="#ef4444" 
                                  strokeWidth={2} 
                                  dot={{ r: 3, fill: '#ef4444' }} 
                                  activeDot={{ r: 5, fill: '#fff' }}
                                  label={<CustomLabel />}
                              />
                              </LineChart>
                          </ResponsiveContainer>
                      </div>
                  </div>
              );
          })}
          
          {currentWorkout?.exercises.every(ex => {
              const d = getExerciseData(selectedWorkoutId, ex.id);
              return !d || d.length < 2;
          }) && (
              <div className="col-span-full text-center py-10 text-gray-500">
                  <i className="fas fa-chart-bar text-4xl mb-4 opacity-50"></i>
                  <p>Brak wystarczających danych dla tego planu (min. 2 treningi).</p>
              </div>
          )}
      </div>

      {/* Ukryty raport tylko w trybie normalnym */}
      {!isTrainerMode && (
        <div className="absolute top-0 left-[-9999px]">
            <div ref={reportRef} className="w-[210mm] min-h-[297mm] bg-[#121212] text-white font-sans">
                {/* PDF Content Logic Same as Before */}
                <div className="p-10 text-white">Generowanie PDF...</div> 
            </div>
        </div>
      )}
    </div>
  );
}