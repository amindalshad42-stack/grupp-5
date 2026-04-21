addMdToPage(`
###  Åldersgrupper och partier
`)


addMdToPage(`
##### Röstar olika åldersgrupper för olika partier? Skiljer sig detta mellan regioner?

Vad du gör:
1. Du delar människor i åldersgrupper:
    - Ungdomar:18-40 år
    - Medelålders:41-65 år
    - Pensionärer:66+ år
2. För varje åldersgrupp räknar du ut:
    - Vilka partier vann bland denna grupp?
    - Gör detta för minst 2 regioner(t.ex. Stockholm och Norrland)
3. Du jämför:"Röstar ungdomar på samma partier oavsett region?"

---

Ditt diagram:
  - T.ex tre stapeldiagram (ett per åldersgrupp) som visar vilka partier de röstade på (kolla vilket google chart diagram som fungerar bäst)
  - Visa skillnaden mellan två regioner

---

Vad du skriver:
  - Förklara dina åldersgrupper
  - Visa diagrammet
  - Säg: "Ungdomar röstade på [parti X], men pensionärer på [parti Y]. I Stockholm var skillnaden större/mindre än i Norrland."s. Median
  `)


let data = await jload('/databases/databases-in-use.json')

// Hämta åldersdata från MongoDB
dbQuery.use('kommun-info-mongodb');
let ageData = await dbQuery.collection('ageByKommun').find({});

// Hämta valdata från Neo4j
dbQuery.use('riksdagsval-neo4j');
let voteData = await dbQuery('MATCH (p:Partiresultat) RETURN p.kommun, p.parti, p.roster');

dbQuery.use('befolkning-sqlite');
let ageDocData = await dbQuery.collection('ageCount').find({});


async function visaTabell() {

  dbQuery.use('befolkning-sqlite');

  // 1. Hämta tabellnamnen för att vara 100% säkra
  let tables = await dbQuery("SELECT name FROM sqlite_master WHERE type='table'");

  if (!tables || tables.length === 0) {
    addMdToPage('❌ **Fel:** Hittade inga tabeller i databasen. Kolla sökvägen i databases-in-use.json!');
    return;
  }

  // Ta det första tabellnamnet som hittas automatiskt
  let tableName = tables[0].name;
  console.log("Använder tabell:", tableName);

  // 2. Hämta data från den tabellen
  let minData = await dbQuery(`SELECT * FROM ${tableName} LIMIT 20`);

  // 3. Säkerhetskoll innan tableFromData körs
  if (minData && Array.isArray(minData) && minData.length > 0) {
    tableFromData({
      data: minData
    });
  } else {
    addMdToPage(`⚠️ Tabellen **${tableName}** är tom eller kunde inte läsas.`);
  }
}

visaTabell();