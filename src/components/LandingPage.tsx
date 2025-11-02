import { BookOpen, Heart, Coffee, Star, TrendingUp, Users } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <nav className="bg-white/70 backdrop-blur-md border-b border-amber-200/50 sticky top-0 z-50 relative">
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
              onClick={onGetStarted}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all transform hover:scale-105 hover:shadow-xl shadow-lg shadow-amber-500/30"
            >
              Begin Your Journey
            </button>
          </div>
        </div>
      </nav>

      <main className="relative">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center animate-fadeInUp">
            <div className="inline-flex items-center space-x-2 bg-amber-100/80 backdrop-blur-sm border border-amber-300/50 rounded-full px-5 py-2 mb-8 shadow-md">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span className="text-amber-800 text-sm font-medium">Built with love for book lovers</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-amber-900 mb-6 leading-tight">
              Every book has
              <span className="block bg-gradient-to-r from-rose-600 via-orange-500 to-amber-600 bg-clip-text text-transparent mt-2">
                a story to share
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-amber-800/80 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
              Step into a world where discovering your next favorite book feels like finding a hidden treasure.
              Welcome to your cozy corner of the digital library.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button
                onClick={onGetStarted}
                className="group bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-10 py-4 rounded-2xl text-lg font-semibold transition-all transform hover:scale-105 shadow-2xl shadow-amber-500/40 hover:shadow-amber-600/50 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Start Exploring</span>
                  <BookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </button>

              <div className="flex items-center space-x-6 text-amber-800/70 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>Free to use</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Always growing</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center mb-12">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/50 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-amber-700 mb-1">1,000+</div>
                <div className="text-sm text-amber-600/70">Books Available</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-200/50 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-orange-700 mb-1">500+</div>
                <div className="text-sm text-orange-600/70">Happy Readers</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-rose-200/50 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-rose-700 mb-1">98%</div>
                <div className="text-sm text-rose-600/70">Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="mt-24 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="group bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-3xl shadow-xl overflow-hidden transform hover:scale-102 transition-all hover:shadow-2xl">
              <div className="h-56 bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                <Coffee className="w-28 h-28 text-white relative z-10 animate-float drop-shadow-2xl" />
                <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                  For Readers
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-amber-900 mb-3 flex items-center space-x-2">
                  <span>Your Reading Haven</span>
                </h3>
                <p className="text-amber-800/70 mb-6 leading-relaxed">
                  Curl up with your next great read. Browse thousands of titles, borrow instantly,
                  and track your literary journey in your personal library space.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3 text-amber-800/80">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    </div>
                    <div>
                      <div className="font-medium text-amber-900">Smart Discovery</div>
                      <div className="text-sm text-amber-700/60">Find books by mood, genre, or author</div>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3 text-amber-800/80">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    </div>
                    <div>
                      <div className="font-medium text-amber-900">Instant Borrowing</div>
                      <div className="text-sm text-amber-700/60">One click and start reading</div>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3 text-amber-800/80">
                    <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                    </div>
                    <div>
                      <div className="font-medium text-amber-900">Personal Dashboard</div>
                      <div className="text-sm text-amber-700/60">Track your reading progress</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-3xl shadow-xl overflow-hidden transform hover:scale-102 transition-all hover:shadow-2xl">
              <div className="h-56 bg-gradient-to-br from-teal-400 via-emerald-400 to-green-400 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                <Users className="w-28 h-28 text-white relative z-10 animate-float drop-shadow-2xl" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
                  For Librarians
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-amber-900 mb-3 flex items-center space-x-2">
                  <span>Effortless Management</span>
                </h3>
                <p className="text-amber-800/70 mb-6 leading-relaxed">
                  Spend less time on admin work and more time connecting with your community.
                  Streamlined tools for modern library management.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3 text-amber-800/80">
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                    </div>
                    <div>
                      <div className="font-medium text-amber-900">Collection Management</div>
                      <div className="text-sm text-amber-700/60">Add and update books with ease</div>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3 text-amber-800/80">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    </div>
                    <div>
                      <div className="font-medium text-amber-900">Quick Processing</div>
                      <div className="text-sm text-amber-700/60">Handle borrows and returns smoothly</div>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3 text-amber-800/80">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <div>
                      <div className="font-medium text-amber-900">Insightful Analytics</div>
                      <div className="text-sm text-amber-700/60">Monitor trends and statistics</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-amber-100/50 to-orange-100/50 backdrop-blur-sm border-y border-amber-200/50 py-20 mt-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
                What makes us special?
              </h2>
              <p className="text-lg text-amber-800/70 max-w-2xl mx-auto">
                We believe reading should be a joy, not a chore. Everything we build starts with that simple truth.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center group">
                <div className="bg-white/60 backdrop-blur-sm border border-amber-200/50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                  <Heart className="w-12 h-12 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Designed with Empathy</h3>
                <p className="text-amber-800/70 leading-relaxed">
                  Every feature is crafted thinking about real readers and real needs.
                  We understand because we're readers too.
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-white/60 backdrop-blur-sm border border-orange-200/50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                  <Coffee className="w-12 h-12 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Simple & Cozy</h3>
                <p className="text-amber-800/70 leading-relaxed">
                  Like your favorite reading nook, our interface is warm, inviting,
                  and makes you want to stay a while.
                </p>
              </div>

              <div className="text-center group">
                <div className="bg-white/60 backdrop-blur-sm border border-rose-200/50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
                  <Star className="w-12 h-12 text-amber-500 fill-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Community Focused</h3>
                <p className="text-amber-800/70 leading-relaxed">
                  Libraries bring people together. We're building more than software —
                  we're fostering connections.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
            <div className="relative px-8 md:px-16 py-16 text-center text-white">
              <BookOpen className="w-16 h-16 mx-auto mb-6 animate-float" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to discover your next favorite book?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Join our community of book lovers and start your reading journey today.
                No registration required to browse.
              </p>
              <button
                onClick={onGetStarted}
                className="bg-white text-amber-600 hover:bg-amber-50 px-10 py-4 rounded-2xl text-lg font-semibold transition-all transform hover:scale-105 shadow-2xl hover:shadow-white/50"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-br from-amber-900/5 to-orange-900/5 border-t border-amber-200/30 py-12 mt-20 relative backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-2 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-amber-900">Pocket Archive</span>
            </div>
            <p className="text-amber-700/60 mb-6 max-w-md">
              Connecting readers with stories, one book at a time.
              Making libraries warm, accessible, and delightful for everyone.
            </p>
            <div className="flex items-center space-x-2 text-sm text-amber-600/50">
              <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
              <span>Made with love for book lovers everywhere</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
