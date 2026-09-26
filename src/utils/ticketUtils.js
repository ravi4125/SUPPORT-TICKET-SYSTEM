// Colors and labels for Status
export const STATUS_CONFIG = {
  'Open': { label: 'Open', bg: '#EBF5FF', color: '#1E40AF', dotColor: '#3B82F6' },
  'In Progress': { label: 'In Progress', bg: '#EFF6FF', color: '#2563EB', dotColor: '#2563EB' },
  'Resolved': { label: 'Resolved', bg: '#DEF7EC', color: '#03543F', dotColor: '#10B981' },
  'Closed': { label: 'Closed', bg: '#F3F4F6', color: '#374151', dotColor: '#9CA3AF' }
};

// Colors and labels for Priority
export const PRIORITY_CONFIG = {
  'High': { label: 'High', bg: '#FDE8E8', color: '#9B1C1C' },
  'Medium': { label: 'Medium', bg: '#FEF08A', color: '#713F12' },
  'Low': { label: 'Low', bg: '#DEF7EC', color: '#03543F' }
};

// Status progression list
export const STATUS_STEPS = ['Open', 'In Progress', 'Resolved', 'Closed'];

// Format ISO date string into: "12 Sep 2026"
export const formatDateShort = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const day = date.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

// Format ISO date string into: "11 Sep 2026, 10:24 AM"
export const formatDateTime = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const shortDate = formatDateShort(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${shortDate}, ${hours}:${minutes} ${ampm}`;
};

// Generate next Ticket ID: e.g. TCK-1026
export const getNextTicketId = (tickets = []) => {
  if (!tickets || tickets.length === 0) return 'TCK-1001';
  const nums = tickets.map(t => {
    const match = (t.ticket_id || '').match(/TCK-(\d+)/i);
    return match ? parseInt(match[1], 10) : 1000;
  });
  const max = Math.max(...nums, 1025);
  return `TCK-${max + 1}`;
};
