import { BookOpen, Coffee, Users, Sparkles, Star, TrendingUp } from 'lucide-react';

interface RoleSelectionProps {
  onSelectRole: (role: 'user' | 'librarian') => void;
  onBack: () => void;
}

export default function RoleSelection({ onSelectRole, onBack }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <nav className="bg-white/70 backdrop-blur-md border-b border-amber-200/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-2 rounded-xl shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
                  Pocket Archive
                </span>
                <p className="text-xs text-amber-600/70 -mt-1">Where stories find homes</p>
              </div>
            </div>
            <button
              onClick={onBack}
              className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </nav>

      <main className="relative flex items-center justify-center px-4 py-16 min-h-[calc(100vh-100px)]">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-12 animate-fadeInUp">
            <div className="inline-flex items-center space-x-2 bg-amber-100/80 backdrop-blur-sm border border-amber-300/50 rounded-full px-5 py-2 mb-6 shadow-md">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-amber-800 text-sm font-medium">Choose your path to discovery</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-4 leading-tight">
              How would you like to
              <span className="block bg-gradient-to-r from-rose-600 via-orange-500 to-amber-600 bg-clip-text text-transparent mt-2">
                explore today?
              </span>
            </h1>

            <p className="text-xl text-amber-800/70 max-w-2xl mx-auto leading-relaxed font-light">
              Whether you're here to discover your next favorite book or manage a thriving collection,
              we've crafted the perfect experience for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <button
              onClick={() => onSelectRole('user')}
              className="group w-full bg-white/80 backdrop-blur-sm border-2 border-amber-200/50 hover:border-amber-400 rounded-3xl shadow-xl overflow-hidden transform hover:scale-102 transition-all hover:shadow-2xl text-left"
            >
              <div className="h-48 bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                <Coffee className="w-24 h-24 text-white relative z-10 animate-float drop-shadow-2xl" />
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-white" />
                  <span>For You</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-amber-900 mb-3 flex items-center justify-between">
                  <span>Reader</span>
                  <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </h3>
                <p className="text-amber-800/70 mb-6 leading-relaxed text-lg">
                  Dive into a world of books. Browse, borrow, and build your personal library.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 text-amber-800/80">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-amber-900">Discover Books</div>
                      <div className="text-sm text-amber-700/60">Search by mood, genre, or author</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 text-amber-800/80">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-amber-900">Instant Borrowing</div>
                      <div className="text-sm text-amber-700/60">One click and start reading</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 text-amber-800/80">
                    <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-amber-900">Track Progress</div>
                      <div className="text-sm text-amber-700/60">Your reading journey, organized</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-amber-100">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 group-hover:from-amber-600 group-hover:to-orange-600 text-white py-3 px-6 rounded-xl text-center font-semibold transition-all shadow-lg shadow-amber-500/30 group-hover:shadow-amber-600/50 cursor-pointer">
                    Start Your Journey
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() => onSelectRole('librarian')}
              className="group w-full bg-white/80 backdrop-blur-sm border-2 border-amber-200/50 hover:border-emerald-400 rounded-3xl shadow-xl overflow-hidden transform hover:scale-102 transition-all hover:shadow-2xl text-left"
            >
              <div className="h-48 bg-gradient-to-br from-teal-400 via-emerald-400 to-green-400 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                <Users className="w-24 h-24 text-white relative z-10 animate-float drop-shadow-2xl" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Manage</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-amber-900 mb-3 flex items-center justify-between">
                  <span>Librarian</span>
                  <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </h3>
                <p className="text-amber-800/70 mb-6 leading-relaxed text-lg">
                  Effortless library management. Focus on building community, not paperwork.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 text-amber-800/80">
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-amber-900">Collection Control</div>
                      <div className="text-sm text-amber-700/60">Add and update books with ease</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 text-amber-800/80">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-amber-900">Quick Processing</div>
                      <div className="text-sm text-amber-700/60">Handle borrows and returns smoothly</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 text-amber-800/80">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <div>
                      <div className="font-semibold text-amber-900">Smart Analytics</div>
                      <div className="text-sm text-amber-700/60">Monitor trends and insights</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-amber-100">
                  <div className="bg-gradient-to-r from-teal-500 to-emerald-500 group-hover:from-teal-600 group-hover:to-emerald-600 text-white py-3 px-6 rounded-xl text-center font-semibold transition-all shadow-lg shadow-teal-500/30 group-hover:shadow-teal-600/50 cursor-pointer">
                    Start Managing
                  </div>
                </div>
              </div>
            </button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-amber-700/60 text-sm">
              No registration required. Choose your role and start exploring immediately.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
