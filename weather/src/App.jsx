import React, { useEffect, useState } from 'react';

const App = () => {
  const [val, setVal] = useState('');
  const [val1, setVal1] = useState('');
  const [getWeather, setWeather] = useState(null); 
  const [obj, setobj] = useState({
    name: ``,
    date: ``,
    temp: ``,
    descrip: ``,
    speed: ``
  });

  useEffect(() => {
    if (!val1) return; 

    let url = "https://api.openweathermap.org/data/2.5/weather";
    let appId = "f00c38e0279b7bc85480c3fe775d518c";

    async function weather() {
      let data = `${url}?q=${val1}&appid=${appId}&units=metric`;
      try {
        let response = await fetch(data);
        let getdata = await response.json();

        if (response.ok) {
          setWeather(getdata);
          setobj({
            name: `City Name: ${getdata.name}`,
            date: `Date: ${new Date().toLocaleDateString()}`,
            temp: `Temperature: ${getdata.main.temp}°C`,
            descrip: `Weather: ${getdata.weather[0].description}`,
            speed: `Wind Speed: ${getdata.wind.speed} m/s`
          });
        } else {
          alert('City not found');
          setWeather(null); 
        }
      } catch (err) {
        console.log(err);
        alert('Error fetching data');
        setWeather(null);
      }
    }
    weather();
  }, [val1]);

  const Sub = () => {
    setVal1(val);
    if (val1 === val1) {
      setVal('');
    }
  };

  const Submit = (e) => {
    setVal(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="weather">
          <input type="text" placeholder='Enter city name' onChange={Submit} value={val} />
          <div className="btn">
            <button onClick={Sub}>Get Weather</button>
          </div>
          {getWeather && (
            <div className="data">
              <h3>{obj.name}</h3>
              <h3>{obj.date}</h3>
              <h1>{obj.temp}</h1>
              <p>{obj.descrip}</p>
              <p>{obj.speed}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
