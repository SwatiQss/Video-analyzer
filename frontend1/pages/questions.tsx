import React, { useState } from 'react';
import styles from "./style/Question.module.css"

const QuestionsDisplay: React.FC = () => {
  const [questions, setQuestions] = useState<string[]>([]);

  const loadQuestions = () => {
    const stored = sessionStorage.getItem('questions');
    if (stored) {
      try {
        const parsed: string[] = JSON.parse(stored);
        setQuestions(parsed);
      } catch (error) {
        console.error('Error parsing questions from sessionStorage:', error);
      }
    }
  };

  return (
    <div className={styles.questions}>
      <div className={styles.cards}>
        <button onClick={loadQuestions} className={styles.load}>
          Show Questions
        </button>

        {questions.length > 0 && (
          <div className={styles.list}>
            <h2 className={styles.title}>Generated Questions</h2>
            <ul>
              {questions.map((q, idx) => (
                <li key={idx} className={styles.item}>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsDisplay;
