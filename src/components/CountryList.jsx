
import { useCities } from "../Contexts/CitiesContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CountryList() {
  const {cities,isLoading} = useCities();
        if (isLoading) return <Spinner />;
  
        if(!cities.length) return <Message message="Enter your first city name to start your jounrey"/>
         
        const countries = cities.reduce((arr,city) => {
          if( !arr.some((e) => e.country  === city.country )){
                return [...arr,{country : city.country} ]
            }
            else{
                return arr;
            }
        },[])
        
        return (
          <ul className={styles.countryList}>
            {countries.map((country,index) => (
              <CountryItem  country={country}  index={index} />
            ))}
          </ul>
        );
    
}

export default CountryList
