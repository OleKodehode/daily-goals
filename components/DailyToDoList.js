import React, { useState, useEffect } from 'react';
import styles from '../styles/DailyTodoGoals.module.css';

const DailyToDoList = () => {
  const [todos, setTodos] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTodos = localStorage.getItem('todos');
      return storedTodos ? JSON.parse(storedTodos) : [];
    }
    return [];
  });
  const [newGoal, setNewGoal] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentDate = new Date();
      const storedDate = localStorage.getItem('date');

      if (!storedDate || new Date(storedDate).getDate() !== currentDate.getDate()) {
        resetCheckboxes();
      }
    }
  }, []);

  const resetCheckboxes = () => {
    const updatedTodos = todos.map((todo) => ({ ...todo, done: false }));
    setTodos(updatedTodos);
    if (typeof window !== 'undefined') {
      localStorage.setItem('date', new Date().toString());
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
  };

  const handleInputChange = (e) => {
    setNewGoal(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddGoal();
    }
  };

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      const newTodo = { goal: newGoal, done: false };
      setTodos([...todos, newTodo]);
      setNewGoal('');
      if (typeof window !== 'undefined') {
        localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
      }
    }
  };

  const handleDeleteGoal = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    if (typeof window !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
  };

  return (
    <div className={styles['todo-list']}>
      <ul>
  {todos.map((todo, index) => (
    <li key={index}>
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => handleCheckboxChange(index)}
        />
        <span>{todo.goal}</span>
      </label>
      <div className={styles['delete-button-wrapper']}>
        <button
          type="button"
          onClick={() => handleDeleteGoal(index)}
          aria-label="Delete goal"
          className={styles['delete-button']}
        >
          Delete
        </button>
      </div>
    </li>
  ))}
</ul>
      <div className={styles['add-button']}>
        <input
          type="text"
          id="newGoal"
          placeholder="Add a new goal..."
          value={newGoal}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={handleAddGoal}
          disabled={!newGoal.trim()}
          aria-label="Add goal"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default DailyToDoList;
