import { useState, useEffect } from 'react';
import { X, Calendar, BookOpen, User as UserIcon } from 'lucide-react';
import { Book, User, Borrow, Reservation } from '../types';
import { getBooks, saveBooks, getBorrows, saveBorrows, getReservations, saveReservations } from '../utils/dataLayer';

interface BookDetailsProps {
  book: Book;
  user: User;
  onClose: () => void;
  onUpdate: () => void;
}

export default function BookDetails({ book, user, onClose, onUpdate }: BookDetailsProps) {
  const [currentBook, setCurrentBook] = useState(book);
  const [userBorrow, setUserBorrow] = useState<Borrow | null>(null);
  const [userReservation, setUserReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    const borrows = getBorrows();
    const activeBorrow = borrows.find(
      (b) => b.bookId === book.id && b.userId === user.id && b.status === 'active'
    );
    setUserBorrow(activeBorrow || null);

    const reservations = getReservations();
    const activeReservation = reservations.find(
      (r) => r.bookId === book.id && r.userId === user.id && r.status === 'pending'
    );
    setUserReservation(activeReservation || null);
  }, [book.id, user.id]);

  const handleBorrow = () => {
    if (currentBook.availableCopies === 0) {
      alert('No copies available. Please reserve the book.');
      return;
    }

    const borrows = getBorrows();
    const newBorrow: Borrow = {
      id: Date.now().toString(),
      bookId: currentBook.id,
      userId: user.id,
      borrowDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
    };
    borrows.push(newBorrow);
    saveBorrows(borrows);

    const books = getBooks();
    const updatedBooks = books.map((b) =>
      b.id === currentBook.id ? { ...b, availableCopies: b.availableCopies - 1 } : b
    );
    saveBooks(updatedBooks);

    const updatedBook = updatedBooks.find((b) => b.id === currentBook.id)!;
    setCurrentBook(updatedBook);
    setUserBorrow(newBorrow);
    onUpdate();
    alert('Book borrowed successfully!');
  };

  const handleReserve = () => {
    const reservations = getReservations();
    const newReservation: Reservation = {
      id: Date.now().toString(),
      bookId: currentBook.id,
      userId: user.id,
      reservationDate: new Date().toISOString(),
      status: 'pending',
    };
    reservations.push(newReservation);
    saveReservations(reservations);
    setUserReservation(newReservation);
    onUpdate();
    alert('Book reserved successfully! You will be notified when it becomes available.');
  };

  const handleReturn = () => {
    const borrows = getBorrows();
    const updatedBorrows = borrows.map((b) =>
      b.id === userBorrow?.id ? { ...b, status: 'returned' as const, returnDate: new Date().toISOString() } : b
    );
    saveBorrows(updatedBorrows);

    const books = getBooks();
    const updatedBooks = books.map((b) =>
      b.id === currentBook.id ? { ...b, availableCopies: b.availableCopies + 1 } : b
    );
    saveBooks(updatedBooks);

    const updatedBook = updatedBooks.find((b) => b.id === currentBook.id)!;
    setCurrentBook(updatedBook);
    setUserBorrow(null);
    onUpdate();
    alert('Book returned successfully!');
  };

  const handleCancelReservation = () => {
    const reservations = getReservations();
    const updatedReservations = reservations.map((r) =>
      r.id === userReservation?.id ? { ...r, status: 'cancelled' as const } : r
    );
    saveReservations(updatedReservations);
    setUserReservation(null);
    onUpdate();
    alert('Reservation cancelled.');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-amber-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-amber-900">Book Details</h2>
          <button
            onClick={onClose}
            className="text-amber-600 hover:text-amber-700 p-2 hover:bg-amber-50 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="rounded-xl overflow-hidden shadow-lg mb-4 bg-gradient-to-br from-amber-100 to-orange-100">
                <img
                  src={currentBook.coverImage}
                  alt={currentBook.title}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-amber-700">ISBN:</span>
                  <span className="font-mono text-amber-900">{currentBook.isbn}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-amber-700">Published:</span>
                  <span className="text-amber-900">{currentBook.publishedYear}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-amber-700">Total Copies:</span>
                  <span className="text-amber-900">{currentBook.totalCopies}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-amber-700">Available:</span>
                  <span
                    className={`font-semibold ${
                      currentBook.availableCopies > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {currentBook.availableCopies}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-amber-900 mb-2">{currentBook.title}</h1>
              <p className="text-xl text-amber-600 mb-4 flex items-center">
                <UserIcon className="w-5 h-5 mr-2" />
                {currentBook.author}
              </p>
              <span className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                {currentBook.genre}
              </span>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-amber-900 mb-2">Description</h3>
                <p className="text-amber-800 leading-relaxed">{currentBook.description}</p>
              </div>

              {userBorrow ? (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center text-amber-700 mb-2">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Currently Borrowed</span>
                  </div>
                  <p className="text-sm text-amber-600 mb-3">
                    Due: {new Date(userBorrow.dueDate).toLocaleDateString()}
                  </p>
                  <button
                    onClick={handleReturn}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg font-medium transition"
                  >
                    Return Book
                  </button>
                </div>
              ) : userReservation ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center text-blue-700 mb-2">
                    <BookOpen className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Reserved</span>
                  </div>
                  <p className="text-sm text-blue-600 mb-3">
                    Reserved on: {new Date(userReservation.reservationDate).toLocaleDateString()}
                  </p>
                  <button
                    onClick={handleCancelReservation}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition"
                  >
                    Cancel Reservation
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentBook.availableCopies > 0 ? (
                    <button
                      onClick={handleBorrow}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg font-semibold transition flex items-center justify-center space-x-2"
                    >
                      <BookOpen className="w-5 h-5" />
                      <span>Borrow Book</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleReserve}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition"
                    >
                      Reserve Book
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
