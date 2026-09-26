import { PRIORITY_CONFIG } from '../utils/ticketUtils';

const PriorityBadge = ({ priority = 'Low' }) => {
  const config = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG['Low'];

  return (
    <span
      className="figma-priority-pill"
      style={{
        backgroundColor: config.bg,
        color: config.color
      }}
    >
      {config.label}
    </span>
  );
};

export default PriorityBadge;
