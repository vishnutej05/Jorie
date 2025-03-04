
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

type LabData = {
  date: string;
  hb?: number;
  wbc?: number;
  rbc?: number;
  platelets?: number;
};

export function LabResults() {
  const [viewType, setViewType] = useState<'graph' | 'tabular'>('graph');
  const [showFilters, setShowFilters] = useState(false);
  const [showActions, setShowActions] = useState(false);
  
  const labData = [
    {
      date: '21-08-24',
      hb: 14.5,
      wbc: 8.6,
      rbc: 7.8,
      platelets: 12.9
    },
    {
      date: '21-07-23',
      hb: 13.9,
      wbc: 9.2,
      rbc: 7.1,
      platelets: 11.8
    },
    {
      date: '22-06-23',
      hb: 12.1,
      wbc: 8.4,
      rbc: 6.8,
      platelets: 10.3
    },
    {
      date: '14-05-22',
      hb: 10.8,
      wbc: 9.7,
      rbc: 8.8,
      platelets: 13.2
    },
    {
      date: '03-03-22',
      hb: 13.6,
      wbc: 7.2,
      rbc: 6.5,
      platelets: 10.8
    },
    {
      date: '11-01-22',
      hb: 14.8,
      wbc: 6.9,
      rbc: 7.4,
      platelets: 9.6
    },
    {
      date: '23-08-21',
      hb: 13.3,
      wbc: 8.2,
      rbc: 6.3,
      platelets: 8.9
    },
    {
      date: '21-05-21',
      hb: 12.8,
      wbc: 7.8,
      rbc: 5.9,
      platelets: 9.2
    }
  ];
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    if (showActions && !showFilters) {
      setShowActions(false);
    }
  };
  
  const toggleActions = () => {
    setShowActions(!showActions);
    if (showFilters && !showActions) {
      setShowFilters(false);
    }
  };

  return (
    <div className="rounded-md border bg-white overflow-hidden mt-6">
      <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
        <h3 className="font-medium">Analytics</h3>
        <div className="flex items-center gap-3">
          <div className="text-sm px-3 py-1.5 bg-teal-600 text-white rounded-md">
            Labs
          </div>
          <div className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span>Vitals</span>
          </div>
          <div className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md">
            Risk of new Disease
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="cbc" className="p-4">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="cbc">CBC</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="1-2">1-2</TabsTrigger>
            <TabsTrigger value="3-3">3-3</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-3">
            <button 
              className={`text-sm px-3 py-1 rounded-md ${viewType === 'graph' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setViewType('graph')}
            >
              Graph view
            </button>
            <button 
              className={`text-sm px-3 py-1 rounded-md ${viewType === 'tabular' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setViewType('tabular')}
            >
              Tabular view
            </button>
            
            {/* Filter button */}
            <button 
              className={`text-sm px-3 py-1 rounded-md flex items-center gap-1 ${showFilters ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
              onClick={toggleFilters}
            >
              <Filter size={16} />
              <span>Filters</span>
            </button>
            
            {/* Action button */}
            <button 
              className={`text-sm px-3 py-1 rounded-md ${showActions ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
              onClick={toggleActions}
            >
              Actions
            </button>
          </div>
        </div>
        
        {/* Filter panel */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-md mb-4 relative">
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowFilters(false)}
            >
              <X size={16} />
            </button>
            <h4 className="text-sm font-medium mb-3">Filters</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Category</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Test Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cbc">Complete Blood Count</SelectItem>
                    <SelectItem value="lipid">Lipid Profile</SelectItem>
                    <SelectItem value="kidney">Kidney Function</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Name</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Test Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hb">Hemoglobin</SelectItem>
                    <SelectItem value="wbc">White Blood Cells</SelectItem>
                    <SelectItem value="rbc">Red Blood Cells</SelectItem>
                    <SelectItem value="platelets">Platelets</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
        
        {/* Actions panel */}
        {showActions && (
          <div className="bg-gray-50 p-4 rounded-md mb-4 relative">
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowActions(false)}
            >
              <X size={16} />
            </button>
            <h4 className="text-sm font-medium mb-3">Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Recommend Lab</Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Send to Program</Button>
              <Button className="w-full bg-gray-600 hover:bg-gray-700">Copy to EMR</Button>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Detail Assessment</Button>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span className="text-xs">Hb</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            <span className="text-xs">WBC</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span className="text-xs">RBC</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-xs">Platelets</span>
          </div>
          <div className="flex items-center gap-1 ml-4">
            <span className="w-4 h-0.5 bg-gray-400"></span>
            <span className="text-xs">Total</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-4 h-0.5 bg-orange-400"></span>
            <span className="text-xs">Direct</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-4 h-0.5 bg-blue-400"></span>
            <span className="text-xs">Indirect</span>
          </div>
        </div>
        
        <TabsContent value="cbc" className="pt-2">
          {viewType === 'graph' ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={labData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="hb" stroke="#ef4444" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="wbc" stroke="#eab308" />
                  <Line type="monotone" dataKey="rbc" stroke="#a855f7" />
                  <Line type="monotone" dataKey="platelets" stroke="#22c55e" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hb</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WBC</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RBC</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platelets</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {labData.map((entry, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">{entry.date}</td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">{entry.hb}</td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">{entry.wbc}</td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">{entry.rbc}</td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">{entry.platelets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
