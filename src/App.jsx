import { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { useDispatch, useSelector } from "react-redux";
import boardSlice from "./redux/boardSlice";
import EmptyBoard from "./components/EmptyBoard";

function App() {
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  if (!activeBoard && boards.length > 0)
    dispatch(boardSlice.actions.setBoardActive({ index: 0 }));
  return (
    <div className="overflow-hidden overflow-x-scroll">
      {boards.length > 0 ? (
        <>
          <Header
            boardModalOpen={boardModalOpen}
            setBoardModalOpen={setBoardModalOpen}
          />
          <Home
            boardModalOpen={boardModalOpen}
            setBoardModalOpen={setBoardModalOpen}
          />
        </>
      ) : (
        <EmptyBoard type="add" />
      )}
    </div>
  );
}

export default App;
