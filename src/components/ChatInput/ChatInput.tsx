import { useRef } from 'react';
import './ChatInput.css';

interface ChatInputProps {
  input: string;
  loading: boolean;
  selectedFile: File | null;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearFile: () => void;
}

export const ChatInput = ({
  input,
  loading,
  selectedFile,
  onInputChange,
  onSendMessage,
  onFileChange,
  onClearFile
}: ChatInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="chat-input">
      {selectedFile && (
        <div className="chat-input__selected-file">
          <span>{selectedFile.name}</span>
          <button onClick={onClearFile} className="chat-input__clear-file-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      )}
      <div className="chat-input__container">
        <input type="file" ref={fileInputRef} onChange={onFileChange} style={{ display: 'none' }} />
        <button onClick={handleUploadClick} className="chat-input__upload-button" disabled={loading}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.44 11.05l-9.19 9.19a6.003 6.003 0 1 1-8.49-8.49l9.19-9.19a4.002 4.002 0 0 1 5.66 5.66l-9.2 9.19a2.001 2.001 0 1 1-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message or upload a file..."
          disabled={loading}
          className="chat-input__textarea"
          rows={1}
        />
        <button
          onClick={onSendMessage}
          disabled={(!input.trim() && !selectedFile) || loading}
          className="chat-input__button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}; 