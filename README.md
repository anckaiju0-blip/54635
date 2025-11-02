# Pocket Archive

A modern, full-featured library management system built with React, TypeScript, and Tailwind CSS. Pocket Archive provides an intuitive interface for both readers and librarians to manage book collections, borrowing, and reservations.

## Features

### For Readers
- **Browse Collection**: Search and filter books by title, author, or genre
- **Borrow Books**: Instantly borrow available books with automatic due date tracking
- **Reserve Books**: Reserve unavailable books and get notified when they're ready
- **My Library**: Track active borrows, view history, and manage reservations
- **Due Date Alerts**: Visual indicators for upcoming due dates and overdue books

### For Librarians
- **Dashboard**: Comprehensive overview of library statistics and operations
- **Book Management**: Add, edit, and update book inventory with ease
- **Process Returns**: Efficiently handle book returns and update availability
- **Monitor Borrows**: Track all active borrows and identify overdue items
- **Real-time Stats**: View total books, available copies, users, and active borrows

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Data Storage**: LocalStorage (client-side persistence)
- **Linting**: ESLint with TypeScript support

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pocket-archive
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
pocket-archive/
├── src/
│   ├── components/          # React components
│   │   ├── LandingPage.tsx       # Landing page
│   │   ├── RoleSelection.tsx     # Role selection screen
│   │   ├── BookDiscover.tsx      # Book browsing interface
│   │   ├── BookDetails.tsx       # Book details modal
│   │   ├── MyLibrary.tsx         # User's library view
│   │   └── LibrarianDashboard.tsx # Librarian admin panel
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts             # Core types (Book, User, Borrow, Reservation)
│   ├── utils/              # Utility functions
│   │   └── localStorage.ts      # LocalStorage management
│   ├── App.tsx             # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.ts        # Vite configuration
```

## Data Model

### Book
- ID, title, author, genre, description
- Cover image URL
- Total copies and available copies
- ISBN and published year

### User
- ID, name, email
- Role (reader or librarian)

### Borrow
- Book and user references
- Borrow date, due date, return date
- Status (active, returned, overdue)

### Reservation
- Book and user references
- Reservation date
- Status (pending, fulfilled, cancelled)

## Usage Guide

### Starting as a Reader

1. Click "Get Started" on the landing page
2. Select "Reader" role
3. Browse the book collection
4. Click on any book to view details
5. Borrow available books or reserve unavailable ones
6. Check "My Library" to manage your borrows and reservations

### Starting as a Librarian

1. Click "Get Started" on the landing page
2. Select "Librarian" role
3. View dashboard statistics
4. Manage books: add new books or edit existing ones
5. Process returns from the "Active Borrows" tab
6. Monitor overdue books

## Features in Detail

### Search & Filter
- Real-time search across book titles and authors
- Genre-based filtering with dynamic genre list
- Clean, responsive search interface

### Borrowing System
- 14-day default borrow period
- Automatic availability tracking
- Visual due date indicators (green, orange, red)
- Overdue detection and alerts

### Reservation System
- Queue system for unavailable books
- Automatic notification capability
- One-click reservation cancellation

### Data Persistence
All data is stored locally in the browser using LocalStorage, including:
- Book inventory
- User accounts
- Borrow records
- Reservations

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Design Philosophy

Pocket Archive follows modern design principles:

- **Clean UI**: Minimalist interface with clear visual hierarchy
- **Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Accessible**: High contrast ratios and clear labeling
- **Intuitive**: Self-explanatory navigation and actions
- **Fast**: Instant interactions with optimized performance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Potential features for future releases:
- Backend integration with database
- User authentication system
- Email notifications for due dates
- Advanced search with filters
- Book recommendations
- Reading statistics and analytics
- Multi-language support
- Dark mode toggle
- Export reports (CSV, PDF)

## License

This project is open source and available for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## Contact

For questions or feedback, please open an issue in the repository.
