import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MaidleGame from './MaidleGame'; 
import About from './About'; // Example: another page
import { ConfigProvider } from 'antd';
import config from './theme/light.ts';


function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tasks/')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  return (
    <ConfigProvider
      theme={config}
    >
      <Router>
        <div className="App">
          <Routes>
            <Route path="/maidle" element={<MaidleGame/>} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
