import { useState } from "react";
import PropTypes from "prop-types";
import logo from "../assets/logo-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropDown from "../components/HeaderDropDown";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import ElipsisMenu from "./ElipsisMenu";
import DeleteModal from "../modals/DeleteModal";
import boardSlice from "../redux/boardSlice";
// Removed unused import: AddEditBoardModal from "../modals/AddEditBoardModal";

Header.propTypes = {
  boardModalOpen: PropTypes.bool.isRequired,
  setBoardModalOpen: PropTypes.func.isRequired,
};

function Header({ boardModalOpen, setBoardModalOpen }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const dispatch = useDispatch();

  const setOpenEditModal = () => {
    setBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardSlice.actions.deleteBoard());
      dispatch(boardSlice.actions.setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };
  const boards = useSelector((state) => state.boards);
  const activeBaord = boards.find((board) => board.isActive);
  if (!activeBaord && boards.length > 0) {
    dispatch(boardSlice.actions.setBoardActive({ index: 0 })); // Added missing closing parenthesis
  }
  const board = boards.find((board) => board.isActive);
  return (
    <div className="p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0">
      <div className=" flex justify-between dark:text-white items-center">
        {/* leftside */}
        <div className=" flex items-center space-x-2  md:space-x-4">
          <img src={logo} alt="logo" className="h-6 w-6 " />
          <h3 className="md:text-4xl  hidden md:inline-block font-bold  font-sans">
            kanban
          </h3>
          <div className=" flex items-center ">
            <h3 className=" truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans  ">
              {board?.name || "Boards"}
            </h3>
            <img
              src={openDropdown ? iconUp : iconDown}
              alt=" dropdown icon"
              className=" w-3 ml-2 md:hidden"
              onClick={() => setOpenDropdown((state) => !state)}
            />
          </div>
        </div>
        {/* righ Side */}
        <div className="flex space-x-4 items-center md:space-x-6">
          <button
            className="button hidden md:block"
            onClick={() => {
              setIsTaskModalOpen((prevstate) => !prevstate);
            }}
          >
            +Add Task
          </button>
          <button
            className="button py-1 px-3 md:hidden"
            onClick={() => {
              setIsTaskModalOpen((prevstate) => !prevstate);
            }}
          >
            +
          </button>
          <img
            src={elipis}
            alt="elipis"
            className=" cursor-pointer h-6"
            onClick={() => {
              setOpenDropdown(false);
              setBoardType("edit");
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
          />
        </div>
        {openDropdown && (
          <HeaderDropDown
            setOpenDropdown={setOpenDropdown}
            setBoardModalOpen={setBoardModalOpen}
          />
        )}
      </div>
      {boardModalOpen && (
        <AddEditBoardModal
          setBoardType={setBoardType}
          type={boardType}
          setBoardModalOpen={setBoardModalOpen}
        />
      )}
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}

      {isElipsisMenuOpen && (
        <ElipsisMenu
          type="Boards"
          setOpenEditModal={setOpenEditModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}

export default Header;
