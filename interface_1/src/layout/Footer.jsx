
import { FaFacebook, FaInstagram, FaLinkedin , FaGithub} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  return (
     <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <a
          className="facebook"
          href="https://www.facebook.com/andre.cosmos.56"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook /> 
        </a>
      
        <a
          className="instagram"
          href="https://instagram.com/andre_cosmos"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram /> 
        </a>
      
        <a
          className="linkedin"
          href="https://www.linkedin.com/in/andre-cosmos-b95480a1/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin  /> 
        </a>
      
        <a
          className="github"
          href="https://github.com/andrecosmos"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub  /> 
        </a>
      </ul>
      <p className={styles.copy_right}>
        &copy; {new Date().getFullYear()}  <span>Andre Cosmos</span>. Todos os direitos reservados.
      </p>
      
    </footer>
  )
}

export default Footer