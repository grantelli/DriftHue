import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import styles from './Questions.module.css';

function RouteQuestions() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!startLocation.trim()) {
      setError('Please enter a starting location');
      return;
    }
    setError('');
    // Handle navigation to next question
    console.log('Proceeding to next question...');
  };

  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <div className={styles.progressFill}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.card}>
          <h1 className={styles.title}>Let's plan your route</h1>
          
          {/* Starting Location */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Starting Location <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <MapPin className={styles.icon} />
              <input
                type="text"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                placeholder="Enter city or address"
                className={styles.input}
              />
            </div>
          </div>

          {/* Ending Location */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Destination
            </label>
            <div className={styles.inputWrapper}>
              <MapPin className={styles.icon} />
              <input
                type="text"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                placeholder="Enter city or address (optional)"
                className={styles.input}
              />
            </div>
          </div>

          {/* Trip Type Selection */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Trip Type</label>
            <div className={styles.tripTypeButtons}>
              <button
                onClick={() => setIsRoundTrip(false)}
                className={`${styles.tripTypeButton} ${!isRoundTrip ? styles.tripTypeActive : ''}`}
              >
                One-Way
              </button>
              <button
                onClick={() => setIsRoundTrip(true)}
                className={`${styles.tripTypeButton} ${isRoundTrip ? styles.tripTypeActive : ''}`}
              >
                Round Trip
              </button>
            </div>
          </div>

          {error && (
            <p className={styles.error}>{error}</p>
          )}

          <button
            onClick={handleNext}
            className={styles.nextButton}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default RouteQuestions;