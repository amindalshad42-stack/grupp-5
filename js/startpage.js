import dbInfoOk, { displayDbNotOkText } from "./dbInfoOk.js";

addMdToPage(`
  # Välkommen!

  I den här delen av analysen kommer vi att titta på hur valresultatet skiljer sig mellan olika geografiska områden i Sverige. Vi kommer att fokusera på tre huvudområden:


  Moa: Regionala Skillnader (Län mot Län)
Fokus: De stora geografiska penseldragen.
Steg 1: Välj ut 3–4 län som representerar olika delar av Sverige (t.ex. Stockholm, Skåne och Västerbotten).
Steg 2 (Kod): Använd counties-sqlite för att få namnen och riksdagsval-neo4j för att hämta roster2018 och roster2022 för alla kommuner i dessa län.
Steg 3 (Analys): Räkna ut det genomsnittliga resultatet för de största partierna per län. Se om gapet mellan t.ex. Stockholm och Västerbotten har ökat eller minskat mellan valen.
Steg 4 (Diagram): Ett ColumnChart som visar valresultatet 2022 för de valda länen sida vid sida.
Text på sidan: Förklara om vissa partier är "starkare i norr" och om den trenden förstärktes 2022.

Agnes: Stad vs Landsbygd (Täthetsanalysen)
Fokus: Kopplingen mellan er CSV och valresultatet.
Steg 1 (Kod): Hämta data från er CSV (tathet.csv). Sortera kommunerna efter de 10 med högst täthet (städer) och de 10 med lägst täthet (glesbygd).
Steg 2 (Koppling): Matcha dessa 20 kommuner med röstdata från riksdagsval-neo4j.
Steg 3 (Analys): Räkna ut hur mycket t.ex. SD ökade i de "glesa" kommunerna jämfört med i de "täta" kommunerna mellan 2018 och 2022.
Steg 4 (Diagram): Ett BarChart (liggande staplar) som visar "Förändring i procentenheter" för de största partierna, uppdelat på kategorierna "Stad" och "Landsbygd".
Text på sidan: Berätta om tätheten (geografin) var en viktigare faktor för röstningen än vilket län man bodde i.

Zhi Sam: Den Geografiska Trenden (Vinnare & Förlorare)
Fokus: Var i landet skedde de största skiftena?
Steg 1 (Kod): Räkna ut förändringen (r2022 - r2018) för alla kommuner i hela Sverige för ett specifikt parti.
Steg 2 (Koppling): Använd geo-mysql för att se i vilka län dessa "topp-kommuner" ligger.
Steg 3 (Analys): Hitta de 5 kommuner i Sverige där ett parti ökade mest. Ligger de alla i samma del av landet? Är de alla glesbygdskommuner (kolla CSV)?
Steg 4 (Diagram): Ett ComboChart eller LineChart som visar hur stödet för ett visst parti har rört sig i 3 olika geografiska zoner (t.ex. Norrland, Svealand, Götaland).
Text på sidan: Analysera "årets raket". "Vi ser att Parti X vann mest mark i geografiska områden med låg befolkningstäthet..."
  `)