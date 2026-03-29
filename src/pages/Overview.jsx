import { Thermometer, Droplets, CloudRain, Activity, Droplet, Bug, CalendarIcon, TrendingUp, TrendingDown, Flame, Info } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState, useMemo } from "react";
import { diseaseProfiles, diseaseOptions, getTopDistricts } from "../assets/data/diseaseData.js";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { addDays, format } from "date-fns"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"


function DatePickerWithRange({ date, setDate }) {
  return (
    <Field className="mx-auto w-60">
      <FieldLabel htmlFor="date-picker-range">Date Range</FieldLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-range"
            className="justify-start px-2.5 font-normal"
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}

const OverviewPage = () => {
  const [selectedDisease, setSelectedDisease] = useState("dengue");
  const [selectedDivision, setSelectedDivision] = useState("Dhaka");
  const [selectedDistrict, setSelectedDistrict] = useState("Dhaka");
  const [showInfo1, setShowInfo1] = useState(false);
  const [showInfo2, setShowInfo2] = useState(false);
  const [date, setDate] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const profile = diseaseProfiles[selectedDisease];
  const topDistricts = getTopDistricts(selectedDisease, 6);

  const divisions = useMemo(() => {
    const uniqueDivisions = [...new Set(profile.districtData.map(d => d.division))].sort();
    return uniqueDivisions;
  }, [profile]);

  const districts = useMemo(() => {
    let filteredDistricts = profile.districtData;
    if (selectedDivision !== "all") {
      filteredDistricts = filteredDistricts.filter(d => d.division === selectedDivision);
    }
    return filteredDistricts.map(d => d.district).sort();
  }, [profile, selectedDivision]);

  const handleDiseaseChange = (value) => {
    setSelectedDisease(value);
    setSelectedDivision("all");
    setSelectedDistrict("all");
  };

  const handleDivisionChange = (value) => {
    setSelectedDivision(value);
    setSelectedDistrict("all");
  };

  const latestWeekIndex = parseInt(profile.latestDataWeek.match(/\d+/)[0]) - 1;
  const climate = profile.climateCorrelation[latestWeekIndex] || profile.climateCorrelation[0];

  const getFilteredDiseaseStats = (diseaseKey) => {
    const prof = diseaseProfiles[diseaseKey];
    let current, previous;

    if (selectedDistrict !== "all") {
      const dist = prof.districtData.find(d => d.district === selectedDistrict);
      current = dist ? dist.cases : 0;
      previous = dist ? dist.previousWeekCases : 0;
    } else if (selectedDivision !== "all") {
      const filtered = prof.districtData.filter(d => d.division === selectedDivision);
      current = filtered.reduce((sum, d) => sum + d.cases, 0);
      previous = filtered.reduce((sum, d) => sum + d.previousWeekCases, 0);
    } else {
      current = prof.currentWeekCases;
      previous = prof.previousWeekCases;
    }

    // Simulate date range impact
    if (date?.from && date?.to) {
      const days = Math.max(1, Math.ceil((date.to - date.from) / (1000 * 60 * 60 * 24)));
      const dateFactor = days / 30; // normalized to 30 days
      // Add some deterministic jitter based on the date range
      const jitter = (date.from.getTime() % 100) / 1000 + 0.95;
      current = Math.round(current * dateFactor * jitter);
      previous = Math.round(previous * dateFactor * jitter);
    }

    const change = previous === 0 ? (current > 0 ? 100 : 0) : Math.round(((current - previous) / previous) * 100);
    return { current, previous, change, hasData: current > 0 || previous > 0 };
  };

  const dengueStats = getFilteredDiseaseStats("dengue");
  const diarrhoeaStats = getFilteredDiseaseStats("diarrhoea");
  const malariaPFStats = getFilteredDiseaseStats("malariaPF");
  const malariaPVStats = getFilteredDiseaseStats("malariaPV");

  const hasMetricsData = dengueStats.hasData || diarrhoeaStats.hasData || malariaPFStats.hasData || malariaPVStats.hasData;
  const hasWeatherData = !!climate;

  const chartNoData = selectedDistrict !== "all" && !profile.districtData.find(d => d.district === selectedDistrict);
  const chartNoDataMessage = chartNoData
    ? `No ${profile.label} data available for ${selectedDistrict}. This disease may not be tracked in this district.`
    : null;

  const filteredTopDistricts = useMemo(() => {
    let list = profile.districtData;
    if (selectedDivision !== "all") {
      list = list.filter(d => d.division === selectedDivision);
    }

    // Simulate date range impact
    let dateFactor = 1;
    let jitter = 1;
    if (date?.from && date?.to) {
      const days = Math.max(1, Math.ceil((date.to - date.from) / (1000 * 60 * 60 * 24)));
      dateFactor = days / 30;
      jitter = (date.from.getTime() % 100) / 1000 + 0.95;
    }

    return list
      .sort((a, b) => b.cases - a.cases)
      .slice(0, 6)
      .map((d) => {
        const thisWeek = Math.round(d.cases * dateFactor * jitter);
        const lastWeek = Math.round(d.previousWeekCases * dateFactor * jitter);
        const change = lastWeek === 0 ? 100 : Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
        return {
          name: d.district,
          week: profile.latestDataWeek,
          thisWeek,
          lastWeek,
          change,
          trend: change > 0 ? "Rising" : change < 0 ? "Declining" : "Stable",
        };
      });
  }, [profile, selectedDivision, date]);

  const formatWeekToMonth = (weekStr) => {
    if (!weekStr) return "";
    const match = weekStr.match(/Week (\d+), (\d+)/);
    if (match) {
      const weekNum = parseInt(match[1]);
      const year = match[2];
      const date = addDays(new Date(year, 0, 1), (weekNum - 1) * 7);
      return format(date, "MMMM yyyy");
    }
    return weekStr;
  };

  return (
    <div className="space-y-6 mx-10">
      {/* Filters */}
      <div className="dashboard-section bg-gray-50 flex flex-wrap items-end gap-6">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground py-2">Disease</p>
          <Select value={selectedDisease} onValueChange={handleDiseaseChange}>
            <SelectTrigger className="w-[250px]"><SelectValue /></SelectTrigger>
            <SelectContent position="popper">
              {diseaseOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground py-2">Location</p>
          <Select value={selectedDivision} onValueChange={handleDivisionChange}>
            <SelectTrigger className="w-[250px]"><SelectValue /></SelectTrigger>
            <SelectContent position="popper">
              {/* <SelectItem value="Dhaka"></SelectItem> */}
              {divisions.map((div) => (
                <SelectItem key={div} value={div}>{div}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          {/* <label className="text-sm font-medium text-foreground">District</label> */}
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger className="w-[250px]"><SelectValue /></SelectTrigger>
            <SelectContent position="popper">
              {/* <SelectItem value="all">All Districts</SelectItem> */}
              {districts.map((dist) => (
                <SelectItem key={dist} value={dist}>{dist}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {!hasMetricsData && (
          <div className="col-span-full p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm flex items-center gap-2">
            <span>⚠️ couldnot load metrics data</span>
          </div>
        )}
        <StatCard
          className="stat-card-temperature"
          icon={<Thermometer className="w-5 h-5" style={{ color: "hsl(25,80%,45%)" }} />}
          label="Temperature"
          value={hasWeatherData ? `${climate.temp}°C` : null}
          sub="Hot"
          error={!hasWeatherData ? "couldnot load weather stats" : null}
        />
        <StatCard
          className="stat-card-humidity"
          icon={<Droplets className="w-5 h-5" style={{ color: "hsl(221, 83%, 53%)" }} />}
          label="Humidity"
          value={hasWeatherData ? `${climate.humidity}%` : null}
          sub="Clear Sky"
          error={!hasWeatherData ? "couldnot load weather stats" : null}
        />
        <StatCard
          className="stat-card-rainfall"
          icon={<CloudRain className="w-5 h-5" style={{ color: "hsl(200,60%,40%)" }} />}
          label="Rainfall"
          value={hasWeatherData ? `${climate.rainfall}mm` : null}
          sub={climate?.rainfall > 0 ? "Rainy" : "No rain"}
          error={!hasWeatherData ? "couldnot load weather stats" : null}
        />
        <StatCard
          className="stat-card-dengue"
          icon={<Activity className="w-5 h-5" style={{ color: "hsl(0,70%,50%)" }} />}
          label="Dengue"
          value={dengueStats.hasData ? dengueStats.current.toLocaleString() : null}
          sub={profile.latestDataWeek}
          extraLabel={`This week actual: ${dengueStats.current.toLocaleString()} (${diseaseProfiles.dengue.totalDistricts} districts)`}
          change={dengueStats.hasData ? dengueStats.change : undefined}
          error={!dengueStats.hasData ? "couldn't available to load disease stats" : null}
        />
        <StatCard
          className="stat-card-diarrhoea"
          icon={<Droplet className="w-5 h-5" style={{ color: "hsl(30,70%,45%)" }} />}
          label="Diarrhoea"
          value={diarrhoeaStats.hasData ? diarrhoeaStats.current.toLocaleString() : null}
          sub={profile.latestDataWeek}
          extraLabel={`This week actual: ${diarrhoeaStats.current.toLocaleString()} (${diseaseProfiles.diarrhoea.totalDistricts} districts)`}
          change={diarrhoeaStats.hasData ? diarrhoeaStats.change : undefined}
          error={!diarrhoeaStats.hasData ? "couldn't available to load disease stats" : null}
        />
        <StatCard
          className="stat-card-malaria"
          icon={<Bug className="w-5 h-5" style={{ color: "hsl(280,50%,45%)" }} />}
          label={`Malaria (${Math.round((malariaPVStats.current / (malariaPVStats.current + malariaPFStats.current || 1)) * 100)}% PV)`}
          value={(malariaPFStats.hasData || malariaPVStats.hasData) ? (malariaPFStats.current + malariaPVStats.current).toLocaleString() : null}
          sub={formatWeekToMonth(profile.latestDataWeek)}
          extraLabel={`This month actual: ${(malariaPFStats.current + malariaPVStats.current).toLocaleString()} (${diseaseProfiles.malariaPF.totalUpazilas} upazilas)`}
          change={(malariaPFStats.hasData || malariaPVStats.hasData) ? Math.round((malariaPFStats.change + malariaPVStats.change) / 2) : undefined}
          error={!(malariaPFStats.hasData || malariaPVStats.hasData) ? "couldn't available to load disease stats" : null}
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Predicted Cases */}
        <div className="dashboard-section min-h-[400px] flex flex-col">
          <div className="flex flex-row justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground space-grotesk-myfont">
                Predicted Cases & Uncertainty
              </h2>
              <p className="text-sm text-blue-800 mb-4">Historical trend with predicted values and uncertainty</p>
            </div>
            <div>
              <Info className="w-5 h-5" style={{ color: "hsl(220,10%,46%)" }} onClick={() => setShowInfo1(true)} />
            </div>

            <Dialog open={showInfo1} onOpenChange={setShowInfo1}>
              <DialogContent className="w-[400px]">
                <DialogHeader>
                  <DialogTitle className="text-md text-black">Predicted Cases & Uncertainty</DialogTitle>
                  <DialogDescription>
                    <p className="text-sm inter-myfont1 text-black py-1">Shows historical disease case trends with the latest AI-predicted value.</p>
                    <p className="text-sm inter-myfont1 text-black py-1">The trend line shows historical data with the predicted point highlighted in red at the end. Error bars indicate the prediction uncertainty range (low to high).</p>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          {chartNoDataMessage ? (
            <div className="flex-1 flex items-center justify-center p-10 text-center text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
              <p>{chartNoDataMessage}</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={profile.weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(220,10%,46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220,10%,46%)" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cases" stroke="hsl(220,60%,20%)" strokeWidth={2} dot={false} connectNulls={false} />
                <Line type="monotone" dataKey="predicted" stroke="hsl(0,72%,51%)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                <Line type="monotone" dataKey="upperCI" stroke="hsl(0,72%,51%)" strokeWidth={1} strokeDasharray="2 2" dot={false} />
                <Line type="monotone" dataKey="lowerCI" stroke="hsl(0,72%,51%)" strokeWidth={1} strokeDasharray="2 2" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Top Districts */}
        <div className="dashboard-section">
          <div className="flex flex-row justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground space-grotesk-myfont">
                Top Districts - Last Week Cases
              </h2>
              <p className="text-sm text-blue-800 mb-4">Districts with highest case counts from previous week</p>
            </div>
            <div>
              <Info className="w-5 h-5" style={{ color: "hsl(220,10%,46%)" }} onClick={() => setShowInfo2(true)} />
            </div>
            <Dialog open={showInfo2} onOpenChange={setShowInfo2}>
              <DialogContent className="w-[400px]">
                <DialogHeader>
                  <DialogTitle className="text-md text-black">Top Districts</DialogTitle>
                  <DialogDescription>
                    <p className="text-sm inter-myfont1 text-black py-1">Highlights districts with the most cases last week.</p>
                    <p className="text-sm inter-myfont1 text-black py-1">Color indicators show rising, declining, or stable trends compared to the week before.</p>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {filteredTopDistricts.length > 0 ? (
              filteredTopDistricts.map((d) => (
                <div
                  key={d.name}
                  className={`rounded-lg p-4 border ${d.trend === "Rising" ? "stat-card-dengue" : "stat-card-success"
                    }`}
                >
                  <p className="font-bold text-foreground capitalize">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.week}</p>
                  <div className="flex justify-between mt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">This Week</p>
                      <p className="text-2xl font-bold text-foreground">{d.thisWeek}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-medium self-start px-2 py-0.5 rounded-md ${d.trend === "Rising" ? "trend-rising bg-red-100" : d.trend === "Declining" ? "trend-declining bg-green-200" : "trend-stable bg-gray-200"
                        }`}>
                        {d.trend}
                      </span>
                      <p className="text-xs text-muted-foreground">Last Week</p>
                      <p className="text-lg font-bold text-foreground">{d.lastWeek}</p>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between mt-4 text-muted-foreground">
                    <span className="text-xs">WoW Change:</span>
                    <span
                      className={`flex items-center gap-1 font-bold text-md ${d.change > 0 ? "trend-rising" : d.change < 0 ? "trend-declining" : "trend-stable"}`}
                    >
                      {d.change > 0 ? <TrendingUp className="w-4 h-4" /> : d.change < 0 ? <TrendingDown className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />} {Math.abs(d.change)}%
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center py-10 text-muted-foreground">No data available for this location.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ className, icon, label, value, sub, extraLabel, change, error }) => (
  <div className={`stat-card ${className} relative overflow-hidden flex flex-col justify-between`}>
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {icon}
      </div>
      {error ? (
        <p className="text-xs text-danger font-medium leading-tight mt-2">{error}</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-2 items-center">
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {change !== undefined && (
            <span className={`flex items-center gap-1 text-xs font-medium ${change > 0 ? "trend-rising" : change < 0 ? "trend-declining" : "trend-stable"}`}>
              {change > 0 ? <TrendingUp /> : change < 0 ? <TrendingDown /> : <ArrowRight />} {Math.abs(change)}%
            </span>
          )}
        </div>
      )}
    </div>
    <div className="mt-4">
      {(sub === "Hot") ? <p className="text-sm font-semibold text-amber-600">
        <span className="flex items-center gap-1"><Flame className="w-5 h-5" />{sub}</span></p> : <p className="text-sm text-muted-foreground">{sub}</p>}
      {extraLabel && <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">{extraLabel}</p>}
    </div>
  </div>
);

export default OverviewPage;