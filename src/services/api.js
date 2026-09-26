import { getTickets, saveTickets, getUsers, getComments, saveComments } from '../utils/storage';

// Simple API functions that any beginner can easily explain
export const api = {
  // Login: save user in localStorage
  login: (email) => {
    const isSupport = email.toLowerCase().includes('support');
    const user = {
      email: email,
      name: isSupport ? 'Support Staff' : 'Rahul Patel',
      role: isSupport ? 'support' : 'employee',
      initials: isSupport ? 'SP' : 'RP',
      avatar: isSupport
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  },

  // Get logged-in user
  getCurrentUser: () => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('currentUser');
  },

  // Get all tickets
  getTickets: () => {
    return getTickets();
  },

  // Get ticket by ID
  getTicketById: (id) => {
    const tickets = getTickets();
    return tickets.find(t => String(t.id) === String(id) || t.ticket_id === id);
  },

  // Create new ticket
  createTicket: (newTicketData) => {
    const tickets = getTickets();
    const newId = tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1;
    const ticketId = `TCK-${1025 + tickets.length + 1}`;

    const newTicket = {
      id: newId,
      ticket_id: ticketId,
      subject: newTicketData.subject,
      description: newTicketData.description,
      priority: newTicketData.priority || 'Medium',
      status: 'Open',
      assigned_to: newTicketData.assigned_to ? Number(newTicketData.assigned_to) : null,
      created_at: new Date().toISOString()
    };

    const updatedTickets = [newTicket, ...tickets];
    saveTickets(updatedTickets);
    return newTicket;
  },

  // Update existing ticket (status, assignee)
  updateTicket: (id, updates) => {
    const tickets = getTickets();
    const updatedTickets = tickets.map(t => {
      if (String(t.id) === String(id) || t.ticket_id === id) {
        return { ...t, ...updates };
      }
      return t;
    });
    saveTickets(updatedTickets);
    return updatedTickets.find(t => String(t.id) === String(id) || t.ticket_id === id);
  },

  // Get all users
  getUsers: () => {
    return getUsers();
  },

  // Get comments for a ticket
  getComments: (ticketId) => {
    const allComments = getComments();
    return allComments.filter(c => String(c.ticket_id) === String(ticketId));
  },

  // Add comment
  addComment: (ticketId, commentText, authorName) => {
    const allComments = getComments();
    const newComment = {
      id: Date.now(),
      ticket_id: Number(ticketId),
      comment: commentText,
      author_name: authorName || 'Support Staff',
      created_at: new Date().toISOString()
    };
    const updated = [...allComments, newComment];
    saveComments(updated);
    return newComment;
  }
};
