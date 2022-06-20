import React, { useState, useEffect } from "react";
import Li from "./li.jsx";
import { v4 as uuidv4 } from "uuid";
import CloseButton from "./closeButton.jsx";

//create your first component
const Home = () => {
  const [task, setTask] = useState("");

  const [listTodo, setListTodo] = useState([]);

  const handleAdd = () => {
    // add item

    setListTodo(listTodo.concat({ name: task, id: uuidv4() }));

    console.log(listTodo);
  };

  const deleteItem = (index) => () =>
    setListTodo((listTodo) => listTodo.filter((_, i) => i !== index));

  const taskGenerator = () => {
    if (listTodo.length == 0) {
      return <Li>No tasks, add a task.</Li>;
    } else {
      return listTodo.map((item, index) => (
        <Li key={item.id}>
          {item.name}
          <CloseButton func={deleteItem(index)} />
        </Li>
      ));
    }
  };

  const itemsLeft = () => {
    if (listTodo.length == 1) {
      return "Item Left";
    } else {
      return "Items Left";
    }
  };

  return (
    <>
      <div className="header">
        <div className="headerName">Todo</div>
        <input
          type="text"
          onChange={(e) => setTask(e.target.value)}
          placeholder="What needs to be done?"
          onKeyPress={(e) => {
            e.key === "Enter" ? handleAdd() : null;
          }}
        />
      </div>
      <div className="todoList">
        <ul>{taskGenerator()}</ul>
      </div>
      <div className="footer">
        {listTodo.length + " "}
        {itemsLeft()}
      </div>
    </>
  );
};

export default Home;
