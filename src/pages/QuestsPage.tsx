import { useNavigate } from "react-router-dom";
import { type Quest } from "../types";
import { useState } from "react";
import QuestList from "../components/QuestList";

type StatusFilter = "all" | "active" | "completed";

type QuestsPageProps = {
  list: Quest[];
  onRemoveQuest: (id: number) => void;
  onComplete: (id: number) => void;
};

export default function QuestsPage({
  list,
  onRemoveQuest,
  onComplete,
}: QuestsPageProps) {
  const [sortType, setSortType] = useState("newest");
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const visibleQuests = list.filter((quest) => {
    if (statusFilter === "active") return !quest.completed;
    if (statusFilter === "completed") return quest.completed;
    return true;
  });

  const navigate = useNavigate();

  const lower = filter.toLowerCase();
  const final = visibleQuests.filter((q) =>
    q.title.toLowerCase().includes(lower)
  );

  if (sortType === "newest") final.sort((a, b) => b.id - a.id);
  if (sortType === "oldest") final.sort((a, b) => a.id - b.id);
  if (sortType === "title")
    final.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div>
      <button onClick={() => navigate("/form")}>New Quest</button>
      <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <option>newest</option>
        <option>oldest</option>
        <option>title</option>
      </select>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
      >
        <option>active</option>
        <option>completed</option>
        <option>all</option>
      </select>
      <input
        placeholder="Filter quests by title…"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <QuestList
        quests={final}
        onComplete={onComplete}
        onRemoveQuest={onRemoveQuest}
      />
    </div>
  );
}
