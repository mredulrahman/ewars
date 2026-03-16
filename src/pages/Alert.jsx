import { Calendar, Layers, DollarSign, ChartNoAxesColumnIncreasing, Info, Mail, Send, TrendingUp, TrendingDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { diseaseProfiles, diseaseOptions, getAlertDistricts } from "../assets/data/diseaseData";


const AlertPage = () => {
  const [showEmail, setShowEmail] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState("dengue");
  const [selectedMethod, setSelectedMethod] = useState("p95");
  const [showInfo1, setShowInfo1] = useState(false);
  const [showInfo2, setShowInfo2] = useState(false);

  const profile = diseaseProfiles[selectedDisease];

  // Statistical Calculation Logic
  const calculateBaseline = (data, method) => {
    if (!data || data.length === 0) return 0;
    const cases = data.map((d) => d.cases).sort((a, b) => a - b);
    const n = cases.length;

    switch (method) {
      case "p95": {
        const index = Math.floor(0.95 * n);
        return cases[index];
      }
      case "mean2sd": {
        const mean = cases.reduce((a, b) => a + b, 0) / n;
        const variance = cases.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
        const sd = Math.sqrt(variance);
        return Math.round(mean + 2 * sd);
      }
      case "median2iqr": {
        const q1 = cases[Math.floor(0.25 * n)];
        const median = cases[Math.floor(0.5 * n)];
        const q3 = cases[Math.floor(0.75 * n)];
        const iqr = q3 - q1;
        return Math.round(median + 2 * iqr);
      }
      default:
        return 0;
    }
  };

  const baselineValue = calculateBaseline(profile.climateCorrelation, selectedMethod);

  // Dynamic threshold calculation for weekly alert
  const alertDistricts = profile.districtData.filter(d => d.cases > baselineValue / 52); // Rough normalization for district level comparison
  // Actually, the request says "update stat cards according to calculated interaction".
  // The global baseline is for the total weekly cases.
  // Let's refine: how many districts exceed their own historical proportional baseline?
  // For simplicity and alignment with the dashboard's logic, we use the global baselineValue calculated from climateCorrelation (which represents national weekly cases).

  const currentWeekTotal = profile.currentWeekCases;
  const isGlobalAlert = currentWeekTotal > baselineValue;

  // Recalculate alertDistricts based on the method
  // Since climateCorrelation is 52 weeks of total cases, we compare currentWeekCases to baselineValue.
  // For districts, let's keep the existing logic or adjust it. 
  // Let's stick to the prompt: calculate 95th, mean2sd, median2iqr and update stat cards.

  const alertDistrictsCount = profile.districtData.filter(d => d.cases > (baselineValue / profile.totalDistricts) * 1.5).length;

  const alertPct = profile.totalDistricts > 0
    ? ((alertDistrictsCount / profile.totalDistricts) * 100).toFixed(1)
    : "0";
  const riskLevel = parseFloat(alertPct) < 25 ? "Low" : parseFloat(alertPct) < 50 ? "Moderate" : "High";

  const topDistrictPie = [...profile.districtData]
    .sort((a, b) => b.cases - a.cases)
    .slice(0, 5);
  const othersSum = profile.districtData.slice(5).reduce((s, d) => s + d.cases, 0);
  const totalCasesThisWeek = profile.districtData.reduce((s, d) => s + d.cases, 0);
  const pieData = [
    ...topDistrictPie.map((d, i) => ({
      name: d.district,
      value: Math.round((d.cases / totalCasesThisWeek) * 100),
      color: [`hsl(340,80%,60%)`, `hsl(30,85%,55%)`, `hsl(300,60%,55%)`, `hsl(170,60%,45%)`, `hsl(200,70%,50%)`][i],
    })),
    { name: "Others", value: Math.round((othersSum / totalCasesThisWeek) * 100), color: "hsl(260,50%,60%)" },
  ];

  const weeklyData = profile.weeklyTrend.map((w) => ({
    week: w.week,
    threshold: baselineValue,
    cases: w.cases ?? w.predicted,
  }));

  const prevWeekCases = profile.previousWeekCases;
  const weekChange = prevWeekCases > 0
    ? (((profile.currentWeekCases - prevWeekCases) / prevWeekCases) * 100).toFixed(1)
    : "0";

  const getBaselineLabel = () => {
    switch (selectedMethod) {
      case "p95": return "95th Percentile (P95)";
      case "mean2sd": return "Mean + 2 Standard Deviations (Mean2SD)";
      case "median2iqr": return "Endemic Channel (Median + 2*IQR)";
      default: return "";
    }
  };

  const emailBody = `Subject: URGENT - Disease Alert for ${alertDistrictsCount} Districts\n\nDear Health Officials,\n\nThis is an automated alert from the Bangladesh Early Warning Alert and Response System (EWARS).\n\n⚠ ALERT: ${alertDistrictsCount} districts have exceeded baseline (${getBaselineLabel()}: ${baselineValue}) for ${profile.label}.\n\nDistricts on Alert:\n${profile.districtData.filter(d => d.cases > (baselineValue / profile.totalDistricts) * 1.5).slice(0, 4).map((d) => `• ${d.district}: ${d.cases} cases`).join("\n")}`;

  return (
    <div className="space-y-6 mx-10">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground space-grotesk-myfont">Alert Dashboard</h2>
          <p className="text-[#3C5DAA] inter-myfont1">Monitor disease alerts based on baseline thresholds</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-xs px-3 py-1 rounded-full border border-danger text-danger font-medium">
            Latest Data: {profile.latestDataWeek}
          </span>
          <Button onClick={() => setShowEmail(true)} className="gap-2 bg-blue-600 text-white hover:bg-blue-700">
            <Mail className="w-4 h-4" /> Send Email Alert
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Select value={selectedDisease} onValueChange={setSelectedDisease}>
          <SelectTrigger className="w-[220px]"><SelectValue /></SelectTrigger>
          <SelectContent position="popper">
            {diseaseOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedMethod} onValueChange={setSelectedMethod}>
          <SelectTrigger className="w-[250px]"><SelectValue /></SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="p95">95th Percentile(P95)</SelectItem>
            <SelectItem value="mean2sd">Mean + 2 standard deviations(Mean2SD)</SelectItem>
            <SelectItem value="median2iqr">Endemic Channel(Median + 2*IQR)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Info bar */}
      <div className="stat-card-info stat-card flex items-center gap-2">
        <Info className="w-4 h-4 text-info" />
        {selectedMethod === "p95" ? (
          <span className="text-sm text-foreground"><strong>Baseline: P95</strong> — 95th percentile of historical cases for the week</span>
        ) : selectedMethod === "mean2sd" ? (
          <span className="text-sm text-foreground"><strong>Baseline: MEAN2SD</strong> — Mean + 2 standard deviations from historical data</span>
        ) : (
          <span className="text-sm text-foreground"><strong>Baseline: ENDEMIC</strong> — Median + 2 × IQR (robust statistical measure)</span>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card border-border">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-[#3C5DAA] font-medium">Current Week Cases</span>
            <div className="bg-blue-100 p-2 rounded-lg">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground">{profile.currentWeekCases.toLocaleString()}</p>
          <p className={`text-xs mt-1 ${parseFloat(weekChange) > 0 ? "text-danger" : "text-success"}`}>
            {parseFloat(weekChange) > 0 ? <TrendingUp className="w-4 h-4 text-danger" /> : <TrendingDown className="w-4 h-4 text-success" />} {weekChange}% vs last week
          </p>
          <hr className="my-2" />
          <p className="text-xs text-muted-foreground">Previous: {prevWeekCases.toLocaleString()}</p>
        </div>
        <div className="stat-card border-border">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-[#3C5DAA] font-medium">Districts on Alert</span>
            <div className="bg-amber-100 p-2 rounded-lg">
              <Layers className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground">{alertDistrictsCount} <span className="text-lg font-normal text-muted-foreground">/ {profile.totalDistricts}</span></p>
          <p className="text-xs text-danger mt-1 flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" /> {alertPct}% exceeding baseline</p>
          <hr className="my-2" />
          <p className="text-xs text-amber-600">⚠️ Intervention required</p>
        </div>
        <div className={`stat-card ${riskLevel === "Low" ? "stat-card-success" : riskLevel === "Moderate" ? "stat-card-warning" : "stat-card-dengue"}`}>
          <div className="flex items-center justify-between mb-1">
            <span className={`text-sm text-[#3C5DAA] font-medium ${riskLevel === "Low" ? "text-success" : riskLevel === "Moderate" ? "text-warning" : "text-danger"}`}>National Risk Level</span>
            {riskLevel === "Low" ? (
              <div className="bg-green-100 rounded-lg p-2">
                <DollarSign className={`w-4 h-4 text-green-600 `} />
              </div>
            ) : (
              <div className="bg-red-100 rounded-lg p-2">
                <DollarSign className={`w-4 h-4 text-red-600 `} />
              </div>
            )}
          </div>
          <p className={`text-3xl font-bold ${riskLevel === "Low" ? "text-success" : riskLevel === "Moderate" ? "text-warning" : "text-danger"}`}>{riskLevel}</p>
          <p className="text-xs text-muted-foreground">{riskLevel === "Low" ? "<25% districts at risk" : "≥25% districts at risk"}</p>
          <hr className="my-2" />
          <p className="text-xs font-medium text-foreground">{riskLevel === "Low" ? "Continue surveillance" : "Immediate action needed"}</p>
        </div>
        <div className="stat-card border-border">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-[#3C5DAA] font-medium">Alert Distribution</span>
            <div className="bg-fuchsia-100 p-2 rounded-lg">
              <ChartNoAxesColumnIncreasing className="w-4 h-4 text-fuchsia-600" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={[{ v: parseFloat(alertPct) }, { v: 100 - parseFloat(alertPct) }]} dataKey="v" innerRadius={18} outerRadius={28} strokeWidth={0}>
                    <Cell fill="hsl(var(--danger))" />
                    <Cell fill="hsl(var(--border))" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <p className="text-xl font-bold text-danger">{alertPct}%</p>
              <hr className="my-2" />
              <p className="text-xs text-muted-foreground">{alertDistrictsCount} of {profile.totalDistricts} on alert</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 flex flex-row dashboard-section">
          <div className="w-full">
            <h3 className="text-lg font-semibold text-foreground my-2.5">National Weekly cases vs baseline (2024-2025)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
                <XAxis dataKey="week" tick={{ fontSize: 10 }} stroke="hsl(220,10%,46%)" />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(220,10%,46%)" />
                <Tooltip />
                <Line type="monotone" dataKey="threshold" stroke="hsl(220,10%,70%)" strokeDasharray="5 5" dot={false} />
                <Line type="monotone" dataKey="cases" stroke="hsl(210,80%,52%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <Info className="w-4 h-4 text-info" onClick={() => setShowInfo1(true)} />
        </div>


        <Dialog open={showInfo1} onOpenChange={setShowInfo1}>
          <DialogContent className="w-[400px]">
            <DialogHeader>
              <DialogTitle className="text-md text-[rgb(30,64,175)]">National Cases vs Baseline</DialogTitle>
              <DialogDescription>
                <p className="text-sm inter-myfont1 text-[rgb(30,64,175)] py-1">Compares actual weekly cases to the historical baseline threshold.</p>
                <p className="text-sm inter-myfont1 text-[rgb(30,64,175)] py-1">When the blue line exceeds the dashed baseline, it signals an outbreak requiring immediate attention.</p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>


        <div className="lg:col-span-2 flex flex-row dashboard-section">
          <div className="w-full">
            <h3 className="text-lg font-semibold text-foreground">Cases by District</h3>
            <p className="text-sm text-muted-foreground my-2">Top districts by case count</p>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, value }) => `${name} ${value}%`}>
                  {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <Info className="w-4 h-4 text-info" onClick={() => setShowInfo2(true)} />
        </div>


        <Dialog open={showInfo2} onOpenChange={setShowInfo2}>
          <DialogContent className="w-[400px]">
            <DialogHeader>
              <DialogTitle className="text-md text-[rgb(30,64,175)]">Cases by District</DialogTitle>
              <DialogDescription>
                <p className="text-sm inter-myfont1 text-[rgb(30,64,175)] py-1">Shows the top 10 districts with the highest case counts.</p>
                <p className="text-sm inter-myfont1 text-[rgb(30,64,175)] py-1">Each slice represents a district's share of total cases, helping identify hotspots.</p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        {/* Email Dialog */}
        <Dialog open={showEmail} onOpenChange={setShowEmail}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><Mail className="w-5 h-5" /> Send Alert Notification</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">Email health officials about districts currently at risk</p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">From</label>
                <Input defaultValue="ewars.bangladesh@gmail.com" readOnly className="bg-muted" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">To <span className="text-danger">*</span></label>
                <Input placeholder="recipient@health.gov.bd" />
              </div>
            </div>
            <div className="space-y-1 mt-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea rows={8} defaultValue={emailBody} className="h-[200px]" />
            </div>
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-orange-500 font-medium">⚠️ {alertDistrictsCount} districts currently at risk</p>
              <Button className="gap-2"><Send className="w-4 h-4" /> Send Alert</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AlertPage;
