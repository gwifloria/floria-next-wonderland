"use client";
import useVisibilityChange from "@/hooks/useVisibilityChange";
import React, { createContext, useContext, useEffect, useState } from "react";

// Step 1: Create a context
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Step 2: Create a component that provides the context
const ThemeProvider: React.FC<{ children: React.JSX.Element }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string>("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Step 3: Consume the context using useContext hook
const ThemeToggler: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)!;

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "dark" : "light"} theme
    </button>
  );
};

const Test1 = () => {
  return <div>test</div>;
};

const Test2: React.FC<{ children: React.JSX.Element }> = ({ children }) => {
  const [a, setA] = useState(1);

  function c() {
    setA((a) => {
      a++;
      return a;
    });
  }
  return (
    <div onClick={c}>
      {a}
      {children}
    </div>
  );
};

const Review: React.FC = () => {
  return (
    // Step 4: Wrap your components with the Provider
    <ThemeProvider>
      <div>
        <Test2>
          <Test1></Test1>
        </Test2>
        <h1>useContext Demo</h1>
        <ThemeToggler />
      </div>
    </ThemeProvider>
  );
};
const Test = React.memo(Test2);
const Test3 = React.memo(Test1);

const Review2: React.FC = () => {
  const visible = useVisibilityChange();
  const [changeTimes, setChangeTimes] = useState(1);
  useEffect(() => {
    if (!visible) {
      setChangeTimes((changeTimes) => {
        changeTimes++;

        return changeTimes;
      });
    }
  }, [visible]);

  return (
    <div>
      {changeTimes}
      <Test>
        <Test3></Test3>
      </Test>
    </div>
  );
};

export default Review2;
