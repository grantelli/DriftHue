// src/components/Questionnaire.tsx
import React, { useState } from 'react';
import styles from './Questionnaire.module.css';

function Questionnaire() {
  const [startDate, setStartDate] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!startDate) {
      setError('Please select a start date.');
      return;
    }

    // Validate that the selected date is not in the past
    const selectedDate = new Date(startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError('Please select a future date.');
      return;
    }

    setError('');
    // Proceed to the next question or step
    alert('Proceeding to the next question...');
  };

  return (
    <div className={styles.questionnaire}>
      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: '10%' }}></div>
      </div>
      <div className={styles.questionContainer}>
        <h2>When will your trip start?</h2>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={styles.dateInput}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button className={styles.nextButton} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Questionnaire;
