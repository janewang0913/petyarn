# PetYarn
PetYarn is a sample application which builds Node.js Restful CRUD APIs using Express and interacting with MySQL database by using Sequelize ORM.

## How to run locally
```bash
docker compose up
```

## Functions
- API endpoints to create, read, update and delete pets from the service
- Capture the pet’s name, image, date of birth and home address
- Can search for pets by name, date of birth, address
- Swagger API documentation availble on `http://localhost:8080/api-docs`
- Include testing using mocha and chai
- Service is containerised using docker
- Database is using MySQL
- Service is built using Node.js
