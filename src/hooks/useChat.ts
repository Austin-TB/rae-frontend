import { useState } from 'react';
import type { Message } from '../types';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const sendMessage = async (messageOverride?: string) => {
    const currentMessage = messageOverride || input;
    if (!currentMessage.trim() && !selectedFile || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage,
      fileName: selectedFile?.name
    };

    setMessages(prev => [...prev, userMessage]);
    if (!messageOverride) {
      setInput('');
    }
    // Don't clear selectedFile here, allow resending or sending with a different message.
    // It will be cleared upon successful send or explicit clear action.
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('message', currentMessage);
      formData.append('conversation_history', JSON.stringify(messages));
      if (selectedFile) {
        formData.append('file', selectedFile, selectedFile.name);
      }

      // const response = await fetch('https://rae-backend.onrender.com/chat', {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        // No 'Content-Type' header for FormData, browser sets it with boundary
        body: formData
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'Sorry, I encountered an error.'
      };

      setMessages(prev => [...prev, assistantMessage]);
      setSelectedFile(null); // Clear file after successful send
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Error: Could not connect to server. Make sure the backend is running on port 8000.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
  };

  return {
    messages,
    input,
    loading,
    selectedFile,
    setInput,
    sendMessage,
    handleFileChange,
    clearSelectedFile
  };
}; 