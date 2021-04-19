const db = require("../models");
const Pet = db.pets;
const Op = db.Sequelize.Op;

// Create and Save a new Pet
exports.create = (req, res) => {
    // Create a Pet Record
    const pet = {
        name: req.body.name,
        image: req.body.image,
        dob: req.body.dob,
        address: req.body.address
    };

    // Save Pet in the database
    Pet.create(pet).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Pet."
        });
    });
};

// Find pets matching search criteria from the database
exports.findSearch = (req, res) => {
    let whereClause = {};
    const { name, dob, address } = req.query;

    if (name) {
        whereClause['name'] = {
            [Op.substring]: name
        };
    }
    
    if (dob) {
        whereClause['dob'] = {
            [Op.substring]: dob
        };
    }

    if (address) {
        whereClause['address'] = {
            [Op.substring]: address
        };
    }

    Pet.findAll({
        order: [
            ['id', 'ASC']
        ],
        where: whereClause
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while searching pets."
        });
    });
};

// Retrieve all Pets from the database.
exports.findAll = (req, res) => {
    Pet.findAll().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving pets."
        });
    });
};

// Find a single Pet with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Pet.findByPk(id).then(data => {
        if (data) {
            res.send(data)
        } else {
            res.status(404).send('Not found')
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error retrieving Pet with id=" + id
        });
    });
};

// Update a Pet by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Pet.update(req.body, {
        where: { id }
    }).then(num => {
        if (num == 1) {
            res.send({
            message: "Pet was updated successfully."
            });
        } else {
            res.send({
            message: `Cannot update Pet with id=${id}. Maybe Pet was not found or req.body is empty!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error updating Pet with id=" + id
        });
    });
};

// Delete a Pet with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Pet.destroy({
        where: { id }
    }).then(num => {
        if (num == 1) {
            res.send({
            message: "Pet was deleted successfully!"
            });
        } else {
            res.send({
            message: `Cannot delete Pet with id=${id}. Maybe Pet was not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Could not delete Pet with id=" + id
        });
    });
};

// Delete all Pets from the database.
exports.deleteAll = (req, res) => {
    Pet.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ message: `${nums} Pets were deleted successfully!` });
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all pets."
        });
    });
};