import React from "react";
import './css/Todos.css';


const Todos = (props) => {
  const handleCheckboxChange = () => {
    props.onCheckboxChane(props.todo.id);
  };

  const handleDeleteClick = () => {
    props.onDeleteClick(props.todo.id);
  };
  
  const handleEditClick = () => {
    props.handleEdit(props.todo.id);
  };

  const dateSelect = () => {
    if (
      props.todo.year !== "" &&
      !props.dateLists.some(dateLists => dateLists.year === props.todo.year)
    ) {
      props.dateSelect(props.todo.year, props.todo.month, props.todo.day);
      return (
        <>
          <h1>{props.todo.year}年{props.todo.month.replace(/^0+/, '')}月</h1>
          <h2>{props.todo.day.replace(/^0+/, '')}日</h2>
        </>
      );
    } else if (
      props.todo.year !== "" &&
      !props.dateLists.some(dateLists => dateLists.month === props.todo.month)
    ) {
      props.dateSelect(props.todo.year, props.todo.month, props.todo.day);
      return (
        <>
          <h1>{props.todo.year}年{props.todo.month.replace(/^0+/, '')}月</h1>
          <h2>{props.todo.day.replace(/^0+/, '')}日</h2>
        </>
      );
    } else if (
      props.todo.year !== "" &&
      !props.dateLists.some(dateLists => dateLists.day === props.todo.day)
    ) {
      props.dateSelect(props.todo.year, props.todo.month, props.todo.day);
      return (
        <>
          <h2>{props.todo.day.replace(/^0+/, '')}日</h2>
        </>
      );
    } else if (
      props.todo.year !== "" &&
      !props.dateLists.some(dateLists => dateLists.day === props.todo.day)
    ) {
      props.dateSelect(props.todo.year, props.todo.month, props.todo.day);
      return;
    }
  };

  const displayTime = () => {
    if (props.todo.hour !== "") {
      return (
        <>
          <p className="time">{props.todo.hour}:{props.todo.minute}</p>
          <p className="borderline"></p>
        </>
      );
    }
  };

  return (
    <>
      <ul>
        {dateSelect()}
        <li>
          <input
            type="checkbox"
            checked={props.todo.isCompleted}
            onChange={handleCheckboxChange}
          />
          <span>
            <p className={props.todo.color}></p>
            {displayTime()}
            <p className="title">{props.todo.title}</p>
          </span>
          <img src="../images/edit.jpg" alt="Edit" className="editbtn" onClick={handleEditClick} />
          <button onClick={handleDeleteClick}>×</button>
        </li>
      </ul>
    </>
  );
};

export default Todos;