import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Syringe, ShieldCheck, Droplets, FlaskConical, Users, Info, RotateCcw } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { diseaseOptions, diseaseProfiles } from "../assets//data/diseaseData";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"


const interventions = [
  { icon: Syringe, label: "Vaccination", color: "#15803D" },
  { icon: ShieldCheck, label: "Mosquito Control", color: "#1D4ED8" },
  { icon: Droplets, label: "Water Sanitation", color: "#0E7490" },
  { icon: FlaskConical, label: "Surge Labs", color: "#7E22CE" },
  { icon: Users, label: "Community BCC", color: "#B45309" },
];

const r0Ranges = {
  dengue: "1.5 - 3.0",
  malariaPF: "1.0 - 2.5",
  malariaPV: "1.0 - 2.5",
  diarrhoea: "2.0 - 4.0"
};

const SimulationPage = () => {
  const [initialCases, setInitialCases] = useState([100]);
  const [r0, setR0] = useState([2.5]);
  const [selectedInterventions, setSelectedInterventions] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState("dengue");
  const [originDistrict, setOriginDistrict] = useState("dhaka");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const circlesRef = useRef([]);
  const [showInfo, setShowInfo] = useState(false);
  const [running, setRunning] = useState(false);
  const toggleIntervention = (label) => {
    setSelectedInterventions((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  const profile = diseaseProfiles[selectedDisease];
  const districtNames = profile.districtData.map((d) => d.district);

  // Initialize simulation map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    const map = L.map(mapContainerRef.current, {
      center: [23.7, 90.4],
      zoom: 7,
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: true,
      preferCanvas: true,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    fetch("/data/bd_districts.geojson")
      .then((r) => r.json())
      .then((data) => {
        L.geoJSON(data, {
          style: { fillColor: "hsl(220,14%,96%)", weight: 1, color: "hsl(220,13%,80%)", fillOpacity: 0.5 },
        }).addTo(map);
      });

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  // Show simulation animation
  useEffect(() => {
    if (!running || isPaused || !mapRef.current) return;

    const origin = profile.districtData.find((d) => d.district.toLowerCase() === "dhaka");
    if (!origin) return;

    const interval = setInterval(() => {
      setCurrentWeek((prev) => {
        if (prev >= 8) {
          clearInterval(interval);
          setRunning(false);
          return prev;
        }

        const nextWeek = prev + 1;
        // Add a new ring for each week
        const circle = L.circle([origin.lat, origin.lng], {
          radius: nextWeek * 25000,
          color: "hsl(0,72%,51%)",
          fillColor: "hsl(0,72%,51%)",
          fillOpacity: 0.1,
          weight: 1,
        }).addTo(mapRef.current);

        circlesRef.current.push(circle);
        return nextWeek;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running, isPaused, profile.districtData]);

  const handleStart = () => {
    if (currentWeek === 8) {
      // Reset
      circlesRef.current.forEach(c => c.remove());
      circlesRef.current = [];
      setCurrentWeek(0);
    }
    setRunning(true);
    setIsPaused(false);
    setOriginDistrict("dhaka");
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    setRunning(false);
    setIsPaused(false);
    setCurrentWeek(0);
    circlesRef.current.forEach(c => c.remove());
    circlesRef.current = [];
  };

  // Mock data for the progress popup
  const getSimStats = () => {
    const baseCases = initialCases[0];
    const currentR0 = r0[0];

    // Intervention impacts from the "About" section
    const impacts = {
      "Vaccination": 0.45,
      "Mosquito Control": 0.35,
      "Water Sanitation": 0.40,
      "Surge Labs": 0.25,
      "Community BCC": 0.30
    };

    let totalReduction = 0;
    selectedInterventions.forEach(label => {
      totalReduction += (impacts[label] || 0);
    });

    // Cap reduction at 80% to keep simulation realistic
    const actualReduction = Math.min(0.8, totalReduction);
    const effectiveR0 = Math.max(0.1, currentR0 * (1 - actualReduction));

    // Growth formula: Cases(w) = Cases(0) * (R0 ^ (w / generationTime))
    // Using generationTime = 2 weeks approx
    const expectedCases = Math.floor(baseCases * Math.pow(effectiveR0, currentWeek / 2));

    return {
      expectedCases: expectedCases.toLocaleString(),
      effectiveR0: effectiveR0.toFixed(2),
      reduction: (actualReduction * 100).toFixed(1) + "%",
      riskLevel: effectiveR0 > 1.5 ? "High" : effectiveR0 > 1.0 ? "Medium" : "Low"
    };
  };

  const stats = getSimStats();

  return (
    <div className="space-y-6 mx-10">
      <div className="dashboard-section">
        <div className="flex items-start justify-between gap-3 mb-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-foreground space-grotesk-myfont">Simulation Controls</h2>
            <Badge variant="outline" className="space-grotesk-myfont text-info border-info bg-blue-100 text-blue-600 font-bold">BETA</Badge>
          </div>
          <Info className="w-4 h-4 text-muted-foreground" onClick={() => setShowInfo(true)} />
        </div>

        <Dialog open={showInfo} onOpenChange={setShowInfo}>
          <DialogContent className="w-[400px]">
            <DialogHeader>
              <DialogTitle className="text-[rgb(30,64,175)]">Simulation Controls</DialogTitle>
              <DialogDescription>
                <p className="text-sm inter-myfont1 py-1 text-[rgb(30,64,175)]">Model disease spread from an origin district and test intervention strategies.</p>
                <p className="text-sm inter-myfont1 py-1 text-[rgb(30,64,175)]">Adjust parameters like initial cases and R₀, then activate interventions to see their impact on outbreak control.</p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <p className="text-sm inter-myfont1 mb-6 text-[#3C5DAA]">Configure outbreak parameters and test intervention strategies</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-foreground my-2">Origin District</p>
            <Select value={originDistrict} onValueChange={setOriginDistrict}>
              <SelectTrigger className="w-[250px]"><SelectValue /></SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="dhaka">Dhaka</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">Other districts locked for simulation</p>
          </div>
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-foreground my-2">Disease Type</p>
            <Select value={selectedDisease} onValueChange={setSelectedDisease}>
              <SelectTrigger className="w-[250px]"><SelectValue /></SelectTrigger>
              <SelectContent position="popper">
                {diseaseOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <label className="text-xs font-medium text-foreground my-2">R₀ range: {r0Ranges[selectedDisease] || "1.0 - 5.0"}</label>
          </div>
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-foreground my-2">Initial Cases: {initialCases[0]}</p>
            <Slider className="[&>span:first-child>span]:bg-blue-800" value={initialCases} onValueChange={setInitialCases} min={10} max={1000} step={10} />
            <p className="text-xs text-muted-foreground my-2">Starting infection count</p>
          </div>
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-foreground my-2">R₀ Value: {r0[0].toFixed(1)}</p>
            <Slider className="[&>span:first-child>span]:bg-blue-800" value={r0} onValueChange={setR0} min={1.0} max={5.0} step={0.1} />
            <p className="text-xs text-muted-foreground my-2">Basic reproduction number</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Public Health Interventions</label>
          </div>
          <div className="flex flex-wrap gap-2">
            {interventions.map((int) => {
              const Icon = int.icon;
              const selected = selectedInterventions.includes(int.label);
              return (
                <button
                  key={int.label}
                  onClick={() => toggleIntervention(int.label)}
                  className={`flex items-center gap-7 px-8 py-3 rounded-md border text-sm font-semibold transition ${selected
                    ? "text-foreground"
                    : "text-black hover:bg-amber-400 bg-gray-100"
                    }`}
                  style={selected ? {
                    borderColor: int.color,
                    // backgroundColor: `${int.color.replace(')', ', 0.1)')}`,
                    backgroundColor: int.color,
                    color: "white"
                  } : {}}
                >
                  <Icon className="w-4 h-4" style={{ color: selected ? "white" : 'currentColor' }} />
                  {int.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedInterventions([])}
            className="h-8 px-2 text-muted-foreground hover:text-foreground gap-1 bg-gray-200"
            title="Reset all interventions"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {/* <span className="text-xs">Refresh</span> */}
          </Button>
          <div className="flex gap-2">
            {running && !isPaused && (
              <Button onClick={handlePause} className="gap-2 bg-amber-500 hover:bg-amber-600">
                <Pause className="w-4 h-4 fill-current" /> Pause Simulation
              </Button>
            )}
            {running && isPaused && (
              <Button onClick={handleResume} className="gap-2 bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4" /> Resume Simulation
              </Button>
            )}
            {!running && (
              <Button onClick={handleStart} className="gap-2">
                <Play className="w-4 h-4" /> {currentWeek === 8 ? "Restart Simulation" : (currentWeek > 0 ? "Resume Simulation" : "Start Simulation")}
              </Button>
            )}
            {currentWeek > 0 && (
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <RotateCcw className="w-4 h-4" /> Reset
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="dashboard-section overflow-hidden p-0 relative">
        <div ref={mapContainerRef} style={{ height: 500 }} />

        {/* Simulation Progress Popup */}
        {(running || currentWeek > 0) && (
          <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-xl border p-5 w-64 inter-myfont1">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground font-medium tracking-wider">Simulation Progress</p>
                <h3 className="text-2xl font-bold text-foreground mt-1">Week {currentWeek}</h3>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Expected Cases:</span>
                  <span className="font-bold">{stats.expectedCases}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Effective R₀:</span>
                  <span className="font-bold">{stats.effectiveR0}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">R₀ Reduction:</span>
                  <span className="font-bold text-green-600">{stats.reduction}</span>
                </div>
              </div>

              <div className="pt-2 border-t flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Risk Level:</span>
                <Badge className={
                  stats.riskLevel === "High" ? "bg-red-100 text-red-700 hover:bg-red-100" :
                    stats.riskLevel === "Medium" ? "bg-amber-100 text-amber-700 hover:bg-amber-100" :
                      "bg-green-100 text-green-700 hover:bg-green-100"
                }>
                  {stats.riskLevel}
                </Badge>
              </div>

              {selectedInterventions.length > 0 && (
                <div className="pt-2">
                  <p className="text-[10px] text-muted-foreground font-medium uppercase mb-2">Active Interventions:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedInterventions.map(label => (
                      <Badge key={label} variant="secondary" className="text-[10px] bg-blue-50 text-blue-700 py-0 px-2 border-blue-100">
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* About */}
      <div className="stat-card bg-[#EFF6FF]">
        <div className="flex items-start gap-2">
          {/* <Info className="w-5 h-5 text-info mt-0.5" /> */}
          <div className="flex flex-row gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1"><span className="text-blue-600 text-lg font-bold">i</span></div>
            <div className="text-[rgb(30,64,175)]">
              <p className="font-semibold">About this Simulation</p>
              <p className="text-sm mt-1">
                This isochrone-based simulation visualizes disease spread from a selected origin district over time. Each expanding ring represents one week of disease progression.
                The spread rate is influenced by the basic reproduction number (R₀) and controlled through a game-theoretic allocator that optimizes intervention mix.
                Interventions include: Vaccination (45% R₀ reduction), Mosquito Control (35%), Water Sanitation (40%), Surge Labs (25%), and Community BCC (30%).
                The allocator uses cost-effectiveness analysis with diminishing returns to determine the optimal intervention strategy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationPage;
