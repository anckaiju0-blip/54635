import { Book, User, Borrow, Reservation } from '../types';
import { supabase } from '../lib/supabase';

export const getBooks = async (): Promise<Book[]> => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('title');

  if (error) {
    console.error('Error fetching books:', error);
    return [];
  }

  return (data || []).map(book => ({
    id: book.id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    description: book.description,
    coverImage: book.cover_image,
    totalCopies: book.total_copies,
    availableCopies: book.available_copies,
    isbn: book.isbn,
    publishedYear: book.published_year,
  }));
};

export const createBook = async (book: Omit<Book, 'id'>): Promise<Book | null> => {
  const { data, error } = await supabase
    .from('books')
    .insert([{
      title: book.title,
      author: book.author,
      genre: book.genre,
      description: book.description,
      cover_image: book.coverImage,
      total_copies: book.totalCopies,
      available_copies: book.availableCopies,
      isbn: book.isbn,
      published_year: book.publishedYear,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating book:', error);
    return null;
  }

  return data ? {
    id: data.id,
    title: data.title,
    author: data.author,
    genre: data.genre,
    description: data.description,
    coverImage: data.cover_image,
    totalCopies: data.total_copies,
    availableCopies: data.available_copies,
    isbn: data.isbn,
    publishedYear: data.published_year,
  } : null;
};

export const updateBook = async (id: string, updates: Partial<Book>): Promise<Book | null> => {
  const dbUpdates: Record<string, any> = {};
  if (updates.title !== undefined) dbUpdates.title = updates.title;
  if (updates.author !== undefined) dbUpdates.author = updates.author;
  if (updates.genre !== undefined) dbUpdates.genre = updates.genre;
  if (updates.description !== undefined) dbUpdates.description = updates.description;
  if (updates.coverImage !== undefined) dbUpdates.cover_image = updates.coverImage;
  if (updates.totalCopies !== undefined) dbUpdates.total_copies = updates.totalCopies;
  if (updates.availableCopies !== undefined) dbUpdates.available_copies = updates.availableCopies;
  if (updates.isbn !== undefined) dbUpdates.isbn = updates.isbn;
  if (updates.publishedYear !== undefined) dbUpdates.published_year = updates.publishedYear;
  dbUpdates.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from('books')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating book:', error);
    return null;
  }

  return data ? {
    id: data.id,
    title: data.title,
    author: data.author,
    genre: data.genre,
    description: data.description,
    coverImage: data.cover_image,
    totalCopies: data.total_copies,
    availableCopies: data.available_copies,
    isbn: data.isbn,
    publishedYear: data.published_year,
  } : null;
};

export const getUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }

  return (data || []).map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role as 'user' | 'librarian',
  }));
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .insert([{
      name: user.name,
      email: user.email,
      role: user.role,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating user:', error);
    return null;
  }

  return data ? {
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
  } : null;
};

export const getBorrows = async (): Promise<Borrow[]> => {
  const { data, error } = await supabase
    .from('borrows')
    .select('*')
    .order('borrow_date', { ascending: false });

  if (error) {
    console.error('Error fetching borrows:', error);
    return [];
  }

  return (data || []).map(borrow => ({
    id: borrow.id,
    bookId: borrow.book_id,
    userId: borrow.user_id,
    borrowDate: borrow.borrow_date,
    dueDate: borrow.due_date,
    returnDate: borrow.return_date,
    status: borrow.status as 'active' | 'returned' | 'overdue',
  }));
};

export const createBorrow = async (borrow: Omit<Borrow, 'id'>): Promise<Borrow | null> => {
  const { data, error } = await supabase
    .from('borrows')
    .insert([{
      book_id: borrow.bookId,
      user_id: borrow.userId,
      borrow_date: borrow.borrowDate,
      due_date: borrow.dueDate,
      return_date: borrow.returnDate,
      status: borrow.status,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating borrow:', error);
    return null;
  }

  return data ? {
    id: data.id,
    bookId: data.book_id,
    userId: data.user_id,
    borrowDate: data.borrow_date,
    dueDate: data.due_date,
    returnDate: data.return_date,
    status: data.status,
  } : null;
};

export const updateBorrow = async (id: string, updates: Partial<Borrow>): Promise<Borrow | null> => {
  const dbUpdates: Record<string, any> = {};
  if (updates.status !== undefined) dbUpdates.status = updates.status;
  if (updates.returnDate !== undefined) dbUpdates.return_date = updates.returnDate;

  const { data, error } = await supabase
    .from('borrows')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating borrow:', error);
    return null;
  }

  return data ? {
    id: data.id,
    bookId: data.book_id,
    userId: data.user_id,
    borrowDate: data.borrow_date,
    dueDate: data.due_date,
    returnDate: data.return_date,
    status: data.status,
  } : null;
};

export const getReservations = async (): Promise<Reservation[]> => {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('reservation_date', { ascending: false });

  if (error) {
    console.error('Error fetching reservations:', error);
    return [];
  }

  return (data || []).map(reservation => ({
    id: reservation.id,
    bookId: reservation.book_id,
    userId: reservation.user_id,
    reservationDate: reservation.reservation_date,
    status: reservation.status as 'pending' | 'fulfilled' | 'cancelled',
  }));
};

export const createReservation = async (reservation: Omit<Reservation, 'id'>): Promise<Reservation | null> => {
  const { data, error } = await supabase
    .from('reservations')
    .insert([{
      book_id: reservation.bookId,
      user_id: reservation.userId,
      reservation_date: reservation.reservationDate,
      status: reservation.status,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating reservation:', error);
    return null;
  }

  return data ? {
    id: data.id,
    bookId: data.book_id,
    userId: data.user_id,
    reservationDate: data.reservation_date,
    status: data.status,
  } : null;
};

export const updateReservation = async (id: string, updates: Partial<Reservation>): Promise<Reservation | null> => {
  const dbUpdates: Record<string, any> = {};
  if (updates.status !== undefined) dbUpdates.status = updates.status;

  const { data, error} = await supabase
    .from('reservations')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating reservation:', error);
    return null;
  }

  return data ? {
    id: data.id,
    bookId: data.book_id,
    userId: data.user_id,
    reservationDate: data.reservation_date,
    status: data.status,
  } : null;
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('library_current_user');
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem('library_current_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('library_current_user');
  }
};

export const initializeStorage = () => {
  // No longer needed
};

export const saveBooks = async (books: Book[]) => {
  console.log('Legacy saveBooks called - not implemented. Use updateBook or createBook instead.');
};

export const saveUsers = async (users: User[]) => {
  console.log('Legacy saveUsers called - not implemented. Use createUser instead.');
};

export const saveBorrows = async (borrows: Borrow[]) => {
  console.log('Legacy saveBorrows called - not implemented. Use createBorrow or updateBorrow instead.');
};

export const saveReservations = async (reservations: Reservation[]) => {
  console.log('Legacy saveReservations called - not implemented. Use createReservation or updateReservation instead.');
};
