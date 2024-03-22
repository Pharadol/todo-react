import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "https://65fd7b5c9fc4425c65320e54.mockapi.io/";

export default function Edit() {
  const { id } = useParams();
  const [todo, setTodo] = useState({ list: "" });
  const [currentList, setCurrentList] = useState('');
  // list: '' => to prevent input undefine first time binding

  async function fetchTodo() {
    try {
      const response = await axios.get(`${BASE_URL}/todo/${id}`);
      setTodo(response.data);
      setCurrentList(response.data.list)
    } catch (error) {
      console.log(error);
    }
  }
  function handleListChange(event) {
    setTodo((prevState) => ({
      ...prevState,
      list: event.target.value,
    }));
  }
  async function updateList() {
    if (currentList.trim() !== todo.list.trim()) {
      try {
        await axios.put(`${BASE_URL}/todo/${id}`, {list: todo.list});
        await fetchTodo();
        alert('update successful')
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    fetchTodo(id);
  }, [id]);

  return (
    <>
      Edit {id}
      <input type="text" onChange={handleListChange} value={todo.list} />
      <button onClick={updateList}>Edit</button>
    </>
  );
}
