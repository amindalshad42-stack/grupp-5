addMdToPage(`
# Trendspaneren!!!!!
  `);
dbQuery.use('befolkning-sqlite');
let income = await dbQuery.collection().find({}).limit(100);
tableFromData({ data: income });
console.log('income from mongodb', income);

