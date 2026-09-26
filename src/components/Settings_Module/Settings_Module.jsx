import { useState } from "react";
import { IoClose, IoSettingsSharp } from "react-icons/io5";
import styles from "./Settings_Module.module.css";

function Settings_Module() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.openButton}
        label="Open settings"
        expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <IoSettingsSharp hidden="true" />
      </button>

      {isOpen && (
        <div
          className={styles.overlay}
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <section className={styles.modal} role="dialog" modal="true" labelledby="settings-title">
            <header className={styles.header}>
              <h2 id="settings-title">Settings</h2>
              <button
                type="button"
                className={styles.iconButton}
                label="Close settings"
                onClick={() => setIsOpen(false)}
              >
                <IoClose hidden="true" />
              </button>
            </header>

            <div className={styles.body}>
              <section className={styles.settingGroup}>
                <h3>Appearance</h3>
                <p>Use the sun or moon button in the top right to switch themes.</p>
              </section>
              <section className={styles.settingGroup}>
                <h3>General</h3>
                <p>Your task list is saved on this device.</p>
              </section>
            </div>

            <footer className={styles.footer}>
              <button type="button" className={styles.doneButton} onClick={() => setIsOpen(false)}>
                Done
              </button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}

export default Settings_Module;
