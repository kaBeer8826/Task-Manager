import { collapseClasses, useScrollTrigger } from "@mui/material";
import React, { useState } from "react";
import { v4 as uuidv4, validate } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
function AddEditBoardModal({ setBoardModalOpen, type }) {
  const [name, setName] = useState("");
  const [newColumns, setNewColumns] = useState([
    { name: "Todo", task: [], id: uuidv4() },
    { name: "Doing", tasks: [], id: uuidv4() },
  ]);
  const [isValid, setIsValid] = useState(true);
  const onDelete = (id) => {
    setNewColumns((prevState) => prevState.filter((cl) => cl.id !== id));
  };

  const validate = () =>{
    setIsValid(false);
    if(!name.trim()){
      return false
    }
    for(let i=0 ;  i <newColumns.length;i++){
      if(!newColumns[i].name.trim()){
        return false
      }
    }
    setIsValid(true)
    return true
  }
  return (
    <div
      className="  fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown bg-yellow-100"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }}
    >
      {/* Modal Section */}

      <div className=" scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl">
        <h3 className=" text-lg ">
          {type === "edit" ? "Edit" : "Add New"} Board
        </h3>
        {/* taskName */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Board Name
          </label>
          <input
            className=" bg-transparent  px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder=" e.g Web Design"
            id="board-name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* Board Columns */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className=" text-sm dark:text-white text-gray-500">
            Board Columns
          </label>
          {newColumns.map((column, index) => (
            <div key={index} className=" flex items-center w-full ">
              <input
                className=" flex-grow px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px] dark:text-black"
                onChange={(e) => {
                  onchange(column.id, e.target.value);
                }}
                type="text"
                value={column.name}
              />
              <img
                src={crossIcon}
                onClick={() => {
                  onDelete(column.id);
                }}
                className=" m-4 cursor-pointer "
              />
            </div>
          ))}
          <div>
            <button
              className="w-full items-center hover:opacity-70 dark:text-[#635fc7] dark:bg-white  text-white bg-[#635fc7] py-2 rounded-full"
              onClick={() => {
                setNewColumns((state) => [
                  ...state,
                  {
                    name: "",
                    task: [],
                    id: uuidv4(),
                  },
                ]);
              }}
            >
              +Add New Column
            </button>
            <button 
              onClick={() =>{
                const isValid = validate();
                if(isValid === true) onsubmit(type)
              }}
            className=" w-full items-center hover:opacity-70 dark:text-white dark:bg-[#635fc7] mt-8 relative  text-white bg-[#635fc7] py-2 rounded-full">
              {type === "add" ? "Create New Board" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEditBoardModal;
