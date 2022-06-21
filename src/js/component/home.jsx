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

    setListTodo(listTodo.concat({ label: task, id: uuidv4(), done: false }));

    console.log(listTodo);

    // putListTodo();

    getListTodo();
  };

  const deleteItem = (index) => () =>
    setListTodo((listTodo) => listTodo.filter((_, i) => i !== index));

  const taskGenerator = () => {
    if (listTodo.length == 0) {
      return <Li>No tasks, add a task.</Li>;
    } else {
      return listTodo.map((item, index) => (
        <Li key={item.id}>
          {item.label}
          {item.done}
          <CloseButton func={deleteItem(index)} text="X" />
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

  const getListTodo = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/chiznera", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((respData) => {
        setListTodo(respData);
        console.log(respData);
      });
  };

  const putListTodo = () => {
    let requestBody = [];

    if (listTodo.length == 0) {
      requestBody = [
        {
          label: "No tasks, add a task.",
          done: false,
        },
      ];
    } else {
      requestBody = listTodo;
    }

    fetch("https://assets.breatheco.de/apis/fake/todos/user/chiznera", {
      method: "PUT",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((e) => console.log(e));
    // .then((resp) => resp.json())
    // .then((respData) => {
    //   setListTodo(respData);
    //   console.log(respData);
    // });
  };

  useEffect(() => {
    //code goes here
    getListTodo();
  }, []);

  useEffect(() => {
    //code goes here
    putListTodo();
  }, [listTodo]);

  const deleteAll = () => {
    setListTodo([]);
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
        <div>
          <CloseButton
            specialClass="otherClose"
            func={deleteAll}
            text="Clear All"
          />
        </div>
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
