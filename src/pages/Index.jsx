import { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import { snapdom } from "@zumer/snapdom";
import DashboardLayout from "@/layouts/mainLayout";
import DiseaseMapPage from "./DiseaseMap";
import AlertPage from "./Alert";
import ClimateImpactPage from "./ClimateImpact";
import SimulationPage from "./Simulation";
import ModelPage from "./Model";
import DataEntryPage from "./DataEntry";
import OverviewPage from "./Overview";

const Index = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [isExporting, setIsExporting] = useState(false);
    const exportRef = useRef(null);

    const renderPage = () => {
        switch (activeTab) {
            case "overview": return <OverviewPage />;
            case "disease-maps": return <DiseaseMapPage />;
            case "alert": return <AlertPage />;
            case "climate-impact": return <ClimateImpactPage />;
            case "simulation": return <SimulationPage />;
            case "model": return <ModelPage />;
            case "data-entry": return <DataEntryPage />;
            default: return <OverviewPage />;
        }
    };

    const handleDownload = async () => {
        setIsExporting(true);
        // Give maps & charts time to render in the hidden container
        setTimeout(async () => {
            if (!exportRef.current) {
                setIsExporting(false);
                return;
            }

            try {
                const pdf = new jsPDF("p", "mm", "a4");
                const pages = Array.from(exportRef.current.children);
                const tabSequence = ["overview", "disease-maps", "alert", "climate-impact", "simulation", "model", "data-entry"];

                for (let i = 0; i < pages.length; i++) {
                    const pageElement = pages[i];

                    // Update active tab for "playing" effect
                    if (tabSequence[i]) {
                        setActiveTab(tabSequence[i]);
                    }

                    const canvas = await snapdom.toCanvas(pageElement, {
                        scale: 2,
                        backgroundColor: "#ffffff",
                    });

                    const imgData = canvas.toDataURL("image/jpeg", 1.0);

                    // A4 size: 210 x 297 mm
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    // Keep ratio 
                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                    if (i > 0) {
                        pdf.addPage();
                    }

                    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);

                    // Small delay to ensure the UI update is visible to the user
                    await new Promise(resolve => setTimeout(resolve, 5000));
                }

                const today = new Date().toISOString().split('T')[0];
                pdf.save(`EWARS_Report_${today}.pdf`);
            } catch (error) {
                console.error("Error generating PDF:", error);
                alert("Failed to export PDF.");
            } finally {
                setIsExporting(false);
            }
        }, 3000); // 3-second delay to ensure all charts and tile layers load
    };

    return (
        <>
            <DashboardLayout
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onDownload={handleDownload}
                isDownloading={isExporting}
            >
                {renderPage()}
            </DashboardLayout>

            {/* Hidden container for PDF Generation - Always rendered but hidden to allow charts to load */}
            <div
                ref={exportRef}
                className={`absolute top-[-9999px] left-[-9999px] w-[1200px] flex flex-col gap-10 bg-background ${!isExporting ? 'hidden' : ''}`}
            >
                <div className="p-8"><OverviewPage /></div>
                <div className="p-8"><DiseaseMapPage /></div>
                <div className="p-8"><AlertPage /></div>
                <div className="p-8"><ClimateImpactPage /></div>
                <div className="p-8"><SimulationPage /></div>
                <div className="p-8"><ModelPage /></div>
                <div className="p-8"><DataEntryPage /></div>
            </div>
        </>
    );
};

export default Index;
