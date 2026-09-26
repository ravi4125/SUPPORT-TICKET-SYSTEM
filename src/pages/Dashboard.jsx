import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Ticket,
  FolderOpen,
  Clock,
  CheckCircle,
  Archive
} from 'lucide-react';
import { api } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import { formatDateShort } from '../utils/ticketUtils';

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  // Basic useEffect to load data from api
  useEffect(() => {
    const load = async () => {
      const ticketsData = await api.getTickets();
      const usersData = await api.getUsers();
      setTickets(ticketsData);
      setUsers(usersData);
    };
    load();
  }, []);

  // Simple user map to lookup assignee name: userMap[id] -> name
  const getUserName = (userId) => {
    const user = users.find(u => Number(u.id) === Number(userId));
    return user ? user.name : 'Unassigned';
  };

  // Simple counts calculation
  const totalCount = tickets.length;
  const openCount = tickets.filter(t => t.status === 'Open').length;
  const progressCount = tickets.filter(t => t.status === 'In Progress').length;
  const resolvedCount = tickets.filter(t => t.status === 'Resolved').length;
  const closedCount = tickets.filter(t => t.status === 'Closed').length;

  const highPriority = tickets.filter(t => t.priority === 'High').length;
  const mediumPriority = tickets.filter(t => t.priority === 'Medium').length;
  const lowPriority = tickets.filter(t => t.priority === 'Low').length;

  // Donut chart stroke dash calculations (circumference = 2 * PI * r = 2 * 3.14159 * 40 = ~251.3)
  const circumference = 251.3;
  const highRatio = totalCount > 0 ? highPriority / totalCount : 0.28;
  const medRatio = totalCount > 0 ? mediumPriority / totalCount : 0.40;
  const lowRatio = totalCount > 0 ? lowPriority / totalCount : 0.32;

  const highDash = highRatio * circumference;
  const medDash = medRatio * circumference;
  const lowDash = lowRatio * circumference;

  // Recent 5 tickets
  const recentTickets = tickets.slice(0, 5);

  return (
    <div className="dashboard-view-container">
      {/* Title Header */}
      <div className="dashboard-top-header">
        <h1 className="dashboard-main-title">Dashboard</h1>
        <p className="dashboard-welcome-msg">Welcome back, Support Staff!</p>
      </div>

      {/* 5 KPI Stat Cards in a row */}
      <div className="kpi-cards-strip">
        {/* Total Tickets */}
        <div className="kpi-box">
          <div className="kpi-info-col">
            <span className="kpi-box-label">Total Tickets</span>
            <span className="kpi-box-value">{totalCount}</span>
          </div>
          <div className="kpi-icon-pill icon-blue">
            <Ticket size={18} />
          </div>
        </div>

        {/* Open */}
        <div className="kpi-box">
          <div className="kpi-info-col">
            <span className="kpi-box-label">Open</span>
            <span className="kpi-box-value">{openCount}</span>
          </div>
          <div className="kpi-icon-pill icon-red">
            <FolderOpen size={18} />
          </div>
        </div>

        {/* In Progress */}
        <div className="kpi-box">
          <div className="kpi-info-col">
            <span className="kpi-box-label">In Progress</span>
            <span className="kpi-box-value">{progressCount}</span>
          </div>
          <div className="kpi-icon-pill icon-cyan">
            <Clock size={18} />
          </div>
        </div>

        {/* Resolved */}
        <div className="kpi-box">
          <div className="kpi-info-col">
            <span className="kpi-box-label">Resolved</span>
            <span className="kpi-box-value">{resolvedCount}</span>
          </div>
          <div className="kpi-icon-pill icon-green">
            <CheckCircle size={18} />
          </div>
        </div>

        {/* Closed */}
        <div className="kpi-box">
          <div className="kpi-info-col">
            <span className="kpi-box-label">Closed</span>
            <span className="kpi-box-value">{closedCount}</span>
          </div>
          <div className="kpi-icon-pill icon-gray">
            <Archive size={18} />
          </div>
        </div>
      </div>

      {/* Middle Section: Donut Chart & Status Bars */}
      <div className="dashboard-charts-duo">
        {/* Card 1: Tickets by Priority */}
        <div className="chart-white-card">
          <h2 className="card-section-heading">Tickets by Priority</h2>
          <div className="donut-chart-row">
            {/* SVG Donut */}
            <div className="donut-wrapper">
              <svg width="140" height="140" viewBox="0 0 100 100" className="donut-svg">
                {/* Background circle */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                {/* Low Priority segment (Green) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#10B981"
                  strokeWidth="12"
                  strokeDasharray={`${lowDash} ${circumference}`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
                {/* Medium Priority segment (Orange/Yellow) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#F59E0B"
                  strokeWidth="12"
                  strokeDasharray={`${medDash} ${circumference}`}
                  strokeDashoffset={`${-lowDash}`}
                  transform="rotate(-90 50 50)"
                />
                {/* High Priority segment (Red) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#EF4444"
                  strokeWidth="12"
                  strokeDasharray={`${highDash} ${circumference}`}
                  strokeDashoffset={`${-(lowDash + medDash)}`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="donut-center-label">
                <span className="donut-total-num">{totalCount}</span>
                <span className="donut-total-sub">Total</span>
              </div>
            </div>

            {/* Legend */}
            <div className="donut-legend-col">
              <div className="legend-row">
                <span className="legend-dot dot-red" />
                <span className="legend-name">High</span>
                <span className="legend-count">{highPriority}</span>
              </div>
              <div className="legend-row">
                <span className="legend-dot dot-orange" />
                <span className="legend-name">Medium</span>
                <span className="legend-count">{mediumPriority}</span>
              </div>
              <div className="legend-row">
                <span className="legend-dot dot-green" />
                <span className="legend-name">Low</span>
                <span className="legend-count">{lowPriority}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Tickets by Status */}
        <div className="chart-white-card">
          <h2 className="card-section-heading">Tickets by Status</h2>
          <div className="status-bars-stack">
            {/* Open */}
            <div className="status-bar-line">
              <span className="status-bar-name">Open</span>
              <div className="status-bar-track">
                <div
                  className="status-bar-color bar-coral"
                  style={{ width: `${totalCount > 0 ? (openCount / totalCount) * 100 : 30}%` }}
                />
              </div>
              <span className="status-bar-count">{openCount}</span>
            </div>

            {/* In Progress */}
            <div className="status-bar-line">
              <span className="status-bar-name">In Progress</span>
              <div className="status-bar-track">
                <div
                  className="status-bar-color bar-blue"
                  style={{ width: `${totalCount > 0 ? (progressCount / totalCount) * 100 : 25}%` }}
                />
              </div>
              <span className="status-bar-count">{progressCount}</span>
            </div>

            {/* Resolved */}
            <div className="status-bar-line">
              <span className="status-bar-name">Resolved</span>
              <div className="status-bar-track">
                <div
                  className="status-bar-color bar-green"
                  style={{ width: `${totalCount > 0 ? (resolvedCount / totalCount) * 100 : 25}%` }}
                />
              </div>
              <span className="status-bar-count">{resolvedCount}</span>
            </div>

            {/* Closed */}
            <div className="status-bar-line">
              <span className="status-bar-name">Closed</span>
              <div className="status-bar-track">
                <div
                  className="status-bar-color bar-gray"
                  style={{ width: `${totalCount > 0 ? (closedCount / totalCount) * 100 : 20}%` }}
                />
              </div>
              <span className="status-bar-count">{closedCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Tickets Table */}
      <div className="recent-tickets-white-card">
        <div className="recent-card-header-bar">
          <h2 className="card-section-heading">Recent Tickets</h2>
          <Link to="/tickets" className="view-all-blue-link">
            View All
          </Link>
        </div>

        <div className="figma-table-wrapper">
          <table className="figma-data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Subject</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {recentTickets.map((t) => (
                <tr key={t.id}>
                  <td className="cell-id">
                    <Link to={`/tickets/${t.id}`} className="figma-id-link">
                      {t.ticket_id}
                    </Link>
                  </td>
                  <td className="cell-subject">
                    <Link to={`/tickets/${t.id}`} className="figma-subject-link">
                      {t.subject}
                    </Link>
                  </td>
                  <td>
                    <PriorityBadge priority={t.priority} />
                  </td>
                  <td>
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="cell-assignee">
                    {getUserName(t.assigned_to)}
                  </td>
                  <td className="cell-created">
                    {formatDateShort(t.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
