
import { FaFacebook, FaInstagram, FaLinkedin , FaGithub} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
          <li>
              <FaFacebook />
          </li>
          <li><Link to="/contato"><FaInstagram /></Link>
              
          </li>
            <li>
                <FaLinkedin />
          </li>
            <li>
              <Link to="/contato"><FaGithub/></Link>
          </li>
      </ul>
      <p className={styles.copy_right}>
        &copy; 2026  <span>Andre Cosmos</span>. Todos os direitos reservados.
      </p>
    </footer>
  )
}

export default Footer