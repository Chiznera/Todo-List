import React, { useState, useEffect } from "react";
import Li from "./li.jsx";
import { v4 as uuidv4 } from "uuid";

//create your first component
const Home = () => {
  const [task, setTask] = React.useState("");

  const listTodo = [];

  function handleChange() {
    // track input field's state
    {
      (e) => setTask(e.target.value);
    }
  }

  function handleAdd() {
    // add item
    const newList = listTodo.concat({ task, id: uuidv4() });

    setTask(newList);
  }

  const taskGenerator = () => {
    if (listTodo.length == 0) {
      return <Li>No tasks, add a task.</Li>;
    } else {
      return listTodo.map((item) => <Li key={item.id}>{item.name}</Li>);
    }
  };

  return (
    <>
      <div className="header">Todo</div>
      <div className="todoList">
        <input
          type="text"
          onChange={handleChange}
          placeholder="What needs to be done?"
          onKeyPress={(e) => {
            e.key === "Enter" ? handleAdd() : null;
          }}
        />
        <ul>{taskGenerator()}</ul>
      </div>
      <div className="footer">{}</div>
    </>
  );
};

export default Home;
