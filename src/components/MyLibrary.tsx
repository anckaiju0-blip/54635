import { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, AlertCircle } from 'lucide-react';
import { User, Borrow, Book, Reservation } from '../types';
import { getBorrows, getBooks, getReservations } from '../utils/dataLayer';

interface MyLibraryProps {
  user: User;
  onBookSelect: (book: Book) => void;
}

export default function MyLibrary({ user, onBookSelect }: MyLibraryProps) {
  const [activeBorrows, setActiveBorrows] = useState<(Borrow & { book: Book })[]>([]);
  const [borrowHistory, setBorrowHistory] = useState<(Borrow & { book: Book })[]>([]);
  const [reservations, setReservations] = useState<(Reservation & { book: Book })[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'history' | 'reservations'>('active');

  useEffect(() => {
    loadUserData();
  }, [user.id]);

  const loadUserData = () => {
    const allBorrows = getBorrows();
    const allBooks = getBooks();
    const allReservations = getReservations();

    const userBorrows = allBorrows.filter((b) => b.userId === user.id);

    const active = userBorrows
      .filter((b) => b.status === 'active')
      .map((borrow) => {
        const book = allBooks.find((b) => b.id === borrow.bookId)!;
        return { ...borrow, book };
      });

    const history = userBorrows
      .filter((b) => b.status === 'returned')
      .map((borrow) => {
        const book = allBooks.find((b) => b.id === borrow.bookId)!;
        return { ...borrow, book };
      })
      .sort((a, b) => new Date(b.returnDate!).getTime() - new Date(a.returnDate!).getTime());

    const userReservations = allReservations
      .filter((r) => r.userId === user.id && r.status === 'pending')
      .map((reservation) => {
        const book = allBooks.find((b) => b.id === reservation.bookId)!;
        return { ...reservation, book };
      });

    setActiveBorrows(active);
    setBorrowHistory(history);
    setReservations(userReservations);
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const getDaysUntilDue = (dueDate: string) => {
    const days = Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">My Library</h2>
        <p className="text-amber-50">Manage your borrowed books and reading list</p>
      </div>

      <div className="bg-white rounded-xl shadow-md">
        <div className="flex border-b border-amber-100">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-4 px-6 font-medium transition ${
              activeTab === 'active'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-amber-400 hover:text-amber-600'
            }`}
          >
            Active Borrows ({activeBorrows.length})
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`flex-1 py-4 px-6 font-medium transition ${
              activeTab === 'reservations'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-amber-400 hover:text-amber-600'
            }`}
          >
            Reservations ({reservations.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-4 px-6 font-medium transition ${
              activeTab === 'history'
                ? 'text-amber-600 border-b-2 border-amber-600'
                : 'text-amber-400 hover:text-amber-600'
            }`}
          >
            History ({borrowHistory.length})
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'active' && (
            <div className="space-y-4">
              {activeBorrows.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                  <p className="text-amber-700 text-lg">No active borrows</p>
                  <p className="text-amber-500 text-sm">Browse our collection to borrow books</p>
                </div>
              ) : (
                activeBorrows.map((borrow) => {
                  const daysLeft = getDaysUntilDue(borrow.dueDate);
                  const overdue = isOverdue(borrow.dueDate);

                  return (
                    <div
                      key={borrow.id}
                      onClick={() => onBookSelect(borrow.book)}
                      className="flex items-start space-x-4 p-4 border border-amber-100 rounded-lg hover:shadow-md transition cursor-pointer"
                    >
                      <img
                        src={borrow.book.coverImage}
                        alt={borrow.book.title}
                        className="w-20 h-28 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-amber-900 text-lg mb-1">
                          {borrow.book.title}
                        </h3>
                        <p className="text-amber-600 text-sm mb-2">{borrow.book.author}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center text-amber-700">
                            <Calendar className="w-4 h-4 mr-1" />
                            Borrowed: {new Date(borrow.borrowDate).toLocaleDateString()}
                          </div>
                          <div
                            className={`flex items-center ${
                              overdue ? 'text-red-600' : daysLeft <= 3 ? 'text-orange-600' : 'text-green-600'
                            }`}
                          >
                            {overdue ? (
                              <AlertCircle className="w-4 h-4 mr-1" />
                            ) : (
                              <Clock className="w-4 h-4 mr-1" />
                            )}
                            {overdue
                              ? `Overdue by ${Math.abs(daysLeft)} days`
                              : `Due in ${daysLeft} days`}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {activeTab === 'reservations' && (
            <div className="space-y-4">
              {reservations.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                  <p className="text-amber-700 text-lg">No active reservations</p>
                  <p className="text-amber-500 text-sm">Reserve books that are currently unavailable</p>
                </div>
              ) : (
                reservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    onClick={() => onBookSelect(reservation.book)}
                    className="flex items-start space-x-4 p-4 border border-amber-100 rounded-lg hover:shadow-md transition cursor-pointer"
                  >
                    <img
                      src={reservation.book.coverImage}
                      alt={reservation.book.title}
                      className="w-20 h-28 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-amber-900 text-lg mb-1">
                        {reservation.book.title}
                      </h3>
                      <p className="text-amber-600 text-sm mb-2">{reservation.book.author}</p>
                      <div className="flex items-center text-sm text-amber-700">
                        <Calendar className="w-4 h-4 mr-1" />
                        Reserved: {new Date(reservation.reservationDate).toLocaleDateString()}
                      </div>
                      <div className="mt-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Pending
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {borrowHistory.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                  <p className="text-amber-700 text-lg">No borrow history</p>
                  <p className="text-amber-500 text-sm">Your returned books will appear here</p>
                </div>
              ) : (
                borrowHistory.map((borrow) => (
                  <div
                    key={borrow.id}
                    onClick={() => onBookSelect(borrow.book)}
                    className="flex items-start space-x-4 p-4 border border-amber-100 rounded-lg hover:shadow-md transition cursor-pointer opacity-80"
                  >
                    <img
                      src={borrow.book.coverImage}
                      alt={borrow.book.title}
                      className="w-20 h-28 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-amber-900 text-lg mb-1">
                        {borrow.book.title}
                      </h3>
                      <p className="text-amber-600 text-sm mb-2">{borrow.book.author}</p>
                      <div className="flex items-center space-x-4 text-sm text-amber-700">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Borrowed: {new Date(borrow.borrowDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Returned: {new Date(borrow.returnDate!).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
