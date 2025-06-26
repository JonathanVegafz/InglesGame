import React, { useState } from 'react';
import './App.css'; // Asegúrate de tener un archivo CSS para estilos básicos

function App() {
  const [text, setText] = useState('');

  const speak = () => {
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Voz en inglés americano
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🗣️ Pronunciación con voz del navegador</h2>
      <input
        type="text"
        placeholder="Escribe en inglés..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: 10, fontSize: 16, width: '80%' }}
      />
      <br /><br />
      <button onClick={speak} style={{ padding: 10, fontSize: 16 }}>
        Escuchar
      </button>
    </div>
  );
}

export default App;
