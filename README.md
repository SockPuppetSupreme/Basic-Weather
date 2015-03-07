# Basic-Weather
An HTML page that pulls from your location and time of day to draw a representation of how it looks outside using canvas

##Organization
Based on the tast at hand the organization of the project is divided into 4 seperate parts, 3 for rendering and 1 for collecting information.

###Weather Grabber
Weather grabber pulls from some site (at the current time of implementation we are using [forecast.weather.gov](http://www.weather.gov/)) using JSONP.  The information from the site is then put into our own Weather object to pass into all the other rendering parts of the program. 

###Background Renderer
Takes into account time of *day* and weather passed in to draw a nice looking background.  The background contains things such as:
* Sky Color
* Moon and Sun
* Stars or airplanes/jetsteams

This is the first thing to be drawn on canvas, so it will be drawn over the most.

### Ground Renderer
This takes into account time of *year* and the weather passed in to draw an appropriate looking ground.  The color of the ground is drawn based on the season, so that summer grass will be greener than spring, and winter grass will be dead and such.  Folliage such as flowwers or broken branches would appear based on season also.  The gruond is also updated with the current weather going on.  There would be puddles for rain or that if it is snowing the ground will be covered in snow.

*Oh god what if it snowed a week ago but it's still there outside?*

### Weather Renderer
This is meant to draw the right ammount of clouds with the appopriate color and percepetation based on the weather.  Storming would be different from flurries.  

