import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface ITodoItem {
  text: string;
  done: boolean;
  id: number;
}

function TodoItem({ t, checkboxClicked }: { t: ITodoItem, checkboxClicked: (id: number) => void }) {
  return (<p>{t.id}. {!t.done ? t.text : <s>{t.text}</s>}<input type="checkbox" checked={t.done} onClick={() => checkboxClicked(t.id)}></input></p>);
}

function useTodos() {
  const [todos, setTodos] = useState<ITodoItem[]>([]);

  const onButtonClick = (text: string) => {
    const newTodos = [...todos];
    const newTodo: ITodoItem = {
      text,
      done: false,
      id: newTodos.length
    };
    newTodos.push(newTodo)
    setTodos(newTodos);
  };

  const checkboxClicked = (id: number) => {
    const newTodos = [...todos];
    newTodos[id].done = !newTodos[id].done;

    setTodos(newTodos);
  }

  return  {todos, onButtonClick, checkboxClicked };
}

function App() {
  const { todos, onButtonClick, checkboxClicked } = useTodos();
  const [text, setText] = useState<string>("");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setText(e.target.value);
  }
  // EESTECers What is your profession????

  const onAddedTodo = () => {
    onButtonClick(text);
    setText("");
  }
  return (
    <div className="App">
      <input onChange={onChangeInput} value={text} />
      <button onClick={onAddedTodo}>Click Me!</button>
      {todos.map(t => (<TodoItem t={t} checkboxClicked={checkboxClicked} />))}
    </div>
  );
}

export default App;
