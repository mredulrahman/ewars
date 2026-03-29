import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Target, TrendingUp, CheckCircle, Clock, RefreshCw, ChevronDown, ChevronUp, Thermometer, CloudRain, Droplets, Info } from "lucide-react";
import { useState } from "react";
import { diseaseProfiles, diseaseOptions } from "../assets/data/diseaseData";

const ClimateFactorCard = ({ factor, expanded, onToggle }) => {
  const isPositive = factor.positive;
  const colorClass = isPositive ? "text-blue-600" : "text-orange-600";
  const bgClass = isPositive ? "bg-blue-50" : "bg-orange-50";
  const barColor = isPositive ? "bg-blue-500" : "bg-orange-500";

  const getIcon = () => {
    switch (factor.name) {
      case "Temperature": return <Thermometer className={`w-5 h-5 ${colorClass}`} />;
      case "Rainfall": return <CloudRain className={`w-5 h-5 ${colorClass}`} />;
      case "Humidity": return <Droplets className={`w-5 h-5 ${colorClass}`} />;
      default: return null;
    }
  };

  const descriptions = {
    Temperature: "Higher temperatures (25-30°C) accelerate mosquito metabolism, reproductive rates, and the replication speed of pathogens inside mosquitoes (extrinsic incubation period). This shortens the time between mosquito infection and transmission capability, increasing outbreak risk.",
    Rainfall: "Heavy rainfall creates stagnant water pools that serve as breeding grounds for mosquitoes (Aedes, Anopheles). The lag represents the time needed for mosquito larvae to mature and for disease transmission to increase. Additionally, flooding can contaminate water sources, leading to waterborne diseases like diarrhoea.",
    Humidity: "While moderate humidity (60-80%) supports mosquito survival, extremely high humidity (>90%) can actually reduce mosquito activity and disease transmission. The negative coefficient suggests that in Bangladesh's context, very high humidity periods may correspond with other conditions that suppress outbreaks, such as heavy continuous rain that flushes breeding sites."
  };

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-0.5">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-lg ${bgClass} flex items-center justify-center`}>
            {getIcon()}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-foreground">{factor.name}</span>
            <Badge variant="secondary" className="bg-gray-200 text-muted-foreground font-normal text-[10px] py-0 px-3 rounded-md">
              {factor.lag}
            </Badge>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" /> Hide
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" /> Details
            </>
          )}
        </button>
      </div>
      <div className="ml-12">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full ${barColor} rounded-full transition-all duration-500`}
              style={{ width: `${Math.abs(factor.value) * 600}%` }}
            />
          </div>
          <span className={`font-mono font-bold text-lg min-w-[50px] text-right ${colorClass}`}>
            {isPositive ? "+" : ""}{factor.value.toFixed(2)}
          </span>
        </div>

        {expanded && (
          <div className={`mt-6 border-l-4 ${isPositive ? "border-blue-500 bg-blue-50/30" : "border-orange-500 bg-orange-50/30"} p-4 rounded-lg`}>
            <p className={`text-xs font-semibold ${isPositive ? "text-blue-800" : "text-blue-800"} mb-1`}>Why this matters:</p>
            <p className="text-sm text-foreground leading-relaxed">
              {descriptions[factor.name] || `Information about how ${factor.name.toLowerCase()} impacts disease patterns.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};


const ModelPage = () => {
  const [expanded, setExpanded] = useState(null);
  const [selectedDisease, setSelectedDisease] = useState("dengue");
  const [showInfo, setShowInfo] = useState(false);
  const profile = diseaseProfiles[selectedDisease];
  const metrics = profile.modelMetrics;

  return (
    <div className="space-y-6 mx-10">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold space-grotesk-myfont">Model Performance</h2>
            <Badge variant="outline" className="space-grotesk-myfont text-info border-info bg-blue-100 text-blue-600 font-bold">BETA</Badge>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">Integration of Model servers on Google Colab and Dashboard is under maintenance.</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedDisease} onValueChange={setSelectedDisease}>
            <SelectTrigger className="w-[220px]"><SelectValue /></SelectTrigger>
            <SelectContent position="popper">
              {diseaseOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 text-muted-foreground">
            <RefreshCw className="w-4 h-4" /> Refresh Model
          </Button>
          <Info className="w-4 h-4 text-muted-foreground" onClick={() => setShowInfo(true)} />
        </div>
      </div>
      <Dialog open={showInfo} onOpenChange={setShowInfo}>
        <DialogContent className="w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-lg text-black">Refresh Model</DialogTitle>
            <DialogDescription>
              <p className="text-sm inter-myfont1 text-black py-1">This feature will update the model output with the latest predictions and recalculate performance metrics based on recent data. Currently under maintenance.</p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {/* Performance Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card bg-[rgb(239,246,255)] border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">R² Score</span>
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-foreground">{metrics.r2}%</p>
          <p className="text-xs text-muted-foreground">Model explains variance well</p>
        </div>
        <div className="stat-card bg-[rgb(240,253,244)] border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">SMAPE</span>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-foreground">{metrics.smape}%</p>
          <p className="text-xs text-muted-foreground">Average prediction error</p>
        </div>
        <div className="stat-card bg-[rgb(250,245,255)] border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Coverage 90%</span>
            <CheckCircle className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-foreground">{metrics.coverage90}%</p>
          <p className="text-xs text-muted-foreground">Predictions within range</p>
        </div>
        <div className="stat-card bg-[rgb(255,251,235)] border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Prediction Window</span>
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-foreground">{metrics.predictionWindow}</p>
          <p className="text-xs text-muted-foreground">Forecast time horizon</p>
        </div>
      </div>

      {/* Climate Influence */}
      <div className="dashboard-section">
        <h3 className="text-xl font-semibold text-foreground space-grotesk-myfont">Climate Influence on disease</h3>
        <p className="text-sm text-blue-800 mb-4">How climate factors affect disease outbreak patterns</p>

        <div className="stat-card stat-card-info mb-6">
          <p className="text-sm text-[rgb(60,93,170)]">
            Climate influence shows how weather and environmental factors correlate with disease outbreaks.
            Positive values indicate factors that <strong className="text-blue-600">increase outbreak risk</strong>,
            while negative values indicate factors that <strong className="text-orange-600">reduce outbreak risk</strong>.
            The magnitude represents the strength of the correlation.
          </p>
          <div className="flex gap-6 mt-2 text-xs">
            <span className="flex items-center gap-2 font-semibold text-blue-800">
              <div className="h-3 w-8 rounded bg-blue-500"></div>
              Positive Impact: Increases disease outbreak probability
            </span>
            <span className="flex items-center gap-2 font-semibold text-blue-800">
              <div className="h-3 w-8 rounded bg-orange-500"></div>
              Negative Impact: Decreases disease outbreak probability
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {metrics.climateFactors.map((f) => (
            <ClimateFactorCard
              key={f.name}
              factor={f}
              expanded={expanded === f.name}
              onToggle={() => setExpanded(expanded === f.name ? null : f.name)}
            />
          ))}
        </div>

        <p className="text-xs text-[rgb(60,93,170)] mt-4">
          <strong>Note:</strong> These correlation values represent the Pearson correlation between each climate
          variable and next week's disease cases. Higher absolute values indicate stronger relationships. The lag
          information shows how we're using historical climate data to predict future outbreaks.
        </p>
      </div>
    </div>
  );
};

export default ModelPage;
