const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tfi', '', '', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
});

sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully');
  })
  .catch(error => {
    console.error('Error synchronizing database:', error);
  });


module.exports = {
  sequelize
}
