import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuestsPage from "./pages/QuestsPage";
import QuestForm from "./pages/QuestForm";
import QuestDetailsPage from "./pages/QuestDetailsPage";
import { useEffect, useState } from "react";
import { quests } from "./data/quests";
import { type Quest } from "./types";

function App() {
  const [questList, setQuestList] = useState<Quest[]>(() => {
    const raw = localStorage.getItem("quests");
    if (!raw) return quests;

    try {
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return quests;

      return (parsed as Quest[]).map((q) => ({
        ...q,
        completed: Boolean(q.completed),
      }));
    } catch {
      return quests;
    }
  });
  useEffect(() => {
    const questz = JSON.stringify(questList);
    localStorage.setItem("quests", questz);
  }, [questList]);

  function handleAddQuest(newQuest: Quest) {
    setQuestList((prev) => [...prev, newQuest]);
  }

  function handleEditQuest(newQuest: Quest) {
    setQuestList((prev) =>
      prev.map((p) => (p.id === newQuest.id ? newQuest : p))
    );
  }

  function handleRemoveQuest(id: number) {
    setQuestList((prev) => prev.filter((q) => q.id !== id));
  }
  function handleToggleCompleted(id: number) {
    setQuestList((prev) =>
      prev.map((q) => (q.id === id ? { ...q, completed: !q.completed } : q))
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <QuestsPage
              list={questList}
              onRemoveQuest={handleRemoveQuest}
              onComplete={handleToggleCompleted}
            />
          }
        />
        <Route path="/form" element={<QuestForm onSubmit={handleAddQuest} />} />
        <Route
          path="/form/:id"
          element={<QuestForm onSubmit={handleEditQuest} quests={questList} />}
        />
        <Route
          path="/details/:id"
          element={<QuestDetailsPage list={questList} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
