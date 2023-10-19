import axios from 'axios';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "./Detail.module.css";

let { container, containerImg, img, containerDetails, features, featuresTitle, imgCargando, containerImgCargando } = style;

const Detail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const API_URL_BASE = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3001/rickandmorty';
    const CHARS_URL = import.meta.env.VITE_RM_CHARS || '/character';
    const RM_CHARS = API_URL_BASE + CHARS_URL;
    const IMG_ERR_DETAIL = import.meta.env.VITE_IMG_ERR_DETAIL || '/src/assets/errorDetail.jpeg';
    const IMG_ESPERA = import.meta.env.VITE_IMG_ESPERA || '/src/assets/portal-rick-and-morty.gif';

    const charError = {
        name: 'Detail not found',
        status: 'not found',
        gender: 'not found',
        species: 'not found',
        origin: { name: 'not found', },
        image: 'not found'
    };

    useEffect(() => {
        axios(`${RM_CHARS}/${id}`)
            .then(({ data }) => {
                if (data.name) {
                    setCharacter(data);
                } else {
                    setCharacter(charError);
                    window.alert('Detail not found');
                }
            })
            .finally(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                charError.name = error.message; //usar error.response.status para sólo el nro.
                charError.image = IMG_ERR_DETAIL;
                setCharacter(charError);
            });
    }, [id]);

    return (
        <div className={container}>
            {isLoading ? (
                <div className={containerImgCargando}>
                    <img className={imgCargando} src={IMG_ESPERA} alt="" />
                </div>
            ) : character ? (
                <div className={container}>
                    <div className={containerDetails}>
                        <h2 className={featuresTitle}>{character.name}</h2>
                        <h2 className={features}>STATUS | {character?.status}</h2>
                        <h2 className={features}>GENDER | {character?.gender}</h2>
                        <h2 className={features}>SPECIE | {character?.species}</h2>
                        <h2 className={features}>ORIGIN | {character.origin?.name}</h2>
                    </div>
                    <div className={containerImg}>
                        <img className={img} src={character.image} alt="" />
                    </div>
                </div>

            ) : null}
        </div>
    );
}

export default Detail;
