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
import BackgroundMusic from './components/background_music';
import SoundEffects from './components/sound_effects';

import { DEFAULT_SETTINGS } from './utils/constants';
import { useLocalStorage} from './utils/hooks/use_local_storage';
import { useAchievements } from './utils/hooks/use_achievements';

const App = () => {
  const [settings, setSettings] = useLocalStorage("settings", DEFAULT_SETTINGS);
  const [stats, setStats] = useLocalStorage("stats", {});
  const [selectedTrack, setSelectedTrack] = React.useState(0);

  console.log("STATS:", stats);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout stats={stats} settings={settings}/>}>
          <Route index element={<Menu/>}></Route>

          <Route path="game" element={
            <Game 
              setStats={setStats}
              settings={settings}
              setSelectedTrack={setSelectedTrack}
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
              obtainedAchievements={useAchievements(stats, settings)[0]}
            />
          }/>
          <Route path="help" element={<Help />}/>
          <Route path="credits" element={<Credits setStats={setStats}/>} />
          <Route path="*" element={<NoPage setStats={setStats}/>} />
        </Route>
      </Routes>
      <SoundEffects 
        settings={settings}
      />
      <BackgroundMusic 
        selectedTrack={selectedTrack} 
        setSelectedTrack={setSelectedTrack}
        settings={settings}
      />
    </BrowserRouter>
  );
};

export default App;
