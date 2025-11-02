import { useState, useEffect } from 'react';
import { Plus, Edit2, AlertCircle, Users, BookOpen as BookOpenIcon, TrendingUp } from 'lucide-react';
import { Book, Borrow, User } from '../types';
import { getBooks, saveBooks, getBorrows, saveBorrows, getUsers } from '../utils/dataLayer';

export default function LibrarianDashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'books' | 'borrows' | 'stats'>('books');
  const [showAddBook, setShowAddBook] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const [bookForm, setBookForm] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
    coverImage: 'https://images.pexels.com/photos/1148399/pexels-photo-1148399.jpeg?auto=compress&cs=tinysrgb&w=400',
    totalCopies: 1,
    availableCopies: 1,
    isbn: '',
    publishedYear: new Date().getFullYear(),
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setBooks(getBooks());
    setBorrows(getBorrows());
    setUsers(getUsers());
  };

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    const allBooks = getBooks();
    const newBook: Book = {
      id: Date.now().toString(),
      ...bookForm,
    };
    allBooks.push(newBook);
    saveBooks(allBooks);
    setBooks(allBooks);
    setShowAddBook(false);
    resetForm();
    alert('Book added successfully!');
  };

  const handleUpdateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook) return;

    const allBooks = getBooks();
    const updatedBooks = allBooks.map((b) =>
      b.id === editingBook.id ? { ...editingBook, ...bookForm } : b
    );
    saveBooks(updatedBooks);
    setBooks(updatedBooks);
    setEditingBook(null);
    resetForm();
    alert('Book updated successfully!');
  };

  const startEditing = (book: Book) => {
    setEditingBook(book);
    setBookForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      coverImage: book.coverImage,
      totalCopies: book.totalCopies,
      availableCopies: book.availableCopies,
      isbn: book.isbn,
      publishedYear: book.publishedYear,
    });
  };

  const resetForm = () => {
    setBookForm({
      title: '',
      author: '',
      genre: '',
      description: '',
      coverImage: 'https://images.pexels.com/photos/1148399/pexels-photo-1148399.jpeg?auto=compress&cs=tinysrgb&w=400',
      totalCopies: 1,
      availableCopies: 1,
      isbn: '',
      publishedYear: new Date().getFullYear(),
    });
  };

  const handleProcessReturn = (borrowId: string) => {
    const allBorrows = getBorrows();
    const borrow = allBorrows.find((b) => b.id === borrowId);
    if (!borrow) return;

    const updatedBorrows = allBorrows.map((b) =>
      b.id === borrowId ? { ...b, status: 'returned' as const, returnDate: new Date().toISOString() } : b
    );
    saveBorrows(updatedBorrows);

    const allBooks = getBooks();
    const updatedBooks = allBooks.map((b) =>
      b.id === borrow.bookId ? { ...b, availableCopies: b.availableCopies + 1 } : b
    );
    saveBooks(updatedBooks);

    loadData();
    alert('Return processed successfully!');
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const activeBorrows = borrows.filter((b) => b.status === 'active');
  const overdueBorrows = activeBorrows.filter(
    (b) => new Date(b.dueDate) < new Date()
  );

  const stats = {
    totalBooks: books.reduce((sum, book) => sum + book.totalCopies, 0),
    availableBooks: books.reduce((sum, book) => sum + book.availableCopies, 0),
    totalUsers: users.length,
    activeBorrows: activeBorrows.length,
    overdueBorrows: overdueBorrows.length,
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Librarian Dashboard</h2>
        <p className="text-amber-50">Manage books, borrows, and library operations</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-amber-700 text-sm">Total Books</span>
            <BookOpenIcon className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-amber-900">{stats.totalBooks}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-700 text-sm">Available</span>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-900">{stats.availableBooks}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-700 text-sm">Users</span>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-900">{stats.totalUsers}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-amber-700 text-sm">Active Borrows</span>
            <BookOpenIcon className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-amber-900">{stats.activeBorrows}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-red-700 text-sm">Overdue</span>
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-900">{stats.overdueBorrows}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md">
        <div className="flex border-b border-amber-100">
          <button
            onClick={() => setActiveTab('books')}
            className={`flex-1 py-4 px-6 font-medium transition ${
              activeTab === 'books'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-amber-400 hover:text-amber-600'
            }`}
          >
            Manage Books
          </button>
          <button
            onClick={() => setActiveTab('borrows')}
            className={`flex-1 py-4 px-6 font-medium transition ${
              activeTab === 'borrows'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-amber-400 hover:text-amber-600'
            }`}
          >
            Active Borrows
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'books' && (
            <div>
              <button
                onClick={() => {
                  setShowAddBook(true);
                  setEditingBook(null);
                  resetForm();
                }}
                className="mb-6 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Book</span>
              </button>

              {(showAddBook || editingBook) && (
                <div className="mb-6 bg-amber-50 rounded-lg p-6 border border-amber-200">
                  <h3 className="text-xl font-bold text-amber-900 mb-4">
                    {editingBook ? 'Edit Book' : 'Add New Book'}
                  </h3>
                  <form onSubmit={editingBook ? handleUpdateBook : handleAddBook} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-amber-900 mb-1">Title</label>
                        <input
                          type="text"
                          required
                          value={bookForm.title}
                          onChange={(e) => setBookForm({ ...bookForm, title: e.target.value })}
                          className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-amber-900 mb-1">Author</label>
                        <input
                          type="text"
                          required
                          value={bookForm.author}
                          onChange={(e) => setBookForm({ ...bookForm, author: e.target.value })}
                          className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-amber-900 mb-1">Genre</label>
                        <input
                          type="text"
                          required
                          value={bookForm.genre}
                          onChange={(e) => setBookForm({ ...bookForm, genre: e.target.value })}
                          className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-amber-900 mb-1">ISBN</label>
                        <input
                          type="text"
                          required
                          value={bookForm.isbn}
                          onChange={(e) => setBookForm({ ...bookForm, isbn: e.target.value })}
                          className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-amber-900 mb-1">Published Year</label>
                        <input
                          type="number"
                          required
                          value={bookForm.publishedYear}
                          onChange={(e) => setBookForm({ ...bookForm, publishedYear: parseInt(e.target.value) })}
                          className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-amber-900 mb-1">Total Copies</label>
                        <input
                          type="number"
                          required
                          min="1"
                          value={bookForm.totalCopies}
                          onChange={(e) => setBookForm({ ...bookForm, totalCopies: parseInt(e.target.value) })}
                          className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-1">Description</label>
                      <textarea
                        required
                        value={bookForm.description}
                        onChange={(e) => setBookForm({ ...bookForm, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition"
                      >
                        {editingBook ? 'Update Book' : 'Add Book'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddBook(false);
                          setEditingBook(null);
                          resetForm();
                        }}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-3">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="flex items-center justify-between p-4 border border-amber-100 rounded-lg hover:shadow-md transition"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-semibold text-amber-900">{book.title}</h4>
                        <p className="text-sm text-amber-600">{book.author}</p>
                        <p className="text-xs text-amber-500">
                          {book.availableCopies}/{book.totalCopies} available
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => startEditing(book)}
                      className="text-amber-600 hover:text-amber-700 p-2 hover:bg-amber-50 rounded-lg transition"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'borrows' && (
            <div className="space-y-3">
              {activeBorrows.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpenIcon className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                  <p className="text-amber-700 text-lg">No active borrows</p>
                </div>
              ) : (
                activeBorrows.map((borrow) => {
                  const book = books.find((b) => b.id === borrow.bookId);
                  const user = users.find((u) => u.id === borrow.userId);
                  const isOverdue = new Date(borrow.dueDate) < new Date();

                  return (
                    <div
                      key={borrow.id}
                      className={`flex items-center justify-between p-4 border rounded-lg ${
                        isOverdue ? 'border-red-300 bg-red-50' : 'border-amber-100'
                      }`}
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-amber-900">{book?.title}</h4>
                        <p className="text-sm text-amber-600">Borrowed by: {user?.name}</p>
                        <p className="text-xs text-amber-500">
                          Due: {new Date(borrow.dueDate).toLocaleDateString()}
                          {isOverdue && <span className="text-red-600 ml-2 font-medium">OVERDUE</span>}
                        </p>
                      </div>
                      <button
                        onClick={() => handleProcessReturn(borrow.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                      >
                        Process Return
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
