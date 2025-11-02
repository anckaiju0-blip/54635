import { useState, useEffect } from 'react';
import { Archive, Home, Library, LogOut, LayoutDashboard } from 'lucide-react';
import LandingPage from './components/LandingPage';
import RoleSelection from './components/RoleSelection';
import BookDiscover from './components/BookDiscover';
import BookDetails from './components/BookDetails';
import MyLibrary from './components/MyLibrary';
import LibrarianDashboard from './components/LibrarianDashboard';
import { User, Book } from './types';
import { getCurrentUser, setCurrentUser as saveCurrentUser, createUser, initializeStorage } from './utils/dataLayer';

type View = 'landing' | 'role-selection' | 'discover' | 'my-library' | 'librarian';

function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    initializeStorage();
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setCurrentView(user.role === 'librarian' ? 'librarian' : 'discover');
    }
  }, []);

  const handleRoleSelect = async (role: 'user' | 'librarian') => {
    const userData = {
      name: role === 'librarian' ? 'Librarian' : 'Reader',
      email: `${role}_${Date.now()}@pocketarchive.local`,
      role: role,
    };

    const newUser = await createUser(userData);
    if (newUser) {
      setCurrentUser(newUser);
      saveCurrentUser(newUser);
      setCurrentView(role === 'librarian' ? 'librarian' : 'discover');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    saveCurrentUser(null);
    setCurrentView('landing');
  };

  const handleBookUpdate = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (currentView === 'landing') {
    return <LandingPage onGetStarted={() => setCurrentView('role-selection')} />;
  }

  if (currentView === 'role-selection') {
    return <RoleSelection onSelectRole={handleRoleSelect} onBack={() => setCurrentView('landing')} />;
  }

  if (!currentUser) {
    return <LandingPage onGetStarted={() => setCurrentView('role-selection')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Archive className="w-8 h-8 text-amber-600" />
              <span className="text-2xl font-bold text-amber-900">Pocket Archive</span>
            </div>

            <div className="flex items-center space-x-1">
              {currentUser.role === 'user' ? (
                <>
                  <button
                    onClick={() => setCurrentView('discover')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition ${
                      currentView === 'discover'
                        ? 'bg-amber-100 text-amber-700'
                        : 'text-amber-600 hover:bg-amber-50'
                    }`}
                  >
                    <Home className="w-5 h-5" />
                    <span className="hidden sm:inline">Discover</span>
                  </button>
                  <button
                    onClick={() => setCurrentView('my-library')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition ${
                      currentView === 'my-library'
                        ? 'bg-amber-100 text-amber-700'
                        : 'text-amber-600 hover:bg-amber-50'
                    }`}
                  >
                    <Library className="w-5 h-5" />
                    <span className="hidden sm:inline">My Library</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setCurrentView('librarian')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition ${
                    currentView === 'librarian'
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-amber-600 hover:bg-amber-50'
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span className="hidden sm:inline">Dashboard</span>
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-amber-900">{currentUser.name}</p>
                <p className="text-xs text-amber-600 capitalize">{currentUser.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'discover' && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-amber-900 mb-2">Discover Books</h1>
              <p className="text-amber-700">Browse our collection and find your next great read</p>
            </div>
            <BookDiscover key={refreshKey} onBookSelect={setSelectedBook} />
          </div>
        )}

        {currentView === 'my-library' && (
          <MyLibrary key={refreshKey} user={currentUser} onBookSelect={setSelectedBook} />
        )}

        {currentView === 'librarian' && <LibrarianDashboard key={refreshKey} />}
      </main>

      {selectedBook && (
        <BookDetails
          book={selectedBook}
          user={currentUser}
          onClose={() => setSelectedBook(null)}
          onUpdate={() => {
            setSelectedBook(null);
            handleBookUpdate();
          }}
        />
      )}
    </div>
  );
}

export default App;
