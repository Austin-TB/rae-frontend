import './WelcomeMessage.css';
import React from 'react';

interface WelcomeMessageProps {
  noMessages: boolean;
  onSendMessage: (message: string) => void;
}

export const WelcomeMessage = ({ noMessages, onSendMessage }: WelcomeMessageProps) => {
  const isBarMode = !noMessages;

  const handleQueryClick = (query: string) => {
    onSendMessage(query);
  };

  const normalModeStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div
      className={`welcome-message ${isBarMode ? 'bar-mode' : ''}`}
      style={!isBarMode ? normalModeStyles : {}}
    >
      <div className={`welcome-bubble ${isBarMode ? 'bar-mode' : ''}`}>
        <div className={`welcome-title ${isBarMode ? 'bar-mode' : ''}`}>Hi I'm Rae.</div>
        <div className={`welcome-subtitle ${isBarMode ? 'bar-mode' : ''}`}>Ask me Anything!</div>
      </div>
      {!isBarMode && (
        <div className="example-queries-container">
          <div className="example-query" onClick={() => handleQueryClick('What can you do?')}>
            What can you do?
          </div>
          <div className="example-query" onClick={() => handleQueryClick('Analyze this csv file for me.')}>
            Analyze this csv file for me.
          </div>
        </div>
      )}
    </div>
  );
}; 