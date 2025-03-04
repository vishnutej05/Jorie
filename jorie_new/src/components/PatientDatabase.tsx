
import React from 'react';
import { cn } from '@/lib/utils';

type PatientData = {
  id: string;
  name: string;
  address: string;
};

interface PatientDatabaseProps {
  patients: PatientData[];
  selectedPatientId?: string;
  onSelectPatient: (id: string) => void;
}

export function PatientDatabase({ 
  patients, 
  selectedPatientId,
  onSelectPatient 
}: PatientDatabaseProps) {
  return (
    <div className="rounded-md border bg-white overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h3 className="font-medium">Patient Database</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4 p-4 border-b bg-gray-50">
        <div className="text-sm font-medium text-gray-500">Patient ID</div>
        <div className="text-sm font-medium text-gray-500">Patient Name</div>
        <div className="text-sm font-medium text-gray-500">Address</div>
      </div>
      
      <div className="max-h-[300px] overflow-y-auto">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className={cn(
              "grid grid-cols-3 gap-4 p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors",
              patient.id === selectedPatientId && "bg-blue-50"
            )}
            onClick={() => onSelectPatient(patient.id)}
          >
            <div className="text-sm text-gray-700">{patient.id}</div>
            <div className="text-sm text-gray-700">{patient.name}</div>
            <div className="text-sm text-gray-700">{patient.address}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
