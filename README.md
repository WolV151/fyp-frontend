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
![arch diagram](/public/images/ArchitecturePoster.svg)

The front-end will query the back-end routes to receive data and pefrom various manipulations on it such as adding artificial 0's to represent pauses between utilization and plot out the various data points on charts. It supports authenticating the user and acquiring a JWT for that user to inject in their requests.

## Front-End Features
Utilization panel - track the various appliances' utilization duration and power consumption during said duration.
![util pic](/public/images/utilization-panel.png)

Manage devices - Add/Delete/Edit/Update existing devices in the system to track
![device pic](/public/images/device-screen.png)

Then view quick summary details for those devices:
![device details pic](/public/images/device-details.png)

Record maintenance logs for those devices:
![maint pic](/public/images/maintenance-details.png)

More pages can be seen in the '/public/images' folder.

## Notable Technologies
The project is written entirely in TypeScript using the Angular framework. It uses the default Angular HTTP client to send requests to the back-end. Angular Inteceptor to inject JWTs into requests which the back-end can validate. The visual styles are written using Angular Material liberary and Bootstrap 5. Graph libraries are ngx-charts and charts.js.

## Run
```ng build``` build the project. The artifacts will be in /dist.
```ng serve``` development server. Runs on localhost:4200 by default.

## Future work
There was a cost check feature planned where the user would have their overal consumption plotted out and also the price tarif changes for the day, so that the user can see exactly the price for using their appliances at that time. The user would also have the option to move their utilization spikes around the chart to more cheaper/expensive periods to see if they would save/spend money.

![cost pic](/public/images/cost-check.png)

Unfortunately, this was unfinished due to time constraints.

## Known bugs
If the user enters wrong login details, the JWT refresh will glitch out and infinitely send requests to the back-end to refresh the token. Refresh the page if that happens.
