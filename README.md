# Vehicle Tracker System

This project is a **Vehicle Tracker System** built with **Angular 16** and **Node.js 18**. It allows users to add vehicles, update vehicle locations, and view the latest or historical locations of a vehicle. It includes Google Maps integration to display the vehicle's position.

## Features

- **Add Vehicle**: Form to input and store details for new vehicles.
- **Add Vehicle Location**: Allows users to add a specific location for an existing vehicle.
- **Update Vehicle Location**: Form to update a vehicle's current location.
- **View Latest Location**: Displays the latest location of a selected vehicle.
- **View Location History**: Shows all historical locations of a vehicle.
- **Google Maps Integration**: Maps to view and track vehicle positions.

## Prerequisites

- **Node.js**: Version 18
- **Angular CLI**: Version 16

To check the version of Node.js:
```bash
node -v
```

To install Angular CLI if not installed:
```bash
npm install -g @angular/cli
```

## Installation

1. **Clone the repository:**
   ```bash
   git clone [project url](https://github.com/MOzil-10/Fleet-Management-front-end.git)
   cd fleet-management-front-end
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Google Maps API Key:**
   - Get an API key from [Google Cloud Console](https://console.cloud.google.com/).
   - Add the API key in your environment configuration (`src/environments/environment.ts`):

4. **Run the application:**
   ```bash
   ng serve
   ```

5. Open a browser and go to `http://localhost:4200`.

## Usage

- Navigate through the navbar to access different functions:
  - **Add Vehicle**: Add vehicle details (Make, Model, Year).
  - **Add Location**: Add latitude and longitude for a selected vehicle.
  - **Update Location**: Update latitude and longitude for an existing vehicle.
  - **Latest Location**: View the latest location details of a selected vehicle.
  - **Location History**: View all recorded locations for a vehicle.

- **Google Maps** is used to visually display the vehicle's current location. Click on the map to set a new location.

## Project Structure

- **src/app/components**: Contains components for each modal (Add Vehicle, Add Location, etc.)
- **src/app/services**: Angular services handling API requests for vehicle and location data.

## Important Files

- **navbar.component.html**: Defines navigation and modal triggers.
- **app.module.ts**: Includes module configurations, including Google Maps module.

## Dependencies

- **@angular/google-maps**: For Google Maps integration.
- **Bootstrap 5**: For responsive UI and modals.
  
## Future Enhancements

- **Authentication**: Implementing user authentication and access control.

## Have a Good day.
