# A planets projects built with Express.js and React.js

[Docker Image](https://hub.docker.com/repository/docker/sabmus/planets/general)

data comes from [Nasa Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/docs/PurposeOfKOITable.html)

### commands:

    npm install
    npm run watch

### ENV for client

This is for send the build folder to the public folder in the server
windows:
set BUILD_PATH=../server/public&& react-scripts build

macos/linux
BUILD_PATH=../server/public react-scripts build
