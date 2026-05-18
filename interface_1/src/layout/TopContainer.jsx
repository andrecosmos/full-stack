import Header from './Header';
import Navbar from './Navibar'


const Layout = () => {
  return (
    <div>
      {/* COMPONENTES FIXADOS JUNTOS NO TOPO */}
      <div style={styles.topContainer}>
        <Header />
        <Navbar />
      </div>

      
    </div>
  );
};

const styles = {
  topContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' // Sombra sutil para dar profundidade ao rolar
  },
  mainContent: {
    paddingTop: '130px', // Altura somada do seu Header (aprox 60px) + Navbar (70px)
    paddingLeft: '20px',
    paddingRight: '20px'
  }
};

export default Layout;
