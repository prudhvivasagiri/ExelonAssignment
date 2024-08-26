const express = require('express')
const app = express()
const {open} = require('sqlite')
const path = require('path')
const sqlite3 = require('sqlite3')
app.use(express.json())

const dbPath = path.join(__dirname, 'cities.db')
let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error ${e.message}`)
    process.exit(1)
  }
}

initializeDBAndServer()

//Post city API
app.post('/cities/', async (request, response) => {
    const cityDetails = request.body
    const {name,population,country,latitude,longitude} = cityDetails
    const getCityDetailsQuery = `Select * from cities where name = '${name}';`;
    const city = await db.get(getCityDetailsQuery);
    if (city === undefined){
        const addCityQuery = `INSERT INTO cities(name,population,country,latitude,longitude) VALUES ('${name}',${population},'${country}', ${latitude},${longitude});`
        await db.run(addCityQuery)
        response.send('City Successfully Added')
    }else{
        response.send('City already exists')
    }
    
  })


//Update City API
app.put('/cities/:cityId/', async(request,response) =>{
    const cityDetails = request.body
    const {cityId} = request.params
    const {name,population,country,latitude,longitude} = cityDetails
    const updateCityDetailsQuery = `update cities set name = '${name}', population = ${population}, country = '${country}', latitude = ${latitude}, longitude = ${longitude} where id = ${cityId};`;
    await db.run(updateCityDetailsQuery)
    const getUpdatedCityDetailsQuery = `select * from cities where id = ${cityId};`;
    const updatedCity = await db.get(getUpdatedCityDetailsQuery);
    response.json({
        message: 'City details updated successfully',
        data: updatedCity
      });
})


//Delete City API
app.delete('/cities/:cityId/', async (request, response) => {
    const {cityId} = request.params
    const deleteCityQuery = `DELETE FROM cities WHERE id = ${cityId};`
    await db.run(deleteCityQuery)
    response.send('City Successfully deleted')
  })


//Get Cities API
app.get('/cities/', async (request, response) => {
    const {offset,limit,search_q='',population,order,order_by} = request.query;
    const getCitiesQuery = `SELECT * FROM cities where name LIKE '%${search_q}%' and population >= ${population} order by ${order_by} ${order} limit ${limit} offset ${offset};`;
    const cities = await db.all(getCitiesQuery)
    response.send(cities)
})
