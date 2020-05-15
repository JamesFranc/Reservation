# Reservation

This is a simple reservation client that enables a user to enter a customer's information, vehicle information, and select a date to schedule service. This project leverages Angular9, NgRx, and Docker.

## Using this application

In order to use this application clone this directory and in a terminal window navigate to the cloned directory

```
cd Reservation/reservation-client
```

To run the application using Docker enter the following command: (this assumes you have docker installed on your machine)
```
docker-compose build --no-cache && docker-compose up
```

Wait for a minute and you will eventually see:

```
reservation-client | ** Angular Live Development Server is listening on 0.0.0.0:4200, open your browser on http://localhost:4200/ **
reservation-client | : Compiled successfully.

```

In your browser navigate to http://localhost:4201 (don't use port 4200, it won't work)

Enjoy using this responsive UI!
