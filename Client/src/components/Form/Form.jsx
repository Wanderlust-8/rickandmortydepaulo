import style from "./Form.module.css";
import { useState } from "react";
import Validation from "../../functions/validation";

let { container, emailDiv, passDiv, datosDiv, img, containerImg, errores, contButton, button } = style;

const IMG_LOGIN = import.meta.env.VITE_IMG_LOGIN || '/src/assets/RM_Main_Logo.png';

const Form = (props) => {
    const { login } = props;

    const [userData, setUserData] = useState({
        mail: "erraticless@gmail.com",
        password: "123456",
        //mail: "",
        //password: "",
    });

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const property = e.target.name;
        const value = e.target.value;
        setUserData({ ...userData, [property]: value })
        setErrors(Validation({ ...userData, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        login(userData);
    }
    return (
        <form className={container} onSubmit={handleSubmit}>
            <div className={datosDiv}>
                <div className={containerImg}>
                    <img className={img} src={IMG_LOGIN} alt="" />
                </div>
                <div className={emailDiv}>
                    <label htmlFor="mail">Email:</label>
                    <input
                        name="mail"
                        type="text"
                        placeholder="Email"
                        value={userData.mail}
                        onChange={handleChange}
                        id="mail"
                    />
                    {errors.e1 ? (
                        <span className={errores}>{errors.e1}</span>
                    ) : errors.e2 ? (
                        <span className={errores}>{errors.e2}</span>
                    ) : (
                        <span className={errores}>{errors.e3}</span>
                    )}
                </div>
                <div className={passDiv}>
                    <label htmlFor="password">Password:</label>
                    <input
                        placeholder="Password"
                        type="password"
                        name="password"
                        id="password"
                        value={userData.password}
                        onChange={handleChange}
                    />
                    {errors.p1 ? (
                        <span className={errores}>{errors.p1}</span>
                    ) : (
                        <span className={errores}>{errors.p2}</span>
                    )
                    }
                </div>
                <p className={contButton} href="/">
                    <button className={button} type="submit">Login</button>
                </p>
            </div>
        </form>
    )
}
export default Form;
