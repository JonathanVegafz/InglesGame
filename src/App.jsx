import { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import './App.css';
import Init from './vistas/init';
import Facil from './vistas/facil';
import Normal from './vistas/normal';
import Dificil from './vistas/dificil';
import Pro from './vistas/pro';
// import SalaEspera from './vistas/salaEspera';
// import JuegoInicial from './vistas/juegoInicial';

function App() {
  const [count, setCount] = useState(0)
  const [interfaceType, setInterfaceType] = useState("");
  const [interfaces, setInterfaces] = useState(null);
  const [jugadores, setJugadores] = useState([]);
  useEffect(() => {
    setInterfaces(
      <Init setInterface={setInterfaces} />
    );
  }, []);

  return (
    <>

      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        {interfaces}
      </Box>
    </>
  )
}

export default App
