import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Filter,
  Search,
  BarChart3,
  Download,
  Folder,
  Server,
  Database,
  TrendingUp,
  Zap,
  Map,
  MapPin,
  Bot,
  Terminal,
} from "lucide-react";

const CodeBlock = ({ code, language }) => (
  <div className="my-3 rounded-lg overflow-hidden bg-secondary/30 border border-border/50">
    <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-secondary/50">
      <div className="flex items-center gap-2">
        <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[10px] font-mono text-muted-foreground uppercase">{language}</span>
      </div>
    </div>
    <pre className="p-4 text-[12px] font-mono leading-relaxed overflow-x-auto text-foreground/90">
      <code>{code}</code>
    </pre>
  </div>
);

const HelpDeveloperGuide = ({ open, onOpenChange }) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[40%] sm:max-w-none p-0 border-l border-border bg-card flex flex-col h-full">
        <SheetHeader className="p-6 pb-2 shrink-0">
          <SheetTitle className="text-xl font-semibold text-foreground">
            Help & Developer Guide
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <Tabs defaultValue="user-guide" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-200 p-1 mb-6">
              <TabsTrigger
                value="user-guide"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:text-black text-blue-800 hover:text-blue-800"
              >
                User Guide
              </TabsTrigger>
              <TabsTrigger
                value="developer-guide"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:text-black text-blue-800 hover:text-blue-800"
              >
                Developer Guide
              </TabsTrigger>
            </TabsList>

            <TabsContent value="user-guide" className="mt-0 space-y-4">
              <p className="text-sm leading-relaxed">
                Welcome to EWARS Bangladesh. This guide provides a step-by-step walkthrough
                of the dashboard's features to help you monitor disease dynamics effectively.
              </p>

              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    icon: Filter,
                    title: "Step 1: Using Dashboard Filters",
                    content: (
                      <div className="space-y-4">
                        <p>
                          The sidebar on the left contains filters that allow you to customize the data displayed on the dashboard. All charts and maps will dynamically update based on your selections.
                        </p>
                        <ol className="list-decimal pl-4 space-y-3">
                          <li>
                            <strong>Select a Location:</strong>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                              <li><strong>Division:</strong> Start by choosing a top-level administrative area (e.g., "Dhaka"). This is the primary location filter.</li>
                              <li><strong>District:</strong> After selecting a division, you can optionally refine your view by choosing a specific district within it (e.g., "Dhaka North"). If no district is selected, the data will be aggregated for the entire division.</li>
                            </ul>
                          </li>
                          <li>
                            <strong>Select a Disease:</strong>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                              <li>Choose from the available diseases in the dropdown (e.g., "Dengue," "Influenza"). The entire dashboard will update to show data relevant to the selected disease.</li>
                            </ul>
                          </li>
                          <li>
                            <strong>Select a Date Range:</strong>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                              <li>Click the date field to open a calendar.</li>
                              <li>Select a start date and an end date to define the time period for the "Disease Case Trends" chart. You can navigate between months using the arrows.</li>
                            </ul>
                          </li>
                        </ol>
                      </div>
                    )
                  },
                  {
                    icon: Search,
                    title: "Step 2: Using the AI Search",
                    content: (
                      <div className="space-y-4">
                        <p>
                          The search bar in the header is a powerful AI assistant. You can ask it questions in natural language to get quick insights from the dashboard data.
                        </p>
                        <ol className="list-decimal pl-4 space-y-3">
                          <li>
                            <strong>Ask a Question:</strong>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                              <li>Click on the search bar at the top of the page.</li>
                              <li>
                                Type your question. For example, you could ask:
                                <br />
                                <em className="text-primary/80">"Which location has the highest risk score?"</em>
                                <br />
                                <em className="text-primary/80">"What are the top 3 most important features for predictions?"</em>
                                <br />
                                <em className="text-primary/80">"What is the incidence rate in Alpha district?"</em>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <strong>Get an Answer:</strong>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                              <li>Press Enter. A dialog box will appear while the AI analyzes the data.</li>
                              <li>The AI will provide a direct, text-based answer to your question based on the currently displayed data (Risk Heatmap, Feature Importance, etc.).</li>
                            </ul>
                          </li>
                        </ol>
                      </div>
                    )
                  },
                  {
                    icon: BarChart3,
                    title: "Step 3: Interpreting the Visualizations",
                    content: (
                      <div className="space-y-4">
                        <p>The main grid consists of several interactive cards. Here's how to read them:</p>
                        <ol className="list-decimal pl-4 space-y-3">
                          <li>
                            <strong>Weather Panels:</strong> At the top, these show current key weather indicators like Temperature, Humidity, and Rainfall. If a value is red, it indicates an extreme weather condition that could elevate disease risk.
                          </li>
                          <li>
                            <div className="flex items-center gap-2 mb-1">
                              <TrendingUp className="w-4 h-4 text-primary" />
                              <strong>Disease Case Trends:</strong>
                            </div>
                            <ul className="list-disc pl-5 space-y-1">
                              <li><strong>Actual Cases (Purple Area):</strong> This shows the number of reported cases.</li>
                              <li><strong>Predicted Cases (Orange Line):</strong> This is the model's forecast for case counts.</li>
                              <li><strong>Prediction Uncertainty (Light Orange Shaded Area):</strong> This band represents the confidence interval of our prediction. A wider band means more uncertainty.</li>
                              <li><strong>Zoom & Pan:</strong> Use the brush tool at the bottom of the chart to click and drag to zoom into a specific time period.</li>
                            </ul>
                          </li>
                          <li>
                            <div className="flex items-center gap-2 mb-1">
                              <Zap className="w-4 h-4 text-primary" />
                              <strong>Feature Importance:</strong>
                            </div>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>This chart shows which factors are most influential in the model's predictions.</li>
                              <li><strong>Positive Bars (Purple):</strong> Factors that increase the predicted number of cases (e.g., `Rainfall (14d lag)`).</li>
                              <li><strong>Negative Bars (Orange):</strong> Factors that decrease the predicted number of cases (e.g., `Govt. Interventions`).</li>
                            </ul>
                          </li>
                          <li>
                            <div className="flex items-center gap-2 mb-1">
                              <Map className="w-4 h-4 text-primary" />
                              <strong>Disease Incidence Map:</strong>
                            </div>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>This map of Genland shows disease incidence by district.</li>
                              <li><strong>Hover:</strong> Move your mouse over a district to see its name.</li>
                              <li><strong>Click:</strong> Click a district to select it and see its exact incidence rate displayed in the card's description. The selected district will be highlighted with a border.</li>
                              <li><strong>Color Legend:</strong> Red = High Incidence, Orange = Medium Incidence, Purple = Low Incidence.</li>
                            </ul>
                          </li>
                          <li>
                            <div className="flex items-center gap-2 mb-1">
                              <MapPin className="w-4 h-4 text-primary" />
                              <strong>Non-Spatial Risk Heatmap:</strong>
                            </div>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>This table ranks specific, named locations (not tied to the map) by their risk score.</li>
                              <li><strong>Sorting:</strong> Click on the headers ("Risk Level," "Score," "Change") to sort the table and identify the highest-risk areas or those with the most significant recent change.</li>
                            </ul>
                          </li>
                        </ol>
                      </div>
                    )
                  },
                  {
                    icon: Download,
                    title: "Step 4: Generating a Report",
                    content: (
                      <div className="space-y-4">
                        <p>You can download a summary report based on your current filter settings.</p>
                        <ol className="list-decimal pl-4 space-y-3">
                          <li>First, set your desired <strong>Location</strong>, <strong>Disease</strong>, and <strong>Date Range</strong> filters as described in Step 1.</li>
                          <li>Click the <strong>"Download Report"</strong> button at the bottom of the sidebar.</li>
                          <li>Our GenAI assistant will generate a report in CSV or PDF format based on your selections. A "Save As" dialog will appear in your browser, allowing you to download the file.</li>
                          <li>Note: The report generation is powered by AI and may take a few moments.</li>
                        </ol>
                      </div>
                    )
                  },
                ].map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`step-${index}`}
                    className="border-b border-border/50"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-4">
                        <item.icon className="w-5 h-5 text-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          {item.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="leading-relaxed pl-9">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="developer-guide" className="mt-0 space-y-4">
              <p className="text-sm leading-relaxed">
                This guide provides a technical overview of the application's
                architecture and instructions for deploying it to an external
                server.
              </p>

              <Accordion type="single" collapsible className="w-full">
                {[
                  {
                    icon: Folder,
                    title: "Phase 1: Application Architecture Guide",
                    content: (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-foreground">Project Structure Overview</h4>
                          <p className="text-sm">
                            This is a Next.js application built with the App Router, React, and TypeScript. Styling is handled by Tailwind CSS and shadcn/ui components. The backend AI capabilities are powered by Genkit.
                          </p>
                        </div>

                        <ul className="list-disc pl-4 space-y-3 text-sm">
                          <li>
                            <strong>src/app/:</strong> Core application routing and pages. `page.tsx` is the main entry point for the dashboard UI. `layout.tsx` is the root layout. `actions.ts` contains Server Actions for interacting with the backend.
                          </li>
                          <li>
                            <strong>src/components/:</strong> Contains all React components.
                            <ul className="list-disc pl-5 mt-2 space-y-1 opacity-90">
                              <li><strong>dashboard/:</strong> High-level widgets for the dashboard grid (e.g., TimeSeriesChart, ChoroplethMap).</li>
                              <li><strong>filters/:</strong> Components used in the sidebar for data filtering.</li>
                              <li><strong>layout/:</strong> Structural components like the Header, AppSidebar, and this HelpDrawer.</li>
                              <li><strong>ui/:</strong> Base UI components from shadcn/ui (Button, Card, etc.).</li>
                            </ul>
                          </li>
                          <li>
                            <strong>src/lib/:</strong> Shared utilities, data, and type definitions.
                            <ul className="list-disc pl-5 mt-2 space-y-1 opacity-90">
                              <li><strong>data.ts:</strong> Currently holds mock data for the dashboard. In a production setup, this would be replaced with API calls to a real database.</li>
                              <li><strong>types.ts:</strong> TypeScript interfaces for our data models (Location, Disease, etc.).</li>
                              <li><strong>utils.ts:</strong> Utility functions, including the `cn` helper for merging Tailwind classes.</li>
                            </ul>
                          </li>
                          <li>
                            <strong>src/ai/:</strong> Contains all Genkit-related code for generative AI features.
                            <ul className="list-disc pl-5 mt-2 space-y-1 opacity-90">
                              <li><strong>genkit.ts:</strong> Initializes and configes the core Genkit AI instance.</li>
                              <li><strong>flows/:</strong> Defines the multi-step AI workflows. `generate-report-from-prompt.ts` orchestrates the LLM call for report generation. `data-qa.ts` powers the natural language search.</li>
                            </ul>
                          </li>
                          <li><strong>public/:</strong> Static assets, which are publicly accessible.</li>
                          <li><strong>next.config.js:</strong> Configuration file for the Next.js application.</li>
                          <li><strong>package.json:</strong> Defines project dependencies and scripts.</li>
                        </ul>

                        <div className="pt-4 border-t border-border/50 space-y-3">
                          <div className="flex items-center gap-2">
                            <Bot className="w-4 h-4 text-primary" />
                            <h4 className="text-sm font-semibold text-foreground">AI Search Feature Architecture</h4>
                          </div>
                          <p className="text-sm leading-relaxed">
                            The AI-powered search is implemented using a combination of a React client component, a Next.js Server Action, and a Genkit flow.
                          </p>
                          <ol className="list-decimal pl-4 space-y-3 text-sm">
                            <li><strong>Client Component (src/components/layout/header.tsx):</strong> The search input in the header captures the user's question. On submission, it calls a Server Action.</li>
                            <li><strong>Server Action (src/app/actions.ts):</strong> The `searchAction` function receives the question. It compiles a "context" string containing a description and a JSON sample of the dashboard's mock data.</li>
                            <li><strong>Genkit Flow (src/ai/flows/data-qa.ts):</strong> The Server Action passes the question and the data context to the `answerQuestion` flow. This Genkit flow uses a prompt to instruct the language model to act as a data analyst and answer the question based on the provided context.</li>
                            <li><strong>Response:</strong> The answer is passed back through the Server Action to the client, where it is displayed in a dialog box. This architecture ensures that all Genkit code and API keys remain securely on the server.</li>
                          </ol>
                        </div>
                      </div>
                    )
                  },
                  {
                    icon: Server,
                    title: "Phase 2: Server Deployment Guide",
                    content: (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-foreground">Step 2.1: Build the Application</h4>
                          <p className="text-sm">
                            Before deployment, you need to create a production-ready build of the application. This process compiles the TypeScript/React code into optimized static HTML, CSS, and JavaScript files.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Prerequisites</h5>
                          <p className="text-sm italic">Ensure you have Node.js (version 20.x or later) and a package manager like npm installed on your local machine.</p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-foreground">Step 1: Install Dependencies</h4>
                          <p className="text-sm">Open a terminal in the project's root directory. If this is the first time building or if dependencies have changed, run:</p>
                          <CodeBlock code="npm install" language="shell" />
                          <p className="text-sm">This command reads the `package.json` and `package-lock.json` files and downloads the exact versions of all required libraries into the `node_modules` directory.</p>
                        </div>

                        <div className="space-y-2 pt-2">
                          <h4 className="text-sm font-semibold text-foreground">Key Dependencies Overview</h4>
                          <p className="text-sm">This command installs all the necessary libraries defined in `package.json`. Here is a brief overview of the core technologies used in this application:</p>
                          <ul className="list-disc pl-4 space-y-3 text-sm mt-3">
                            <li>
                              <strong>Core Framework:</strong>
                              <p className="mt-1 opacity-90"><strong>Next.js (next):</strong> A React framework for building production-grade web applications with features like server-side rendering and static site generation.</p>
                              <p className="mt-1 opacity-90"><strong>React (react, react-dom):</strong> A JavaScript library for building user interfaces with a component-based architecture.</p>
                              <p className="mt-1 opacity-90"><strong>TypeScript (typescript):</strong> A superset of JavaScript that adds static types, improving code quality and developer experience.</p>
                            </li>
                            <li>
                              <strong>Generative AI:</strong>
                              <p className="mt-1 opacity-90"><strong>Genkit (genkit, @genkit-ai/googleai):</strong> A framework for building robust, production-ready AI-powered features. It orchestrates calls to large language models (LLMs).</p>
                              <p className="mt-1 opacity-90"><strong>Zod (zod):</strong> A TypeScript-first schema declaration and validation library, used here to define the input and output structures for AI flows.</p>
                            </li>
                            <li>
                              <strong>UI & Styling:</strong>
                              <p className="mt-1 opacity-90"><strong>Tailwind CSS (tailwindcss):</strong> A utility-first CSS framework for rapidly building custom designs without writing traditional CSS.</p>
                              <p className="mt-1 opacity-90"><strong>shadcn/ui (@radix-ui/*, lucide-react, etc.):</strong> A collection of beautifully designed, accessible, and reusable components built on top of Radix UI and Tailwind CSS.</p>
                              <p className="mt-1 opacity-90"><strong>Recharts (recharts):</strong> A composable charting library built on React components, used for all the data visualizations on the dashboard.</p>
                            </li>
                            <li>
                              <strong>Utilities:</strong>
                              <p className="mt-1 opacity-90"><strong>Date FNS (date-fns):</strong> A modern JavaScript date utility library used for formatting and manipulating dates in the filters and charts.</p>
                            </li>
                          </ul>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-border/50">
                          <h4 className="text-sm font-semibold text-foreground">Step 2: Run the Production Build Command</h4>
                          <p className="text-sm">Execute the build script defined in `package.json`:</p>
                          <CodeBlock code="npm run build" language="shell" />
                          <p className="text-sm">This command triggers the Next.js build process. Here's what it does:</p>
                          <ul className="list-disc pl-4 space-y-2 text-sm">
                            <li><strong>Code Compilation:</strong> It transpiles your TypeScript (.ts, .tsx) files into JavaScript that browsers can understand.</li>
                            <li><strong>Code Bundling:</strong> It groups your application's JavaScript code and its dependencies into a few optimized files ("bundles" or "chunks").</li>
                            <li><strong>Code Minification:</strong> It removes all unnecessary characters (like spaces, newlines, and comments) from the code to make the files smaller for faster downloads.</li>
                            <li><strong>Static Site Generation (SSG):</strong> For pages that don't need real-time data, Next.js pre-renders them into static HTML files at build time.</li>
                            <li><strong>Server-Side Rendering (SSR) Functions:</strong> For pages that use Server Components or fetch data on each request, Next.js creates optimized server-side functions.</li>
                            <li><strong>CSS Optimization:</strong> It processes your Tailwind CSS classes, removes any unused styles (purging), and creates highly optimized, small CSS files.</li>
                          </ul>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-border/50">
                          <h4 className="text-sm font-semibold text-foreground">Step 3: Verify the Build Output</h4>
                          <p className="text-sm">Once the command finishes (it may take a minute or two), a new directory named `.next` will be created in your project root. This is your production build artifact. It contains everything needed to run your application in a production environment.</p>
                          <p className="text-sm">You should see output in your terminal summarizing the build, including page sizes and chunk details. A successful build will end without any errors.</p>
                          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-md text-sm text-amber-600 dark:text-amber-400">
                            <strong>Crucially, you only need to deploy the .next directory, along with package.json, public/, and your node_modules to the server. You do not need to deploy the entire src directory or other development files.</strong>
                          </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-border/50">
                          <h4 className="text-sm font-semibold text-foreground">Troubleshooting Common Build Errors</h4>
                          <ul className="list-disc pl-4 space-y-2 text-sm italic">
                            <li><strong>Type Errors:</strong> If the build fails with TypeScript errors, run `npm run typecheck` to see them clearly. Fix any type mismatches in your code before attempting to build again.</li>
                            <li><strong>Module Not Found:</strong> This usually means a dependency is missing. Try deleting the `node_modules` directory and the `package-lock.json` file, then run `npm install` again.</li>
                            <li><strong>Configuration Errors:</strong> Errors in `next.config.ts` or `tailwind.config.ts` can cause the build to fail. Check the terminal output for clues pointing to these files.</li>
                          </ul>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-border/50">
                          <h4 className="text-sm font-semibold text-foreground">Step 2.2: Prepare the Server Environment</h4>
                          <p className="text-sm">The application runs on Node.js. Your server (whether it's a cloud VM like an EC2 instance, or an on-premise server like Matrox) must have Node.js installed.</p>
                          <ol className="list-decimal pl-4 space-y-3 text-sm">
                            <li>Install a recent LTS version of Node.js (e.g., 20.x or later) on your server.</li>
                            <li>You will also need a process manager like PM2 to keep the application running continuously and manage logs. Install it globally: <CodeBlock code="npm install -g pm2" language="shell" /></li>
                            <li>Set up environment variables. Create a `.env.local` file in the root of your project directory on the server. This is where you'll put secrets like your `GEMINI_API_KEY`. This file is git-ignored and should never be committed to source control.</li>
                          </ol>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-border/50">
                          <h4 className="text-sm font-semibold text-foreground">Step 2.3: Deploy and Run the Application</h4>
                          <p className="text-sm">Transfer your project files to the server and start the application.</p>
                          <ol className="list-decimal pl-4 space-y-3 text-sm">
                            <li>Copy the entire project folder (including the `.next` directory, `public/`, and `package.json`) to your server using a tool like `scp` or `rsync`.</li>
                            <li>On the server, navigate to the project directory and install only the production dependencies: <CodeBlock code="npm install --omit=dev" language="shell" /></li>
                            <li>Use PM2 to start the Next.js application: <CodeBlock code="pm2 start npm --name 'ewars-bangladesh' -- run start" language="bash" />. The `-- run start` part tells PM2 to execute the "start" script defined in your `package.json`.</li>
                            <li>Your application is now running. By default, it listens on port 3000 (as configured in `package.json`).</li>
                          </ol>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-border/50">
                          <h4 className="text-sm font-semibold text-foreground">Step 2.4 (Optional): Configure a Reverse Proxy (e.g., Nginx)</h4>
                          <p className="text-sm">To serve your application on standard ports (like 80 for HTTP or 443 for HTTPS) and to handle SSL, you should use a reverse proxy like Nginx.</p>
                          <ol className="list-decimal pl-4 space-y-3 text-sm">
                            <li>Install Nginx on your server.</li>
                            <li>Create a new Nginx site configuration file (e.g., in `/etc/nginx/sites-available/ewars-bangladesh`).</li>
                            <li>Add a server block to proxy requests to your running Node.js application:
                              <CodeBlock
                                language="nginx"
                                code={`server {\n  listen 80;\n  server_name your_domain.com;\n\n  location / {\n    proxy_pass http://localhost:3000;\n    proxy_http_version 1.1;\n    proxy_set_header Upgrade $http_upgrade;\n    proxy_set_header Connection 'upgrade';\n    proxy_set_header Host $host;\n    proxy_cache_bypass $http_upgrade;\n  }\n}`}
                              />
                            </li>
                            <li>Enable the site and restart Nginx. Now, traffic to `your_domain.com` will be securely routed to your application.</li>
                          </ol>
                        </div>
                      </div>
                    )
                  },
                  {
                    icon: Database,
                    title: "Phase 3: Connecting a Production Data Pipeline",
                    content: (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold text-foreground">Overview</h4>
                          <p className="text-sm">
                            This application is currently powered by mock data located in `src/lib/data.ts`. To move to production, you'll need to replace this static data with a live connection to a database. This guide uses PostgreSQL as an example, but the same principles apply to other SQL databases as well.
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-foreground">Step 3.1: Define the Database Schema</h4>
                          <p className="text-sm">First, you need to create tables in your PostgreSQL database that mirror the structure of our mock data. Here's an example `CREATE TABLE` statements to get you started. You should add indexes to columns used in filters for better performance.</p>

                          <div className="space-y-4">
                            <div>
                              <h5 className="text-xs font-bold text-muted-foreground mb-1">Locations Table</h5>
                              <p className="text-[12px] text-muted-foreground mb-1">Stores the hierarchical location data used by the location filter.</p>
                              <CodeBlock
                                language="sql"
                                code={`CREATE TABLE locations (\n  id VARCHAR(10) PRIMARY KEY,\n  name VARCHAR(100) NOT NULL,\n  level VARCHAR(20) NOT NULL,\n  parent_id VARCHAR(10) REFERENCES locations(id)\n);`}
                              />
                            </div>

                            <div>
                              <h5 className="text-xs font-bold text-muted-foreground mb-1">Diseases Table</h5>
                              <p className="text-[12px] text-muted-foreground mb-1">Stores the list of diseases for the disease filter.</p>
                              <CodeBlock
                                language="sql"
                                code={`CREATE TABLE diseases (\n  id VARCHAR(50) PRIMARY KEY,\n  name VARCHAR(100) NOT NULL\n);`}
                              />
                            </div>

                            <div>
                              <h5 className="text-xs font-bold text-muted-foreground mb-1">Cases Data Table</h5>
                              <p className="text-[12px] text-muted-foreground mb-1">This is the core table for time-series data, storing actual and predicted disease counts.</p>
                              <CodeBlock
                                language="sql"
                                code={`CREATE TABLE daily_cases (\n  record_date DATE NOT NULL,\n  location_id VARCHAR(10) NOT NULL REFERENCES locations(id),\n  disease_id VARCHAR(50) NOT NULL REFERENCES diseases(id),\n  actual_cases INT,\n  predicted_cases INT,\n  uncertainty_low INT,\n  uncertainty_high INT,\n  is_outbreak BOOLEAN DEFAULT FALSE,\n  PRIMARY KEY (record_date, location_id, disease_id)\n);`}
                              />
                            </div>

                            <div>
                              <h5 className="text-xs font-bold text-muted-foreground mb-1">Weather Data Table</h5>
                              <p className="text-[12px] text-muted-foreground mb-1">Stores daily weather readings for different locations.</p>
                              <CodeBlock
                                language="sql"
                                code={`CREATE TABLE weather_readings (\n  reading_date DATE NOT NULL,\n  location_id VARCHAR(10) NOT NULL REFERENCES locations(id),\n  temperature_celsius DECIMAL(5, 2),\n  humidity_percent DECIMAL(5, 2),\n  rainfall_mm DECIMAL(5, 2),\n  PRIMARY KEY (reading_date, location_id)\n);`}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-border/50">
                          <h4 className="text-sm font-semibold text-foreground">Step 3.2: Create a Data Service Layer</h4>
                          <p className="text-sm">Instead of importing from `src/lib/data.ts`, you'll create a new set of functions that query your PostgreSQL database. This keeps your database logic separate from your UI components.</p>
                          <ol className="list-decimal pl-4 space-y-3 text-sm">
                            <li>
                              Install a PostgreSQL client for Node.js, like `pg`:
                              <CodeBlock language="shell" code="npm install pg" />
                            </li>
                            <li>Create a new file, e.g., `src/lib/db.ts`, to handle the database connection.</li>
                            <li>Add your database connection string to the `.env.local` file you created in Phase 2:
                              <CodeBlock language="text" code="DATABASE_URL='postgresql://user:password@host:port/database'" />
                            </li>
                            <li> In `src/lib/db.ts`, you would write functions to fetch data. For example:
                              <CodeBlock
                                language="typescript"
                                code={`import { Pool } from 'pg';\nimport type { TimeseriesDataPoint } from './types';\n\nconst pool = new Pool({\n  connectionString: process.env.DATABASE_URL,\n});\n\nexport async function fetchTimeseriesData(locationId: string, diseaseId: string): Promise<TimeseriesDataPoint[]> {\n  const query = \` \n    SELECT \n      to_char(record_date, 'YYYY-MM-DD') as date,\n      actual_cases as actual,\n      predicted_cases as predicted,\n      array[uncertainty_low, uncertainty_high] as uncertainty,\n      is_outbreak\n    FROM daily_cases\n    WHERE location_id = $1 AND disease_id = $2 AND record_date >= CURRENT_DATE - INTERVAL '1 year'\n    ORDER BY record_date ASC;\n  \`;\n  const res = await pool.query(query, [locationId, diseaseId]);\n  return res.rows;\n}\n\n// ... create similar functions for locations, diseases, etc.`}
                              />
                            </li>
                          </ol>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-border/50">
                          <h4 className="text-sm font-semibold text-foreground">Step 3.3: Update UI Components</h4>
                          <p className="text-sm">Finally, update the components in `src/components/dashboard/` to use your new data fetching functions. Since these are Server Components (or used within them), you can make them `async` and `await` the data directly.</p>
                          <p className="text-sm">For example, in `src/components/dashboard/dashboard-grid.tsx` you'd change how data is loaded:</p>
                          <CodeBlock
                            language="typescript"
                            code={`// Before (in dashboard-grid.tsx)\nimport { generateTimeseriesData } from '@/lib/data';\n// ...\nconst timeseriesData = generateTimeseriesData(88);\nreturn (\n  <TimeSeriesChart data={timeseriesData} />\n);\n\n// After (in an async component)\nimport { fetchTimeseriesData } from '@/lib/db';\n// ...\nexport default async function DashboardGrid() {\n  const searchParams = useSearchParams();\n  // ... get filters\n  const timeseriesData = await fetchTimeseriesData(location, disease);\n  return (\n    <TimeSeriesChart data={timeseriesData} />\n  );\n}`}
                          />
                          <p className="text-sm italic">You would apply the same pattern to the other components, replacing any remaining mock data calls to your new data service functions in `src/lib/db.ts`.</p>
                        </div>
                      </div>
                    )
                  },
                ].map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`phase-${index}`}
                    className="border-b border-border/50"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-4">
                        <item.icon className="w-5 h-5 text-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          {item.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="leading-relaxed pl-9">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HelpDeveloperGuide;

