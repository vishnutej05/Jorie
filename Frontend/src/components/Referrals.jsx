
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, PlusCircle, ChevronDown, User, ArrowUpDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const referrals = [
  {
    id: 1,
    patientName: "Sophia Martinez",
    referredBy: "Dr. Eric Johnson",
    referDate: "05/14/24",
    alignProgram: "Cardiology Care",
    status: "New Referral",
    country: "United States"
  },
  {
    id: 2,
    patientName: "James Wilson",
    referredBy: "Dr. Maria Rodriguez",
    referDate: "05/10/24",
    alignProgram: "Diabetes Management",
    status: "Pending Payment",
    country: "Canada"
  },
  {
    id: 3,
    patientName: "Emily Thompson",
    referredBy: "Dr. Michael Chang",
    referDate: "05/02/24",
    alignProgram: "Physical Therapy",
    status: "Enrolled",
    country: "United Kingdom"
  },
  {
    id: 4,
    patientName: "Raj Patel",
    referredBy: "Dr. Sarah Williams",
    referDate: "04/28/24",
    alignProgram: "Orthopedic Care",
    status: "Pre-Enrollment",
    country: "Australia"
  },
  {
    id: 5,
    patientName: "Liu Wei",
    referredBy: "Dr. Jennifer Adams",
    referDate: "04/20/24",
    alignProgram: "Surgery Transition",
    status: "Post-Enrollment",
    country: "Singapore"
  },
  {
    id: 6,
    patientName: "Olivia Johnson",
    referredBy: "Dr. David Garcia",
    referDate: "04/15/24",
    alignProgram: "Mental Health Program",
    status: "New Referral",
    country: "Germany"
  },
  {
    id: 7,
    patientName: "Aiden Chen",
    referredBy: "Dr. Elizabeth Taylor",
    referDate: "04/07/24",
    alignProgram: "Nutrition Counseling",
    status: "Enrolled",
    country: "Japan"
  },
  {
    id: 8,
    patientName: "Maya Singh",
    referredBy: "Dr. Robert Lee",
    referDate: "04/05/24",
    alignProgram: "Cardiology Care",
    status: "New Referral",
    country: "India"
  },
  {
    id: 9,
    patientName: "Daniel Kim",
    referredBy: "Dr. Patricia Wong",
    referDate: "03/28/24",
    alignProgram: "Pain Management",
    status: "Pre-Enrollment",
    country: "South Korea"
  },
  {
    id: 10,
    patientName: "Isabella García",
    referredBy: "Dr. Thomas Brown",
    referDate: "03/22/24",
    alignProgram: "Respiratory Care",
    status: "Enrolled",
    country: "Spain"
  },
  {
    id: 11,
    patientName: "Lucas Müller",
    referredBy: "Dr. Anna Schmidt",
    referDate: "03/18/24",
    alignProgram: "Diabetes Management",
    status: "Post-Enrollment",
    country: "Germany"
  },
  {
    id: 12,
    patientName: "Sophie Dubois",
    referredBy: "Dr. Jean Martin",
    referDate: "03/15/24",
    alignProgram: "Mental Health Program",
    status: "New Referral",
    country: "France"
  },
  {
    id: 13,
    patientName: "Ethan Williams",
    referredBy: "Dr. Linda Chen",
    referDate: "03/12/24",
    alignProgram: "Orthopedic Care",
    status: "Pre-Enrollment",
    country: "United States"
  },
  {
    id: 14,
    patientName: "Amelia Johnson",
    referredBy: "Dr. James Wilson",
    referDate: "03/08/24",
    alignProgram: "Prenatal Program",
    status: "Post-Enrollment",
    country: "Australia"
  },
  {
    id: 15,
    patientName: "Mohammed Al-Farsi",
    referredBy: "Dr. Fatima Ahmed",
    referDate: "03/01/24",
    alignProgram: "Cardiology Care",
    status: "Enrolled",
    country: "United Arab Emirates"
  }
];

const programOptions = [
  "Cardiology Care",
  "Diabetes Management",
  "Physical Therapy",
  "Orthopedic Care",
  "Surgery Transition",
  "Mental Health Program",
  "Nutrition Counseling",
  "Pain Management",
  "Respiratory Care",
  "Prenatal Program"
];

export function ReferralManagement() {
  const [activeTab, setActiveTab] = useState("new-referrals");
  const [searchValue, setSearchValue] = useState("");
  const [searchAllLocations, setSearchAllLocations] = useState(false);
  const [sortByCountry, setSortByCountry] = useState("");
  
  // Filter referrals based on tab, search, and country filter
  const filteredReferrals = useMemo(() => {
    let filtered = [...referrals];
    
    // Filter by tab status
    if (activeTab !== "all" && activeTab !== "overview") {
      const statusMap = {
        "new-referrals": "New Referral",
        "pre-enrollment": "Pre-Enrollment",
        "enrolled": "Enrolled",
        "post-enrollment": "Post-Enrollment"
      };
      
      filtered = filtered.filter(referral => referral.status === statusMap[activeTab]);
    }
    
    // Filter by search value
    if (searchValue.trim() !== "") {
      const search = searchValue.toLowerCase();
      filtered = filtered.filter(referral => 
        referral.patientName.toLowerCase().includes(search) || 
        referral.referredBy.toLowerCase().includes(search) ||
        referral.alignProgram.toLowerCase().includes(search)
      );
    }
    
    // Filter by country
    if (sortByCountry !== "") {
      const countryMap = {
        "united-states": "United States",
        "canada": "Canada",
        "united-kingdom": "United Kingdom",
        "australia": "Australia",
        "singapore": "Singapore",
        "germany": "Germany",
        "japan": "Japan",
        "india": "India",
        "france": "France",
        "spain": "Spain",
        "south-korea": "South Korea",
        "united-arab-emirates": "United Arab Emirates"
      };
      
      filtered = filtered.filter(referral => referral.country === countryMap[sortByCountry]);
    }
    
    return filtered;
  }, [activeTab, searchValue, sortByCountry]);

  return (
    <div className="p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-2xl font-semibold mb-6">Referral Management</h1> */}
        
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search referrals..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2 bg-white">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            
            <Button className="bg-teal-600 hover:bg-teal-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Enrollment
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <Tabs defaultValue="new-referrals" className="w-full" onValueChange={setActiveTab}>
            <div className="border-b px-6 py-2 flex items-center justify-between">
              <TabsList className="bg-transparent h-auto p-0 flex space-x-6">
                <TabsTrigger 
                  value="overview" 
                  className={cn(
                    "px-2 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-teal-500 font-medium",
                    activeTab === "overview" ? "text-teal-600" : "text-gray-500"
                  )}
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="all" 
                  className={cn(
                    "px-2 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-teal-500 font-medium",
                    activeTab === "all" ? "text-teal-600" : "text-gray-500"
                  )}
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="new-referrals" 
                  className={cn(
                    "px-2 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-teal-500 font-medium",
                    activeTab === "new-referrals" ? "text-teal-600" : "text-gray-500"
                  )}
                >
                  New Referrals
                </TabsTrigger>
                <TabsTrigger 
                  value="pre-enrollment" 
                  className={cn(
                    "px-2 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-teal-500 font-medium",
                    activeTab === "pre-enrollment" ? "text-teal-600" : "text-gray-500"
                  )}
                >
                  Pre-Enrollment
                </TabsTrigger>
                <TabsTrigger 
                  value="enrolled" 
                  className={cn(
                    "px-2 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-teal-500 font-medium",
                    activeTab === "enrolled" ? "text-teal-600" : "text-gray-500"
                  )}
                >
                  Enrolled
                </TabsTrigger>
                <TabsTrigger 
                  value="post-enrollment" 
                  className={cn(
                    "px-2 py-3 rounded-none data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-teal-500 font-medium",
                    activeTab === "post-enrollment" ? "text-teal-600" : "text-gray-500"
                  )}
                >
                  Post-Enrollment
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="search-all-locations"
                    checked={searchAllLocations}
                    onChange={() => setSearchAllLocations(!searchAllLocations)}
                    className="rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50 mr-2"
                  />
                  <label htmlFor="search-all-locations" className="text-sm text-gray-700">
                    Search all locations
                  </label>
                </div>
              </div>
            </div>

            {/* Reusable content for all tabs */}
            {["overview", "all", "new-referrals", "pre-enrollment", "enrolled", "post-enrollment"].map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue} className="p-6">
                {tabValue === "overview" ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                      <h3 className="text-lg font-medium text-blue-800 mb-2">New Referrals</h3>
                      <p className="text-3xl font-bold">{referrals.filter(r => r.status === "New Referral").length}</p>
                      <p className="text-sm text-gray-500 mt-2">Pending initial review</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-6 border border-amber-100">
                      <h3 className="text-lg font-medium text-amber-800 mb-2">Pre-Enrollment</h3>
                      <p className="text-3xl font-bold">{referrals.filter(r => r.status === "Pre-Enrollment").length}</p>
                      <p className="text-sm text-gray-500 mt-2">Awaiting enrollment</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-6 border border-green-100">
                      <h3 className="text-lg font-medium text-green-800 mb-2">Enrolled</h3>
                      <p className="text-3xl font-bold">{referrals.filter(r => r.status === "Enrolled").length}</p>
                      <p className="text-sm text-gray-500 mt-2">Currently in program</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-sm font-medium text-gray-700">
                        {filteredReferrals.length} {tabValue === "all" ? "Total" : ""} Referrals
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Select
                          value={sortByCountry}
                          onValueChange={setSortByCountry}
                        >
                          <SelectTrigger className="w-[180px] border border-gray-300 rounded-md">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                              <SelectValue placeholder="Sort by country..." />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all-countries">All Countries</SelectItem>
                            <SelectItem value="united-states">United States</SelectItem>
                            <SelectItem value="canada">Canada</SelectItem>
                            <SelectItem value="united-kingdom">United Kingdom</SelectItem>
                            <SelectItem value="australia">Australia</SelectItem>
                            <SelectItem value="singapore">Singapore</SelectItem>
                            <SelectItem value="germany">Germany</SelectItem>
                            <SelectItem value="japan">Japan</SelectItem>
                            <SelectItem value="india">India</SelectItem>
                            <SelectItem value="france">France</SelectItem>
                            <SelectItem value="spain">Spain</SelectItem>
                            <SelectItem value="south-korea">South Korea</SelectItem>
                            <SelectItem value="united-arab-emirates">United Arab Emirates</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button variant="outline" className="bg-white">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto rounded-md border border-gray-100">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-gray-600 text-sm">
                            <th className="py-3 px-4 text-left font-medium border-b">Patient name</th>
                            <th className="py-3 px-4 text-left font-medium border-b">Referred by</th>
                            <th className="py-3 px-4 text-left font-medium border-b">Refer Date</th>
                            <th className="py-3 px-4 text-left font-medium border-b">Align Program</th>
                            <th className="py-3 px-4 text-left font-medium border-b">Enrollment Status</th>
                            <th className="py-3 px-4 text-left font-medium border-b">Profile</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredReferrals.length > 0 ? (
                            filteredReferrals.map((referral) => (
                              <tr key={referral.id} className="border-b hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 text-sm">
                                  <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center mr-3">
                                      <User className="h-4 w-4" />
                                    </div>
                                    {referral.patientName}
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-sm">{referral.referredBy}</td>
                                <td className="py-3 px-4 text-sm">{referral.referDate}</td>
                                <td className="py-3 px-4 text-sm">
                                  <Select defaultValue={referral.alignProgram}>
                                    <SelectTrigger className="w-full border-none p-0 h-auto shadow-none focus:ring-0">
                                      <div className="flex items-center">
                                        <span className="mr-1">{referral.alignProgram}</span>
                                        {/* <ChevronDown className="h-4 w-4 text-gray-400" /> */}
                                      </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                      {programOptions.map((program) =>  (
                                        <SelectItem key={program} value={program}>
                                          {program}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </td>
                                <td className="py-3 px-4 text-sm">
                                  <span className={cn(
                                    "px-2 py-1 rounded-full text-xs font-medium",
                                    referral.status === "New Referral" && "bg-blue-100 text-blue-700",
                                    referral.status === "Pre-Enrollment" && "bg-amber-100 text-amber-700",
                                    referral.status === "Enrolled" && "bg-green-100 text-green-700",
                                    referral.status === "Post-Enrollment" && "bg-purple-100 text-purple-700",
                                    referral.status === "Pending Payment" && "bg-red-100 text-red-700"
                                  )}>
                                    {referral.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <button className="text-teal-600 hover:text-teal-800 transition-colors">
                                    <User className="h-5 w-5" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="py-6 text-center text-gray-500">
                                No referrals found matching your filters
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-gray-500">
                        Showing 1-{Math.min(filteredReferrals.length, 10)} of {filteredReferrals.length} entries
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-8 px-3" disabled>Previous</Button>
                        <Button size="sm" variant="outline" className="h-8 px-3 bg-teal-50 text-teal-600 border-teal-200">1</Button>
                        <Button size="sm" variant="outline" className="h-8 px-3" disabled>Next</Button>
                      </div>
                    </div>
                  </>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}