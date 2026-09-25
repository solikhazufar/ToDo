import { useState } from "react";
import styles from "./NoteModal.module.css";

function NoteModal({ note, onClose, onSave }) {
  const [name, setName] = useState(note?.name ?? "");
  const isEditing = note !== null;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <h2>{isEditing ? "Edit Note" : "New Note"}</h2>
        <input
          type="text"
          aria-label="Note name"
          placeholder="Input your note..."
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.saveButton}
            onClick={() => onSave(name)}
          >
            {isEditing ? "Save" : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteModal;
