// Componentes:
import Cards from "./components/Cards/Cards";
import Nav from "./components/Nav/Nav";
import Favorites from "./components/Favorites/Favorites";
// Vistas:
import About from "./views/About.view";
import ErrorView from "./views/Error.view";
import Form from "./views/Form.view";
import Detail from "./views/Detail.view";
// hooks, routers, reducers:
import { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFav, saveIdUser } from "./redux/actions";
// .env:
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3001/rickandmorty';
const LOGIN_URL = import.meta.env.VITE_RM_LOGIN || '/login';
const RM_LOGIN = API_URL_BASE + LOGIN_URL;
const CHARS_URL = import.meta.env.VITE_RM_CHARS || '/character';
const RM_CHARS = API_URL_BASE + CHARS_URL;
const HOME = import.meta.env.VITE_HOME || '/home';
const ABOUT = import.meta.env.VITE_ABOUT || '/about';
const LOGIN = import.meta.env.VITE_LOGIN || '/';
const ROOT = import.meta.env.VITE_ROOT || '/';
const DETAIL = import.meta.env.VITE_DETAIL || '/detail/:id';
const FAVORITES = import.meta.env.VITE_FAVORITES || '/favorites';
// Otros:
import axios from 'axios';
import randomGenerator from "./functions/randomGenerator";
import ProtectedRoute from "./functions/ProtectedRoute";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [access, setAccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [hide, setHide] = useState(false);

  const login = async (userData) => {
    const { mail, password } = userData;
    try {
      const response = await axios.get(RM_LOGIN + `?email=${mail}&password=${password}`)
      const rta = response.data;
      const accOK = rta.access;
      const idUser = rta.id;
      setAccess(accOK);
      if (accOK) {
        dispatch(saveIdUser(idUser));
        // traigo los favoritos previamente guardados:
        const newFav = { userId: idUser };
        dispatch(addFav(newFav));
        navigate(`${HOME}`);
      }
    } catch (error) {
      window.alert(error.message); //usar error.response.status para sólo el nro.
    }
  }

  const logout = () => {
    setAccess(false); // Quito el acceso
    setCharacters([]); // elimino tarjetas
    navigate(`${ROOT}`); // Cargo la pag de login
    setHide(false); // Vuelvo a permitir mostrar la barra de navegación:
  }

  const onSearch = async (id, mostrarMensajes, setSearching) => {
    if (isLoading) return null; // para no ingresar mientras está en una búsqueda previa
    setIsLoading(true);
    try {
      const response = await axios.get(`${RM_CHARS}/${id}`)
      const data = response.data;
      // verifico repeticiones:
      const ids = characters.map(el => el.id);
      if (!ids.includes(parseInt(id))) {
        setCharacters((oldChars) => [...oldChars, data]);
      } else {
        if (mostrarMensajes) {
          window.alert('That character already exists!');
        } else {
          const randomId = randomGenerator(826); // cuando estoy en random y me toca un repe, lo genero otra vez
          onSearch(randomId, false, setSearching);
        }
      }
      setSearching(false);
      setIsLoading(false);
    } catch (error) {
      setSearching(false);
      setIsLoading(false);
      window.alert(error.message); //usar error.response.status para sólo el nro.
    }
  };

  const onClose = (id) => {
    // Cierro una card:
    const filteredCharacters = characters.filter(character => character.id !== Number(id));
    setCharacters(filteredCharacters);
  }

  return (
    <div>
      {location.pathname !== ROOT && < Nav hide={hide} onSearch={onSearch} logout={logout} />}
      <Routes>
        <Route path={LOGIN} element={<Form login={login} />} />
        <Route element={<ProtectedRoute Access={access} />}>
          <Route path={HOME} element={<Cards characters={characters} onClose={onClose} />} />
          <Route path={ABOUT} element={<About />} />
          <Route path={DETAIL} element={<Detail />} />
          <Route path={FAVORITES} element={<Favorites />} />
        </Route>
        {/* envío setHide para ocultar la barra de navegación al mostrar error en página: */}
        <Route path="*" element={<ErrorView logout={logout} setHide={setHide} />} />
      </Routes>
    </div>
  );
}
export default App;

