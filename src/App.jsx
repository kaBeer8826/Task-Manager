import { useState } from "react";
import Header from "./components/Header";
import Center from "./components/Center";

function App() {
  const [boardModalOpen, setBoardModalOpen] = useState(false);

  return (
    <>
      <Header
        boardModalOpen={boardModalOpen}
        setBoardModalOpen={setBoardModalOpen}
      />
      <Center />
      <h1>labneer</h1>
    </>
  );
}

export default App;
