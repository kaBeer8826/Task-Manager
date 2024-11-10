import React, { useState } from "react";
import AddEditBoardModal from "../modals/AddEditBoardModal";

function EmptyBoard({ type }) {
  const [BoardModalOpen, setBoardModalOpen] = useState(false);
  return (
    <div className="bg-white dark:bg-[#2b2c37] h-screen w-screen flex flex-col items-center justify-center">
      <h3 className="text-gray-500 font-bold">
        {type == "edit"
          ? "This baord is empty crate a new column to get started"
          : "there are no baords available . create a new baord to get started"}
      </h3>
      <button
        onClick={() => {
          setBoardModalOpen(true);
        }}
        className="w-full items-center max-w-xs font-bold hover:opacity-70 dark:text-white dark:bg-[#635fc7] mt-8 relative  text-white bg-[#635fc7] py-2 rounded-full"
      >
        {type === "edit" ? "+ Add New Column" : "+ Add New Board"}
      </button>
      {BoardModalOpen && (
        <AddEditBoardModal
          type={type}
          setBoardModalOpen={setBoardModalOpen}
        />
      )}
    </div>
  );
}

export default EmptyBoard;
