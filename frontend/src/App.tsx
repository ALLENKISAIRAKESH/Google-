import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';

// Pages
import { HomePage } from './pages/HomePage';
import { CommunitiesPage } from './pages/CommunitiesPage';
import { CommunityDetailPage } from './pages/CommunityDetailPage';
import { ExplorePage } from './pages/ExplorePage';
import { DevelopersPage } from './pages/DevelopersPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { EventsPage } from './pages/EventsPage';
import { InstantConnectPage } from './pages/InstantConnectPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { MessagesPage } from './pages/MessagesPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { ModerationPage } from './pages/ModerationPage';
import { AuthPage } from './pages/AuthPage';
import { AboutPage } from './pages/AboutPage';
import { ReelsPage } from './pages/ReelsPage';
import { SummaryPage } from './pages/SummaryPage';

export function App() {
  const [selectedCircle, setSelectedCircle] = useState<string | undefined>();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col">
            
            {/* Top Navigation */}
            <Navbar onOpenCreatePost={() => setShowCreateModal(true)} />

            {/* Main Application Container */}
            <div className="mx-auto flex-1 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex gap-6">
                
                {/* Responsive Left Navigation */}
                <Sidebar 
                  selectedCircle={selectedCircle} 
                  onSelectCircle={(circleId) => setSelectedCircle(circleId)} 
                />

                {/* Primary Content View */}
                <main className="flex-1 min-w-0 pb-16 md:pb-6">
                  <Routes>
                    <Route path="/" element={<HomePage selectedCircle={selectedCircle} />} />
                    <Route path="/communities" element={<CommunitiesPage />} />
                    <Route path="/communities/new" element={<CommunitiesPage />} />
                    <Route path="/communities/:slug" element={<CommunityDetailPage />} />
                    <Route path="/reels" element={<ReelsPage />} />
                    <Route path="/summary" element={<SummaryPage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/search" element={<ExplorePage />} />
                    <Route path="/developers" element={<DevelopersPage />} />
                    <Route path="/developers/:username" element={<ProfilePage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/projects/new" element={<ProjectsPage />} />
                    <Route path="/projects/:id" element={<ProjectDetailPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/events/new" element={<EventsPage />} />
                    <Route path="/events/:id" element={<EventsPage />} />
                    <Route path="/events/:id/instant-connect" element={<InstantConnectPage />} />
                    <Route path="/collections" element={<CollectionsPage />} />
                    <Route path="/collections/:id" element={<CollectionsPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/messages" element={<MessagesPage />} />
                    <Route path="/profile/:username" element={<ProfilePage />} />
                    <Route path="/settings/*" element={<SettingsPage />} />
                    <Route path="/moderation" element={<ModerationPage />} />
                    <Route path="/auth/sign-in" element={<AuthPage />} />
                    <Route path="/auth/sign-up" element={<AuthPage />} />
                    <Route path="/auth/reset-password" element={<AuthPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/privacy" element={<AboutPage />} />
                    <Route path="/terms" element={<AboutPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>

              </div>
            </div>

            {/* Bottom Mobile Navigation */}
            <MobileNav />

          </div>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
