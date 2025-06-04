import { useState } from 'react';
import type { Message } from '../types';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (messageContent: string, file?: File | null) => {
    if ((!messageContent.trim() && !file) || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent + (file ? ` [Attached: ${file.name}]` : '')
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('message', messageContent);
      formData.append('conversation_history', JSON.stringify(messages));

      if (file) {
        formData.append('file', file);
      }

      // const response = await fetch('https://rae-backend.onrender.com/chat', {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'Sorry, I encountered an error.'
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Error: Could not connect to server or process request.'
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