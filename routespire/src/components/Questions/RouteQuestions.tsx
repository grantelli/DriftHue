// RouteQuestions.tsx
import React, { useState, useEffect } from 'react';
import { MapPin, Calendar } from 'lucide-react';
import styles from './RouteQuestions.module.css';

function RouteQuestions() {
  const [currentStep, setCurrentStep] = useState(1);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDuration(diffDays);
    } else {
      setDuration(null);
    }
  }, [startDate, endDate]);

  const handleNext = () => {
    if (currentStep === 1) {
      if (!startLocation.trim()) {
        setError('Please enter a starting location');
        return;
      }
      setError('');
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!startDate) {
        setError('Please select a start date');
        return;
      }
      if (!endDate) {
        setError('Please select an end date');
        return;
      }
      if (new Date(startDate) > new Date(endDate)) {
        setError('End date must be after start date');
        return;
      }
      setError('');
      // Proceed to next step or submit
      console.log('Proceeding to next step...');
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    setError('');
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: currentStep === 1 ? '33%' : '66%' }}
        ></div>
      </div>

      <div className={styles.content}>
        <div className={styles.card}>
          {currentStep === 1 ? (
            <>
              <h1 className={styles.title}>Let's plan your route</h1>
              
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

              <div className={styles.inputGroup}>
                <label className={styles.label}>Trip Type</label>
                <div className={styles.tripTypeButtons}>
                  <button
                    onClick={() => setIsRoundTrip(true)}
                    className={`${styles.tripTypeButton} ${isRoundTrip ? styles.tripTypeActive : ''}`}
                  >
                    Round Trip
                  </button>
                  <button
                    onClick={() => setIsRoundTrip(false)}
                    className={`${styles.tripTypeButton} ${!isRoundTrip ? styles.tripTypeActive : ''}`}
                  >
                    One-Way
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className={styles.title}>When are you traveling?</h1>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Start Date <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <Calendar className={styles.icon} />
                  <input
                    type="date"
                    value={startDate}
                    min={getMinDate()}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  End Date <span className={styles.required}>*</span>
                </label>
                <div className={styles.inputWrapper}>
                  <Calendar className={styles.icon} />
                  <input
                    type="date"
                    value={endDate}
                    min={startDate || getMinDate()}
                    onChange={(e) => setEndDate(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>

              {duration !== null && (
                <div className={styles.durationDisplay}>
                  {duration} {duration === 1 ? 'Day' : 'Days'}
                </div>
              )}

            </>
          )}

          {error && (
            <p className={styles.error}>{error}</p>
          )}

          <div className={styles.buttonGroup}>
            {currentStep === 2 && (
              <button
                onClick={handleBack}
                className={styles.backButton}
              >
                Back
              </button>
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
    </div>
  );
}

export default RouteQuestions;