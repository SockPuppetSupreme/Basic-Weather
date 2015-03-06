# Basic-Weather
An HTML page that pulls from your location and time of day to draw a representation of how it looks outside.

HTML
  pull time
  pull weather
  Background(time, weather)
  [repeat for ground and weather]
  
Weather Grabber
  Uses GPS to locate and pull basic weather info, formats weather info into string tuple

Background Renderer -- Pull from time of day
  Background Color
  Sun Renderer
  Moon Renderer
  
Ground Renderer -- Pull from time of year, and weather
  Draw Ground
    Color based on time of year
  Draw Foliage
    Type based on time of year
  Decerate ground w/ weather effects
    Puddles for rain, snow for snow
  
Weather Renderer
  Draw clouds
    Darkness based on weather
  Draw precipitation
    Based on weather
