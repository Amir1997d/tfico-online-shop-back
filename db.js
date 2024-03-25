const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tfi', '', '', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
});

sequelize.sync();

module.exports = {
  sequelize
}
