"use client"

import styles from "./page.module.css";
import { useState, useRef } from "react";

export default function Home() {
  const [suggestion, setSeggestion] = useState("");
  const [currPId, setcurrPId] = useState(null);
  const suggestionRef = useRef(null);
  const pRefs = useRef([]);

  const handleClick = async (event) => {
    const textContent = event.target.textContent;
    const id = event.target.id;
    fetch("http://localhost:3005", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: `Resume grammar check with clean, human readble formatting in plaintext: '${textContent}'` })
    })
      .then(res => res.json())
      .then(res => {
        if (res) {
          setcurrPId(id);
          setSeggestion(res["text"]);
        }
      });
  }

  const handleSuggestion = () => {
    if (suggestion !== "") {
      pRefs.current[currPId].textContent = suggestionRef.current.textContent;
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.resume}>
        <h1>Resume Editor</h1>
        <p id={0} ref={(r) => (pRefs.current[0] = r)} onClick={handleClick}>Conducted statistical analysis on customer data, leading to a 10% increase in targeted marketing effectiveness.</p>
        <p id={1} ref={(r) => (pRefs.current[1] = r)} onClick={handleClick}>Developed automated reporting tools using Python and SQL, reducing reporting time by 30%.</p>
        <p id={2} ref={(r) => (pRefs.current[2] = r)} onClick={handleClick}>Collaborated with cross-functional teams to optimize data collection processes, improving data accuracy by 15%.</p>
      </div>
      <div className={styles.suggestions}>
        <h1>Suggestions</h1>
        {
          <p ref={suggestionRef}>{suggestion}</p>
        }
        <button onClick={handleSuggestion}>Use Suggestion</button>
      </div>
    </main>
  );
}
