import React from 'react';
import './LoadingSpinner.scss';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner">
        <div className="filling-logo"></div>
        <div className="appearing-logo"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
