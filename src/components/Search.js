import React, {useState, useEffect} from 'react';

export default function Search() {

    const [searchTerm, setSearchTerm] = useState('');
    const [showAutoComplete, setShowAutoComplete] = useState(false);
    const [cities, setCities] = useState(null);
    const [selectedCities, setSelectedCities] = useState(null);
    
    const countryCode = 'GB';

    // grab cities when app is mounted.
    const fetchCities = async () => {
        const endpoint = `https://api.openaq.org/v2/cities?country_id=${countryCode}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        setCities(data.results)
    }

    const handleKeyUp = (value) => {
        setSearchTerm(value);
        setShowAutoComplete(true);
    }

    const fetchCityData = async (cityName) => {
        const endpoint = `https://api.openaq.org/v2/cities?country_id=${countryCode}&city=${cityName}&order_by=lastUpdated`;
        const response = await fetch(endpoint);
        const data = await response.json();
        return data;
    }

    const handleOptionClick = async (cityName) => {
       // Do a thing when we select a city
       console.log(cityName);
       const data = await fetchCityData(cityName);
       setShowAutoComplete(false)
    }

    const handleBlur = (e) => {
        e.preventDefault();

        /*
         Are we clicking an autocomplete option? 
         If not, hide dropdown.
        */
        if(e.relatedTarget !== null) {
            if (e.relatedTarget.classList.contains('autocomplete__list__item__button') !== false) {
                setShowAutoComplete(false)
            } 
        } else {
            setShowAutoComplete(false)
        }
    }

    useEffect(() => {
        fetchCities();
    }, []);

  return (

    <div className="input-container" >
        <input className="input" type="text" placeholder="Enter city name..." 
            onKeyUp={ e => handleKeyUp(e.target.value)} 
            onBlur= { e => handleBlur(e)}
            onFocus={ e => e.target.value !== '' ?  setShowAutoComplete(true) :  setShowAutoComplete(false) }
        />
        {showAutoComplete &&
            <div className="autocomplete">
                <ul className="autocomplete__list">
                    {cities.filter(city => city.city.includes(searchTerm)).map(city => (
                        <li key={city.city} className="autocomplete__list__item">
                            <button className="autocomplete__list__item__button" onClick={e => handleOptionClick(city.city)}>
                                {city.city}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        }
    </div>
  );
}