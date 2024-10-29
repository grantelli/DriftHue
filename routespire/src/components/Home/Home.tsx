import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

// Import images
import homeSun from '../../assets/home-sun.png';
import homeTrees from '../../assets/home-trees.png';
import homeRoad from '../../assets/home-road.png';
import homeHiking from '../../assets/home-hiking.png';

function Home() {
  const navigate = useNavigate();

  const handleBeginJourney = () => {
    navigate('/questionnaire');
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <img src={homeSun} alt="Sun" className={styles.sun} />
        <img src={homeTrees} alt="Trees" className={styles.trees} />
        <img src={homeRoad} alt="Road" className={styles.road} />

        <header className={styles.header}>
          <h1>RouteSpire</h1>
          <h2>Let's create the perfect trip.</h2>
        </header>

        <div className={styles.buttonContainer}>
          <button className={styles.generateButton} onClick={handleBeginJourney}>
            Begin Your Journey
          </button>
        </div>
      </main>

      <section className={styles.howItWorks}>
        <div className={styles.howItWorksContent}>
          <h2>How It Works</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureText}>
              <div className={styles.featureItem}>
                <h3>AI-Powered Route Planning</h3>
                <p>
                  Using advanced AI and data from millions of successful trips, RouteSpire crafts journeys that go beyond simple navigation. We analyze everything from traffic patterns to seasonal attractions, ensuring your route is optimized for both efficiency and enjoyment.
                </p>
              </div>
              <div className={styles.featureItem}>
                <h3>Expert-Curated Experiences</h3>
                <p>
                  Our system combines local expert knowledge with real traveler experiences to suggest the perfect stops along your journey. From hidden viewpoints to award-winning local diners, discover gems you might have missed.
                </p>
              </div>
              <div className={styles.featureItem}>
                <h3>More Than Just Driving</h3>
                <p>
                  Turn your road trip into an adventure. We'll suggest scenic hiking trails, historic sites, and local attractions along your route. Park your car, stretch your legs, and create memories that last a lifetime.
                </p>
              </div>
            </div>
            <div className={styles.featureImage}>
              <img
                src={homeHiking}
                alt="Hikers enjoying a scenic trail"
                className={styles.hikingImage}
              />
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© RouteSpire, LLC 2024</p>
      </footer>
    </div>
  );
}

export default Home;