import { useState } from "react";
import {
  LayoutGrid, Map, AlertTriangle, BarChart3, Layers,
  Activity, Upload, Download, HelpCircle, User, Settings, LogOut, Loader2
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Separator } from "../components/ui/separator";
import Footer from "../components/Footer";
import HelpDeveloperGuide from "../components/HelpDeveloperGuide";
import { useNavigate } from "react-router-dom";


const tabs = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "disease-maps", label: "Disease Maps", icon: Map },
  { id: "alert", label: "Alert", icon: AlertTriangle },
  { id: "climate-impact", label: "Climate Impact", icon: BarChart3 },
  { id: "simulation", label: "Simulation", icon: Layers },
  { id: "model", label: "Model", icon: Activity },
  { id: "data-entry", label: "Data Entry", icon: Upload }
];

const DashboardLayout = ({ activeTab, onTabChange, onDownload, isDownloading, children }) => {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/login');
  };
  return (
    <div className="min-h-screen bg-background">
      <HelpDeveloperGuide open={isGuideOpen} onOpenChange={setIsGuideOpen} />

      {/* Header */}
      <header className="bg-card top-0 z-50">
        <div className="flex items-center justify-between border-b bg-blue-800 border-border px-6 py-4">
          <div />
          <h1 className="space-grotesk-myfont text-xl font-bold tracking-tight text-white">EWARS Bangladesh</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={onDownload}
              disabled={isDownloading}
              className={`p-2 rounded-full bg-gray-200 text-black hover:opacity-90 transition flex items-center justify-center ${isDownloading ? "cursor-not-allowed opacity-70" : ""}`}
            >
              {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsGuideOpen(true)}
              className="p-2 rounded-full bg-gray-200 text-black hover:opacity-90 transition"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
            <Popover>
              <PopoverTrigger asChild>
                <button className="p-2 rounded-full bg-blue-900 transition">
                  <User className="w-4 h-4 text-white" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-45 p-2 rounded-lg bg-card border-border shadow-md" align="end" sideOffset={8}>
                <div className="flex items-center justify-start gap-2 p-2 w-full">
                  <div className="flex flex-col text-left">
                    <p className="text-sm font-medium leading-none mb-1.5">Admin User</p>
                    <p className="text-xs leading-none font-semibold text-blue-900">admin@ewars.gov.bd</p>
                  </div>
                </div>
                <Separator className="my-2" />
                <button className="w-full flex items-center gap-3 rounded-md px-2 py-2 text-[15px] hover:bg-blue-500 transition-colors hover:text-white">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 rounded-md px-2 py-2 text-[15px] hover:bg-blue-500 transition-colors hover:text-white">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center justify-center gap-1 py-5 px-4 flex-wrap">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border-solid border-1 text-sm font-medium transition-all ${isActive
                  ? "bg-blue-500 text-primary-foreground shadow-sm"
                  : "hover:bg-secondary hover:text-foreground"
                  }`}>
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Content */}
      <main className="border-b border-border max-w-[1400px] mx-auto p-6 animate-fade-in">
        {children}
      </main>
      <div className="py-4">
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
