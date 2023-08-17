# FYP Front-end
This the front-end component for my Final Year Project for BSc in Software Development

## Topic
The goal of the project is to provide the user with a dashboard to monitor the electrical consumption and utilization of their appliances/devices. The problem behind this is to mitigate any potential energy waste that might be occuring by easily identifying it.

Additionally some management features are provided to the user:
- Switching the devices on/off remotely
- Setting a time delay after which the devices will switch on/off
- Setting the report interval on the Smart Plugs
- Creating maintenance logs/messages for the devices to store any maintenance information that was done on the device. (For instance, if a part was replaced or an issue addressed and how it was fixed)

## Architecture

## Front-End Features

# Notable Technologies
The project is written entirely in TypeScript using the Angular framework. It uses the default Angular HTTP client to send requests to the back-end. Angular Inteceptor to inject JWTs into requests which the back-end can validate. The visual styles are written using Angular Material liberary and Bootstrap 5. Graph libraries are ngx-charts and charts.js.

# Run
```ng build``` build the project. The artifacts will be in /dist.
```ng serve``` development server. Runs on localhost:4200 by default.
