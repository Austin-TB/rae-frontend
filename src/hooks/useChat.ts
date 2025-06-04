import { useState } from 'react';
import type { Message } from '../types';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (messageOverride?: string) => {
    const currentMessage = messageOverride || input;
    if (!currentMessage.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage
    };

    setMessages(prev => [...prev, userMessage]);
    if (!messageOverride) {
      setInput('');
    }
    setLoading(true);

    try {
      // const response = await fetch('https://rae-backend.onrender.com/chat', {
      const response = await fetch('http://localhost:8000/chat', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: currentMessage,
          conversation_history: messages
        })
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'Sorry, I encountered an error.'
      };

      setMessages(prev => [...prev, assistantMessage]);
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

  return {
    messages,
    input,
    loading,
    setInput,
    sendMessage
  };
}; 