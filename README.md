# filmus-backend

This is filmus back-end in order to provide end points for front-end



## Technologies

- Express for routing
- MongoDB as a database



## Features

1. JWT authentication middleware
2. Custom Error messages
3. Bycrypted password for users
4. IMDB API utilization to navigate through TV shows

## Installation

Run:

```bash
npm install
npm run start
```



## Project structure

### Starting point: 

The [server.ts](https://github.com/Asem-Abdelhady/filmus-backend/blob/master/server.ts) file is the starting point for the application it connects to the database and exposes the endpoints

### Routes:

The exposed routes are imported from [routes folder](https://github.com/Asem-Abdelhady/filmus-backend/tree/master/routes).

### Controllers:

Each route has it is own [controller](https://github.com/Asem-Abdelhady/filmus-backend/tree/master/controllers) to specify the HTTP requests that can be done using the endpoints

### Services:

Each database operation done in a controller can be found in a [service file](https://github.com/Asem-Abdelhady/filmus-backend/tree/master/services) related to this controller

### Sanitizers

Some operations need sanitizing the input before processing it,therefore, the [sanitizers folder](https://github.com/Asem-Abdelhady/filmus-backend/tree/master/sanitizers) exists 

## Deployment

Backend i deployed on Render with the base url [https://filmus-backend.onrender.com](https://filmus-backend.onrender.com) 

## Integeration

You can see the frontend here [https://github.com/Asem-Abdelhady/filmus-frontend](https://github.com/Asem-Abdelhady/filmus-frontend)

Frontend is deployed using Vercel here (https://filmus-frontend-ten.vercel.app/)[https://filmus-frontend-ten.vercel.app/]

