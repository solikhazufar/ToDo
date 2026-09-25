import { useState } from "react";
import styles from "./Input.module.css";

function Input({ onAdd }) {
    const [text, setText] = useState("");

    // Runs when the user presses Enter or clicks the submit button.
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
                    placeholder="Let's start adding tasks..."
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                />
                <button className={styles.addButton} type="submit">
                    <span>Add task</span>
                </button>
            </form>
        </div>
    );
}

export default Input;
