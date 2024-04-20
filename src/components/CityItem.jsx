import { useCities } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";
import {Link} from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

 export default function CityItem({ city }) {
  const {currentCity,deleteCity} = useCities(); 
  const { cityName, date ,id, position} = city;

  function handleDelete(e){
  e.preventDefault();
  deleteCity(id);
  }
   
  return (
    <li>
      <Link  className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"]:""}`} to ={`${id}?lat=${position.lat}&lng=${position.lng}`}>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn} onClick={handleDelete}>&times;</button>
      </Link>
    </li>
  );
}


