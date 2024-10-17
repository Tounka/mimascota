import { DisplayPrincipal } from './ComponentesGenerales/Display.jsx/DisplayPrincipal';
import './App.css';
import { Perfil } from './ComponentesGenerales/Secciones/Perfil';
function App() {
  return (
    <DisplayPrincipal >
      <Perfil />
    </DisplayPrincipal>
  );
}

export default App;
