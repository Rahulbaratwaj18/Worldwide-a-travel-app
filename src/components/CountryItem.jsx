import styles from "./CountryItem.module.css";

function CountryItem({ country, index }) {
  return (
    <li className={styles.countryItem} key={index}>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
