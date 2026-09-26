# HelpDesk Pro — Support Ticket Management System

A production-ready Help Desk / Support Ticket Management System built in React.js conforming to the 3-Hour Practical Project Specification.

---

## 🚀 Live Demo & Getting Started

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Run ESLint checks (0 errors, 0 warnings)
npm run lint
```

The application runs at **`http://localhost:5173/`**.

---

## 🔑 Demo Credentials

| Role | Email | Password | Description |
| :--- | :--- | :--- | :--- |
| **Support Staff** | `support@company.com` | `123456` | Full administrative triage, status changes, employee assignment |
| **Employee** | `employee@company.com` | `123456` | Raise tickets, view personal & team requests, comment |

> 💡 **Quick Demo Fill**: The login screen provides 1-click account auto-fill buttons. You can also quickly toggle roles in the sidebar using the "Switch to Employee / Support" button.

---

## ✨ Features Implemented

### 1. Authentication & Role Handling
- Mock REST authentication with session persistence in `localStorage`.
- Protected routes (redirects unauthorized users to `/login`).
- Quick demo role toggle in the sidebar for switching between Support and Employee perspectives.
- Clean logout handling with toast feedback.

### 2. Dashboard (`/dashboard`)
- **6 Real-time KPI Metric Cards**:
  - Total Tickets
  - Open Tickets
  - In Progress Tickets
  - Resolved Tickets
  - Closed Tickets
  - High Priority Tickets
- **Priority Summary**: Visual distribution progress bars (High, Medium, Low) with percentage calculations.
- **Status Summary**: Visual progress distribution (Open, In Progress, Resolved, Closed).
- **Recent Tickets Table**: Latest reported tickets with priority badges, status badges, assignees, and quick links.
- Real-time refresh button.

### 3. Support Ticket List (`/tickets`)
- **Search**: Instant search by Ticket ID (e.g. `TCK-1025`) or Subject keywords.
- **Multi-criteria Filtering**:
  - Filter by Status (`All`, `Open`, `In Progress`, `Resolved`, `Closed`)
  - Filter by Priority (`All`, `High`, `Medium`, `Low`)
  - Filter by Assignee (`All`, or specific staff member)
- **Reset Filters**: One-click filter clear when active filters are detected.
- **View Toggle**: Switch seamlessly between **Table View** and responsive **Card Grid View**.
- **Result Count Indicator**: Real-time counter of matching records.

### 4. Create Ticket (`/tickets/create`)
- **Auto-generated Sequential Ticket ID**: Live preview (e.g. `TCK-1026`).
- **Validation**:
  - Subject (required, min 5 chars, max 150 chars with live counter).
  - Description (required, min 10 chars).
  - Priority selector (interactive cards for Low, Medium, High).
  - Assignee (optional support specialist assignment).
- **Default Status**: Sets status to `Open`.
- **Feedback & Navigation**: Triggers success toast and navigates to the newly created ticket.

### 5. Ticket Details & Management (`/tickets/:id`)
- **Header**: Ticket ID, Subject, Priority badge, Status badge.
- **Lifecycle Stepper**: Visual progress tracker (`Open` ➔ `In Progress` ➔ `Resolved` ➔ `Closed`) with 1-click status advancement.
- **Metadata Grid**: Creator, Created Date, Last Updated Date, Current Assignee.
- **Update Action Panel**: Update status, reassign staff member, change priority, and add change notes.
- **Bonus Feature — Activity & Comments Thread**: Submit new comments; view chronological comment stream with author details and timestamps.
- **Bonus Feature — Audit History**: Visual timeline logging all status transitions with actor details and notes.

### 6. Team & Employee Directory (`/employees`)
- Lists support specialists and employees.
- Shows department, email, assigned tickets workload count, and created tickets count.

---

## 🛠️ Technology Stack & Architecture

- **React 19** + **Vite**
- **React Router DOM 7** (Declarative routing, protected routes, nested layout)
- **Lucide React** (Modern SVG iconography)
- **Context API** (`AuthContext`, `ToastContext`)
- **Custom Hook** (`useTickets`)
- **Asynchronous Mock REST API Service** (`src/services/api.js`) simulating network latency and persisting data to `localStorage`.
- **Clean CSS Design System**: Custom responsive design system without external bloated frameworks.

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── Header.jsx          # Top navigation bar & breadcrumbs
│   ├── PriorityBadge.jsx   # Color-coded priority pill
│   ├── Sidebar.jsx         # Collapsible responsive sidebar
│   ├── StatusBadge.jsx     # Color-coded status badge with status dot
│   ├── TicketCard.jsx      # Card component for grid view
│   └── TicketTable.jsx     # Responsive data table
├── context/
│   ├── AuthContext.jsx     # Authentication state & role handling
│   └── ToastContext.jsx    # Toast notifications provider
├── data/
│   └── mockData.json       # Initial seed data for users, tickets, comments, history
├── hooks/
│   └── useTickets.js       # Hook for fetching, searching, and filtering tickets
├── pages/
│   ├── CreateTicket.jsx    # Ticket creation form with validation
│   ├── Dashboard.jsx       # KPI counts, summaries, and recent tickets
│   ├── Employees.jsx       # Employee directory and assigned workloads
│   ├── Login.jsx           # Login page with demo credentials
│   ├── TicketDetails.jsx   # Ticket view, status stepper, updates, comments & audit log
│   └── Tickets.jsx         # Ticket search, multi-filter, table/grid views
├── services/
│   └── api.js              # Mock REST client matching specification API endpoints
├── utils/
│   ├── ticketUtils.js      # Status configs, ID generator, date formatters
│   └── validation.js       # Form validation logic
├── App.jsx                 # Routing configuration & protected routes
├── index.css               # Design system and responsive styles
└── main.jsx                # Application root entry
```

---

## 🧪 Verification & Demonstration Flow

1. **Login**: Go to `/login`, click "Support Staff" demo button, then "Sign In".
2. **Dashboard**: Observe KPI cards (Total, Open, In Progress, Resolved, Closed, High Priority) and priority/status progress bars.
3. **Ticket List**: Click "Tickets" in sidebar. Test search box (e.g. `laptop` or `TCK-1025`) and filters (Status, Priority, Assignee). Toggle to grid view.
4. **Create Ticket**: Click "+ Create Ticket". Note auto-generated ID `TCK-1026`. Fill Subject, Description, choose High priority, and submit.
5. **Ticket Details**: See the created ticket. Click the "In Progress" step on the status progress bar or update the status and assignee from the side panel. Add a comment.
6. **Verify Updates**: Return to the ticket list or dashboard to verify the updated ticket and live recalculation of KPI counters!
