Overview:
This app accepts an input of a city name, displays weather conditions for it for the current time and future 5 days. It also "remembers" past searches (up to 5), and makes it easy to recall them. It is fully responsive.

Included external libraries and resources:
*Bootstrap CSS framework
*JQuery javascript
*Moment.js javascript

App functionality:
-a function that launches on page load that creates and appends buttons from values stores in local storage. These buttons are clickable and launch the main weather API call
-a click event on the submit button that launches the main API function call. It also stores the searched location in local storage, up to 5 spots. If there are already 5 values stored in local storage, it will overwrite them by order. Finally, it will create and append a button for easier future search. This button will be unique: if a button with that text already exists it will not make a duplicate
-main function takes the name of searched location and sends an API call to the openweather API. It retrieves information from there and displays it. Then a promisory function kicks in, sending another API call to the UV index API and presents that information. Finally, a second promisory function launches, sending a third API call to the future forcast. From this call information for noon of each day is displayed, including a small image of the expected weather.