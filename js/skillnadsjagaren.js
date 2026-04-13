addToPage(`
Medel vs. Median
  `)

dbQuery.use('kommun-info-mongodb');
let income = await dbQuery.collection('incomeByKommun').find({}).limit(25);

// Ta bort _id och kön kolumnerna från data
let processedIncome = income.map(item => {
  const { _id, kon, ...rest } = item;
  return rest;
});

tableFromData({ data: processedIncome });
