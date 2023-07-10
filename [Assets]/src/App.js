import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/layout"
import Game from "./pages/game";
import Menu from "./pages/main_menu";
import NoPage from "./pages/no_page";
import Credits from "./pages/credits";
import Settings from './pages/settings';
import Achievements from './pages/achievements';
import Help from './pages/help';
import BackgroundMusic from './components/musicplayer';
import SoundEffects from './components/soundeffects';

import { DEFAULT_SETTINGS } from './utils/constants';
import { useLocalStorage } from './utils/hooks/use_local_storage';

const App = () => {
  const [settings, setSettings] = useLocalStorage("settings", DEFAULT_SETTINGS)
  const [stats, setStats] = useLocalStorage("stats", {})
  const [obtainedAchievements, setObtainedAchievements] = useLocalStorage("obtainedAchievements", [])

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
          <Route path="help" element={<Help />}/>
          <Route path="credits" element={<Credits />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
      <SoundEffects />
      <BackgroundMusic/>
    </BrowserRouter>
  );
};

export default App;
