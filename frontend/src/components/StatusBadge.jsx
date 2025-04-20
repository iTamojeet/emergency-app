import './StatusBadge.css';

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'in_progress':
        return 'status-progress';
      case 'resolved':
        return 'status-resolved';
      default:
        return 'status-pending';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '⏳';
      case 'in_progress':
        return '🔄';
      case 'resolved':
        return '✅';
      default:
        return '⏳';
    }
  };

  return (
    <span className={`status-badge ${getStatusColor(status)}`}>
      {getStatusIcon(status)} {status.replace('_', ' ')}
    </span>
  );
};

export default StatusBadge; 