import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const CreateTicket = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assignedTo, setAssignedTo] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      const data = await api.getUsers();
      setUsers(data);
    };
    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject.trim()) {
      setError('Please enter a ticket subject');
      return;
    }
    if (!description.trim()) {
      setError('Please describe your issue');
      return;
    }

    try {
      await api.createTicket(
        {
          subject: subject.trim(),
          description: description.trim(),
          priority,
          assigned_to: assignedTo ? Number(assignedTo) : null
        },
        currentUser
      );
      navigate('/tickets');
    } catch (err) {
      setError(err.message || 'Failed to create ticket');
    }
  };

  return (
    <div className="create-ticket-view-container">
      <h1 className="create-page-title">Create New Ticket</h1>

      <div className="create-ticket-card-box">
        {error && <div className="create-form-error">{error}</div>}

        <form onSubmit={handleSubmit} className="figma-create-form">
          {/* Subject Field */}
          <div className="form-item-block">
            <label className="form-item-label">
              Subject <span className="label-asterisk">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter ticket subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                if (error) setError('');
              }}
              className="form-item-input"
            />
          </div>

          {/* Description Field */}
          <div className="form-item-block">
            <label className="form-item-label">
              Description <span className="label-asterisk">*</span>
            </label>
            <textarea
              rows={6}
              placeholder="Describe your issue in detail..."
              value={description}
              maxLength={500}
              onChange={(e) => {
                setDescription(e.target.value);
                if (error) setError('');
              }}
              className="form-item-textarea"
            />
            <div className="char-counter-right">
              {description.length}/500
            </div>
          </div>

          {/* Two Columns: Priority & Assigned To */}
          <div className="form-two-cols-row">
            {/* Priority */}
            <div className="form-item-block col-half">
              <label className="form-item-label">
                Priority <span className="label-asterisk">*</span>
              </label>
              <div className="select-with-dot-wrapper">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="form-item-select"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            {/* Assigned To */}
            <div className="form-item-block col-half">
              <label className="form-item-label">
                Assigned To <span className="label-asterisk">*</span>
              </label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="form-item-select"
              >
                <option value="">Select employee</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Buttons Row */}
          <div className="form-submit-buttons-row">
            <Link to="/tickets" className="figma-btn-cancel">
              Cancel
            </Link>
            <button type="submit" className="figma-btn-submit">
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
