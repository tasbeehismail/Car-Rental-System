# Car Rental System

The Car Rental System is a web application built with Node.js and MongoDB, designed to facilitate the rental of cars by customers.

## Features

- **Car Management**: Perform CRUD operations for cars, including adding, updating, and deleting car information. Cars are marked as rented when rented out.
- **Customer Management**: Manage customers through CRUD operations, including signing up, signing in, updating, and deleting customer profiles.
- **Rental Management**: Handle the rentals, including creating new rentals, updating rental information, and deleting rentals once returned.
- **Special Queries**: Includes specialized API endpoints to retrieve specific information about cars based on their model and rental status.

## MongoDB Models

### Car
- `name`: String 
- `model`: String 
- `rental_status`: String (Status of the car, either 'available' or 'rented')

### User
- `name`: String 
- `password`: String 
- `email`: String 
- `phone`: String 
- `role`: String ('customer' or 'admin')
### Rental
- `car`: ObjectId (Reference to Car model)
- `customer`: ObjectId (Reference to Customer model)
- `rental_date`: Date 
- `return_date`: Date 

## API Endpoints

### User APIs

1. **Signup**
   - `POST /users/signup`
   - Request Body: `{ name, password, email, phone }`
   - Creates a new customer account in the system.

2. **Login**
   - `POST /users/login`
   - Request Body: `{ email, password }`
    
3. **Get a specific user**
   - `GET /users/:user_id`
   - Retrieves details of a specific user by user ID.

4. **Get all users**
   - `GET /users/`
   - Retrieves a list of all registered users.

5. **Update user (owner only)**
   - `PUT /users/:user_id`
   - Request Body: `{ customer_id, name, email, phone }`
   - Updates details of a specific user. Access restricted to owner/administrator.

6. **Delete user (owner only)**
   - `DELETE /users/:user_id`
   - Deletes a specific user from the system. Access restricted to owner/administrator.

### Car APIs

1. **Add car**
   - `POST /cars/`
   - Request Body: `{ name, model, rental_status }`
   - Adds a new car to the system.

2. **Get a specific car**
   - `GET /cars/:car_id`
   - Retrieves details of a specific car by car ID.

3. **Get all cars**
   - `GET /cars/`
   - Retrieves a list of all cars available in the system.

4. **Update a car**
   - `PUT /cars/:car_id`
   - Request Body: `{ name, model, rental_status }`
   - Updates details of a specific car in the system.

5. **Delete a car**
   - `DELETE /cars/:car_id`
   - Deletes a specific car from the system.

### Rental APIs

1. **Create Rental**
   - `POST /rentals/`
   - Request Body: `{ customer, rental_date, return_date, car }`
   - Creates a new rental transaction for a customer to rent a car.

2. **Update Rental**
   - `PUT /rentals/:rental_id`
   - Request Body: `{ customer, rental_date, return_date, car }`
   - Updates details of a specific rental transaction.

3. **Delete Rental**
   - `DELETE /rentals/:rental_id`
   - Deletes a specific rental transaction from the system.

4. **Get all Rentals**
   - `GET /rentals`
   - Retrieves a list of all rental transactions in the system.

5. **Get a specific Rental**
   - `GET /rentals/:rental_id`
   - Retrieves details of a specific rental transaction by rental ID.

### Special APIs

1. **Get all cars whose model is ‘Honda’ and ‘Toyota’**
   - `GET /cars?models=Honda,Toyota`
   - Retrieves a list of all cars with models 'Honda' or 'Toyota'.

2. **Get Available Cars of a Specific Model**
   - `GET /cars?model=:model&status=available`
   - Retrieves a list of available cars of a specific model.

3. **Get Cars that are Either rented or of a Specific Model**
   - `GET /cars?model=:model&status=rented`
   - Retrieves a list of cars that are either rented or of a specific model.

4. **Get Available Cars of Specific Models or Rented Cars of a Specific Model**
   - `GET /cars?models=:model1,:model2&status=available,rented`
   - Retrieves a list of available cars of specific models or rented cars of a specific model.
  
