import { useState } from 'react';
import { BookOpen, LogIn, UserPlus } from 'lucide-react';
import { User } from '../types';
import { getUsers, saveUsers, setCurrentUser } from '../utils/dataLayer';

interface AuthProps {
  onAuthSuccess: (user: User) => void;
  onBack: () => void;
}

export default function Auth({ onAuthSuccess, onBack }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' as 'user' | 'librarian',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = getUsers();

    if (isLogin) {
      const user = users.find(
        (u) => u.email === formData.email
      );
      if (user) {
        setCurrentUser(user);
        onAuthSuccess(user);
      } else {
        alert('User not found. Please sign up first.');
      }
    } else {
      const existingUser = users.find((u) => u.email === formData.email);
      if (existingUser) {
        alert('User already exists. Please login.');
        return;
      }

      const newUser: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };

      users.push(newUser);
      saveUsers(users);
      setCurrentUser(newUser);
      onAuthSuccess(newUser);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="text-amber-600 hover:text-amber-700 mb-4 inline-flex items-center"
          >
            ← Back to Home
          </button>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="w-10 h-10 text-amber-600" />
            <span className="text-3xl font-bold text-amber-900">LocalLibrary</span>
          </div>
          <h2 className="text-2xl font-bold text-amber-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-amber-700 mt-2">
            {isLogin ? 'Sign in to continue' : 'Join our library community'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-amber-900 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required={!isLogin}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-amber-900 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                placeholder="••••••••"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  I am a:
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={formData.role === 'user'}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as 'user' | 'librarian' })}
                      className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-amber-800">Reader</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="librarian"
                      checked={formData.role === 'librarian'}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as 'user' | 'librarian' })}
                      className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-amber-800">Librarian</span>
                  </label>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              {isLogin ? (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
