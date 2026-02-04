# HireLink - Recruitment Management Platform

A modern, full-stack recruitment management platform built with React and TypeScript that streamlines the hiring process for both candidates and recruiters.

## Features

### For Candidates

- **Job Discovery**: Browse and search through available job listings
- **Easy Application**: Simple, intuitive application form with validation
- **Resume Upload**: Support for file uploads and portfolio links

### For Recruiters

- **Dashboard Overview**: Comprehensive view of all applications and pipeline
- **Candidate Management**: Review, score, and manage candidate profiles
- **Interview Scheduling**: Built-in calendar integration for interview planning
- **Offer Letter Generation**: Professional offer letters with PDF export capability
- **Analytics & Insights**: Visual charts and metrics for recruitment performance
- **Pipeline Tracking**: Kanban-style board for application stage management

## Technical Stack

### Framework & Core Technologies

- **React 19.2.0** - Modern React with latest features and performance optimizations
- **TypeScript** - Type-safe development with enhanced developer experience
- **Vite** - Fast build tool and development server with HMR

### State Management & Data

- **React Context API** - Centralized state management for application data
- **localStorage** - Client-side data persistence for demo purposes
- **Custom Hooks** - Reusable logic for data operations and state management

### Routing & Navigation

- **React Router DOM v7** - Declarative client-side routing with nested routes

### UI/UX & Styling

- **Tailwind CSS v4** - Utility-first CSS framework for rapid styling
- **Radix UI** - Accessible, unstyled UI primitives for consistent components
- **Lucide React** - Beautiful, customizable icons
- **Responsive Design** - Mobile-first approach with adaptive layouts

### Forms & Validation

- **Custom form validation** - Performant forms with easy validation using states
- **Real-time Validation** - Instant feedback with field-level error messages

### Data Visualization

- **Recharts** - Composable charting library for analytics dashboards
- **Interactive Charts** - Drill-down capabilities and responsive design

### Additional Features

- **PDF Generation** - react-to-print for professional document export

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components (buttons, inputs, etc.)
│   ├── charts/               # Data visualization components
│   ├── recruiter/            # Recruiter-specific components
│   │   ├── OfferLetter.tsx   # Main offer letter component
│   │   ├── OfferLetterForm.tsx
│   │   ├── OfferLetterPreview.tsx
│   │   ├── OfferLetterPrint.tsx
│   │   └── OfferLetterSuccess.tsx
│   ├── ApplicationForm.tsx   # Candidate application form
│   ├── Home.tsx             # Landing page component
│   └── PipelineBoard.tsx    # Kanban board for applications
├── contexts/
│   └── index.tsx            # Global state management
├── lib/
│   └── utils.ts             # Utility functions
└── routes/
    ├── JobListingsPage.tsx  # Job listings and applications
    └── RecruiterDashboard.tsx # Recruiter management interface
```

## Architecture Decisions

### State Management

**Decision**: React Context API over Redux/Zustand

- **Rationale**: The application complexity doesn't warrant external state management libraries
- **Benefits**: Built-in React solution, TypeScript integration, no additional dependencies
- **Trade-offs**: Manual optimization required for deeply nested component updates

### Data Persistence

**Decision**: localStorage for demo purposes

- **Rationale**: Quick setup for development and demonstration
- **Future**: Can be easily replaced with REST API or database integration
- **Benefits**: Zero backend setup required, works offline

### Component Architecture

**Decision**: Feature-based component organization

- **Rationale**: Related components grouped by feature/domain
- **Benefits**: Easier maintenance, clear separation of concerns
- **Implementation**: Barrel exports (`index.ts`) for clean imports

### UI Component Library

**Decision**: Radix UI primitives with custom styling

- **Rationale**: Accessibility-first, unstyled primitives allow full design control
- **Benefits**: Consistent behavior, keyboard navigation, screen reader support
- **Styling**: Tailwind CSS for rapid development and responsive design

### Form Management

**Decision**: React Hook Form with Zod validation

- **Rationale**: Performance-focused with excellent TypeScript support
- **Benefits**: Minimal re-renders, schema-based validation, easy error handling
- **Integration**: Seamless integration with existing UI components

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Modern web browser with ES6+ support

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/IchaCoder/hire-link.git
   cd hire-link
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## Usage Guide

### For Candidates

1. **Browse Jobs**: Visit the homepage to see available positions
2. **Apply**: Click "Apply Now" and fill out the application form
3. **Upload Resume**: Attach your resume and provide portfolio links

### For Recruiters

1. **Access Dashboard**: Navigate to `/recruiter` for the management interface
2. **Review Applications**: Browse candidates and their profiles
3. **Score Candidates**: Rate applicants and add evaluation notes
4. **Schedule Interviews**: Use the built-in scheduler for interview planning
5. **Generate Offers**: Create professional offer letters with PDF export
6. **Track Pipeline**: Monitor application stages with visual pipeline board

## Development Guidelines

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Configured with React and TypeScript rules
- **Prettier**: Code formatting (via ESLint integration)

### Component Patterns

- **Functional Components**: Modern React patterns with hooks
- **Custom Hooks**: Extract reusable logic into custom hooks
- **Props Interface**: Explicit TypeScript interfaces for all props
- **Error Boundaries**: Graceful error handling for production

### State Management

- **Context API**: Global state for application data
- **Local State**: Component-level state with useState
- **Optimistic Updates**: Immediate UI feedback with error rollback

## Key Metrics & Analytics

The platform provides comprehensive analytics including:

- **Application Volume**: Track incoming applications over time
- **Conversion Rates**: Monitor progression through hiring stages
- **Time-to-Hire**: Measure efficiency of recruitment process
- **Candidate Quality**: Score distribution and evaluation metrics
- **Department Breakdown**: Applications by job category and location

## Security Considerations

- **Input Validation**: Client side validation using states

## Deployment

### Build for Production

```bash
npm run build
```

### Deployment Platforms

- **Netlify**: Great static site hosting with form handling
