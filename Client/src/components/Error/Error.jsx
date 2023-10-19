import style from "./Error.module.css";
import { useEffect } from "react";
const IMG_404 = import.meta.env.VITE_IMG_404 || '/src/assets/404.jpg';

const Error = (props) => {
    const { logout, setHide } = props;
    useEffect(() => {
        setHide(true); // es para que no se renderice la barra de navegación
    }, []);

    return (
        <div className={style.container}>
            <div className={style.datosDiv}>
                <div className={style.containerImg}>
                    <img className={style.img} src={IMG_404} alt="" />
                </div>
                <p className={style.contButton}>
                    <button className={style.Button} onClick={() => { logout(); }}>Restart</button>
                </p>
            </div>
        </div>
    )
};
export default Error;