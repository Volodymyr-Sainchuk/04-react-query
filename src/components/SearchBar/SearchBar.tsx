import styles from "./SearchBar.module.css";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleFormAction = (formData: FormData) => {
    const value = formData.get("query")?.toString().trim() ?? "";

    if (value) {
      onSubmit(value);
      setQuery("");
    } else {
      toast.error("Please enter your search query.");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <header className={styles.header}>
        <div className={styles.container}>
          <a className={styles.link} href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
            Powered by TMDB
          </a>

          <form className={styles.form} action={handleFormAction}>
            <input
              className={styles.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className={styles.button} type="submit">
              Search
            </button>
          </form>
        </div>
      </header>
    </>
  );
}
