// import our db, Model, DataTypes
const { db, DataTypes } = require('../db/connection')

// Creating a User child class from the Model parent class
const Show = db.define('shows', {
  title: {
    type: DataTypes.STRING,
    validate: {
      len: [1,25]
    }
  },
  genre: DataTypes.STRING,
  rating: DataTypes.INTEGER,
  available: DataTypes.BOOLEAN
})

// exports
module.exports = Show
