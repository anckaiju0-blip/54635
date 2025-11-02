import { Archive, Users, Search, BookOpen, Sparkles, Shield, Zap } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Archive className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">Pocket Archive</span>
            </div>
            <button
              onClick={onGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="relative">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">Modern Library Management</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Your Digital Library,
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Reimagined</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover, borrow, and manage books effortlessly. A sleek, modern experience for readers and librarians alike.
            </p>
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-2xl shadow-blue-500/30"
            >
              Start Exploring
            </button>
          </div>

          <div className="mt-20 grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all hover:border-blue-500 hover:shadow-blue-500/20">
              <div className="h-48 bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <Users className="w-24 h-24 text-white relative z-10" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3">For Readers</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Browse our collection, borrow books digitally, and manage your reading list all in one place.
                </p>
                <ul className="space-y-3 text-slate-400">
                  <li className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    <span>Search by title, author, or genre</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    <span>Reserve books instantly</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    <span>Track due dates easily</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all hover:border-emerald-500 hover:shadow-emerald-500/20">
              <div className="h-48 bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <BookOpen className="w-24 h-24 text-white relative z-10" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3">For Librarians</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Manage your library's collection, track borrows, and serve your community more efficiently.
                </p>
                <ul className="space-y-3 text-slate-400">
                  <li className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    <span>Add and update book inventory</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    <span>Process borrows and returns</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                    <span>Monitor overdue books</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-800/50 backdrop-blur-sm border-y border-slate-700 py-20 mt-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-white mb-4">
              Why Choose Pocket Archive?
            </h2>
            <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
              A modern, intuitive platform designed for the way you read and manage books today.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition transform">
                  <Search className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Easy Discovery</h3>
                <p className="text-slate-400 leading-relaxed">
                  Find your next favorite book with powerful search and filtering options.
                </p>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition transform">
                  <Zap className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
                <p className="text-slate-400 leading-relaxed">
                  Instant borrowing, reservations, and seamless navigation throughout the platform.
                </p>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition transform">
                  <Shield className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Secure & Reliable</h3>
                <p className="text-slate-400 leading-relaxed">
                  Your data is safe with secure storage and reliable tracking systems.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-8 mt-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Archive className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-semibold text-white">Pocket Archive</span>
          </div>
          <p className="text-slate-500">
            Making libraries accessible and modern for everyone
          </p>
        </div>
      </footer>
    </div>
  );
}
