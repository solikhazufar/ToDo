import { useEffect, useState } from "react";
import { IoCheckmark, IoClose } from "react-icons/io5";
import styles from "./App.module.css";
import Settings_Module from "./components/Settings_Module/Settings_Module.jsx";
import ThemeToggler from "./components/ThemeToggler/ThemeToggler.jsx";
import NoteInput from "./components/InputToggler/Input.jsx";

function readSavedNotes() {
  const savedNotes = localStorage.getItem("notes");
  return savedNotes ? JSON.parse(savedNotes) : [];
}

function App() {
  const [notes, setNotes] = useState(readSavedNotes);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = (text) => {
    const newNote = { id: crypto.randomUUID(), text, completed: false };
    setNotes((currentNotes) => [newNote , ...currentNotes]);
  };

  const toggleNote = (id) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note,
      ),
    );
  };

  const deleteNote = (id) => {
    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== id));
  };

  const deleteAllNotes = () => {
    setNotes([]);
    return;
  }


  return (
    <div className={styles.app}>
      <div className={styles.topBar}>
        <Settings_Module />
        <ThemeToggler />
      </div>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>My Tasks</h1>
        </header>
        
        <NoteInput onAdd={handleSaveNote} />

        <section className={styles.notesSection} label="Your tasks">
          <div className={styles.listHeading}>
            <span>{notes.length} {notes.length === 1 ? "task" : "tasks"}</span>
            <button className= {styles.Delete_btn} onClick={deleteAllNotes}>Delete All</button>
          </div>

          
          {notes.length === 0 ? (
            <p className={styles.emptyState}>Empty as my motivation on Monday 😅. Let's start adding stuff.</p>
          ) : (
            <ul className={styles.notesList}>
              
              {notes.map((note) => (
                <li className={styles.note} key={note.id}>
                  <button
                    type="button"
                    className={`${styles.completeButton} ${note.completed ? styles.completed : ""}`}
                    onClick={() => toggleNote(note.id)}
                  >
                    {note.completed && <IoCheckmark hidden="true" />}
                  </button>
                  <span className={note.completed ? styles.noteTextCompleted : styles.noteText}>
                    {note.text}
                  </span>
                  <button
                    type="button"
                    className={styles.deleteButton}
                    label={`Delete ${note.text}`}
                    onClick={() => deleteNote(note.id)}
                  >
                    <IoClose hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <img className={styles.illustration} src="/images/png/selfie%201.png" alt="" />
      </main>
    </div>
  );
}

export default App;
