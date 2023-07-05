import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/layout"
import Game from "./pages/game";
import Menu from "./pages/main_menu";
import NoPage from "./pages/no_page";
import Credits from "./pages/credits";
import Settings from './pages/settings';
import Achievements from './pages/achievements';

import { DEFAULT_SETTINGS } from './utils/constants';

const recoverSettings = (setSettings) => {
  const settings = JSON.parse(localStorage.getItem("settings"));
  if (settings) {
    setSettings(settings);
  } else {
    localStorage.setItem("settings", JSON.stringify(DEFAULT_SETTINGS));
  }
};

const recoverStats = (setStats) => {
  const stats = JSON.parse(localStorage.getItem("stats"));
  if (stats) {
    setStats(stats);
  } else {
    localStorage.setItem("stats", JSON.stringify({}));
  }
};

const recoverObtainedAchievements = (setObtainedAchievements) => {
  const obtainedAchievements = localStorage.getItem("obtainedAchievements");
  if (obtainedAchievements) {
    setObtainedAchievements(obtainedAchievements);
  } else {
    localStorage.setItem("obtainedAchievements", []);
  }
};

const App = () => {
  const [settings, setSettings] = React.useState(DEFAULT_SETTINGS);
  const [stats, setStats] = React.useState({});
  const [obtainedAchievements, setObtainedAchievements] = React.useState([]);

  React.useEffect(() => {
    recoverSettings(setSettings);
    recoverStats(setStats);
    recoverObtainedAchievements(setObtainedAchievements);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Menu/>}></Route>

          <Route path="game" element={
            <Game 
              setStats={setStats}
              settings={settings}
            />
          }/>
          <Route path="settings" element={
            <Settings
              settings={settings}
              setSettings={setSettings}
            />
          }/>
          <Route path="achievements" element={
            <Achievements
              obtainedAchievements={obtainedAchievements}
            />
          }/>
          <Route path="credits" element={<Credits />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
