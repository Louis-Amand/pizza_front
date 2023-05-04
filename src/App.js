import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/public/Navbar';

function App() {
  const [testMessage, setTestMessage] = useState('');

  useEffect(() => {
    const fetchTestMessage = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/test');
        setTestMessage(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du message de test:', error);
      }
    };

    fetchTestMessage();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <h1>Front-end React</h1>
      <p>Message reçu du back-end Java Spring: {testMessage}</p>
    </div>
  );
}

export default App;