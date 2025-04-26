const { writeFileSync } = require('fs');
const sequelizeErd = require('sequelize-erd');
const { sequelize } = require('../models');

(async function() {
  try {
    const svg = await sequelizeErd({
      source: sequelize,
      engine: 'circo',
      arrowShapes: {
        BelongsToMany: ['crow', 'crow'],
        BelongsTo: ['inv', 'crow'],
        HasMany: ['crow', 'inv'],
        HasOne: ['dot', 'dot'],
      },
      arrowSize: 1.2,
      lineWidth: 1,
    });
    writeFileSync('./erd.svg', svg);
    console.log('ERD diagram generated successfully!');
  } catch (error) {
    console.error('Error generating ERD:', error);
  }
})();
