import Todos from './Todos';
import './css/App.css';
import AddForm from './AddForm';
import { useEffect, useState } from 'react';
import React from "react";


const App = () => {
  const [todos, setTodos] = useState([]);
  const [dateLists, setDateLists] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editTodo, setEditTodo] = useState([]);

  useEffect(() => {
    let saveTodos = [];
    if (localStorage.getItem('todos') === null) {
      saveTodos = [];
    } else {
      saveTodos = JSON.parse(localStorage.getItem('todos'));
    }
    setTodos(saveTodos);
  }, []);

  const updateTodos = (newTodos) => {
    for (let i = 0; i < newTodos.length; i++) {
      if (newTodos[i].year === "") {
        newTodos.sort((a, b) => a.id - b.id);
        newTodos.sort((a, b) => a.minute - b.minute);
        newTodos.sort((a, b) => a.hour - b.hour);
      } else if (newTodos[i].year !== "" && newTodos[i].hour === "") {
        newTodos.sort((a, b) => a.id - b.id);
        newTodos.sort((a, b) => a.day - b.day);
        newTodos.sort((a, b) => a.month - b.month);
        newTodos.sort((a, b) => a.year - b.year);
      } else if (newTodos[i].year === "" && newTodos[i].hour !== "") {
        newTodos.sort((a, b) => a.id - b.id);
        newTodos.sort((a, b) => a.minute - b.minute);
        newTodos.sort((a, b) => a.hour - b.hour);
      } else if (newTodos[i].year !== "" && newTodos[i].hour !== "") {
        newTodos.sort((a, b) => a.id - b.id);
        newTodos.sort((a, b) => a.minute - b.minute);
        newTodos.sort((a, b) => a.hour - b.hour);
        newTodos.sort((a, b) => a.day - b.day);
        newTodos.sort((a, b) => a.month - b.month);
        newTodos.sort((a, b) => a.year - b.year);
      }
    }
    setTodos(newTodos);
    setDateLists([]);
    setEditTodo([]);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    console.log(todos);
  };

  const handlePurgeClick = () => {
    if (!window.confirm('全て削除しますか？')) {
      return;
    }
    const newTodos = todos.filter((todo) => {
      return todo.isCompleted === false;
    });
    updateTodos(newTodos);
  };

  const handleTodoCheckboxChenge = (id) => {
    const newTodos = todos.map((todo) => {
      return {
        id: todo.id,
        year: todo.year,
        month: todo.month,
        day: todo.day,
        hour: todo.hour,
        minute: todo.minute,
        color: todo.color,
        num: todo.num,
        title: todo.title,
        isCompleted: todo.id === id ? !todo.isCompleted : todo.isCompleted,
      }
    });
    updateTodos(newTodos);
  };

  const handleTodoDeleteClick = (id) => {
    if (!window.confirm('削除しますか？')) {
      return;
    }
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    updateTodos(newTodos);
  };

  const dateSelect = (year, month, day) => {
    dateLists.push({ year: year, month: month, day: day });
  };

  const handleEdit = (id) => {
    const newEditTodos = todos.filter((todo) => {
      return todo.id === id;
    });
    setEditTodo(newEditTodos);
    handleOpneForm();
  }

  const todoItems = todos.map((todo) => {
    return (
      <Todos
        key={todo.id}
        todo={todo}
        onDeleteClick={handleTodoDeleteClick}
        onCheckboxChane={handleTodoCheckboxChenge}
        dateLists={dateLists}
        dateSelect={dateSelect}
        handleEdit={handleEdit}
      />
    );
  });

  const handleAddFormSubmit = (year, month, day, hour, minute, color, num, title, editId) => {
    let newTodos;
    if (editId !== "") {
      newTodos = todos.filter((todo) => {
        return todo.id !== editId;
      }); newTodos.push({
        id: editId,
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        color: color,
        num: num,
        title: title,
        isCompleted: false,
      });
    } else {
      newTodos = [...todos];
      newTodos.push({
        id: Date.now(),
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        color: color,
        num: num,
        title: title,
        isCompleted: false,

      });
    }
    updateTodos(newTodos);
  };

  const showaddForm = () => {
    while (dateLists.length !== 0) dateLists.pop();
    return (openForm ? "mask" : "hiden");
  };

  const handleOpneForm = () => {
    setOpenForm(!openForm);
    showaddForm();
  };

  return (
    <>
      <div className="container">
        <header>
          <div className={
            todos.some(todo => todo.isCompleted === true) ? "" : "hiden"
          }>
            <button onClick={handlePurgeClick}>全て削除</button>
          </div>
          <div className="add">
            <button onClick={handleOpneForm}>+</button>
          </div>
        </header>

        <AddForm
          showaddForm={showaddForm}
          handleOpneForm={handleOpneForm}
          onSubmit={handleAddFormSubmit}
          editTodo={editTodo}
        />

        <main>
          <h1>ToDo</h1>
          {todoItems}
        </main>
      </div>
    </>
  );
}

export default App;
