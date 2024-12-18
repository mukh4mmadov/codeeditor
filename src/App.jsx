import React, { useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");

  const runCode = () => {
    try {
      if (language === "javascript") {
        const result = eval(code);
        setOutput(
          result !== undefined ? result.toString() : "Результат: undefined"
        );
      } else {
        setOutput("Только код на JavaScript выполняется.");
      }
    } catch (err) {
      setOutput(`Ошибка: ${err.message}`);
    }
  };

  return (
    <div className="app-container" style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Онлайн-редактор кода</h1>

      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <label style={{ marginRight: "10px", fontWeight: "bold" }}>
          Выберите язык:
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
      </div>

      <CodeMirror
        value={code}
        options={{
          mode: language,
          theme: "material",
          lineNumbers: true,
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
      />

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={runCode}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Run
        </button>
      </div>

      <div
        style={{
          marginTop: "20px",
          border: "1px solid #ccc",
          padding: "10px",
          backgroundColor: "#f9f9f9",
          fontFamily: "monospace",
        }}
      >
        <h3>Результат:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default App;
