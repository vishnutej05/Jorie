
import { useState, useEffect } from "react";
import { User, Activity, Heart, Pill } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KidneyIcon,ObesityIcon  } from "@/components/ClusterIcons";
import "../styles/patient-listing.css";

const PatientListing = () => {
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
  const [patients, setPatients] = useState<unknown[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Cluster data
  const clusters = [
    {
      id: "kidney",
      title: "Chronic Kidney Disease with High Comorbidity",
      color: "#4caf50",
      icon: <KidneyIcon />,
    },
    {
      id: "diabetes",
      title: "Diabetes with Moderate Comorbidities",
      color: "#3f51b5",
      icon: <Activity className="w-12 h-12 text-red-500" />,
    },
    {
      id: "hypertension",
      title: "Hypertension with High Comorbidity",
      color: "#9c27b0",
      icon: <Heart className="w-12 h-12 text-red-500" />,
    },
    {
      id: "multimorbidity",
      title: "Multimorbidity Patients on Long-term Drug Therapy",
      color: "#f1c40f",
      icon: <Pill className="w-12 h-12 text-blue-500" />,
    },
    {
      id: "obesity",
      title: "Obesity and Orthopedic Conditions",
      color: "#e67e22",
      icon: <ObesityIcon />,
    },
  ];

  // Default patient data (for when no cluster is selected or API is not available)
  const defaultPatients = [
    { mrn: "E100202", gender: "male", status: "Alive", conditions: 2, procedures: null },
    { mrn: "E1003949", gender: "male", status: "Alive", conditions: 6, procedures: 2 },
    { mrn: "E1010148", gender: "female", status: "Alive", conditions: 3, procedures: 1 },
    { mrn: "E1016233", gender: "male", status: "Alive", conditions: 2, procedures: null },
    { mrn: "E1020559", gender: "female", status: "Alive", conditions: 3, procedures: null },
    { mrn: "E1026536", gender: "female", status: "Alive", conditions: 16, procedures: null },
    { mrn: "E1028419", gender: "male", status: "Deceased", conditions: 17, procedures: null },
    { mrn: "E1035232", gender: "male", status: "Deceased", conditions: 9, procedures: null },
    { mrn: "E1042033", gender: "female", status: "Alive", conditions: 4, procedures: null },
    { mrn: "E1042195", gender: "female", status: "Deceased", conditions: 10, procedures: null },
    { mrn: "E1045094", gender: "female", status: "Deceased", conditions: 9, procedures: null },
    { mrn: "E105316", gender: "male", status: "Alive", conditions: 2, procedures: null },
    { mrn: "E1054844", gender: "male", status: "Alive", conditions: 9, procedures: null },
  ];

  // Mock patient data for different clusters (for testing)
  const mockClusterData = {
    kidney: [
      { mrn: "K100202", gender: "female", status: "Alive", conditions: 4, procedures: 2 },
      { mrn: "K1003949", gender: "male", status: "Alive", conditions: 8, procedures: 3 },
      { mrn: "K1010148", gender: "female", status: "Deceased", conditions: 7, procedures: 2 },
    ],
    diabetes: [
      { mrn: "D100202", gender: "male", status: "Alive", conditions: 3, procedures: 1 },
      { mrn: "D1003949", gender: "female", status: "Alive", conditions: 4, procedures: 2 },
      { mrn: "D1010148", gender: "male", status: "Alive", conditions: 5, procedures: 1 },
    ],
    hypertension: [
      { mrn: "H100202", gender: "female", status: "Alive", conditions: 5, procedures: 0 },
      { mrn: "H1003949", gender: "male", status: "Deceased", conditions: 12, procedures: 4 },
      { mrn: "H1010148", gender: "female", status: "Alive", conditions: 6, procedures: 2 },
    ],
    multimorbidity: [
      { mrn: "M100202", gender: "male", status: "Alive", conditions: 10, procedures: 5 },
      { mrn: "M1003949", gender: "female", status: "Deceased", conditions: 14, procedures: 6 },
      { mrn: "M1010148", gender: "male", status: "Alive", conditions: 9, procedures: 3 },
    ],
    obesity: [
      { mrn: "O100202", gender: "female", status: "Alive", conditions: 7, procedures: 3 },
      { mrn: "O1003949", gender: "male", status: "Alive", conditions: 5, procedures: 2 },
      { mrn: "O1010148", gender: "female", status: "Deceased", conditions: 11, procedures: 4 },
    ],
  };

  useEffect(() => {
    // Function to fetch patients data based on selected cluster
    const fetchPatientsData = async () => {
      setLoading(true);
      try {
        if (selectedCluster) {
          // This will be used when API is available
          /* 
          const response = await fetch(`localhost:5000/patients?cluster=${selectedCluster}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setPatients(data);
          */

          // For now, use mock data based on selected cluster
          setPatients(mockClusterData[selectedCluster as keyof typeof mockClusterData] || defaultPatients);
        } else {
          // If no cluster is selected, show all patients
          setPatients(defaultPatients);
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
        // If there's an error, fall back to default data
        setPatients(defaultPatients);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientsData();
  }, [selectedCluster]);

  // Handle cluster selection
  const handleClusterSelect = (clusterId: string) => {
    setSelectedCluster(clusterId === selectedCluster ? null : clusterId);
  };

  return (
    <div className="container mx-auto p-6 max-w-screen-xl">
      <h1 className="text-3xl font-bold mb-6">Patient Listing</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Clusters Section */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <Card className="overflow-hidden border-slate-200">
            <div className="bg-slate-700 text-white py-2 px-4 font-semibold text-lg">
              Cluster
            </div>
            <div className="p-1">
              {clusters.map((cluster) => (
                <Card 
                  key={cluster.id}
                  className={`mb-2 overflow-hidden border hover:shadow-md transition-shadow cursor-pointer cluster-card ${
                    selectedCluster === cluster.id ? 'selected-cluster' : ''
                  }`}
                  onClick={() => handleClusterSelect(cluster.id)}
                >
                  <div className="flex p-4 items-center" style={{ borderLeft: `6px solid ${cluster.color}` }}>
                    <div className="flex-shrink-0 mr-4 cluster-icon-container">
                      {cluster.icon}
                    </div>
                    <div className="font-medium text-sm">
                      {cluster.title}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* Patients Table Section */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <Card className="border overflow-hidden table-container">
            {loading ? (
              <div className="p-8 text-center">Loading patient data...</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-700">
                      <TableHead className="text-white font-medium">MRN</TableHead>
                      <TableHead className="text-white font-medium">Gender</TableHead>
                      <TableHead className="text-white font-medium">Status</TableHead>
                      <TableHead className="text-white font-medium">No of Conditions</TableHead>
                      <TableHead className="text-white font-medium">No of Procedures</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patients.map((patient, index) => (
                      <TableRow 
                        key={patient.mrn}
                        className={`alternating-row ${index % 2 === 0 ? "bg-gray-100" : ""}`}
                      >
                        <TableCell className="font-medium">{patient.mrn}</TableCell>
                        <TableCell>
                          <div className="flex justify-center patient-icon">
                            {patient.gender === "female" ? (
                              <img 
                                src="/lovable-uploads/women.png" 
                                alt="Female" 
                                className="gender-icon gender-female" 
                                width="28" 
                                height="28" 
                              />
                            ) : (
                              <img 
                                src="/lovable-uploads/men.png" 
                                alt="Male" 
                                className="gender-icon gender-male" 
                                width="28" 
                                height="28" 
                              />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className={patient.status === "Deceased" ? "status-deceased" : "status-alive"}>
                          {patient.status}
                        </TableCell>
                        <TableCell className="text-center">{patient.conditions}</TableCell>
                        <TableCell className="text-center">{patient.procedures || ""}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientListing;