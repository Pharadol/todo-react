import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BASE_URL = "https://65fd7b5c9fc4425c65320e54.mockapi.io/";

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");

  async function fetchTodo() {
    try {
      const response = await axios.get(`${BASE_URL}/todo`);
      setTodos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteTodo(id) {
    try {
      setIsLoading(true);
      await axios.delete(`${BASE_URL}/todo/${id}`);
      await fetchTodo();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function postTodo() {
    try {
      setIsLoading(true);
      await axios.post(`${BASE_URL}/todo`, { list: inputValue });
      await fetchTodo();
      setInputValue("");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={postTodo}>Create</button>
      </form>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div>
          {todos.map((todo, index) => (
            <div key={index}>
              {index + 1} {todo.list} {todo.status}
              <Link to={`/todo/${todo.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={async () => await deleteTodo(todo.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
