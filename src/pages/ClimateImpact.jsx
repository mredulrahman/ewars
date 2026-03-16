import { Thermometer, Droplets, CloudRain, Activity } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { diseaseProfiles, diseaseOptions } from "../assets/data/diseaseData";

const weatherImpacts = [
  {
    icon: Thermometer,
    title: "High Temperature",
    diseases: ["Dengue", "Diarrhoea"],
    description: "Increases mosquito metabolic and reproductive rates; accelerates pathogen replication.",
    color: "hsl(0,72%,51%)",
  },
  {
    icon: Droplets,
    title: "High Humidity",
    diseases: ["Dengue", "Malaria"],
    description: "Supports mosquito survival, activity, and lifespan, increasing opportunities for transmission.",
    color: "hsl(210,80%,52%)",
  },
  {
    icon: CloudRain,
    title: "Heavy Rainfall",
    diseases: ["Dengue", "Diarrhoea", "Malaria"],
    description: "Creates breeding sites for mosquitoes (Dengue, Malaria); can contaminate water sources (Diarrhoea).",
    color: "hsl(145,60%,42%)",
  },
];

const ClimateImpactPage = () => {
  const [yearRange, setYearRange] = useState([75]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedDisease, setSelectedDisease] = useState("dengue");
  const [selectedDistrict, setSelectedDistrict] = useState("all");

  const profile = diseaseProfiles[selectedDisease];
  const climateData = profile.climateCorrelation;

  // Year Range Logic: Map 0-100 slider to 2019-2025
  const startYear = 2019 + Math.round((yearRange[0] / 100) * 6);
  const yearMultiplier = 1 + (startYear - 2024) * 0.05; // Simulation factor for historical variability

  // Filtered/Dynamic Stat Calculations
  const districtCaseData = selectedDistrict === "all"
    ? { cases: profile.totalCases }
    : profile.districtData.find(d => d.district === selectedDistrict) || { cases: 0 };

  const totalCases = Math.round(districtCaseData.cases * yearMultiplier);

  // Weather Metrics (Simulated variation based on year for reactive UI)
  const avgTemp = (climateData.reduce((sum, d) => sum + d.temp, 0) / climateData.length + (startYear - 2024) * 0.2).toFixed(1);
  const avgHumidity = (climateData.reduce((sum, d) => sum + d.humidity, 0) / climateData.length + (startYear - 2024) * 0.5).toFixed(1);
  const avgRainfall = (climateData.reduce((sum, d) => sum + d.rainfall, 0) / climateData.length + (startYear - 2024) * 2).toFixed(1);

  const tempRange = {
    min: Math.min(...climateData.map(d => d.temp)).toFixed(1),
    max: Math.max(...climateData.map(d => d.temp)).toFixed(1)
  };

  const rainfallRange = {
    min: Math.min(...climateData.map(d => d.rainfall)).toFixed(1),
    max: Math.max(...climateData.map(d => d.rainfall)).toFixed(1)
  };

  return (
    <div className="space-y-6 mx-10">
      {/* Filters */}
      <div className="dashboard-section flex flex-wrap items-end gap-6">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground py-2">Disease</p>
          <Select value={selectedDisease} onValueChange={setSelectedDisease}>
            <SelectTrigger className="w-[320px]"><SelectValue /></SelectTrigger>
            <SelectContent position="popper">
              {diseaseOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground py-2">District</p>
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger className="w-[320px]"><SelectValue /></SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="all">All Districts</SelectItem>
              {profile.districtData.map((d) => (
                <SelectItem key={d.district} value={d.district}>{d.district}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-3 w-[390px]">
          <p className="text-sm font-medium text-foreground">Year Range: {startYear} - 2025</p>
          <Slider className="[&>span:first-child>span]:bg-blue-800"
            value={[startYear]} onValueChange={(val) => setYearRange([(val[0] - 2019) * (100 / 6)])} min={2019} max={2025} step={1} dir="rtl" />
          <p className="text-xs text-muted-foreground">Available: 2019 - 2025</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card stat-card-dengue">
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm font-medium text-foreground">Total Cases</span>
            <Activity className="w-4 h-4 text-red-500" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-red-700">{totalCases.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Weekly hospitalized</p>
            <p className="text-xs text-muted-foreground">Peak: {profile.peakYear} ({profile.peakCases.toLocaleString()})</p>
          </div>
        </div>
        <div className="stat-card stat-card-temperature">
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm font-medium text-foreground">Temperature</span>
            <Thermometer className="w-4 h-4" style={{ color: "hsl(25,80%,45%)" }} />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{avgTemp}°C</p>
            <p className="text-xs text-muted-foreground">Range: {tempRange.min}°C – {tempRange.max}°C</p>
            <p className="text-xs text-muted-foreground">Peak: 2024 Week 18</p>
          </div>
        </div>
        <div className="stat-card stat-card-humidity">
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm font-medium text-foreground">Humidity</span>
            <Droplets className="w-4 h-4" style={{ color: "hsl(45,70%,40%)" }} />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{avgHumidity}%</p>
            <p className="text-xs text-muted-foreground">Average humidity</p>
          </div>
        </div>
        <div className="stat-card stat-card-rainfall">
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm font-medium text-foreground">Rainfall</span>
            <CloudRain className="w-4 h-4" style={{ color: "hsl(200,60%,40%)" }} />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">{avgRainfall} mm</p>
            <p className="text-xs text-muted-foreground">Range: {rainfallRange.min} – {rainfallRange.max} mm</p>
            <p className="text-xs text-muted-foreground">Peak: 2024 Week 34</p>
          </div>
        </div>
      </div>

      {/* Chart + Weather Impact */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 dashboard-section">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{profile.label} Cases vs Weather</h3>
              <p className="text-sm text-muted-foreground">Correlation between cases and environmental factors</p>
            </div>
            <div className="flex gap-1">
              {["temp", "humidity", "rainfall", "all"].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 text-xs rounded-full transition ${activeFilter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-accent"
                    }`}
                >
                  {f === "temp" ? "🌡 Temp" : f === "humidity" ? "💧 Humidity" : f === "rainfall" ? "🌧 Rainfall" : "All"}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={climateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
              <XAxis dataKey="week" tick={{ fontSize: 10 }} stroke="hsl(220,10%,46%)" />
              <YAxis yAxisId="left" tick={{ fontSize: 10 }} stroke="hsl(220,10%,46%)" />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} stroke="hsl(220,10%,46%)" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="cases" stroke="hsl(0,72%,51%)" strokeWidth={2} dot={false} name="Cases" />
              {(activeFilter === "all" || activeFilter === "temp") && (
                <Line yAxisId="right" type="monotone" dataKey="temp" stroke="hsl(25,80%,50%)" dot={false} name="Temperature (°C)" />
              )}
              {(activeFilter === "all" || activeFilter === "humidity") && (
                <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="hsl(200,70%,50%)" dot={false} name="Humidity (%)" />
              )}
              {(activeFilter === "all" || activeFilter === "rainfall") && (
                <Line yAxisId="right" type="monotone" dataKey="rainfall" stroke="hsl(145,60%,42%)" dot={false} name="Rainfall (mm)" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-section">
          <h3 className="text-lg font-semibold text-center text-foreground">Weather Impact</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">on Disease Outbreaks</p>
          <div className="space-y-4">
            {weatherImpacts.map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className="rounded-lg bg-secondary p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5" style={{ color: w.color }} />
                    <span className="font-semibold text-foreground">{w.title}</span>
                  </div>
                  <div className="flex gap-2 mb-2">
                    {w.diseases.map((d) => (
                      <span key={d} className="text-xs px-2 py-0.5 rounded-full bg-gray-300 text-black font-bold">{d}</span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{w.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateImpactPage;
