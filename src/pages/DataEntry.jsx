import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Upload, Link, NotebookText } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"


const methods = [
  { id: "manual", icon: Plus, label: "Manual Entry", desc: "Enter data manually through forms" },
  { id: "upload", icon: Upload, label: "Upload File", desc: "Import data from CSV or Excel files" },
  { id: "api", icon: Link, label: "API Connection", desc: "Connect to external data sources" },
];

const DataEntryPage = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="space-y-6 mx-10">
      <div className="dashboard-section">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold space-grotesk-myfont text-foreground">Data Entry Portal</h2>
              <Badge variant="outline" className="space-grotesk-myfont text-info border-info bg-blue-100 text-blue-600 font-bold">BETA</Badge>
            </div>
            <p className="text-muted-foreground text-sm">Upload and manage your EWARS data</p>
          </div>
          <Button variant="outline" className="gap-2" onClick={() => setShowInfo(true)}>
            <NotebookText className="w-4 h-4" /> Guide
          </Button>
        </div>
        <Dialog open={showInfo} onOpenChange={setShowInfo}>
          <DialogContent className="w-[400px]">
            <DialogHeader>
              <DialogTitle className="text-md text-[rgb(30,64,175)]">Data Entry Guide</DialogTitle>
              <DialogDescription>
                <p className="text-xs inter-myfont1 text-[rgb(30,64,175)] py-1">Use the Data Entry Portal to upload disease surveillance data into the system. Choose from three entry methods: manual forms, file uploads (CSV/Excel), or API integration.</p>
                <hr className="my-4" />
                <p className="text-[10px] inter-myfont1 text-[rgb(30,64,175)] py-1">This feature is under testing. Please use with caution.</p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Tabs defaultValue="disease" className="w-full">
          <TabsList className="w-full bg-muted">
            <TabsTrigger value="disease" className="flex-1">Disease Data</TabsTrigger>
            <TabsTrigger value="climate" className="flex-1">Climate Data</TabsTrigger>
            <TabsTrigger value="response" className="flex-1">Response Data</TabsTrigger>
          </TabsList>

          <TabsContent value="disease" className="mt-6">
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {methods.map((m) => {
                const Icon = m.icon;
                const selected = selectedMethod === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMethod(m.id)}
                    className={`p-8 rounded-xl border-2 border-dashed bg-white text-center transition hover:border-primary/50 `}
                  >
                    <Icon className={`w-10 h-10 mx-auto mb-3 ${selected ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="font-semibold text-foreground">{m.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{m.desc}</p>
                  </button>
                );
              })}
            </div>

            <div className="rounded-xl border border-dashed border-border bg-white p-16 text-center">
              <p className="text-muted-foreground">
                {selectedMethod ? `${methods.find(m => m.id === selectedMethod)?.label} selected — form coming soon` : "Select a data entry method to begin"}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="climate" className="mt-6">
            <div className="rounded-xl border border-dashed border-border bg-muted/50 p-16 text-center">
              <p className="text-muted-foreground">Climate data entry — coming soon</p>
            </div>
          </TabsContent>

          <TabsContent value="response" className="mt-6">
            <div className="rounded-xl border border-dashed border-border bg-muted/50 p-16 text-center">
              <p className="text-muted-foreground">Response data entry — coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DataEntryPage;
