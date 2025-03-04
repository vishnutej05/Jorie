
import React from 'react';
import { cn } from '@/lib/utils';

export type TimelineEvent = {
  id: string;
  date: string;
  type: 'complaints' | 'diagnosis' | 'medicine' | 'pathology' | 'procedure';
  details: string;
  additionalInfo?: string;
};

interface MedicalTimelineProps {
  events: TimelineEvent[];
  dateLabels: string[];
}

export function MedicalTimeline({ events, dateLabels }: MedicalTimelineProps) {
  // Group events by category
  const eventsByType = events.reduce((acc, event) => {
    if (!acc[event.type]) {
      acc[event.type] = [];
    }
    acc[event.type].push(event);
    return acc;
  }, {} as Record<string, TimelineEvent[]>);
  
  const typeLabels: Record<string, string> = {
    complaints: 'Chief Complaints',
    diagnosis: 'Diagnosis',
    medicine: 'Medicine',
    pathology: 'Pathology',
    procedure: 'Procedure'
  };
  
  const dotColors: Record<string, string> = {
    complaints: 'bg-green-500',
    diagnosis: 'bg-green-500',
    medicine: 'bg-green-500',
    pathology: 'bg-blue-500',
    procedure: 'bg-blue-500'
  };

  return (
    <div className="rounded-md border bg-white overflow-hidden mt-4">
      {/* Timeline header with dates */}
      <div className="grid grid-cols-[150px_1fr] border-b">
        <div className="p-3 bg-gray-50 border-r">
          <span className="text-sm font-medium">Category</span>
        </div>
        <div className="grid grid-cols-10 bg-gray-50">
          {dateLabels.map((date, i) => (
            <div key={i} className="p-3 text-center border-r last:border-r-0">
              <span className="text-xs font-medium">{date}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Timeline rows by type */}
      {Object.keys(typeLabels).map((type) => (
        <div key={type} className="grid grid-cols-[150px_1fr] border-b last:border-b-0">
          <div className="p-3 border-r flex items-center gap-2">
            <div className={cn("w-3 h-3 rounded-full", dotColors[type])}></div>
            <span className="text-sm font-medium">{typeLabels[type]}</span>
          </div>
          <div className="grid grid-cols-10">
            {dateLabels.map((date, i) => {
              const eventsForDate = eventsByType[type as keyof typeof typeLabels]?.filter(e => e.date === date) || [];
              
              return (
                <div key={i} className="p-2 border-r last:border-r-0 text-xs text-center">
                  {eventsForDate.map((event, idx) => (
                    <div key={idx} className="mb-1 last:mb-0">
                      <div className="font-medium">{event.details}</div>
                      {event.additionalInfo && (
                        <div className="text-gray-500">{event.additionalInfo}</div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
