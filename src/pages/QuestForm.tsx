import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type Quest } from "../types";

type QuestFormProps = {
  onSubmit: (quest: Quest) => void;
  quests?: Quest[];
};

export default function QuestForm({ onSubmit, quests }: QuestFormProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const existingQuest =
    isEdit && quests ? quests.find((q) => q.id === Number(id)) : undefined;

  const [title, setTitle] = useState(existingQuest?.title ?? "");
  const [description, setDescription] = useState(
    existingQuest?.description ?? ""
  );
  const [difficulty, setDifficulty] = useState(
    existingQuest?.difficulty ?? "Hard"
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isEdit && existingQuest) {
      onSubmit({
        ...existingQuest,
        title,
        description,
        difficulty,
      });
    } else {
      onSubmit({
        id: Date.now(),
        title,
        description,
        difficulty,
        completed: false,
      });
    }

    navigate(-1);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <label>Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Quest title"
      />

      <label>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe the quest…"
      />

      <label>Difficulty</label>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="Easy">Easy</option>
        <option value="Normal">Normal</option>
        <option value="Hard">Hard</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}
