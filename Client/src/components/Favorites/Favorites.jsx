import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterCards, orderCards } from "../../redux/actions";
import Card from "../Card/Card.jsx";
import style from "./Favorites.module.css";
let { container, containerFiltros, containerCards, label } = style;

const Favorites = () => {
    const myFavorites = useSelector((state) => state.myFavorites);
    const [isLoading, setIsLoading] = useState(true);
    const [aux, setAux] = useState(false);
    const [sortOrder, setSortOrder] = useState('A');
    const [filterGender, setFilterGender] = useState('All');
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(false);
        return () => {
            // Limpieza de filtros al salir:
            dispatch(filterCards("All"));
        };
    }, []);

    const handleOrder = (e) => {
        setSortOrder(e.target.value);
        dispatch(orderCards(e.target.value));
        setAux(!aux); // es para forzar el refresco del DOM
    };

    const handleFilter = (e) => {
        setFilterGender(e.target.value);
        dispatch(filterCards(e.target.value));
        setAux(!aux); // es para forzar el refresco del DOM
    };

    return (
        <div>
            <div className={container}>
                <div className={containerFiltros}>
                    <div className={label}>
                        <label>Order by: </label>
                        <select value={sortOrder} onChange={handleOrder}>
                            <option value="A">ascending</option>
                            <option value="D">descending</option>
                        </select>
                    </div>
                    <div className={label}>
                        <label>Filter by gender: </label>
                        <select value={filterGender} onChange={handleFilter}>
                            <option value="All">All</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Genderless">Genderless</option>
                            <option value="unknown">unknown</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={containerCards}>
                {
                    isLoading ? (
                        <p>Loading...</p>
                    ) : myFavorites ? (
                        myFavorites.map((character) => (
                            <Card
                                id={character.idChar}
                                key={character.idChar}
                                name={character.name}
                                species={character.species}
                                gender={character.gender}
                                origin={character.origin?.name}
                                image={character.image}
                            />
                        ))
                    ) : null
                }
            </div>
        </div >
    );
};
export default Favorites;
