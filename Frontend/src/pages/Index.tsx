import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { PatientDatabase } from "@/components/PatientDatabase";
import { PatientSummary } from "@/components/PatientSummary";
import { MedicalTimeline, TimelineEvent } from "@/components/MedicalTimeline";
import { LabResults } from "@/components/LabResults";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

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
]

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

// Power BI report URLs
const powerBIReports = {
  patientRiskProfiler: "https://app.powerbi.com/reportEmbed?reportId=e711c02c-fda7-499a-8437-dc9d968e176a&autoAuth=true&ctid=39d814ab-a56f-478d-8b14-f4f1e99cfe1b",
  patientTimeline: "https://app.powerbi.com/reportEmbed?reportId=d2cd67e9-3dd8-4ef1-a5fa-4acfdf344f1e&autoAuth=true&ctid=39d814ab-a56f-478d-8b14-f4f1e99cfe1b",
  personaComparison: "https://app.powerbi.com/reportEmbed?reportId=d2cd67e9-3dd8-4ef1-a5fa-4acfdf344f1e&autoAuth=true&ctid=39d814ab-a56f-478d-8b14-f4f1e99cfe1b",
  adherenceScorecard: "https://app.powerbi.com/reportEmbed?reportId=fe973fc3-cd2b-4442-b3eb-d9c0441bdc11&autoAuth=true&ctid=39d814ab-a56f-478d-8b14-f4f1e99cfe1b"
};

const Index = () => {
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0].id);
  const [currentView, setCurrentView] = useState("guidelineAdherence");
  
  // Function to render the appropriate content based on the current view
  const renderContent = () => {
    // If the view is one of the Power BI reports, render an iframe
    if (Object.keys(powerBIReports).includes(currentView)) {
      return (
        <div className="w-full h-full min-h-[calc(100vh-150px)]">
          <iframe 
            title={currentView}
            width="100%" 
            height="100%" 
            style={{ border: "none", minHeight: "calc(100vh - 150px)" }}
            src={powerBIReports[currentView]}
            allowFullScreen={true}
          ></iframe>  
        </div>
      );
    }
    
    // Otherwise, render the default patient timeline view
    return (
      <>
        <PatientDatabase 
          patients={patients}
          selectedPatientId={selectedPatientId}
          onSelectPatient={setSelectedPatientId}
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
  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar onViewChange={setCurrentView} currentView={currentView} />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">
              {currentView === "patientRiskProfiler" && "Patient Risk Profiler"}
              {currentView === "patientTimeline" && "Patient Health Timeline"}
              {currentView === "personaComparison" && "Persona Comparison"}
              {currentView === "adherenceScorecard" && "Adherence & Engagement Scorecard"}
            </h1>
            {/* {currentView === "patientTimeline" && ( */}
              {/* // <Button className="bg-teal-600 hover:bg-teal-700">
              //   <PlusCircle className="mr-2 h-4 w-4" />
              //   New Patient
              // </Button> */}
            {/* // )} */}
          </div>
          
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;