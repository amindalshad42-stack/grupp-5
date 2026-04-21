addMdToPage(`
# Regionala Skillnader

Här undersöker vi hur olika län har röstat i riksdagsvalen 2018 och 2022. 
`);

// Använd Neo4j-databasen för valresultat
dbQuery.use('riksdagsval-neo4j');

// Först, testa att se vad som finns i databasen
let testQuery = await dbQuery(`
  MATCH (n) RETURN n LIMIT 10
`);

console.log('Test av databasen:', testQuery);

// Hämta valresultat - börja med en enklare query
let regionalVotes = await dbQuery(`
  MATCH (n) WHERE n.name IN ['Stockholm', 'Skåne', 'Västra Götaland', 'Västerbotten'] 
  RETURN n LIMIT 50
`);

console.log('Regionala valresultat:', regionalVotes);

// Visa resultaten i en tabell om vi har data
if (regionalVotes && regionalVotes.length > 0) {
  tableFromData({ data: regionalVotes });
} else {
  addMdToPage('Ingen data hittades i databasen.');
}
