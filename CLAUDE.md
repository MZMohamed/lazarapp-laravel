# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Technology Stack

This is a Laravel 11 application with Inertia.js and React frontend:
- **Backend**: Laravel 11 (PHP 8.2+)
- **Frontend**: React 18 + Inertia.js
- **Styling**: Tailwind CSS + Material-UI (v4)
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Database**: SQLite (default)
- **Testing**: Pest (PHP)
- **Code Style**: Laravel Pint

## Common Commands

### Development
```bash
# Start all development services (server, queue, logs, vite)
composer dev

# Or start services individually:
php artisan serve              # Start development server
php artisan queue:listen        # Start queue worker
php artisan pail                # View logs
pnpm run dev                    # Start Vite dev server
```

### Frontend
```bash
pnpm install                    # Install dependencies
pnpm run build                  # Build for production
pnpm run lint                   # Run ESLint
```

### Backend
```bash
composer install                # Install PHP dependencies
php artisan migrate             # Run migrations
php artisan migrate:fresh       # Fresh migration (drops all tables)
php artisan tinker              # REPL
```

### Code Quality
```bash
./vendor/bin/pint               # Format PHP code with Laravel Pint
```

### Testing
```bash
./vendor/bin/pest               # Run all tests
./vendor/bin/pest --filter=TestName  # Run specific test
```

## Architecture Overview

### Data Model
The application manages job site operations with these core entities:

- **JobSite**: Main job record with approval workflow (driver, admin, agent approval levels)
- **JobDetail**: Line items for each job (multiple details per job site)
- **Driver**: Drivers assigned to jobs
- **Vehicle**: Equipment/vehicles with types (linked via `job_vehicles` pivot table)
- **VehicleType**: Categories of vehicles (jobs are grouped by vehicle type in UI)
- **District**: Geographic districts with codes
- **Location**: Specific locations within districts
- **Agent**: Agents who approve jobs
- **Operator**: Site operators (jobs can have up to 2 operators)
- **Group**: User groups for access control
- **DocumentUpload**: File attachments for jobs

### Key Relationships
- JobSite has many JobDetails (one-to-many)
- JobSite belongs to many Vehicles (many-to-many via `job_vehicles`)
- JobSite references Driver, District, Location, Agent, and two Operators (foreign keys)
- All models use soft deletes
- Jobs are displayed grouped by VehicleType

### Frontend Structure
```
resources/js/
├── Pages/           # Inertia page components (route endpoints)
│   ├── Jobs/        # Job management pages
│   ├── Drivers/     # Driver management
│   ├── Agents/      # Agent management
│   ├── Districts/   # District management
│   ├── Groups/      # Group management
│   ├── Users/       # User management
│   └── Auth/        # Authentication pages
├── Components/      # Reusable React components
│   ├── app/         # Domain-specific components
│   ├── Button/      # Button variants
│   ├── Alert/       # Alert components
│   └── Messages/    # Message components
└── Layouts/         # Layout wrappers
```

### Backend Structure
- Controllers are resource-based (e.g., `JobSiteController`, `DriverController`)
- Models in `app/Models/` with Eloquent relationships
- Routes defined in `routes/web.php` using `Route::resource()` pattern
- All authenticated routes require `auth` and `verified` middleware

### Inertia.js Integration
- Page components resolved from `resources/js/Pages/`
- Props passed from controllers via `Inertia::render()`
- Routes available in JavaScript via Ziggy (`tightenco/ziggy`)
- File naming: Controllers use `.php`, frontend uses `.jsx`

## Important Notes

### File Extensions
- Vite config specifies `resources/js/app.tsx` but the actual file is `app.jsx`
- All React components use `.jsx` extension
- ESLint is configured for `.jsx` files only

### Job Management Workflow
- Jobs have a three-tier approval system: driver → admin → agent
- Jobs are displayed grouped by vehicle type in the index view
- The `JobSiteController::getJobsGroupedByVehicleType()` method handles grouping logic
- Time tracking: `timeOnSite`, `timeOffSite`, `hoursWorked` fields

### Development Workflow
The `composer dev` command runs all services concurrently with colored output:
- PHP dev server on default port (8000)
- Queue listener with retry limit of 1
- Log viewer with no timeout
- Vite dev server for hot module replacement
