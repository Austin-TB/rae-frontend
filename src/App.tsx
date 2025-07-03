import './App.css';
import { useEffect } from 'react';
import { MessageList, ChatInput, WelcomeMessage } from './components';
import { useChat } from './hooks/useChat';

const warmupBackend = async () => {
  try {
    console.log('arming up backend...');
    const response = await fetch('https://rae-backend-868097338717.europe-west1.run.app/health', {
    // const response = await fetch('http://localhost:8000/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      console.log('Backend warmup successful');
    } else {
      console.log('Backend warmup responded with status:', response.status);
    }
  } catch (error) {
    console.log('Backend warmup failed:', error);
  }
};

function App() {
  const { 
    messages, 
    input, 
    loading, 
    selectedFile, 
    setInput, 
    sendMessage, 
    handleFileChange, 
    clearSelectedFile 
  } = useChat();

  useEffect(() => {
    warmupBackend();
  }, []);

  return (
    <div className="app">
      <WelcomeMessage 
        noMessages={messages.length === 0}
        onSendMessage={sendMessage} 
      />
      <MessageList messages={messages} loading={loading} />
      <ChatInput 
        input={input}
        loading={loading}
        selectedFile={selectedFile}
        onInputChange={setInput}
        onSendMessage={sendMessage}
        onFileChange={handleFileChange}
        onClearFile={clearSelectedFile}
      />
    </div>
  );
}

export default App;
