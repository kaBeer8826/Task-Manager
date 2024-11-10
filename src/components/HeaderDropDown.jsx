import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import boardIcon from "../assets/icon-board.svg";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import { Switch } from "@headlessui/react";
import useDarkMode from "../Hooks/useDarkMode";
import PropTypes from 'prop-types';
import boardSlice from "../redux/boardSlice";
function HeaderDropDown({ setOpenDropdown, setBoardModalOpen }) {
  HeaderDropDown.propTypes = {
    setOpenDropdown: PropTypes.func.isRequired,
    setBoardModalOpen: PropTypes.func.isRequired,
  };
  const dispatch = useDispatch()
  const boards = useSelector((state) => state.boards);
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(colorTheme === "light");

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <div
      className="py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 dropdown bg-white"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenDropdown(false);
      }}
    >
      {/* dropdown Modal */}
      <div className=" bg-white dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a]  w-full   py-4 rounded-xl">
        <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
          ALL BOARDS ({boards?.length})
        </h3>
      </div>
      <div className=" dropdown-borad  ">
        {boards.map((board, index) => (
          <div
            className={` flex items-baseline space-x-2 px-5 py-4  ${
              board.isActive && " bg-[#635fc7] rounded-r-full text-white mr-8 "
            } `}
            key={index}
            onClick={() => {
              dispatch(boardSlice.actions.setBoardActive({ index }));
            }}
          >
            <img src={boardIcon} className="  filter-white  h-4 " />{" "}
            <p className=" text-lg font-bold dark:text-black ">{board.name}</p>
          </div>
        ))}

        <div onClick={()=>{
            setOpenDropdown(false)
            setBoardModalOpen(true)
        }} 
        className=" flex items-baseline space-x-2  text-[#635fc7] px-5 py-4">
          <img src={boardIcon} className="   filter-white  h-4 " />
          <p className=" text-lg font-bold  ">Create New Board </p>
        </div>
        <div className=" mx-2  p-4  space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
          <img src={lightIcon} alt="sun indicating light mode" />
          <Switch
            checked={darkSide}
            onChange={toggleDarkMode}
            className={`${
              darkSide ? "bg-[#635fc7]" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                darkSide ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <img src={darkIcon} alt="moon indicating dark mode" />
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;
