
import React, { useState } from 'react';
import { AppView, Message } from './types';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import AssessmentView from './components/AssessmentView';
import MBTIView from './components/MBTIView';
import LearningBookView from './components/LearningBookView';
import { 
  Menu, 
  X,
  BookOpen
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setView] = useState<AppView>(AppView.CHAT);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mbtiResult, setMbtiResult] = useState<string | null>(null);
  const [learningContext, setLearningContext] = useState<string | null>(null);

  const handleMBTIFinish = (result: string) => {
    setMbtiResult(result);
    setLearningContext(null);
    setView(AppView.CHAT);
  };

  const handleStartConsultation = (topic: string) => {
    setLearningContext(`Saya ingin berdiskusi lebih dalam tentang materi "${topic}" yang saya baca di Learning Book. Apa poin penting yang bisa saya terapkan di karier saya?`);
    setMbtiResult(null);
    setView(AppView.CHAT);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.CHAT:
        let initialContext = undefined;
        if (mbtiResult) {
          initialContext = `Saya baru saja menyelesaikan tes MBTI dan hasilnya adalah ${mbtiResult}. Bisakah Selvi memberikan analisis karier mendalam berdasarkan profil ini?`;
        } else if (learningContext) {
          initialContext = learningContext;
        }
        return <ChatView initialContext={initialContext} />;
      case AppView.ASSESSMENT:
        return <AssessmentView />;
      case AppView.MBTI_TEST:
        return <MBTIView onFinish={handleMBTIFinish} />;
      case AppView.LEARNING_BOOK:
        return <LearningBookView onStartConsultation={handleStartConsultation} />;
      default:
        return <ChatView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-inter">
      {/* Sidebar Desktop */}
      <Sidebar currentView={currentView} setView={setView} />

      {/* Mobile Nav Toggle */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md border border-slate-200"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">S</div>
            <h1 className="font-bold text-slate-800">Selvi AI</h1>
          </div>
          <div className="space-y-4">
            {[
              { id: AppView.CHAT, label: 'Konsultasi' },
              { id: AppView.ASSESSMENT, label: 'Assessment' },
              { id: AppView.MBTI_TEST, label: 'Tes Karakter' },
              { id: AppView.LEARNING_BOOK, label: 'Learning Book' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left p-4 rounded-xl text-lg font-medium ${
                  currentView === item.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-white md:bg-slate-50 md:p-4 overflow-hidden">
        <div className="flex-1 bg-white md:rounded-[2.5rem] shadow-sm border border-slate-200/50 overflow-hidden flex flex-col relative">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
