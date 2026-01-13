import { useNavigate } from "react-router-dom";

import { type Quest } from "../types";

type QuestCardProps = {
  quest: Quest;
  onComplete: (id: number) => void;
};

export default function QuestCard({ quest, onComplete }: QuestCardProps) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`quest-card ${
          quest.completed ? "quest-card--completed" : ""
        }`}
        onClick={() => navigate(`/details/${quest.id}`)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComplete(quest.id);
          }}
        >
          {quest.completed ? "Undo" : "Complete"}
        </button>
        <h1>{quest.title}</h1>
        <p>{quest.description}</p>
      </div>
    </>
  );
}
