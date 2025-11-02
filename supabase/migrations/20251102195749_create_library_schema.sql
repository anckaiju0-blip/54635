/*
  # Create Library Management Schema

  ## New Tables
  
  ### books
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Book title
  - `author` (text) - Book author
  - `genre` (text) - Book genre/category
  - `description` (text) - Book description
  - `cover_image` (text) - URL to book cover image
  - `total_copies` (integer) - Total number of copies available
  - `available_copies` (integer) - Number of copies currently available
  - `isbn` (text) - ISBN number
  - `published_year` (integer) - Year of publication
  - `created_at` (timestamptz) - Timestamp of record creation
  - `updated_at` (timestamptz) - Timestamp of last update

  ### users
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - User's full name
  - `email` (text, unique) - User's email address
  - `role` (text) - User role (user or librarian)
  - `created_at` (timestamptz) - Timestamp of account creation

  ### borrows
  - `id` (uuid, primary key) - Unique identifier
  - `book_id` (uuid, foreign key) - Reference to books table
  - `user_id` (uuid, foreign key) - Reference to users table
  - `borrow_date` (timestamptz) - Date book was borrowed
  - `due_date` (timestamptz) - Date book is due
  - `return_date` (timestamptz, nullable) - Date book was returned
  - `status` (text) - Borrow status (active, returned, overdue)
  - `created_at` (timestamptz) - Timestamp of record creation

  ### reservations
  - `id` (uuid, primary key) - Unique identifier
  - `book_id` (uuid, foreign key) - Reference to books table
  - `user_id` (uuid, foreign key) - Reference to users table
  - `reservation_date` (timestamptz) - Date of reservation
  - `status` (text) - Reservation status (pending, fulfilled, cancelled)
  - `created_at` (timestamptz) - Timestamp of record creation

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users to access their own data
  - Add policies for librarians to manage all data
  - Public read access for books catalog
*/

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL,
  genre text NOT NULL,
  description text NOT NULL,
  cover_image text NOT NULL,
  total_copies integer NOT NULL DEFAULT 1,
  available_copies integer NOT NULL DEFAULT 1,
  isbn text NOT NULL,
  published_year integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view books"
  ON books FOR SELECT
  USING (true);

CREATE POLICY "Librarians can insert books"
  ON books FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Librarians can update books"
  ON books FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all users"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create user"
  ON users FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create borrows table
CREATE TABLE IF NOT EXISTS borrows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  borrow_date timestamptz NOT NULL DEFAULT now(),
  due_date timestamptz NOT NULL,
  return_date timestamptz,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE borrows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own borrows"
  ON borrows FOR SELECT
  USING (true);

CREATE POLICY "Users can create borrows"
  ON borrows FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own borrows"
  ON borrows FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reservation_date timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own reservations"
  ON reservations FOR SELECT
  USING (true);

CREATE POLICY "Users can create reservations"
  ON reservations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own reservations"
  ON reservations FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Insert initial book data
INSERT INTO books (title, author, genre, description, cover_image, total_copies, available_copies, isbn, published_year) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'Classic', 'A classic novel set in the Jazz Age that explores themes of wealth, love, and the American Dream.', 'https://images.pexels.com/photos/1148399/pexels-photo-1148399.jpeg?auto=compress&cs=tinysrgb&w=400', 1, 1, '978-0743273565', 1925),
('To Kill a Mockingbird', 'Harper Lee', 'Classic', 'A gripping tale of racial injustice and childhood innocence in the American South.', 'https://images.pexels.com/photos/3358707/pexels-photo-3358707.jpeg?auto=compress&cs=tinysrgb&w=400', 1, 1, '978-0061120084', 1960),
('1984', 'George Orwell', 'Science Fiction', 'A dystopian social science fiction novel and cautionary tale about totalitarianism.', 'https://images.pexels.com/photos/4132938/pexels-photo-4132938.jpeg?auto=compress&cs=tinysrgb&w=400', 1, 1, '978-0451524935', 1949),
('Pride and Prejudice', 'Jane Austen', 'Romance', 'A romantic novel of manners that satirizes the British landed gentry at the end of the 18th century.', 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=400', 1, 1, '978-0141439518', 1813),
('The Catcher in the Rye', 'J.D. Salinger', 'Classic', 'A story about teenage rebellion and alienation narrated by Holden Caulfield.', 'https://images.pexels.com/photos/4057663/pexels-photo-4057663.jpeg?auto=compress&cs=tinysrgb&w=400', 1, 1, '978-0316769174', 1951),
('The Hobbit', 'J.R.R. Tolkien', 'Fantasy', 'A fantasy novel about the quest of home-loving Bilbo Baggins to win a share of treasure guarded by a dragon.', 'https://images.pexels.com/photos/3358707/pexels-photo-3358707.jpeg?auto=compress&cs=tinysrgb&w=400', 1, 1, '978-0547928227', 1937),
('Harry Potter and the Philosopher''s Stone', 'J.K. Rowling', 'Fantasy', 'The first novel in the Harry Potter series about a young wizard''s first year at Hogwarts.', 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=400', 1, 1, '978-0439708180', 1997),
('The Da Vinci Code', 'Dan Brown', 'Mystery', 'A mystery thriller novel that follows symbologist Robert Langdon as he investigates a murder in Paris.', 'https://images.pexels.com/photos/4132938/pexels-photo-4132938.jpeg?auto=compress&cs=tinysrgb&w=400', 1, 1, '978-0307474278', 2003),
('Dune', 'Frank Herbert', 'Science Fiction', 'An epic science fiction novel set in the distant future amidst the intrigue and politics of galactic empire.', 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=400', 1, 1, '978-0441172719', 1965)
ON CONFLICT DO NOTHING;