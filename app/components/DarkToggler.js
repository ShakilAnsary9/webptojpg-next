import { useState, useEffect } from "react";

const DarkToggler = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const userTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (userTheme === "dark" || (!userTheme && systemTheme)) {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const moonIcon = document.querySelector(".moon");
    const sunIcon = document.querySelector(".sun");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      });
    });

    if (moonIcon && sunIcon) {
      observer.observe(moonIcon);
      observer.observe(sunIcon);
    }

    return () => {
      if (moonIcon && sunIcon) {
        observer.unobserve(moonIcon);
        observer.unobserve(sunIcon);
      }
    };
  }, []);

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === "dark" ? (
        <svg
          className="moon cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          fill="#94a3b8"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g>
            <path d="M19.9 2.307a.483.483 0 0 0-.9 0l-.43 1.095a.484.484 0 0 1-.272.274l-1.091.432a.486.486 0 0 0 0 .903l1.091.432a.48.48 0 0 1 .272.273L19 6.81c.162.41.74.41.9 0l.43-1.095a.484.484 0 0 1 .273-.273l1.091-.432a.486.486 0 0 0 0-.903l-1.091-.432a.484.484 0 0 1-.273-.274l-.43-1.095ZM16.033 8.13a.483.483 0 0 0-.9 0l-.157.399a.484.484 0 0 1-.272.273l-.398.158a.486.486 0 0 0 0 .903l.398.157c.125.05.223.148.272.274l.157.399c.161.41.739.41.9 0l.157-.4a.484.484 0 0 1 .272-.273l.398-.157a.486.486 0 0 0 0-.903l-.398-.158a.484.484 0 0 1-.272-.273l-.157-.4Z" />
            <path d="M12 22c5.523 0 10-4.477 10-10c0-.463-.694-.54-.933-.143a6.5 6.5 0 1 1-8.924-8.924C12.54 2.693 12.463 2 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10Z" />
          </g>
        </svg>
      ) : (
        <svg
          className="sun cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          fill="#f59e0b"
          opacity=".7"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <g>
            <path d="M18 12a6 6 0 1 1-12 0a6 6 0 0 1 12 0Z" />
            <path
              fill-rule="evenodd"
              d="M12 1.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75ZM4.399 4.399a.75.75 0 0 1 1.06 0l.393.392a.75.75 0 0 1-1.06 1.061l-.393-.393a.75.75 0 0 1 0-1.06Zm15.202 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 0 1-1.06-1.06l.393-.393a.75.75 0 0 1 1.06 0ZM1.25 12a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75Zm19 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75Zm-2.102 6.148a.75.75 0 0 1 1.06 0l.393.393a.75.75 0 1 1-1.06 1.06l-.393-.393a.75.75 0 0 1 0-1.06Zm-12.296 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 1 1-1.06-1.06l.392-.393a.75.75 0 0 1 1.061 0ZM12 20.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75Z"
              clip-rule="evenodd"
            />
          </g>
        </svg>
      )}
    </button>
  );
};

export default DarkToggler;
