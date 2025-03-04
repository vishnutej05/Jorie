import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  ChevronDown, 
  ClipboardList, 
  Users, 
  FileText, 
  BarChart, 
  LogOut,
  User,
  Building2,
  UserCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const SidebarItem = ({ 
  icon, 
  title, 
  isActive = false, 
  hasChildren = false, 
  isOpen = false, 
  onClick, 
  children 
}) => {
  return (
    <div className="mb-1">
      <button
        className={cn(
          "sidebar-link w-full flex justify-between",
          isActive && "active"
        )}
        onClick={onClick}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </div>
        {hasChildren && (
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isOpen && "transform rotate-180"
            )}
          />
        )}
      </button>
      {hasChildren && isOpen && (
        <div className="ml-9 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

const SidebarSubItem = ({ title, isActive = false, onClick }) => {
  return (
    <a
      href="#"
      className={cn(
        "block py-1.5 text-sm text-gray-500 hover:text-gray-900 relative pl-3",
        isActive && "text-emerald-600 font-medium"
      )}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
    >
      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></span>
      {title}
    </a>
  );
};

const NestedSidebarItem = ({ 
  icon,
  title, 
  isActive = false,
  hasChildren = false,
  isOpen = false,
  onClick,
  children
}) => {
  return (
    <div className="mb-1">
      <button
        className={cn(
          "w-full flex justify-between items-center py-1.5 text-sm",
          isActive ? "text-emerald-600 font-medium" : "text-gray-500 hover:text-gray-900"
        )}
        onClick={onClick}
      >
        <div className="flex items-center gap-2 relative pl-3">
          <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200"></span>
          {icon && <span className="text-gray-600">{icon}</span>}
          <span>{title}</span>
        </div>
        {hasChildren && (
          <ChevronDown
            className={cn(
              "h-3 w-3 transition-transform",
              isOpen && "transform rotate-180"
            )}
          />
        )}
      </button>
      {hasChildren && isOpen && (
        <div className="ml-6 space-y-1 mt-1">
          {children}
        </div>
      )}
    </div>
  );
};

export function Sidebar({ onViewChange, currentView }) {
  const [openSections, setOpenSections] = useState({
    clinicalInteraction: true,
    insightSuite: true,
    practiceLevel: false,
    patientLevel: true,
  });

  const navigate = useNavigate();

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear JWT from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="h-screen w-64 border-r bg-sidebar flex flex-col">
      <div className="p-4 border-b flex items-center justify-center">
          <img 
            src="/lovable-uploads/Logo2.png" 
            alt="Logo" 
            className="h-16 w-auto object-contain rounded-md" 
          />
      </div>
      
      <div className="p-4 text-sm text-gray-500">Menu</div>
      
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <SidebarItem 
          icon={<Users size={18} />} 
          title="Clinical Interaction" 
          hasChildren 
          isOpen={openSections.clinicalInteraction}
          onClick={() => toggleSection("clinicalInteraction")}
        >
          <SidebarSubItem title="Care Voyage: Patient Recommendation" 
            onClick={() => onViewChange("patientrecommendations")}
            isActive={currentView === "patientrecommendations"} />
          <SidebarSubItem title="Referral Management" 
            onClick={() => onViewChange("referralmanagement")}
            isActive={currentView === "referralmanagement"} />
          <SidebarSubItem title="Outbound Campaigns" onClick={undefined} />
          <SidebarSubItem title="Patient Experience Survey" onClick={undefined} />
          <SidebarSubItem title="Utilization Review and Management" onClick={undefined} />
        </SidebarItem>
        
        <SidebarItem 
          icon={<BarChart3 size={18} />} 
          title="Insight Suite"
          hasChildren
          isOpen={openSections.insightSuite}
          isActive={true}
          onClick={() => toggleSection("insightSuite")}
        >
          <NestedSidebarItem 
            icon={<Building2 size={16} />}
            title="Practice Level"
            hasChildren
            isOpen={openSections.practiceLevel}
            onClick={() => toggleSection("practiceLevel")}
          >
            <SidebarSubItem 
              title="Guideline Adherence Evaluator" 
              onClick={undefined}
            />
            <SidebarSubItem title="Care Variations" onClick={undefined} />
            <SidebarSubItem title="Outcome Reporting" onClick={undefined} />
            <SidebarSubItem title="Predicted Utilization Odds" onClick={undefined} />
          </NestedSidebarItem>
          
          <NestedSidebarItem 
            icon={<UserCircle size={16} />}
            title="Patient Level"
            hasChildren
            isOpen={openSections.patientLevel}
            // isActive={true}
            onClick={() => toggleSection("patientLevel")}
          >
            <SidebarSubItem 
              title="Patient Risk Profiler" 
              onClick={() => onViewChange("patientRiskProfiler")}
              isActive={currentView === "patientRiskProfiler"}
            />
            <SidebarSubItem 
              title="Patient Timeline" 
              onClick={() => onViewChange("patientTimeline")}
              isActive={currentView === "patientTimeline"}
            />
            <SidebarSubItem 
              title="Persona Comparison" 
              onClick={() => onViewChange("personaComparison")}
              isActive={currentView === "personaComparison"}
            />  
            <SidebarSubItem 
              title="Adherence & Engagement Scorecard"
              onClick={() => onViewChange("adherenceScorecard")}
              isActive={currentView === "adherenceScorecard"}
            />
          </NestedSidebarItem>
        </SidebarItem>
      </div>
      
      <div className="mt-auto p-4 border-t">
        <button className="sidebar-link w-full justify-start" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}