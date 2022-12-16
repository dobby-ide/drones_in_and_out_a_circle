
## Reaktor preassignment
***
#### This project refers to the [Reaktor preaasignment](https://assignments.reaktor.com/birdnest/?_gl=1*6xyj9s*_ga*MjE0NjUzMDE5MS4xNjcwNTE1ODE0*_ga_DX023XT0SX*MTY3MDUxNTgxMy4xLjEuMTY3MDUxNjA1OC40Ny4wLjA).
![drones flying over a protected area](https://assignments.reaktor.com/birdnest/img/birdnest01.webp
)

## Content
The application uses a frontend that fetches data on an endpoint: in return the server connects to a specific endpoint where the data is retrieved (updating xml snapshot of active drones on an area).
The frontend calculates when the drones are inside a specified radius (100m) circle (the nest..) in the middle of the square.
The application do some more fetching to find out who are the owners of the drones flying inside the circle and displays data accordingly, data persists for 10 minutes.

## installed dependencies:
***
### server:
1. express
2. nodemon 2.0.20
3. request 2.88.2
4. cors 2.8.5
### react frontend:
1. axios
2. xmlparser
***
## Possible improvements
The app is fun to deal with if the drones could be visualized in some way
