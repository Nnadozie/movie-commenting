import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div id="chat">
      <ul id="messages"></ul>

      <form id="message-form">
        <input id="message-input" type="text" />
        <button id="message-btn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
