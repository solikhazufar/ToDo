import { useEffect, useState } from "react";
import styles from "./ThemeToggler.module.css";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";


function ThemeToggler() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") === "dark" ? "dark" : "light",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <button
      type="button"
      className={styles.button}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      onClick={toggleTheme}
    >
      {theme === "dark" ? <MdDarkMode /> : <CiLight />}
    </button>
  );
}

export default ThemeToggler;
