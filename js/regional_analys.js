addMdToPage(`
# Regionala Skillnader

Här undersöker vi hur olika län har röstat i riksdagsvalen 2018 och 2022. 
`);

dbQuery.use('counties-sqlite');
let countyInfo = await dbQuery('SELECT * FROM countyInfo');
console.log('countyInfo', countyInfo);

dbQuery.use('geo-mysql');
let geoData = await dbQuery('SELECT * FROM geoData LIMIT 25');
console.log('geoData from mysql', geoData);