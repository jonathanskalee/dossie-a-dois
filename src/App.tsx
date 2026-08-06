import { useGame } from "./store/gameStore";
import { useTheme } from "./hooks/useTheme";
import { TitleScreen } from "./screens/TitleScreen";
import { CaseSelectScreen } from "./screens/CaseSelectScreen";
import { CaseIntroScreen } from "./screens/CaseIntroScreen";
import { HandoffScreen } from "./screens/HandoffScreen";
import { DetectiveScreen } from "./screens/DetectiveScreen";
import { PeritoScreen } from "./screens/PeritoScreen";
import { BoardScreen } from "./screens/BoardScreen";
import { AccusationScreen } from "./screens/AccusationScreen";
import { EpilogueScreen } from "./screens/EpilogueScreen";
import { ResultScreen } from "./screens/ResultScreen";

export function App() {
  const screen = useGame((s) => s.screen);
  useTheme();

  switch (screen) {
    case "title":
      return <TitleScreen />;
    case "caseSelect":
      return <CaseSelectScreen />;
    case "caseIntro":
      return <CaseIntroScreen />;
    case "handoff":
      return <HandoffScreen />;
    case "detective":
      return <DetectiveScreen />;
    case "perito":
      return <PeritoScreen />;
    case "board":
      return <BoardScreen />;
    case "accusation":
      return <AccusationScreen />;
    case "epilogue":
      return <EpilogueScreen />;
    case "result":
      return <ResultScreen />;
  }
}
