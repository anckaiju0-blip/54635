import { Book, User, Borrow, Reservation } from '../types';

const BOOKS_KEY = 'library_books';
const USERS_KEY = 'library_users';
const BORROWS_KEY = 'library_borrows';
const RESERVATIONS_KEY = 'library_reservations';
const CURRENT_USER_KEY = 'library_current_user';

const initialBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Classic',
    description: 'A classic novel set in the Jazz Age that explores themes of wealth, love, and the American Dream.',
    coverImage: 'https://images.pexels.com/photos/1148399/pexels-photo-1148399.jpeg?auto=compress&cs=tinysrgb&w=400',
    totalCopies: 3,
    availableCopies: 2,
    isbn: '978-0743273565',
    publishedYear: 1925,
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Classic',
    description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
    coverImage: 'https://images.pexels.com/photos/3358707/pexels-photo-3358707.jpeg?auto=compress&cs=tinysrgb&w=400',
    totalCopies: 2,
    availableCopies: 1,
    isbn: '978-0061120084',
    publishedYear: 1960,
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    genre: 'Science Fiction',
    description: 'A dystopian social science fiction novel and cautionary tale about totalitarianism.',
    coverImage: 'https://images.pexels.com/photos/4132938/pexels-photo-4132938.jpeg?auto=compress&cs=tinysrgb&w=400',
    totalCopies: 3,
    availableCopies: 1,
    isbn: '978-0451524935',
    publishedYear: 1949,
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    description: 'A romantic novel of manners that satirizes the British landed gentry at the end of the 18th century.',
    coverImage: 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=400',
    totalCopies: 2,
    availableCopies: 2,
    isbn: '978-0141439518',
    publishedYear: 1813,
  },
  {
    id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Classic',
    description: 'A story about teenage rebellion and alienation narrated by Holden Caulfield.',
    coverImage: 'https://images.pexels.com/photos/4057663/pexels-photo-4057663.jpeg?auto=compress&cs=tinysrgb&w=400',
    totalCopies: 1,
    availableCopies: 1,
    isbn: '978-0316769174',
    publishedYear: 1951,
  },
  {
    id: '6',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    description: 'A fantasy novel about the quest of home-loving Bilbo Baggins to win a share of treasure guarded by a dragon.',
    coverImage: 'https://images.pexels.com/photos/3358707/pexels-photo-3358707.jpeg?auto=compress&cs=tinysrgb&w=400',
    totalCopies: 2,
    availableCopies: 2,
    isbn: '978-0547928227',
    publishedYear: 1937,
  },
  {
    id: '7',
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    genre: 'Fantasy',
    description: 'The first novel in the Harry Potter series about a young wizard\'s first year at Hogwarts.',
    coverImage: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=400',
    totalCopies: 3,
    availableCopies: 2,
    isbn: '978-0439708180',
    publishedYear: 1997,
  },
  {
    id: '8',
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    genre: 'Mystery',
    description: 'A mystery thriller novel that follows symbologist Robert Langdon as he investigates a murder in Paris.',
    coverImage: 'https://images.pexels.com/photos/4132938/pexels-photo-4132938.jpeg?auto=compress&cs=tinysrgb&w=400',
    totalCopies: 2,
    availableCopies: 2,
    isbn: '978-0307474278',
    publishedYear: 2003,
  },
  {
    id: '9',
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Science Fiction',
    description: 'An epic science fiction novel set in the distant future amidst the intrigue and politics of galactic empire.',
    coverImage: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=400',
    totalCopies: 2,
    availableCopies: 1,
    isbn: '978-0441172719',
    publishedYear: 1965,
  },
];

export const getBooks = async (): Promise<Book[]> => {
  const stored = localStorage.getItem(BOOKS_KEY);
  return stored ? JSON.parse(stored) : initialBooks;
};

export const createBook = async (book: Omit<Book, 'id'>): Promise<Book | null> => {
  try {
    const books = await getBooks();
    const newBook: Book = {
      ...book,
      id: Date.now().toString(),
    };
    books.push(newBook);
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    return newBook;
  } catch (error) {
    console.error('Error creating book:', error);
    return null;
  }
};

export const updateBook = async (id: string, updates: Partial<Book>): Promise<Book | null> => {
  try {
    const books = await getBooks();
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return null;

    books[index] = { ...books[index], ...updates, id };
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    return books[index];
  } catch (error) {
    console.error('Error updating book:', error);
    return null;
  }
};

export const getUsers = async (): Promise<User[]> => {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User | null> => {
  try {
    const users = await getUsers();
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

export const getBorrows = async (): Promise<Borrow[]> => {
  const stored = localStorage.getItem(BORROWS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const createBorrow = async (borrow: Omit<Borrow, 'id'>): Promise<Borrow | null> => {
  try {
    const borrows = await getBorrows();
    const newBorrow: Borrow = {
      ...borrow,
      id: Date.now().toString(),
    };
    borrows.push(newBorrow);
    localStorage.setItem(BORROWS_KEY, JSON.stringify(borrows));

    const books = await getBooks();
    const bookIndex = books.findIndex(b => b.id === borrow.bookId);
    if (bookIndex !== -1) {
      books[bookIndex].availableCopies = Math.max(0, books[bookIndex].availableCopies - 1);
      localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    }

    return newBorrow;
  } catch (error) {
    console.error('Error creating borrow:', error);
    return null;
  }
};

export const updateBorrow = async (id: string, updates: Partial<Borrow>): Promise<Borrow | null> => {
  try {
    const borrows = await getBorrows();
    const index = borrows.findIndex(b => b.id === id);
    if (index === -1) return null;

    const oldBorrow = borrows[index];
    borrows[index] = { ...borrows[index], ...updates, id };

    if (updates.status === 'returned' && oldBorrow.status === 'active') {
      const books = await getBooks();
      const bookIndex = books.findIndex(b => b.id === oldBorrow.bookId);
      if (bookIndex !== -1) {
        books[bookIndex].availableCopies += 1;
        localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
      }
    }

    localStorage.setItem(BORROWS_KEY, JSON.stringify(borrows));
    return borrows[index];
  } catch (error) {
    console.error('Error updating borrow:', error);
    return null;
  }
};

export const getReservations = async (): Promise<Reservation[]> => {
  const stored = localStorage.getItem(RESERVATIONS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const createReservation = async (reservation: Omit<Reservation, 'id'>): Promise<Reservation | null> => {
  try {
    const reservations = await getReservations();
    const newReservation: Reservation = {
      ...reservation,
      id: Date.now().toString(),
    };
    reservations.push(newReservation);
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations));
    return newReservation;
  } catch (error) {
    console.error('Error creating reservation:', error);
    return null;
  }
};

export const updateReservation = async (id: string, updates: Partial<Reservation>): Promise<Reservation | null> => {
  try {
    const reservations = await getReservations();
    const index = reservations.findIndex(r => r.id === id);
    if (index === -1) return null;

    reservations[index] = { ...reservations[index], ...updates, id };
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations));
    return reservations[index];
  } catch (error) {
    console.error('Error updating reservation:', error);
    return null;
  }
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const initializeStorage = () => {
  if (!localStorage.getItem(BOOKS_KEY)) {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(initialBooks));
  }
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(BORROWS_KEY)) {
    localStorage.setItem(BORROWS_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(RESERVATIONS_KEY)) {
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify([]));
  }
};

export const saveBooks = async (books: Book[]) => {
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
};

export const saveUsers = async (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const saveBorrows = async (borrows: Borrow[]) => {
  localStorage.setItem(BORROWS_KEY, JSON.stringify(borrows));
};

export const saveReservations = async (reservations: Reservation[]) => {
  localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations));
};
