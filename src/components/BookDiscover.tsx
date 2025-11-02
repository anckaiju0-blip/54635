import { useState, useEffect } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import { Book } from '../types';
import { getBooks } from '../utils/dataLayer';

interface BookDiscoverProps {
  onBookSelect: (book: Book) => void;
}

export default function BookDiscover({ onBookSelect }: BookDiscoverProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      const allBooks = await getBooks();
      setBooks(allBooks);
      setFilteredBooks(allBooks);
    };
    loadBooks();
  }, []);

  useEffect(() => {
    let filtered = books;

    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre !== 'all') {
      filtered = filtered.filter((book) => book.genre === selectedGenre);
    }

    setFilteredBooks(filtered);
  }, [searchTerm, selectedGenre, books]);

  const genres = ['all', ...Array.from(new Set(books.map((book) => book.genre)))];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="pl-10 pr-8 py-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none bg-white appearance-none cursor-pointer min-w-[160px]"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <BookOpen className="w-16 h-16 text-amber-300 mx-auto mb-4" />
          <p className="text-amber-700 text-lg">No books found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => onBookSelect(book)}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-all hover:shadow-xl"
            >
              <div className="h-48 overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-amber-900 text-lg mb-1 line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-amber-600 text-sm mb-2">{book.author}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
                    {book.genre}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      book.availableCopies > 0
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {book.availableCopies > 0
                      ? `${book.availableCopies} available`
                      : 'Not available'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
