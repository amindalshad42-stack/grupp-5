addMdToPage(`
# Stad vs landsbygd

Här undersöker vi om kommunernas täthet kan ha samband med hur röstningen förändrades mellan riksdagsvalen 2018 och 2022.

För att göra detta delar vi upp kommuner i två grupper:
- de med högst befolkningstäthet (städer)
- de med lägst befolkningstäthet (landsbygd)

Vi jämför sedan hur stödet för olika partier har förändrats mellan valen i dessa två grupper.

Målet är att se om det finns skillnader i hur väljarmönster förändras beroende på om man bor i en tät stad eller i en mer gles landsbygd.
`);

addMdToPage(`
## Hypotes

Vi tror att förändringen i röstning kan skilja sig mellan stad och landsbygd, eftersom livsvillkor, ekonomi och befolkning skiljer sig åt mellan dessa områden.
`);


async function hamtaOchKoppla() {
  // 1. Hämta din snygga CSV-data
  dbQuery.use('befolkningstathet-csv');
  // Vi hämtar bara 2018 och 2022 för att jämföra
  let tathet = await dbQuery("SELECT * FROM tatort WHERE ar = '2018' OR ar = '2022'");

  // 2. Hämta valresultat från Neo4j
  dbQuery.use('riksdagsval-neo4j');
  let val = await dbQuery("MATCH (n:ElectionResult) RETURN n.kommun, n.parti, n.roster2018, n.roster2022");

  // 3. LIMMET: Koppla ihop dem
  let analysResultat = tathet.map(tRad => {
    // Hitta rösterna för just denna kommun
    let match = val.find(vRad => vRad['n.kommun'] === tRad.region);

    return {
      kommun: tRad.region,
      ar: tRad.ar,
      densitet: parseFloat(tRad.varde),
      partiInfo: match
    };
  });

  console.log("Koppling klar!", analysResultat[0]);
}