import './App.css';
import { MessageList, ChatInput, WelcomeMessage } from './components';
import { useChat } from './hooks/useChat';

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
