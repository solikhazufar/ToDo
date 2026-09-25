import { useEffect, useState } from "react";
import { IoCheckmark, IoClose } from "react-icons/io5";
import styles from "./App.module.css";
import Settings_Module from "./components/Settings_Module/Settings_Module.jsx";
import ThemeToggler from "./components/ThemeToggler/ThemeToggler.jsx";
import NoteInput from "./components/InputToggler/Input.jsx";

function readSavedNotes() {
  // Read the notes saved by the browser. localStorage can only store text,
  // so JSON.parse turns that text back into a JavaScript array.
  const savedNotes = localStorage.getItem("notes");
  return savedNotes ? JSON.parse(savedNotes) : [];
}

function App() {
  // notes is the current list; setNotes is how we update that list.
  // readSavedNotes runs once when the app first loads.
  const [notes, setNotes] = useState(readSavedNotes);

  // Save the latest notes array whenever notes changes.
  // JSON.stringify turns the array into text that localStorage can save.
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    // This dependency means the effect runs again only when notes changes.
  }, [notes]);

  // Create a new unfinished note, then add it to the notes array.
  const handleSaveNote = (text) => {
    const newNote = { id: crypto.randomUUID(), text, completed: false };
    setNotes((currentNotes) => [...currentNotes, newNote]);
  };

  // Find the clicked note by id and switch its completed value.
  const toggleNote = (id) => {
    setNotes((currentNotes) =>
      // map makes a new array, changing only the note with the matching id.
      currentNotes.map((note) =>
        // Copy the note's other values, then reverse completed true/false.
        note.id === id ? { ...note, completed: !note.completed } : note,
      ),
    );
  };

  // Keep every note except the one whose delete button was clicked.
  const deleteNote = (id) => {
    setNotes((currentNotes) => currentNotes.filter((note) => note.id !== id));
  };

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

        {/* Give the input component the function it calls when a task is submitted. */}
        <NoteInput onAdd={handleSaveNote} />

        <section className={styles.notesSection} aria-label="Your tasks">
          <div className={styles.listHeading}>
            <span>{notes.length} {notes.length === 1 ? "task" : "tasks"}</span>
          </div>

          {/* Show an empty message when there are no notes; otherwise draw the list. */}
          {notes.length === 0 ? (
            <p className={styles.emptyState}>Empty as my motivation on Monday 😅. Let's start adding stuff.</p>
          ) : (
            <ul className={styles.notesList}>
              {/* Make one list row for every note in the notes array. */}
              {notes.map((note) => (
                // React uses the unique id to keep track of each row as the list changes.
                <li className={styles.note} key={note.id}>
                  <button
                    type="button"
                    // Add the completed style only when this note is marked done.
                    className={`${styles.completeButton} ${note.completed ? styles.completed : ""}`}
                    // Pass this note's id to the function so only this note changes.
                    onClick={() => toggleNote(note.id)}
                  >
                    {/* Show the checkmark only for completed notes. */}
                    {note.completed && <IoCheckmark aria-hidden="true" />}
                  </button>
                  {/* Use different text styling when the note is completed. */}
                  <span className={note.completed ? styles.noteTextCompleted : styles.noteText}>
                    {note.text}
                  </span>
                  <button
                    type="button"
                    className={styles.deleteButton}
                    aria-label={`Delete ${note.text}`}
                    // Pass this note's id so the delete function removes the right row.
                    onClick={() => deleteNote(note.id)}
                  >
                    <IoClose aria-hidden="true" />
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
