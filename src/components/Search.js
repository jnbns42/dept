import React, {useState, useEffect} from 'react';

export default function Search() {

    const [searchTerm, setSearchTerm] = useState('');
    const [cities, setCities] = useState(null);
    const [showAutoComplete, setShowAutoComplete] = useState(false);

    // grab cities when app is mounted.
    const fetchCities = async () => {
        const countryCode = 'GB';
        const endpoint = `https://api.openaq.org/v2/cities?country=${countryCode}`;
        const response = await fetch(endpoint);
        const data = await response.json();
        setCities(data.results)
    }

    const handleKeyUp = (value) => {
        setSearchTerm(value);
        setShowAutoComplete(true);
    }

    const handleOptionClick = () => {
       // Do a thing when we select a city
    }

    useEffect(() => {
        fetchCities();
    }, []);

  return (

    <div className="input-container">
        <input className="input" type="text" placeholder="Enter city name..." 
            onKeyUp={ e => handleKeyUp(e.target.value)} 
            onBlur= { e => setShowAutoComplete(false)} 
            onFocus={ e => e.target.value !== '' ?  setShowAutoComplete(true) :  setShowAutoComplete(false) }
        />
        {showAutoComplete &&
            <div className="autocomplete">
                <ul className="autocomplete__list">
                    {cities.filter(city => city.city.includes(searchTerm)).map(city => (
                        <li className="autocomplete__list__item">{city.city}</li>
                    ))}
                </ul>
            </div>
        }
    </div>
  );
}