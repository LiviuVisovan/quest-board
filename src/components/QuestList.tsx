import { type Quest } from "../types";
import QuestCard from "./QuestCard";
type QuestsPageProps = {
  quests: Quest[];
  onRemoveQuest: (id: number) => void;
  onComplete: (id: number) => void;
};

export default function QuestList({
  quests,
  onRemoveQuest,
  onComplete,
}: QuestsPageProps) {
  return (
    <ul>
      {quests.length === 0 ? (
        <p className="empty">No results. Try changing filters/search.</p>
      ) : (
        quests.map((quest) => (
          <li key={quest.id}>
            <QuestCard quest={quest} onComplete={onComplete} />
            <button onClick={() => onRemoveQuest(quest.id)}>Remove</button>
          </li>
        ))
      )}
    </ul>
  );
}
