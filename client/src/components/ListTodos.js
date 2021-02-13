import React, { Fragment, useState, useEffect } from "react";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  // GET a list of all todos
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const data = await response.json();

      setTodos(data);
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // DELETE a single todo by id
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Todo Id</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.todo_id}</td>
              <td>{todo.description}</td>
              <td>Edit</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
