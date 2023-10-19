import Card from "../Card/Card.jsx";
import style from "./Cards.module.css";

const Cards = (props) => {
   const { characters, onClose } = props;
   return (
      <div className={style.container}>
         {characters.map((char) => {
            return (
               <Card
                  id={char.id}
                  key={char.id}
                  name={char.name}
                  species={char.species}
                  gender={char.gender}
                  origin={char.origin.name}
                  image={char.image}
                  status={char.status}
                  onClose={onClose}
               />
            );
         })}
      </div>
   );
}

export default Cards
