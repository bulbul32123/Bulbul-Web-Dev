import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Zap, 
  Layout, 
  MessageSquare, 
  ChevronRight, 
  Code2, 
  Eye, 
  Share2, 
  CornerDownLeft, 
  Paperclip, 
  Menu,
  Sparkles,
  History,
  Settings,
  LogOut,
  Moon,
  Sun,
  Copy,
  Check,
  Activity // Added Activity here to fix ReferenceError
} from 'lucide-react';


const MOCK_CODE_DASHBOARD = `import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen font-sans">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Overview</h1>
        <div className="flex gap-2">
          <Button variant="outline">Download</Button>
          <Button>New Report</Button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <MetricCard 
          title="Total Revenue" 
          value="$45,231.89" 
          icon={DollarSign} 
          change="+20.1% from last month" 
        />
        <MetricCard 
          title="Subscriptions" 
          value="+2350" 
          icon={Users} 
          change="+180.1% from last month" 
        />
        <MetricCard 
          title="Sales" 
          value="+12,234" 
          icon={CreditCard} 
          change="+19% from last month" 
        />
        <MetricCard 
          title="Active Now" 
          value="+573" 
          icon={Activity} 
          change="+201 since last hour" 
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-zinc-400 bg-zinc-100 rounded-md">
              [Chart Placeholder]
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <SaleItem name="Olivia Martin" email="olivia.martin@email.com" amount="+$1,999.00" />
              <SaleItem name="Jackson Lee" email="jackson.lee@email.com" amount="+$39.00" />
              <SaleItem name="Isabella Nguyen" email="isabella.nguyen@email.com" amount="+$299.00" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, change }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-zinc-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-zinc-500">{change}</p>
      </CardContent>
    </Card>
  );
}

function SaleItem({ name, email, amount }) {
  return (
    <div className="flex items-center">
      <div className="h-9 w-9 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-medium">
        {name.charAt(0)}
      </div>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-zinc-500">{email}</p>
      </div>
      <div className="ml-auto font-medium">{amount}</div>
    </div>
  );
}`;

// --- Helper Components ---

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2";
  const variants = {
    primary: "bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 shadow",
    secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80",
    ghost: "hover:bg-zinc-100 hover:text-zinc-900",
    outline: "border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900",
    icon: "h-9 w-9 p-0 hover:bg-zinc-100"
  };
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- Main Application ---

export default function V0clone() {
  const [hasStarted, setHasStarted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("preview"); // preview | code
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentCode, setCurrentCode] = useState("");
  const [generationStep, setGenerationStep] = useState(0);

  const chatEndRef = useRef(null);

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  // Handle submitting a prompt
  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newPrompt = inputValue;
    setInputValue("");
    
    // If first time, transition to editor
    if (!hasStarted) {
      setHasStarted(true);
    }

    // Add user message
    const userMsg = { role: 'user', content: newPrompt };
    setMessages(prev => [...prev, userMsg]);

    // Simulate AI Generation
    setIsGenerating(true);
    setGenerationStep(0);

    // Simulation Timeline
    setTimeout(() => setGenerationStep(1), 800); // "Thinking..."
    setTimeout(() => setGenerationStep(2), 1600); // "Planning components..."
    setTimeout(() => {
      setGenerationStep(3);
      setCurrentCode(MOCK_CODE_DASHBOARD); // "Code generated"
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I've created a modern dashboard with metric cards and a recent sales list. I used a clean grid layout and Lucide icons for visual indicators. Let me know if you'd like to adjust the color scheme or add more charts." 
      }]);
      setIsGenerating(false);
    }, 2500);
  };

  // Render the Landing Page View
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-white text-zinc-950 font-sans flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 z-10">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
              <span className="font-mono text-sm">v0</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-zinc-600">
            <span className="hover:text-black cursor-pointer hidden sm:block">Templates</span>
            <span className="hover:text-black cursor-pointer hidden sm:block">Pricing</span>
            <span className="hover:text-black cursor-pointer">Sign In</span>
          </div>
        </header>

        {/* Hero Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-16 z-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-center mb-6 text-zinc-900">
            Generate UI with simple text.
          </h1>
          <p className="text-zinc-500 text-lg mb-10 text-center max-w-xl leading-relaxed">
            v0 is your generative UI system. Powered by AI. <br className="hidden md:block"/>
            It builds copy-and-paste friendly React code using Tailwind CSS and Shadcn UI.
          </p>

          {/* Main Input */}
          <div className="w-full max-w-2xl relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-zinc-200 to-zinc-200 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <form onSubmit={handleSubmit} className="relative bg-white rounded-xl border border-zinc-200 shadow-lg overflow-hidden p-2 flex items-end gap-2 ring-1 ring-transparent focus-within:ring-zinc-300 transition-all">
              <div className="flex-1 min-h-[48px] relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  placeholder="Describe your app..."
                  className="w-full h-full resize-none bg-transparent border-0 focus:ring-0 p-3 text-lg placeholder:text-zinc-400 text-zinc-900"
                  rows={1}
                  style={{ minHeight: '48px' }}
                />
              </div>
              <div className="flex items-center gap-2 pb-1 pr-1">
                 <button type="button" className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors rounded-md hover:bg-zinc-100">
                   <Paperclip size={20} />
                 </button>
                 <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="bg-zinc-900 text-white p-2 rounded-lg hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                 >
                   <CornerDownLeft size={20} />
                 </button>
              </div>
            </form>
          </div>

          {/* Quick Prompts */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-3xl">
            {["E-commerce Dashboard", "Landing Page with Hero", "Login Form", "Pricing Table", "Chat Interface"].map((prompt) => (
              <button 
                key={prompt}
                onClick={() => {
                  setInputValue(prompt);
                  // Optional: auto submit
                }}
                className="px-3 py-1.5 rounded-full border border-zinc-200 text-sm text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </main>

        {/* Footer Decorations */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent"></div>
      </div>
    );
  }

  // --- Editor View ---
  return (
    <div className="h-screen w-screen bg-white flex flex-col overflow-hidden font-sans text-zinc-950">
      
      {/* Editor Header */}
      <header className="h-14 border-b border-zinc-200 flex items-center justify-between px-4 bg-white z-20">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-zinc-100 rounded-md text-zinc-500"
          >
            <Menu size={18} />
          </button>
          <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center font-mono text-xs font-bold">
            v0
          </div>
          <span className="text-zinc-300">/</span>
          <span className="font-medium text-sm truncate max-w-[150px] text-zinc-700">
            {messages[0]?.content || "New Project"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center bg-zinc-100 rounded-full p-0.5 border border-zinc-200">
             <button className="px-3 py-1 rounded-full text-xs font-medium bg-white shadow-sm text-zinc-900">
               v0-preview
             </button>
             <button className="px-3 py-1 rounded-full text-xs font-medium text-zinc-500 hover:text-zinc-900">
               v2-beta
             </button>
          </div>
          <div className="h-4 w-px bg-zinc-200 mx-2"></div>
          <Button variant="ghost" className="h-8 w-8 p-0"><Share2 size={16} /></Button>
          <Button className="h-8 text-xs">Deploy</Button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 ml-2"></div>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar (History) */}
        <aside 
          className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-zinc-50 border-r border-zinc-200 flex flex-col transition-all duration-300 overflow-hidden flex-shrink-0`}
        >
          <div className="p-4">
            <Button variant="outline" className="w-full justify-start gap-2 text-zinc-600" onClick={() => {setHasStarted(false); setMessages([]); setCurrentCode("");}}>
              <Sparkles size={16} />
              New Chat
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto px-2 space-y-1">
             <div className="px-2 py-1 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Recent</div>
             {[1, 2, 3].map((i) => (
               <div key={i} className="px-2 py-2 rounded-md hover:bg-zinc-200/50 cursor-pointer text-sm text-zinc-600 truncate">
                 Dashboard Concept {i}
               </div>
             ))}
          </div>
          <div className="p-4 border-t border-zinc-200">
            <div className="flex items-center gap-2 text-sm text-zinc-500 cursor-pointer hover:text-zinc-900">
              <Settings size={16} />
              Settings
            </div>
          </div>
        </aside>

        {/* Chat Panel */}
        <div className="flex-1 flex flex-col min-w-[350px] max-w-[500px] border-r border-zinc-200 bg-white z-10 shadow-xl shadow-zinc-200/50">
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Initial Greeting */}
            <div className="flex gap-4">
               <div className="w-8 h-8 rounded-full bg-black flex-shrink-0 flex items-center justify-center text-white text-xs font-mono">v0</div>
               <div className="space-y-2">
                 <p className="text-sm text-zinc-800">
                   Hi! I'm v0. I can help you build UI components. What would you like to create?
                 </p>
               </div>
            </div>

            {/* Message History */}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-mono ${msg.role === 'user' ? 'bg-zinc-200 text-zinc-700' : 'bg-black text-white'}`}>
                  {msg.role === 'user' ? 'U' : 'v0'}
                </div>
                <div className={`max-w-[85%] space-y-2 ${msg.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-800'}`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading State */}
            {isGenerating && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-black flex-shrink-0 flex items-center justify-center text-white text-xs font-mono animate-pulse">v0</div>
                <div className="space-y-2 w-full">
                   <div className="flex items-center gap-2 text-sm text-zinc-500">
                     {generationStep === 1 && <><Sparkles size={14} className="animate-spin" /> Thinking...</>}
                     {generationStep === 2 && <><Layout size={14} /> Planning components...</>}
                     {generationStep === 3 && <><Code2 size={14} /> Generating code...</>}
                   </div>
                   {/* Skeleton loader for preview card */}
                   <div className="h-24 w-full bg-zinc-50 border border-zinc-100 rounded-lg p-3 space-y-2 animate-pulse">
                      <div className="h-2 w-1/3 bg-zinc-200 rounded"></div>
                      <div className="h-2 w-1/2 bg-zinc-200 rounded"></div>
                   </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Area */}
          <div className="p-4 border-t border-zinc-200 bg-white">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative flex items-end gap-2 bg-zinc-50 border border-zinc-200 rounded-xl p-2 focus-within:ring-1 focus-within:ring-zinc-300 focus-within:border-zinc-300 transition-all shadow-sm">
                 <textarea 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  placeholder="Ask follow-up..."
                  className="w-full bg-transparent border-0 focus:ring-0 resize-none p-2 text-sm max-h-32 min-h-[40px]"
                  rows={1}
                 />
                 <button 
                  type="submit"
                  disabled={!inputValue.trim() && !isGenerating}
                  className="p-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   <CornerDownLeft size={16} />
                 </button>
              </div>
              <div className="mt-2 text-[10px] text-zinc-400 text-center">
                v0 can make mistakes. Please use with discretion.
              </div>
            </form>
          </div>
        </div>

        {/* Preview/Code Pane */}
        <div className="flex-1 bg-zinc-100 flex flex-col overflow-hidden relative">
          {/* Tabs Header */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-white/90 backdrop-blur-sm border border-zinc-200/80 shadow-sm p-1 rounded-full flex items-center gap-1">
            <button 
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${activeTab === 'preview' ? 'bg-zinc-100 text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              <Eye size={14} />
              Preview
            </button>
            <button 
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${activeTab === 'code' ? 'bg-zinc-100 text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              <Code2 size={14} />
              Code
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-4 overflow-hidden flex items-center justify-center">
             {currentCode ? (
               <div className="w-full h-full bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
                  {/* Window Controls (Fake) */}
                  <div className="h-8 bg-zinc-50 border-b border-zinc-200 flex items-center px-3 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/40"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/40"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/40"></div>
                    <div className="ml-auto text-[10px] text-zinc-400 font-mono">index.tsx</div>
                  </div>

                  {activeTab === 'preview' ? (
                    <div className="flex-1 overflow-auto bg-white">
                      {/* ACTUAL RENDERED COMPONENT */}
                      <DashboardPreview />
                    </div>
                  ) : (
                    <div className="flex-1 overflow-auto bg-[#0d1117] text-zinc-300 p-6 font-mono text-xs leading-relaxed">
                      <pre><code>{currentCode}</code></pre>
                    </div>
                  )}
               </div>
             ) : (
               <div className="text-center text-zinc-400 flex flex-col items-center gap-4">
                 <div className="w-16 h-16 rounded-2xl bg-zinc-200/50 flex items-center justify-center">
                   <Terminal size={32} className="opacity-50" />
                 </div>
                 <p className="text-sm font-medium">Ready to generate</p>
               </div>
             )}
          </div>
        </div>

      </div>
    </div>
  );
}

// --- The "Generated" Component (Mock Dashboard) ---

function DashboardPreview() {
  // This represents the content that V0 "generated". 
  // It's actually hardcoded here for the demo, but in a real app, this would be dynamic.
  return (
    <div className="p-6 md:p-8 font-sans text-zinc-900 bg-white min-h-full">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Overview</h2>
            <p className="text-zinc-500 mt-1">Track your business metrics in real-time.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-medium border border-zinc-200 rounded-md hover:bg-zinc-50 transition-colors">
              Export
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-zinc-900 text-white rounded-md hover:bg-zinc-800 transition-colors">
              New Campaign
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Revenue", val: "$45,231.89", change: "+20.1%", trend: "up" },
            { label: "Subscriptions", val: "+2350", change: "+180.1%", trend: "up" },
            { label: "Bounce Rate", val: "12.2%", change: "-4.3%", trend: "down" },
            { label: "Active Now", val: "+573", change: "+201", trend: "up" }
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-xl border border-zinc-200 shadow-sm bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-zinc-500">{stat.label}</span>
                <Activity size={16} className="text-zinc-400" />
              </div>
              <div className="text-2xl font-bold mb-1">{stat.val}</div>
              <div className={`text-xs ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-500'} flex items-center gap-1`}>
                 {stat.trend === 'up' ? '↑' : '↓'} {stat.change} 
                 <span className="text-zinc-400 ml-1">from last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* Chart Section */}
           <div className="lg:col-span-2 rounded-xl border border-zinc-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-6">Revenue Growth</h3>
              <div className="h-64 w-full bg-zinc-50 rounded-lg border border-dashed border-zinc-200 flex items-center justify-center text-zinc-400 text-sm">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-end gap-2 h-32">
                    <div className="w-8 bg-zinc-200 rounded-t h-12"></div>
                    <div className="w-8 bg-zinc-300 rounded-t h-20"></div>
                    <div className="w-8 bg-zinc-800 rounded-t h-24"></div>
                    <div className="w-8 bg-zinc-300 rounded-t h-16"></div>
                    <div className="w-8 bg-zinc-200 rounded-t h-10"></div>
                  </div>
                  <span>Interactive Chart Component</span>
                </div>
              </div>
           </div>

           {/* Recent Sales */}
           <div className="rounded-xl border border-zinc-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Sales</h3>
              <div className="space-y-6">
                {[
                  { name: "Olivia Martin", email: "olivia@email.com", amt: "+$1,999.00", initial: "O" },
                  { name: "Jackson Lee", email: "jackson@email.com", amt: "+$39.00", initial: "J" },
                  { name: "Isabella Ng", email: "isabella@email.com", amt: "+$299.00", initial: "I" },
                  { name: "William Kim", email: "will@email.com", amt: "+$99.00", initial: "W" },
                  { name: "Sofia Davis", email: "sofia@email.com", amt: "+$39.00", initial: "S" },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center text-sm font-bold text-zinc-700">
                        {user.initial}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-zinc-900">{user.name}</span>
                        <span className="text-xs text-zinc-500">{user.email}</span>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-zinc-900">{user.amt}</span>
                  </div>
                ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}