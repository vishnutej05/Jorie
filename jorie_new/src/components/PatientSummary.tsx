
import React from 'react';

interface PatientSummaryProps {
  summary: string;
}

export function PatientSummary({ summary }: PatientSummaryProps) {
  return (
    <div className="rounded-md border bg-white overflow-hidden">
      <div className="p-3 bg-blue-100 border-b">
        <h3 className="font-medium">Summary</h3>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-700">{summary}</p>
      </div>
    </div>
  );
}
