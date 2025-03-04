import React from "react";
import { PatientDatabase } from "@/components/PatientDatabase";
import { LabResults } from "@/components/LabResults";

const patients = [
  {
    "id": "45987",
    "name": "Amit Verma",
    "address": "A-45, 3rd Floor, Sector-15, Noida, UP-201301"
  },
  {
    "id": "38214",
    "name": "Rohit Sharma",
    "address": "B-12, Ground Floor, Indirapuram, Ghaziabad, UP-201014"
  },
  {
    "id": "52763",
    "name": "Priya Gupta",
    "address": "C-78, Tower 5, Gomti Nagar, Lucknow, UP-226010"
  }
];

const patientSummary = "On 13th February 2024, the patient presented with sepsis and was recommended 14 days of medication. CBC and KFT tests were advised, and an ENT department visit for cleansing was scheduled. On 1st February 2024, the patient continued treatment for Chronic Kidney Disease (CKD) and was prescribed 10 days of medication. Earlier, from 19th January to 27th January 2024, the patient was admitted for various tests.";

const timelineEvents = [
  { id: "1", date: "09/09/24", type: "complaints", details: "The patient complained of abdominal pain" },
  { id: "2", date: "04/04/24", type: "complaints", details: "The patient reported sore throat" },
  { id: "3", date: "17/11/23", type: "diagnosis", details: "Proteinuria", additionalInfo: "Sepsis, UTI" },
  { id: "4", date: "15/10/23", type: "diagnosis", details: "Chronic Kidney Disease" },
  { id: "5", date: "12/07/23", type: "medicine", details: "GT GEL 200", additionalInfo: "2PD 200ML" },
  { id: "6", date: "16/07/23", type: "medicine", details: "LNIBE TA 5 mg" },
  { id: "7", date: "10/09/23", type: "pathology", details: "Creatinine", additionalInfo: "Albumin" },
  { id: "8", date: "16/07/23", type: "pathology", details: "Na", additionalInfo: "K" },
  { id: "9", date: "10/09/23", type: "procedure", details: "Laparoscopic Cholecystectomy" },
  { id: "10", date: "16/07/23", type: "procedure", details: "Colonoscopy" }
];

const dateLabels = [
  "09/09/24", "04/04/24", "17/11/23", "15/10/23", "10/09/23", "16/07/23", "12/07/23", "10/09/22", "15/09/22", "10/08/22"
];

export const PatientRecommendation = ({ 
  selectedPatientId, 
  onSelectPatient 
}) => {
  return (
    <>
      <PatientDatabase 
        patients={patients}
        selectedPatientId={selectedPatientId}
        onSelectPatient={onSelectPatient}
      />
      
      {/* Combined card for summary and timeline */}
      <div className="mt-8 rounded-md border bg-white overflow-hidden">
        <div className="p-3 bg-blue-100 border-b">
          <h3 className="font-medium">Patient Overview</h3>
        </div>
        
        <div className="p-4 border-b">
          <p className="text-sm text-gray-700">{patientSummary}</p>
        </div>
        
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
        {Object.entries({
          complaints: 'Chief Complaints',
          diagnosis: 'Diagnosis',
          medicine: 'Medicine',
          pathology: 'Pathology',
          procedure: 'Procedure'
        }).map(([type, label]) => {
          const dotColor = ['complaints', 'diagnosis', 'medicine'].includes(type) 
            ? 'bg-green-500' 
            : 'bg-blue-500';
          
          const eventsOfType = timelineEvents.filter(e => e.type === type);
          
          return (
            <div key={type} className="grid grid-cols-[150px_1fr] border-b last:border-b-0">
              <div className="p-3 border-r flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${dotColor}`}></div>
                <span className="text-sm font-medium">{label}</span>
              </div>
              <div className="grid grid-cols-10">
                {dateLabels.map((date, i) => {
                  const eventsForDate = eventsOfType.filter(e => e.date === date);
                  
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
          );
        })}
      </div>
      
      <div className="mt-8">
        <LabResults />
      </div>
    </>
  );
};