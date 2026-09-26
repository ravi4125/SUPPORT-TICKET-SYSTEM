import { STATUS_CONFIG } from '../utils/ticketUtils';

const StatusBadge = ({ status = 'Open' }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG['Open'];

  return (
    <span
      className="figma-status-pill"
      style={{
        backgroundColor: config.bg,
        color: config.color
      }}
    >
      <span
        className="figma-status-dot"
        style={{ backgroundColor: config.dotColor }}
      />
      {config.label}
    </span>
  );
};

export default StatusBadge;
