import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import QuestionsManager from './pages/QuestionsManager/QuestionsManager';
import TestsManager from './pages/TestsManager/TestsManager';

function App() {
  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;
