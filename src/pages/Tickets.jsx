import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { api } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import { formatDateShort } from '../utils/ticketUtils';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  // Filter States - basic and simple
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [assigneeFilter, setAssigneeFilter] = useState('All Assignees');
  const [currentPage, setCurrentPage] = useState(1);

  // Load data once
  useEffect(() => {
    const load = async () => {
      const ticketsData = await api.getTickets();
      const usersData = await api.getUsers();
      setTickets(ticketsData);
      setUsers(usersData);
    };
    load();
  }, []);

  const getUserName = (userId) => {
    const user = users.find(u => Number(u.id) === Number(userId));
    return user ? user.name : 'Unassigned';
  };

  // Simple filter logic
  const filteredTickets = tickets.filter((ticket) => {
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      ticket.ticket_id.toLowerCase().includes(query) ||
      ticket.subject.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === 'All Status' || ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === 'All Priority' || ticket.priority === priorityFilter;

    const matchesAssignee =
      assigneeFilter === 'All Assignees' ||
      String(ticket.assigned_to) === String(assigneeFilter);

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  return (
    <div className="tickets-view-container">
      {/* Top Header: Title, Search Bar & Create Ticket Button */}
      <div className="tickets-top-action-bar">
        <h1 className="tickets-page-title">Tickets</h1>

        <div className="tickets-header-controls">
          {/* Search Box */}
          <div className="figma-search-wrap">
            <Search size={16} className="search-lens-icon" />
            <input
              type="text"
              placeholder="Search by ticket ID or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="figma-search-input"
            />
          </div>

          {/* Create Ticket Button */}
          <Link to="/tickets/create" className="figma-btn-primary">
            Create Ticket
          </Link>
        </div>
      </div>

      {/* Filter Row: 3 Dropdowns */}
      <div className="figma-filters-row">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="figma-select-box"
        >
          <option value="All Status">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="figma-select-box"
        >
          <option value="All Priority">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
          className="figma-select-box"
        >
          <option value="All Assignees">All Assignees</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tickets Table Card */}
      <div className="figma-table-card">
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
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan="7" className="table-empty-notice">
                    No tickets match the current filters.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((t) => (
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
                    <td style={{ textAlign: 'center' }}>
                      <Link to={`/tickets/${t.id}`} className="figma-view-link">
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls at Bottom Right */}
        <div className="figma-pagination-bar">
          <button
            type="button"
            className="pager-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            &lt;
          </button>
          <button
            type="button"
            className={`pager-btn ${currentPage === 1 ? 'pager-active' : ''}`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
          <button
            type="button"
            className={`pager-btn ${currentPage === 2 ? 'pager-active' : ''}`}
            onClick={() => setCurrentPage(2)}
          >
            2
          </button>
          <button
            type="button"
            className={`pager-btn ${currentPage === 3 ? 'pager-active' : ''}`}
            onClick={() => setCurrentPage(3)}
          >
            3
          </button>
          <button
            type="button"
            className="pager-btn"
            onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
