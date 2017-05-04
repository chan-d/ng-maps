## ClickTime directions app
Link: https://meanmap.herokuapp.com/

- clone
- `npm install`
- `mongod`
- `nodemon`

##Description
This app was built using pure JavaScript, HTML and CSS. Users are able to input their starting location and route their way to the ClickTime office with the option to include up to three additional steps.

##Concerns/TODOs
Need to write a better algorithm to determine the least distance to travel between waypoints. As of right now it selects the option that deviates the least along the route.

Need to fix the transit select option. As of right now, it breaks if there is more than one stop so the transit option is hidden if there are stopovers.

Need to fix API calls to Google maps API and Google places API to render to load the route when the data comes back. As of right now, the route renders after a five second timeout.
