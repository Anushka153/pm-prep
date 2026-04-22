"use client";
import { useState } from "react";
import AuthGuard from "@/app/components/AuthGuard";
import Sidebar from "@/app/components/Sidebar";
import Dashboard from "@/app/components/pages/Dashboard";
import Cases from "@/app/components/pages/Cases";
import Patterns from "@/app/components/pages/Patterns";
import Frameworks from "@/app/components/pages/Frameworks";
import QuickRef from "@/app/components/pages/QuickRef";
import MarketSizing from "@/app/components/pages/MarketSizing";
import Industries from "@/app/components/pages/Industries";
import Keywords from "@/app/components/pages/Keywords";
import CardGames from "@/app/components/pages/CardGames";
import Behavioral from "@/app/components/pages/Behavioral";
import InterviewQs from "@/app/components/pages/InterviewQs";
import ResourceDB from "@/app/components/pages/ResourceDB";
import QuestionBank from "@/app/components/pages/QuestionBank";

const PAGES: Record<string, React.ReactNode> = {
  dashboard: <Dashboard />,
  cases: <Cases />,
  patterns: <Patterns />,
  frameworks: <Frameworks />,
  quickref: <QuickRef />,
  marketsizing: <MarketSizing />,
  industries: <Industries />,
  keywords: <Keywords />,
  cardgames: <CardGames />,
  behavioral: <Behavioral />,
  interviewqs: <InterviewQs />,
  db: <ResourceDB />,
  questionbank: <QuestionBank />,
};

export default function Home() {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <Sidebar
          activePage={page}
          onNavigate={setPage}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main style={{ flex: 1, overflowY: "auto" }}>
          {PAGES[page] ?? <Dashboard />}
        </main>
      </div>
    </AuthGuard>
  );
}
