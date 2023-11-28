import React from 'react';
import './TitleBar.css';
import closeIcon from '../../images/close.png';

interface ITitleBar {
  title: string;
  description?: string;
  onClose: () => void;
}

const TitleBar: React.FC<ITitleBar> = ({ title, description, onClose }): React.ReactElement => {
  const formatTitle = (title: string): string => {
    return title.replace(/(\d{2})(\d+)/, '$1 $2');
  };

  const formattedTitle = formatTitle(title);

  return (
    <div className="titleBar-container">
      <div className="titleBar-text-container">
        <h2 className="titleBar-title">{formattedTitle}</h2>
        {description && <h3 className="titleBar-description">{description}</h3>}
      </div>
      <button className="titleBar-close" onClick={onClose}>
        <img src={closeIcon} alt="closeIcon" />
      </button>
    </div>
  );
};

export default TitleBar;
