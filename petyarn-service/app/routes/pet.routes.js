module.exports = app => {
    const pets = require("../controllers/pet.controller.js");
  
    var router = require("express").Router();

    // Create a new pet
    router.post("/", pets.create);

    // Retrieve all pets
    router.get("/", pets.findAll);

    // Search pets with criteria
    router.get("/search", pets.findSearch);
  
    // Retrieve a single pet with id
    router.get("/:id", pets.findOne);
  
    // Update a pet with id
    router.put("/:id", pets.update);
  
    // Delete a pet with id
    router.delete("/:id", pets.delete);
  
    // Delete all pets
    router.delete("/", pets.deleteAll);
  
    app.use('/api/pets', router);

    /**
     * @openapi
     * paths:
     *   /api/pets:
     *     get:
     *       summary: Retrieve a list of pets
     *       responses:
     *         '200':
     *           description: Success
     *           $ref: '#/components/schemas/Pets'
     *         '401':
     *           description: Unauthorized
     *         '404':
     *           description: Not Found
     *         '500':
     *           description: Internal Server Error
     *     post:
     *       summary: Create a new pet
     *       requestBody:
     *         $ref: '#/components/requestBodies/PetBody'
     *       responses:
     *         '200':
     *           description: Success
     *           $ref: '#/components/schemas/Pet'
     *         '401':
     *           description: Unauthorized
     *         '404':
     *           description: Not Found
     *         '500':
     *           description: Internal Server Error
     *     delete:
     *       summary: Delete all pets
     *       responses:
     *         '200':
     *           description: Success
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   message:
     *                     type: string
     *         '401':
     *           description: Unauthorized
     *         '404':
     *           description: Not Found
     *         '500':
     *           description: Internal Server Error
     *   /api/pets/search:
     *     parameters:
     *       - in: query
     *         name: name
     *         description: Name of the pet
     *         schema:
     *           type: string
     *       - in: query
     *         name: dob
     *         description: Date of birth of the pet
     *         schema:
     *           type: string
     *       - in: query
     *         name: address
     *         description: Home address of the pet
     *         schema:
     *           type: string
     *     get:
     *       summary: Returns all pets that matches the search
     *       responses:
     *         '200':
     *           description: Success
     *           $ref: '#/components/schemas/Pets'
     *         '401':
     *           description: Unauthorized
     *         '404':
     *           description: Not Found
     *         '500':
     *           description: Internal Server Error
     *   /api/pets/{id}:
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: The id of the pet
     *         schema:
     *           type: integer
     *           format: int32
     *     get:
     *       summary: Get a pet
     *       responses:
     *         '200':
     *           description: Success
     *           $ref: '#/components/schemas/Pet'
     *         '401':
     *           description: Unauthorized
     *         '404':
     *           description: Not Found
     *         '500':
     *           description: Internal Server Error
     *     put:
     *       summary: Update a pet
     *       requestBody:
     *         $ref: '#/components/requestBodies/PetBody'
     *       responses:
     *         '200':
     *           description: Success
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   message:
     *                     type: string
     *         '401':
     *           description: Unauthorized
     *         '404':
     *           description: Not Found
     *         '500':
     *           description: Internal Server Error
     *     delete:
     *       summary: delete a pet
     *       responses:
     *         '200':
     *           description: Success
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   message:
     *                     type: string
     *         '401':
     *           description: Unauthorized
     *         '404':
     *           description: Not Found
     *         '500':
     *           description: Internal Server Error
     * components:
     *   requestBodies:
     *     PetBody:
     *       description: A JSON object containing pet information
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: The pet's name
     *                 example: Juno
     *               image:
     *                 type: string
     *                 description: The photo of the pet
     *                 example: https://cdn.orvis.com/images/DBS_Westie_1280.jpg
     *               dob: 
     *                 type: string
     *                 format: date
     *                 description: The pet's date of birth
     *                 example: 2016-01-01
     *               address:
     *                 type: string
     *                 description: The home address of the pet
     *                 example: 650 Chapel Street, South Yarra, VIC 3141
     *   schemas:
     *     Pet:
     *       description: A JSON object containing pet information
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: integer
     *                 format: int32
     *                 description: The pet ID
     *                 example: 1
     *               name:
     *                 type: string
     *                 description: The pet's name
     *                 example: Juno
     *               image:
     *                 type: string
     *                 description: The photo of the pet
     *                 example: https://cdn.orvis.com/images/DBS_Westie_1280.jpg
     *               dob: 
     *                 type: string
     *                 format: date
     *                 description: The pet's date of birth
     *                 example: 2016-01-01
     *               address:
     *                 type: string
     *                 description: The home address of the pet
     *                 example: 650 Chapel Street, South Yarra, VIC 3141
     *               updatedAt:
     *                 type: string
     *                 description: The update timestamp of the record
     *                 example: 2021-04-18T13:34:28.299Z
     *               createdAt:
     *                 type: string
     *                 description: The create timestamp of the record
     *                 example: 2021-04-18T13:34:28.299Z
     *     Pets:
     *       description: An array of JSON object containing pet information
     *       content:
     *         application/json:
     *           schema:
     *             type: array
     *             items:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                   format: int32
     *                   description: The pet ID
     *                   example: 1
     *                 name:
     *                   type: string
     *                   description: The pet's name
     *                   example: Juno
     *                 image:
     *                   type: string
     *                   description: The photo of the pet
     *                   example: https://cdn.orvis.com/images/DBS_Westie_1280.jpg
     *                 dob: 
     *                   type: string
     *                   format: date
     *                   description: The pet's date of birth
     *                   example: 2016-01-01
     *                 address:
     *                   type: string
     *                   description: The home address of the pet
     *                   example: 650 Chapel Street, South Yarra, VIC 3141
     *                 updatedAt:
     *                   type: string
     *                   description: The update timestamp of the record
     *                   example: 2021-04-18T13:34:28.299Z
     *                 createdAt:
     *                   type: string
     *                   description: The create timestamp of the record
     *                   example: 2021-04-18T13:34:28.299Z
     */
};