module.exports = (sequelize, Sequelize) => {
    const Pet = sequelize.define("pet", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
            isUrl: true
        },
        dob: {
            type: Sequelize.DATEONLY,
            validate: {
                isDate: true
            }
        },
        address: {
            type: Sequelize.STRING
        }
    });
  
    return Pet;
};    