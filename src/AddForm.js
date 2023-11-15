import './css/AddForm.css';
import { useState } from "react";
import React from "react";


const AddForm = (props) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [color, setColor] = useState(["black", 0]);
  const [checkColors, setCheckColors] = useState([true, false, false, false, false, false]);
  const [editId, setEditId] = useState('');

  React.useEffect(() => {
    if (props.editTodo[0] !== undefined) {
      let editDate = props.editTodo[0].year + "-" + props.editTodo[0].month + "-" + props.editTodo[0].day;
      let editTime = props.editTodo[0].hour + ":" + props.editTodo[0].minute;
      let editTitle = props.editTodo[0].title;
      let editColor = props.editTodo[0].color;
      let editNum = props.editTodo[0].num;
      let colors = [false, false, false, false, false, false];
      colors.splice(editNum, 1, true)
      setDate(editDate);
      setTime(editTime);
      setTitle(editTitle);
      setColor([editColor, editNum]);
      setCheckColors(colors);
      setEditId(props.editTodo[0].id);
    }
  }, [props.editTodo]);

  const handleDateChange = (e) => {
    setDate(e.currentTarget.value);
  };
  const handleTimeChange = (e) => {
    setTime(e.currentTarget.value);
  };
  const handleTextChange = (e) => {
    setTitle(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let ymd = date.split('-');
    let times = time.split(':');
    let newEdtId = editId !== undefined ? editId : "";
    props.onSubmit(ymd[0], ymd[1], ymd[2], times[0], times[1], color[0], color[1], title, newEdtId);
    setDate('');
    setTime('');
    setTitle('');
    setEditId('');
    handleClickColor("black", 0);
    props.handleOpneForm();
  };

  const handleCancel = () => {
    setDate('');
    setTime('');
    setTitle('');
    setEditId('');
    handleClickColor("black", 0);
    props.handleOpneForm();
  };

  const handleClickColor = (color, num) => {
    setColor([color, num]);
    setCheckColors(
      checkColors.map((checkColor, index) => {
        return index === num ? true : false;
      })
    );
  }

  const selectColor = (color, check) => {
    if (!check) {
      return (`${color}`);
    } else {
      return (`${color} ${"select"}`);
    }
  }

  return (
    <>
      <div className={props.showaddForm()}>
        <div className="overlay">
          <div>
            <div className="top">
              <h1>Todo情報</h1>
            </div>
            <p>日付： <input type="date" value={date} onChange={handleDateChange} /></p>
            <p>時間： <input type="time" value={time} onChange={handleTimeChange} /></p>
            <p>内容： <input type="text" value={title} onChange={handleTextChange} /></p>

            <ul>
              <p>色：
                <li className={selectColor("black", checkColors[0])} onClick={() => handleClickColor("black", 0)}></li>
                <li className={selectColor("gray", checkColors[1])} onClick={() => handleClickColor("gray", 1)}></li>
                <li className={selectColor("blue", checkColors[2])} onClick={() => handleClickColor("blue", 2)}></li>
                <li className={selectColor("green", checkColors[3])} onClick={() => handleClickColor("green", 3)}></li>
                <li className={selectColor("yellow", checkColors[4])} onClick={() => handleClickColor("yellow", 4)}></li>
                <li className={selectColor("red", checkColors[5])} onClick={() => handleClickColor("red", 5)}></li>
              </p>
            </ul>

            <div className="btnarea">
              <button onClick={handleSubmit}>OK</button>
              <button onClick={handleCancel}>CANCEL</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddForm;