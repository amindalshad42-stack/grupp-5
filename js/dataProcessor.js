// gemensamkod sida - återanvändningsbar kod för alla


// data/dataProcessor.js

// Funktion 1: Hämta lännamn från SQLite
export async function getCountiesFromSQLite(countyNames) {
  // Här skulle ni ansluta till SQLite och köra query
  const db = await openDatabase('counties.sqlite');
  const result = await db.query(
    `SELECT id, name FROM counties WHERE name IN (${countyNames.map(() => '?').join(',')})`
  );
  return result;
}

// Funktion 2: Hämta valresultat från Neo4j
export async function getVotesFromNeo4j(municipalities, year) {
  // Anslut till Neo4j
  const driver = neo4j.driver('neo4j://localhost:7687', auth);
  const session = driver.session();

  const query = `
    MATCH (m:Municipality)-[:HAS_ELECTION_RESULT]->(er:ElectionResult {year: $year})
    WHERE m.id IN [${municipalities.map(m => m.id).join(',')}]
    RETURN m.name, er.party, er.percentage
  `;

  const result = await session.run(query, { year });
  session.close();

  // Formatera resultat:
  // { Stockholm: { S: 28, M: 24, ... }, Skåne: { ... } }
  return formatVotesResult(result.records);
}

// Funktion 3: Beräkna genomsnitt per län
export function calculateAverageByCounty(votes, municipalities) {
  const averageByCounty = {};

  municipalities.forEach(m => {
    if (!averageByCounty[m.county]) {
      averageByCounty[m.county] = {};
    }
    // Summera röster per parti
    Object.keys(votes[m.name]).forEach(party => {
      if (!averageByCounty[m.county][party]) {
        averageByCounty[m.county][party] = [];
      }
      averageByCounty[m.county][party].push(votes[m.name][party]);
    });
  });

  // Beräkna medelvärde
  Object.keys(averageByCounty).forEach(county => {
    Object.keys(averageByCounty[county]).forEach(party => {
      const values = averageByCounty[county][party];
      averageByCounty[county][party] = values.reduce((a, b) => a + b, 0) / values.length;
    });
  });

  return averageByCounty;
}