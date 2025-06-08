import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Boston Crime Dashboard</h3>
          <p>
            Visualizing Boston's 2017 crime data with React and modern data
            visualization libraries.
          </p>
        </div>
        
        <div className={`${styles.footerSection} ${styles.resourcesSection}`}>
          <h3>Resources</h3>
          <ul className={styles.footerLinks}>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <span className={styles.icon}>📊</span>
                Boston Crime Data
              </a>
            </li>
            <li>
              <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                <span className={styles.icon}>⚛️</span>
                React
              </a>
            </li>
            <li>
              <a href="https://recharts.org" target="_blank" rel="noopener noreferrer">
                <span className={styles.icon}>📈</span>
                Recharts
              </a>
            </li>
          </ul>
        </div>
        
        <div className={`${styles.footerSection} ${styles.contactSection}`}>
          <h3>Contact</h3>
          <ul className={styles.footerLinks}>
            <li>
              <a href="mailto:eden.mic.her@gmail.com">
                <span className={styles.icon}>✉️</span>
                Email
              </a>
            </li>
            <li>
              <a href="https://github.com/edenmic" target="_blank" rel="noopener noreferrer">
                <span className={styles.icon}>🐙</span>
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p>&copy; 2017 Boston Crime Dashboard. For educational purposes only.</p>
      </div>
    </footer>
  );
};