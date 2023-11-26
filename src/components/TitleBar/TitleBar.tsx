import React from 'react';
import './TitleBar.css';
import closeIcon from '../../images/close.png';

interface ITitleBar {
  title: string;
  description?: string;
  onClose: () => void;
}

const TitleBar: React.FC<ITitleBar> = ({ title, description, onClose }): React.ReactElement => {
  return (
    <div className="titleBar_container">
      <h2 className="titleBar_title">{title}</h2>
      {description && <h3>{description}</h3>}
      <button className="titleBar_close" onClick={onClose}>
        <img  src={closeIcon} alt="closeIcon" />
      </button>
    </div>
  );
};

export default TitleBar;
