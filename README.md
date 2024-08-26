This Node.js project provides a set of APIs to manage a collection of cities. You can add, update, delete, and retrieve cities with various query options. The project uses a SQLite database for data storage.

## API Endpoints

### Add City

**Endpoint:** `POST /cities`

**Description:** Add a new city to the collection. The city name must be unique.

**Request Body:**
```json
{
  "name": "CityName",
  "population": 123456,
  "country": "CountryName",
  "latitude": 12.3456,
  "longitude": 65.4321
}
Response:

"City added successfully",
  
Update City
Endpoint: PUT /cities/:cityId

Description: Update an existing city based on its identifier.

Request Body:

json
Copy code
{
  "name": "UpdatedCityName",
  "population": 654321,
  "country": "UpdatedCountryName",
  "latitude": 65.4321,
  "longitude": 12.3456
}
Response:

json
Copy code
{
  "message": "City updated successfully",
  "city": {
    "id": 1,
    "name": "UpdatedCityName",
    "population": 654321,
    "country": "UpdatedCountryName",
    "latitude": 65.4321,
    "longitude": 12.3456
  }
}
Delete City
Endpoint: DELETE /cities/:cityId or DELETE /cities?name=CityName

Description: Delete a city from the collection by its identifier or name.

Response:

json
Copy code
{
  "message": "City deleted successfully"
}
Get Cities
Endpoint: GET /cities

Description: Retrieve a list of cities with support for pagination, filtering, sorting, searching, and projection.

Query Parameters:

page (optional): Page number for pagination. Default is 1.
limit (optional): Maximum number of cities per page. Default is 10.
filter (optional): Filter cities based on specified criteria (e.g., country:USA,population:500000).
sort (optional): Sort cities based on a specified field and order (e.g., name:asc or population:desc).
search (optional): Search for cities based on a search term (e.g., New).
projection (optional): Specify which fields to include or exclude from the response (e.g., name,population).
Example Request:

sql
Copy code
GET /cities?page=2&limit=10&filter=country:USA&sort=name:asc&search=New&projection=name,population
Example Response:

json
Copy code
[
  {
    "id": 1,
    "name": "New York",
    "population": 8419000,
    "country": "USA",
    "latitude": 40.7128,
    "longitude": -74.0060
  },
  {
    "id": 2,
    "name": "Newark",
    "population": 311000,
    "country": "USA",
    "latitude": 40.7357,
    "longitude": -74.1724
  }
]
Running the Code
Prerequisites
Node.js installed on your machine.
SQLite installed or another database if you use a different setup.
Installation
Clone the Repository

bash
Copy code
git clone https://github.com/yourusername/your-repository.git
cd your-repository
Install Dependencies

bash
Copy code
npm install
Running the Server
Start the Server

bash
Copy code
npm start
The server will run on http://localhost:3000 by default.

Access the API

Use tools like Postman or cURL to make requests to http://localhost:3000.
Example Usage
Add a City:

bash
Copy code
POST http://localhost:3000/cities
Update a City:

bash
Copy code
PUT http://localhost:3000/cities/1
Delete a City:

bash
Copy code
DELETE http://localhost:3000/cities/1
or

bash
Copy code
DELETE http://localhost:3000/cities?name=CityName
Get Cities:

bash
Copy code
GET http://localhost:3000/cities?page=1&limit=10
