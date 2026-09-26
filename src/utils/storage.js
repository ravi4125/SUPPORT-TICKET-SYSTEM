import mockData from '../data/mockData.json';

// Get tickets from localStorage (or use mockData if first time)
export const getTickets = () => {
  const data = localStorage.getItem('tickets');
  if (data) {
    return JSON.parse(data);
  }
  // If no tickets saved yet, save mockData and return it
  localStorage.setItem('tickets', JSON.stringify(mockData.tickets));
  return mockData.tickets;
};

// Save tickets array to localStorage
export const saveTickets = (tickets) => {
  localStorage.setItem('tickets', JSON.stringify(tickets));
};

// Get users list
export const getUsers = () => {
  const data = localStorage.getItem('users');
  if (data) {
    return JSON.parse(data);
  }
  localStorage.setItem('users', JSON.stringify(mockData.users));
  return mockData.users;
};

// Get comments from localStorage
export const getComments = () => {
  const data = localStorage.getItem('comments');
  if (data) {
    return JSON.parse(data);
  }
  localStorage.setItem('comments', JSON.stringify(mockData.comments));
  return mockData.comments;
};

// Save comments to localStorage
export const saveComments = (comments) => {
  localStorage.setItem('comments', JSON.stringify(comments));
};
