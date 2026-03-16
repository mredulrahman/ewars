import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info, Map as MapIcon, Globe, Eye, EyeOff } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { diseaseProfiles, getHeatmapColor } from "../assets/data/diseaseData";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"


const dengueLegend = [
  { label: "< 37", color: "hsl(50,80%,92%)" },
  { label: "37 – 105", color: "hsl(45,85%,80%)" },
  { label: "105 – 194", color: "hsl(40,90%,72%)" },
  { label: "194 – 298", color: "hsl(35,90%,65%)" },
  { label: "298 – 417", color: "hsl(25,90%,60%)" },
  { label: "417 – 549", color: "hsl(15,85%,55%)" },
  { label: "549 – 692", color: "hsl(5,80%,50%)" },
  { label: "> 692", color: "hsl(0,75%,40%)" }
];

const malariaVivaxLegend = [
  { label: "< 1", color: "hsl(60, 100%, 85%)" }, // Pale Yellow
  { label: "≥ 1", color: "hsl(0, 100%, 50%)" }  // Red
];

const malariaFalciparumLegend = [
  { label: "< 2", color: "hsl(60, 100%, 85%)" },
  { label: "≥ 2", color: "hsl(12, 100%, 50%)" } // Slightly Orangered/Red
];

const malariaMixedLegend = [
  { label: "< 2", color: "hsl(60, 100%, 85%)" },
  { label: "2 - 3", color: "hsl(35, 100%, 65%)" }, // Orange
  { label: "≥ 3", color: "hsl(0, 100%, 50%)" }   // Red
];

const awdLegend = [
  { label: "< 0", color: "#f8fafc" },
  { label: "0 - 2", color: "#dbeafe" },
  { label: "2 - 4", color: "#bfdbfe" },
  { label: "4 - 6", color: "#93c5fd" },
  { label: "6 - 9", color: "#7e97d1" },
  { label: "9 - 12", color: "#8a6db1" },
  { label: "12 - 16", color: "#9c3891" },
  { label: "≥ 16", color: "#7a004c" }
];

const diseaseOptions = [
  { value: "dengue", label: "Dengue" },
  { value: "malaria", label: "Malaria" },
  { value: "diarrhoea", label: "Acute Watery Diarrhoea" },
];

const getDiseaseColor = (cases, maxCases, disease, malariaFilter) => {
  if (disease === "malaria") {
    if (malariaFilter === "vivax") {
      return cases < 1 ? "hsl(60, 100%, 85%)" : "hsl(0, 100%, 50%)";
    }
    if (malariaFilter === "falciparum") {
      return cases < 2 ? "hsl(60, 100%, 85%)" : "hsl(12, 100%, 50%)";
    }
    // Mixed / Total
    if (cases < 2) return "hsl(60, 100%, 85%)";
    if (cases < 3) return "hsl(35, 100%, 65%)";
    return "hsl(0, 100%, 50%)";
  }
  if (disease === "diarrhoea") {
    if (cases <= 0) return "#f8fafc";
    if (cases <= 2) return "#dbeafe";
    if (cases <= 4) return "#bfdbfe";
    if (cases <= 6) return "#93c5fd";
    if (cases <= 9) return "#7e97d1";
    if (cases <= 12) return "#8a6db1";
    if (cases <= 16) return "#9c3891";
    return "#7a004c";
  }
  return getHeatmapColor(cases, maxCases);
};

const DiseaseMapPage = () => {
  const [selectedDisease, setSelectedDisease] = useState("dengue");
  const [mapStyle, setMapStyle] = useState("light"); // 'light' or 'satellite'
  const [showLabels, setShowLabels] = useState(true);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [malariaFilter, setMalariaFilter] = useState("mixed"); // "vivax", "falciparum", "mixed"
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);


  // Force OSM for specific diseases
  const isOSMOnly = selectedDisease === "malaria" || selectedDisease === "diarrhoea";

  useEffect(() => {
    if (isOSMOnly && mapStyle !== "light") {
      setMapStyle("light");
    }
  }, [selectedDisease, isOSMOnly, mapStyle]);

  const profile = useMemo(() => {
    if (selectedDisease === "malaria") {
      const pf = diseaseProfiles.malariaPF;
      const pv = diseaseProfiles.malariaPV;

      if (malariaFilter === "falciparum") return pf;
      if (malariaFilter === "vivax") return pv;

      // Mixed: Combine district data
      const mergedDistricts = {};

      [...pf.districtData, ...pv.districtData].forEach((d) => {
        const key = d.district.toLowerCase();
        if (mergedDistricts[key]) {
          mergedDistricts[key].cases += d.cases;
          mergedDistricts[key].deaths += (d.deaths || 0);
          mergedDistricts[key].previousWeekCases += (d.previousWeekCases || 0);
        } else {
          mergedDistricts[key] = { ...d };
        }
      });

      return {
        key: "malaria",
        label: `Malaria (${malariaFilter.charAt(0).toUpperCase() + malariaFilter.slice(1)})`,
        totalCases: (malariaFilter === 'mixed' ? pf.totalCases + pv.totalCases : (malariaFilter === 'falciparum' ? pf.totalCases : pv.totalCases)),
        districtData: Object.values(mergedDistricts),
      };
    }
    return diseaseProfiles[selectedDisease];
  }, [selectedDisease, malariaFilter]);

  const maxCases = useMemo(() => Math.max(...profile.districtData.map((d) => d.cases)), [profile]);

  // Map case data to district names
  const caseDataMap = useMemo(() => {
    return profile.districtData.reduce((acc, d) => {
      acc[d.district.toLowerCase()] = d;
      return acc;
    }, {});
  }, [profile]);

  // Initial map setup
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      preserveDrawingBuffer: true,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "&copy; OpenStreetMap Contributors",
          },
          satellite: {
            type: "raster",
            tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
            tileSize: 256,
            attribution: "Esri, Maxar, Earthstar Geographics, etc.",
          }
        },
        layers: [
          {
            id: "satellite-layer",
            type: "raster",
            source: "satellite",
            layout: { visibility: "none" },
          },
          {
            id: "osm-layer",
            type: "raster",
            source: "osm",
            layout: { visibility: "visible" },
          },
        ],
      },
      center: [90.41, 23.7], // Bangladesh center
      zoom: 6,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      setMapLoaded(true);

      // Add GeoJSON source
      map.addSource("districts", {
        type: "geojson",
        data: "/assets/data/map_data_v2.geojson",
        promoteId: "district",
      });

      // Add fill layer for choropleth
      map.addLayer({
        id: "districts-fill",
        type: "fill",
        source: "districts",
        paint: {
          "fill-color": "transparent",
          "fill-opacity": 0.7,
          "fill-outline-color": "hsla(220,13%,30%,0.3)",
        },
      });

      // Add border layer for hover effect
      map.addLayer({
        id: "districts-border",
        type: "line",
        source: "districts",
        paint: {
          "line-color": "hsl(220,60%,20%)",
          "line-width": ["case", ["boolean", ["feature-state", "hover"], false], 2.5, 0],
        },
      });

      // Add district labels
      map.addLayer({
        id: "district-labels",
        type: "symbol",
        source: "districts",
        layout: {
          "text-field": ["get", "district"],
          "text-size": 11,
          "text-anchor": "center",
          "text-allow-overlap": false,
        },
        paint: {
          "text-color": "#1a1a1a",
          "text-halo-color": "rgba(255,255,255,0.9)",
          "text-halo-width": 2,
        },
      });

      const handleDistrictHover = (e) => {
        if (e.features.length > 0) {
          const feature = e.features[0];
          const name = feature.properties.district;

          map.getCanvas().style.cursor = "pointer";
          setHoveredDistrict(name);

          if (mapRef.current.hoveredId) {
            map.setFeatureState(
              { source: "districts", id: mapRef.current.hoveredId },
              { hover: false }
            );
          }
          mapRef.current.hoveredId = name;
          map.setFeatureState(
            { source: "districts", id: mapRef.current.hoveredId },
            { hover: true }
          );
        }
      };

      const handleDistrictLeave = () => {
        map.getCanvas().style.cursor = "";
        setHoveredDistrict(null);
        if (mapRef.current.hoveredId) {
          map.setFeatureState(
            { source: "districts", id: mapRef.current.hoveredId },
            { hover: false }
          );
          mapRef.current.hoveredId = null;
        }
      };

      // Events for fill layer
      map.on("mousemove", "districts-fill", handleDistrictHover);
      map.on("mouseleave", "districts-fill", handleDistrictLeave);

      // Events for label layer (interaction sync)
      map.on("mousemove", "district-labels", handleDistrictHover);
      map.on("mouseleave", "district-labels", handleDistrictLeave);

      // Click to zoom
      map.on("click", "districts-fill", (e) => {
        const feature = e.features[0];
        if (!feature.geometry) return;

        // Calculate bounds for fitBounds
        const coordinates = feature.geometry.type === "Polygon"
          ? feature.geometry.coordinates[0]
          : feature.geometry.coordinates[0][0];

        const bounds = coordinates.reduce((acc, coord) => {
          return acc.extend(coord);
        }, new maplibregl.LngLatBounds(coordinates[0], coordinates[0]));

        map.fitBounds(bounds, { padding: 40, duration: 1000 });
      });
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update map style
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    if (mapStyle === "satellite") {
      mapRef.current.setLayoutProperty("satellite-layer", "visibility", "visible");
      mapRef.current.setLayoutProperty("osm-layer", "visibility", "none");
      mapRef.current.setPaintProperty("district-labels", "text-color", "#ffffff");
      mapRef.current.setPaintProperty("district-labels", "text-halo-color", "rgba(0,0,0,0.8)");
    } else {
      mapRef.current.setLayoutProperty("satellite-layer", "visibility", "none");
      mapRef.current.setLayoutProperty("osm-layer", "visibility", "visible");
      mapRef.current.setPaintProperty("district-labels", "text-color", "#1a1a1a");
      mapRef.current.setPaintProperty("district-labels", "text-halo-color", "rgba(255,255,255,0.9)");
    }
  }, [mapStyle, mapLoaded]);

  // Sync label visibility
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;
    const visibility = showLabels ? "visible" : "none";
    if (mapRef.current.getLayer("district-labels")) {
      mapRef.current.setLayoutProperty("district-labels", "visibility", visibility);
    }
  }, [showLabels, mapLoaded]);

  // Sync colors when disease or data changes
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const fillColorExpression = ["case"];
    Object.entries(caseDataMap).forEach(([name, data]) => {
      const color = getDiseaseColor(data.cases, maxCases, selectedDisease, malariaFilter);
      fillColorExpression.push(["==", ["downcase", ["get", "district"]], name], color);
    });
    fillColorExpression.push("transparent");

    if (mapRef.current.getLayer("districts-fill")) {
      mapRef.current.setPaintProperty("districts-fill", "fill-color", fillColorExpression);
    }
  }, [mapLoaded, selectedDisease, caseDataMap, maxCases]);

  const hoveredData = hoveredDistrict ? caseDataMap[hoveredDistrict.toLowerCase()] : null;

  return (
    <div className="space-y-6 mx-10">
      <div className="flex justify-center">
        <div className="space-y-1.5 text-center">
          <p className="text-md font-medium text-foreground py-2">Select Disease</p>
          <Select value={selectedDisease} onValueChange={setSelectedDisease}>
            <SelectTrigger className="w-[240px]"><SelectValue /></SelectTrigger>
            <SelectContent position="popper">
              {diseaseOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="dashboard-section p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            {diseaseOptions.map((o) => {
              if (o.value === selectedDisease) {
                return (
                  <h2 className="text-xl font-bold text-foreground space-grotesk-myfont">{o.label} Geospatial Forecast Map</h2>
                );
              }
            })}
            {selectedDisease === "malaria" && (
              <p className="text-sm inter-myfont1 text-[#3C5DAA] py-1">
                Next week malaria forecast by upazila based on species (Vivax, Falciparum, or Mixed).
              </p>
            )}
            {selectedDisease === "dengue" && (
              <p className="text-sm inter-myfont1 text-[#3C5DAA] py-1">
                Total predicted dengue cases by district.
              </p>
            )}
            {selectedDisease === "diarrhoea" && (
              <p className="text-sm inter-myfont1 text-[#3C5DAA] py-1">
                Total predicted Acute Watery Diarrhoea cases by district.
              </p>
            )}
          </div>
          <Info className="w-5 h-5 text-muted-foreground" onClick={() => setShowInfo(true)} />
        </div>

        <Dialog open={showInfo} onOpenChange={setShowInfo}>
          <DialogContent className="w-[400px]">
            <DialogHeader>
              <DialogTitle className="text-md text-[rgb(30,64,175)]">Predicted Cases Heatmap</DialogTitle>
              <DialogDescription>
                <p className="text-sm inter-myfont1 text-[rgb(30,64,175)] py-1">Shows AI-predicted disease cases across all districts.</p>
                <p className="text-sm inter-myfont1 text-[rgb(30,64,175)] py-1">Darker colors indicate higher predicted case counts. Use this to identify high-risk areas.</p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <div className="relative rounded-xl overflow-hidden shadow-inner border border-border" style={{ height: 650 }}>
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Map Style Toggle Overlay */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {!isOSMOnly && (
              <div className="flex items-center gap-1 p-1 bg-card/80 backdrop-blur-md rounded-lg border border-border shadow-lg">
                <button
                  onClick={() => setMapStyle("satellite")}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${mapStyle === "satellite" ? "bg-black text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  Satellite
                </button>
                <button
                  onClick={() => setMapStyle("light")}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${mapStyle === "light" ? "bg-black text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  OSM
                </button>
              </div>
            )}

            {selectedDisease === "malaria" && (
              <div className="flex flex-col gap-1 p-2 bg-card/90 backdrop-blur-md rounded-lg border border-border shadow-lg min-w-[160px]">
                <span className="text-sm font-bold text-foreground px-1 pb-1">Species</span>
                <Select value={malariaFilter} onValueChange={setMalariaFilter}>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue placeholder="Select species" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="vivax">Vivax</SelectItem>
                    <SelectItem value="falciparum">Falciparum</SelectItem>
                    <SelectItem value="mixed">Total Malaria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {selectedDisease === "dengue" && (
              <div
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all bg-white/90 backdrop-blur-md text-black shadow-sm border border-border`}>
                <Checkbox id="district-labels" checked={showLabels} onCheckedChange={setShowLabels} />
                <Label htmlFor="district-labels" className="cursor-pointer">District Labels</Label>
              </div>
            )}
          </div>

          {/* District Info Card Overlay */}
          {selectedDisease === "dengue" && (
            <div className="absolute top-4 right-14 z-10 w-64 translate-x-0 transition-all duration-300">
              <div className="bg-card/85 backdrop-blur-lg rounded-xl p-4 border border-border shadow-xl">
                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary" />
                  District Details
                </h3>
                {hoveredData ? (
                  <div className="space-y-3 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">District</p>
                      <p className="text-lg font-bold text-foreground leading-tight">{hoveredDistrict}</p>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-primary/5 rounded-lg border border-primary/10">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-primary/70 font-bold">Cases</p>
                        <p className="text-xl font-black text-primary">{hoveredData.cases.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Deaths</p>
                        <p className="text-lg font-bold text-foreground">{hoveredData.deaths || 0}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground italic text-center">Click district to zoom center</p>
                  </div>
                ) : (
                  <div className="py-8 text-center space-y-2">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mx-auto opacity-50">
                      <MapIcon className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-muted-foreground">Hover over a district or label to view statistics</p>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Legend Overlay */}
          <div className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-none rounded-xl p-4 border border-border shadow-xl z-10 min-w-[18px]">
            <p className="text-xs font-bold text-foreground mb-3 uppercase tracking-wider">Total Predicted Cases</p>
            <div className="space-y-2">
              {(() => {
                if (selectedDisease === "malaria") {
                  if (malariaFilter === "vivax") return malariaVivaxLegend;
                  if (malariaFilter === "falciparum") return malariaFalciparumLegend;
                  return malariaMixedLegend;
                }
                if (selectedDisease === "diarrhoea") return awdLegend;
                return dengueLegend;
              })().map((l) => (
                <div key={l.label} className="flex items-center gap-3 text-xs text-muted-foreground group">
                  <span
                    className="w-5 h-5 rounded-[4px] border border-black/10 shadow-sm transition-transform group-hover:scale-110"
                    style={{ background: l.color }}
                  />
                  <span className="font-semibold text-foreground/80">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseMapPage;
