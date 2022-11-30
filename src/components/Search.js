import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import Card from './Card';

export default function Search() {

    const [searchTerm, setSearchTerm] = useState('');
    const [showAutoComplete, setShowAutoComplete] = useState(false);
    const [cities, setCities] = useState(null);
    const [selectedCities, setSelectedCities] = useState([]);
    
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
        const endpoint = `https://api.openaq.org/v2/locations?country_id=${countryCode}&city=${cityName}&order_by=lastUpdated`;
        const response = await fetch(endpoint);
        const data = await response.json();
        /*
         Return the first location from results.
         
         Response is ordered by most recent reading, so
         first item should be most recent.
        */
         return data.results[0]; 
    }

    const handleOptionClick = async (cityName) => {
       // Do a thing when we select a city
       console.log(cityName);
       const data = await fetchCityData(cityName);

       setSelectedCities([
        ...selectedCities,
        data
       ]);

       setShowAutoComplete(false)
    }

    const handleBlur = (e) => {
        e.preventDefault();
        /*
         Are we clicking an autocomplete option? 
         If not, hide dropdown.

         Required to ensure dropdown options register click event.
        */
        if(e.relatedTarget !== null) {
            if (e.relatedTarget.classList.contains('autocomplete__list__item__button') == false) {
                setShowAutoComplete(false)
            } 
        } else {
            setShowAutoComplete(false)
        }
    }

    const CardList = styled.div`
        display: flex;
        flex-wrap: wrap;
        max-width: 768px;
        margin: 6rem auto;
        gap: 3rem;
    `;

    useEffect(() => {
        fetchCities();
    }, []);

  return (
    <>
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
        <CardList>
            {selectedCities.map((city, index) => (
                    <Card 
                        key={index} 
                        index={index} 
                        city={city.name} 
                        location={`${city.city}, ${city.country}`} 
                        time={city.lastUpdated} 
                        selectedCities={selectedCities}
                        setSelectedCities={setSelectedCities}
                        parameters={city.parameters}
                    />
                ))
            }
        </CardList>
    </>
  );
}