"use client";
import { useState } from "react";
import AuthGuard from "@/app/components/AuthGuard";
import Sidebar from "@/app/components/Sidebar";
import Dashboard from "@/app/components/pages/Dashboard";
import Cases from "@/app/components/pages/Cases";
import Keywords from "@/app/components/pages/Keywords";
import CardGames from "@/app/components/pages/CardGames";
import Behavioral from "@/app/components/pages/Behavioral";
import InterviewQs from "@/app/components/pages/InterviewQs";
import ResourceDB from "@/app/components/pages/ResourceDB";
import QuestionBank from "@/app/components/pages/QuestionBank";

function ComingSoon({ name }: { name: string }) {
  return (
    <div style={{ padding: "24px 28px", color: "var(--text2)", fontSize: 14 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 8, textTransform: "capitalize" }}>{name}</h1>
      <p>Coming soon — migration in progress.</p>
    </div>
  );
}

const PAGES: Record<string, React.ReactNode> = {
  dashboard: <Dashboard />,
  cases: <Cases />,
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
          {PAGES[page] ?? <ComingSoon name={page} />}
        </main>
      </div>
    </AuthGuard>
  );
}
