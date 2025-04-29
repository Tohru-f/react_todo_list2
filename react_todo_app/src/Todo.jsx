import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { v4 as uuidv4 } from "uuid"; 

export const Todo = () => {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([])
  const [editingText, setEditingText] = useState("");

  const completedNumber = todos.filter(todo => todo.checked).length;

  const uncompletedNumber = todos.length - completedNumber;

  const onChangeTodoText = (e) => {
    setTodoText(e.target.value);
  }

  const onClickAdd = () => {
    if(todoText === "") return;
    const newTodo = {
      id: uuidv4(),
      text: todoText,
      editing: false,
      checked: false
    }
    setTodos([...todos, newTodo])
    setTodoText("");
  }

  const onClickDelete = (id) => {
    let result = confirm("本当に削除してもよろしいですか？");
    if (result) {
      setTodos(todos.filter(todo => todo.id !== id));
    } else {
      return;
    }
  }

  const onClickEdit = (selectedTodo) => {
    setEditingText(selectedTodo.text);
    setTodos(todos.map(todo => todo.id === selectedTodo.id ? {...todo, editing: true} : {...todo, editing: false}))
  }

  const onClickSave = (id) => {
    setTodos(todos.map((todo) => todo.id === id ? {...todo, text: editingText, editing: false} : todo))
  }

  const onClickCheckBox = (id) => {
    setTodos(todos.map((todo) => todo.id === id ? {...todo, checked: !todo.checked} : todo))
  }

  return (
    <>
      <div className='input-area'>
        <input placeholder='TODOを入力' value={todoText} onChange={onChangeTodoText} />
        <button onClick={onClickAdd}>保存</button>
      </div>
      <div className='incomplete-area'>
        <p className='title'>TODOリスト</p>
        <ul className='parent-list'>
          {todos.map((todo) => {
            return (
              <li key={todo.id} className='parent-list'>
                <div className='list-row'>
                  {todo.checked ? (
                    <input type="checkbox" onClick={() => onClickCheckBox(todo.id)} checked={true} readOnly />
                  ) : (
                    <input type="checkbox" onClick={() => onClickCheckBox(todo.id)} checked={false} readOnly/>
                  )}
                  {todo.editing ? (
                    <>
                      <input value={editingText} onChange={(e) => setEditingText(e.target.value)}/>
                      <button onClick={() => onClickSave(todo.id)}>保存</button>
                    </>
                  ) : (
                    <>
                      <p className='todo-item'>{todo.text}</p>
                      <button onClick={() => onClickEdit(todo)}>編集</button>
                      <button onClick={() => onClickDelete(todo.id)}>削除</button>
                    </>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <div className='count-area'>
        <p className='title'>現在のTODO状況</p>
        <p className="count-list">{`全てのタスク：${todos.length} 完了済み：${completedNumber} 未完了：${uncompletedNumber}`}</p>
      </div>
    </>
  )
}