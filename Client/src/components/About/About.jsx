import style from "./About.module.css";
const IMG_ABOUT = import.meta.env.VITE_IMG_ABOUT || '/src/assets/About.jpg';

const About = () => {
    return (
        <div className={style.container}>
            <div className={style.containerImg}>
                <img className={style.img} src={IMG_ABOUT} alt="" />
            </div>
            <p className={style.Description}>
                Hi, my name is Paulo Vinci. I'm a Full Stack student at Henry. This is my integrated project Rick and Morty.
            </p>
        </div>
    )
};
export default About;
