import { useState } from "react";
import { VscAdd } from "react-icons/vsc";
import styles from "./Input.module.css";

function Input({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;

    onAdd(trimmedText);
    setText("");
  };

  return (
    <div className={styles.input}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What would you like to do?"
          aria-label="New task"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button className={styles.addButton} type="submit">
          <VscAdd aria-hidden="true" />
          <span>Add task</span>
        </button>
      </form>
    </div>
  );
}

export default Input;
