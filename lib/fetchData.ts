export const fetchData = async (city: string) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}`,
      {
        next: {
          revalidate: 60 * 60 * 24 
        }
      }
    );
  
    const data = await res.json();
    return data;
  };
  
 