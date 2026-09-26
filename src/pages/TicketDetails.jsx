import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import { formatDateTime, STATUS_STEPS } from '../utils/ticketUtils';

const TicketDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();

  const [ticket, setTicket] = useState(null);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');

  // Update controls
  const [statusVal, setStatusVal] = useState('');
  const [assigneeVal, setAssigneeVal] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');

  // Load ticket, users, comments
  useEffect(() => {
    const load = async () => {
      try {
        const ticketData = await api.getTicketById(id);
        const usersData = await api.getUsers();
        const commentsData = await api.getComments(id);

        setTicket(ticketData);
        setUsers(usersData);
        setComments(commentsData);

        setStatusVal(ticketData.status);
        setAssigneeVal(ticketData.assigned_to ? String(ticketData.assigned_to) : '');
      } catch (err) {
        console.error('Failed to load ticket', err);
      }
    };
    load();
  }, [id]);

  // Helper to get user info
  const getUser = (userId) => {
    return users.find((u) => Number(u.id) === Number(userId)) || null;
  };

  // Handle Update Status / Assignee
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!ticket) return;

    try {
      const updated = await api.updateTicket(ticket.id, {
        status: statusVal,
        assigned_to: assigneeVal ? Number(assigneeVal) : null
      });
      setTicket(updated);
      setUpdateMsg('Ticket updated successfully!');
      setTimeout(() => setUpdateMsg(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Post Comment
  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    try {
      const added = await api.addComment(ticket.id, newCommentText.trim(), currentUser);
      setComments((prev) => [...prev, added]);
      setNewCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  if (!ticket) {
    return (
      <div className="ticket-loading-state">
        <p>Loading ticket details...</p>
      </div>
    );
  }

  const assigneeUser = getUser(ticket.assigned_to);
  const currentStepIndex = STATUS_STEPS.indexOf(ticket.status);

  return (
    <div className="ticket-details-view-container">
      {/* Back Link */}
      <div className="details-back-bar">
        <Link to="/tickets" className="back-to-tickets-link">
          <ArrowLeft size={16} />
          <span>Back to Tickets</span>
        </Link>
      </div>

      {/* Main Grid: Left content + Right Update Panel */}
      <div className="details-two-columns-layout">
        {/* Left Area */}
        <div className="details-left-main-area">
          {/* Main White Card */}
          <div className="details-content-white-card">
            {/* Title Row */}
            <div className="details-ticket-title-row">
              <h1 className="details-ticket-num">
                Ticket #{ticket.ticket_id}
              </h1>
              <StatusBadge status={ticket.status} />
            </div>

            {/* Upper Two Boxes Side by Side */}
            <div className="details-upper-boxes-row">
              {/* Box 1: Metadata */}
              <div className="details-subbox subbox-meta">
                <div className="subbox-field-row">
                  <span className="subbox-label">Subject</span>
                  <span className="subbox-value-text">{ticket.subject}</span>
                </div>

                <div className="subbox-field-row">
                  <span className="subbox-label">Priority</span>
                  <div className="subbox-badge-wrap">
                    <PriorityBadge priority={ticket.priority} />
                  </div>
                </div>

                <div className="subbox-field-row">
                  <span className="subbox-label">Assigned To</span>
                  <div className="subbox-assignee-pill">
                    <span className="subbox-assignee-avatar">
                      {assigneeUser?.initials || 'NS'}
                    </span>
                    <span className="subbox-assignee-name">
                      {assigneeUser ? assigneeUser.name : 'Unassigned'}
                    </span>
                  </div>
                </div>

                <div className="subbox-field-row">
                  <span className="subbox-label">Created</span>
                  <span className="subbox-created-time">
                    {formatDateTime(ticket.created_at)}
                  </span>
                </div>
              </div>

              {/* Box 2: Status Stepper */}
              <div className="details-subbox subbox-stepper">
                <span className="subbox-stepper-title">Status</span>

                <div className="figma-stepper-track">
                  {STATUS_STEPS.map((step, index) => {
                    const isPassed = index <= currentStepIndex;
                    return (
                      <div key={step} className="figma-step-point">
                        <div
                          className={`figma-step-dot ${isPassed ? 'step-dot-active' : ''}`}
                        >
                          {index < currentStepIndex && <Check size={10} />}
                        </div>
                        <span className="figma-step-text">{step}</span>
                        {index < STATUS_STEPS.length - 1 && (
                          <div
                            className={`figma-step-connector ${
                              index < currentStepIndex ? 'connector-active' : ''
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="details-description-section">
              <h3 className="section-small-title">Description</h3>
              <p className="description-paragraph">{ticket.description}</p>
            </div>

            {/* Comments Section */}
            <div className="details-comments-section">
              <h3 className="section-small-title">Comments</h3>

              <div className="comments-list-stream">
                {comments.map((c) => {
                  const author = getUser(c.user_id);
                  const isSupport = author?.role === 'support';
                  return (
                    <div key={c.id} className="figma-comment-item">
                      <div className="comment-avatar-bubble">
                        {author?.initials || (isSupport ? 'NS' : 'RP')}
                      </div>
                      <div className="comment-content-block">
                        <div className="comment-heading-line">
                          <span className="comment-author-bold">
                            {author?.name || 'User'}
                          </span>
                          <span className="comment-role-tag">
                            ({isSupport ? 'Support Staff' : 'Employee'})
                          </span>
                          <span className="comment-datetime-stamp">
                            {formatDateTime(c.created_at)}
                          </span>
                        </div>
                        <p className="comment-message-text">{c.comment}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add Comment Input Bar */}
              <form onSubmit={handlePostComment} className="comment-input-bar">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="comment-text-field"
                />
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="comment-post-btn"
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side: Update Ticket Card */}
        <div className="details-right-side-panel">
          <div className="update-ticket-white-card">
            <h2 className="update-card-title">Update Ticket</h2>

            {updateMsg && (
              <div className="update-success-banner">{updateMsg}</div>
            )}

            <form onSubmit={handleUpdate} className="update-ticket-form-stack">
              <div className="update-form-field">
                <label className="update-label">Change Status</label>
                <select
                  value={statusVal}
                  onChange={(e) => setStatusVal(e.target.value)}
                  className="update-select-control"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="update-form-field">
                <label className="update-label">Assign To</label>
                <select
                  value={assigneeVal}
                  onChange={(e) => setAssigneeVal(e.target.value)}
                  className="update-select-control"
                >
                  <option value="">Unassigned</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="update-action-submit-btn">
                Update Ticket
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
