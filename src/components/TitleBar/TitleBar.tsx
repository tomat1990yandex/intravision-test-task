import React from 'react';
import './TitleBar.css';
import closeIcon from '../../images/close.png';

interface ITitleBar {
  title: string;
  description?: string;
  onClose: () => void;
}

const TitleBar: React.FC<ITitleBar> = ({title, description, onClose}): React.ReactElement => {
  const formatTitle = (title: string): string => {
    return title.replace(/(\d{2})(\d+)/, '$1 $2');
  };

  const formattedTitle = formatTitle(title);

  return (
    <div className="titleBar_container">
      <div className="titleBar__text_container">
        <h2 className="titleBar_title">{formattedTitle}</h2>
        {description && <h3 className="titleBar_description">{description}</h3>}
      </div>
      <button className="titleBar_close" onClick={onClose}>
        <img src={closeIcon} alt="closeIcon"/>
      </button>
    </div>
  );
};

export default TitleBar;
