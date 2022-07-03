const link = "http://api.weatherstack.com/current?access_key=f7f680f2ea3069cd2cd65436a01950b3"

const root = document.getElementById("root")
const popup = document.getElementById('popup')
const textInput = document.getElementById('text-input')
const form = document.getElementById('form')


let store = {
    city: 'Baku',
    feelslike: 0,   
    temperature: 0,   
    observationTime: "00:00 AM",
    isDay: "yes",
    descriptions: "",
    properties: {
        cloudcover: 0,
        humidity: 0,
        windSpeed: 0,
        pressure: 0,
        uvIndex: 0,
        visibility: 0,
    }

}

const fetchData = async () => {
    const result = await fetch(`${link}&query=${store.city}`)
    const data = await result.json()

    const {
        current: {
            cloudcover,
             temperature,
              humidity,
             observation_time: observationTime,
              pressure,
               uv_index :uvIndex,
                visibility,
              is_day :isDay,
               weather_descriptions: descriptions,
                wind_speed: windSpeed
            }
    } = data

    console.log(data)

    store = {
        ...store,
        // feelslike,
        temperature,     
        observationTime,
        isDay,
        descriptions: descriptions[0],
        properties: {
            cloudcover: {
              title: "cloudcover",
              value: `${cloudcover}%`,
              icon: "cloud.png",
            },
            humidity: {
              title: "humidity",
              value: `${humidity}%`,
              icon: "humidity.png",
            },
            windSpeed: {
              title: "wind speed",
              value: `${windSpeed} km/h`,
              icon: "wind.png",
            },
            pressure: {
              title: "pressure",
              value: `${pressure} %`,
              icon: "gauge.png",
            },
            uvIndex: {
              title: "uv Index",
              value: `${uvIndex} / 100`,
              icon: "uv-index.png",
            },
            visibility: {
              title: "visibility",
              value: `${visibility}%`,
              icon: "visibility.png",
            },
          },
    }
    renderComponent()
    
}
const getImages = (descriptions) =>{
    //const value = descriptions.toLowerCase

    switch(descriptions){
        case 'Partly cloudy':
            return 'partly.png';
        case 'Cloud':
            return 'cloud.png';
        case 'Fog':
            return 'fog.png';
        case 'Sunny':
            return 'sunny.png';
        default: 
            return 'the.png';
    }
}


const renderProperty = (properties) => {
    return Object.values(properties)
      .map(({ title, value, icon }) => {
        return `<div class="property">
              <div class="property-icon">
                <img src="./img/icons/${icon}" alt="">
              </div>
              <div class="property-info">
                <div class="property-info__value">${value}</div>
                <div class="property-info__description">${title}</div>
              </div>
            </div>`;
      })
      .join("");
  };

const markup = () => {
const {city, descriptions, observationTime, temperature, isDay, properties} = store

const containerClass = isDay === "yes" ? 'is-day' : ""

    return `<div class="container ${containerClass}">
            <div class="top">
              <div class="city">
                <div class="city-subtitle">Weather Today in</div>
                  <div class="city-title" id="city">
                  <span>${city}</span>
                </div>
              </div>
              <div class="city-info">
                <div class="top-left">
                <img class="icon" src="./img/${getImages(descriptions)}" alt="" />
                <div class="description">${descriptions}</div>
              </div>
            
              <div class="top-right">
                <div class="city-info__subtitle">as of ${observationTime}</div>
                <div class="city-info__title">${temperature}°</div>
              </div>
            </div>
          </div>
        <div id="properties">${renderProperty(properties)}</div>
      </div>`
}


const toggleClass = () => {
    popup.classList.toggle('active')
}

const renderComponent = () => {
    root.innerHTML = markup()
    const city = document.getElementById('city')
    city.addEventListener('click', toggleClass)

}

const handleInput =(e) => {
    store = {
        ...store,
        city: e.target.value
    }

}

const handleSubmit = (e) => {
    e.preventDefault()
    fetchData()
    toggleClass()
}

form.addEventListener('submit', handleSubmit)

textInput.addEventListener('click', handleInput)


fetchData()