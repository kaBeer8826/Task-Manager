import { useState } from "react";
import PropTypes from 'prop-types';
import logo from "../assets/logo-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropDown from "../components/HeaderDropDown";
import AddEditBoardModal from "../modals/AddEditBoardModal";
// Removed unused import: AddEditBoardModal from "../modals/AddEditBoardModal";

Header.propTypes = {
  boardModalOpen: PropTypes.bool.isRequired,
  setBoardModalOpen: PropTypes.func.isRequired,
};

function Header({ boardModalOpen, setBoardModalOpen }) {
  const [openDropdown, setOpenDropdown] = useState(false);
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
              Baord
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
          <button className="button hidden md:block">+Add Task</button>
          <button className="button py-1 px-3 md:hidden">+</button>
          <img src={elipis} alt="elipis" className=" cursor-pointer h-6" />
        </div>
        {openDropdown && (
          <HeaderDropDown
            setOpenDropdown={setOpenDropdown}
            setBoardModalOpen={setBoardModalOpen}
          />
        )}
      </div>
      {
        boardModalOpen && (
          <AddEditBoardModal setBoardModalOpen = {setBoardModalOpen}/>
        )
      }
    </div>
  );
}

export default Header;