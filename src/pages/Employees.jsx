import { useState, useEffect } from 'react';
import { api } from '../services/api';

const Employees = () => {
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const load = async () => {
      const u = await api.getUsers();
      const t = await api.getTickets();
      setUsers(u);
      setTickets(t);
    };
    load();
  }, []);

  return (
    <div className="employees-view-container">
      <h1 className="employees-page-title">Employees</h1>

      <div className="figma-table-card">
        <div className="figma-table-wrapper">
          <table className="figma-data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Assigned Tickets</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const assignedCount = tickets.filter(
                  (t) => Number(t.assigned_to) === Number(user.id)
                ).length;
                return (
                  <tr key={user.id}>
                    <td>
                      <div className="employee-name-pill">
                        <span className="subbox-assignee-avatar">
                          {user.initials || user.name.charAt(0)}
                        </span>
                        <span className="figma-subject-link">{user.name}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className="comment-role-tag">
                        {user.role === 'support' ? 'Support Staff' : 'Employee'}
                      </span>
                    </td>
                    <td>
                      <strong>{assignedCount}</strong>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;
