import { useNavigate, useParams } from "react-router-dom";
import { type Quest } from "../types";

type QuestDetailsProps = {
  list: Quest[];
};

export default function QuestDetailsPage({ list }: QuestDetailsProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const quest = list.find((q) => q.id === Number(id));

  if (!quest) {
    return (
      <div>
        <p>Quest not found.</p>
        <button onClick={() => navigate(-1)}>Back to quests</button>
      </div>
    );
  }

  return (
    <div className="quest-details">
      <h2>{quest.title}</h2>
      <p>
        <strong>Difficulty:</strong> {quest.difficulty}
      </p>
      <p>{quest.description}</p>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => navigate(`/form/${id}`)}>Edit Quest</button>
        <button onClick={() => navigate(-1)} style={{ marginLeft: "0.5rem" }}>
          Back to quests
        </button>
      </div>
    </div>
  );
}
