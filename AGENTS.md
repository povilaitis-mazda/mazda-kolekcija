# Mazda kolekcijos priežiūra

Šios instrukcijos galioja tik `povilaitis-mazda/mazda-kolekcija` saugyklai ir jos svetainei `https://kolekcija.povilaitis.lt/`.

## Darbo ribos

- Keisk tik šios Mazda kolekcijos saugyklos failus. Neadministruok kitų saugyklų, paskyrų, DNS ar prieigos leidimų be atskiro naudotojo nurodymo.
- Svetainė statinė, be build priklausomybių. GitHub Pages publikuoja `main` šaknį. Išsaugok `CNAME`, `.nojekyll`, abi temas: esamą juodą/lime (`#090d0a` / `#b9ff42`) ir šviesią (`#f7f5ef` / tamsesnė žalia `#356519`), paiešką, filtrus ir galerijas.
- Prieš darbą perskaityk aktualią nuotolinę `main`, o ne pasikliauk ankstesnio pokalbio ar vietinės kopijos duomenimis. Saugok lygiagrečius pakeitimus; neatlik force push.

## Nauji modeliukai

1. Prieš pridėjimą palygink su visu aktualiu `collection.js` katalogu pagal automobilio modelį, modeliuko gamintoją, spalvą, dekoraciją, seriją, numerį ir kodus. Tas pats variantas yra galimas dublikatas: perspėk ir palauk naudotojo sprendimo prieš pridėjimą. Kita spalva ar leidimas gali būti atskiras variantas.
2. Remkis priekio, pakuotės galo ir dugno fotografijomis. Jei identifikacija abejotina, prieš pridėjimą paprašyk papildomos nuotraukos. Nepriskirk nepatvirtinto gamintojo, mastelio, retumo, leidimo metų ar kitų faktų. Automobilio modelio metai nėra modeliuko išleidimo metai.
3. Leidėją saugok atskirai nuo fizinio gamintojo. Hachette Collections Japan yra Familia leidėjas; šio egzemplioriaus fizinis gamintojas nepatvirtintas. Kinsfun RX-7 KT-4018 mastelis nepatvirtintas. Apytikslį mastelį aiškiai pažymėk; patvirtintam 1:43 netaikyk apytikslio mastelio žymos.
4. Išsaugok visus senus įrašus ir nuotraukų nuorodas. Naują įrašą pridėk į `collection.js`; skaitliukai, filtrai ir paskutinio papildymo data skaičiuojami iš duomenų. Naudok tikrą papildymo datą pagal Europe/Vilnius.
5. Patikrink būklę: pakuotė, ekspozicinis dėklas ar be pakuotės. Visų įrašų automatiškai nevadink esančiais originalioje pakuotėje.

## Fotografijos ir privatumas

- Pirmiausia įsitikink, kad įkėlimo įrankiai turi tikrus failus. Vaizdas pokalbio peržiūroje savaime nereiškia, kad jo originalas atsisiunčiamas. Nenaudok peržiūros kaip tariamai pasiekiamo originalo.
- Šiame debesijos pokalbyje patikrintas kelias: telefone rinktis **Files / Failai** ir prisegti failus arba ZIP. Vieno atsisiunčiamo failo techninis limitas – 32 MiB; didesnį rinkinį naudotojas gali padalyti į mažesnius ZIP. Tai nėra būdas apeiti saugos atmetimą.
- Prieš viešą įkėlimą paruošk atskiras kopijas be EXIF/GPS, XMP, IPTC, komentarų ir nereikalingų asmeninių metaduomenų ar įterptų pagalbinių vaizdų. Originalų viešai nekelk. Išsaugok pagrindinio vaizdo raišką, teisingą orientaciją ir spalvas; kai įmanoma, pašalink JPEG metaduomenų segmentus nekeisdamas suspausto vaizdo. Patikrink metaduomenų nebuvimą, vaizdo pikselių atitikimą ir kontrolines sumas. Spalvoms reikalingas neasmeninis ICC profilis gali likti.
- Nekelk iš naujo dviejų senų, anksčiau blokuotų failų `ChatGPT Image Nov 9, 2026, 09_24_40 PM.jpg` ir `ChatGPT Image Nov 9, 2026, 09_24_54 PM.jpg`. Svetainė tik susieja jau paties naudotojo viešai įkeltus failus.
- Laikykis realių įrankių leidimo užklausų ir Auto-review sprendimų. Atmesto įkėlimo nekartok kitu kanalu, kitu kodavimu ar su kitu failo vardu. Pranešk, kas atmesta ir kodėl. Nutrauktas ar neaiškus vykdymas nėra patvirtintas įkėlimas; prieš tęsiant nustatyk jo būseną. Nekeisk naudotojo leidimų režimo.

## Kataloginiai vaizdai ir galerijos

- Ieškok tikslų variantą atitinkančios kataloginės nuotraukos. Išsaugok šaltinio pavadinimą ir tikrą produkto nuorodą; ją rodyk galerijoje. Nežadėk išorinio šaltinio prieinamumo ar naudojimo teisių.
- Kataloginė nuotrauka turi atitikti ir įrašo pakuotės formatą: dėžutėje esančiam egzemplioriui nedėk lizdinės pakuotės vaizdo. Jei tinkamo vaizdo nėra arba šaltinis rodo klaustuką / pakaitinį paveikslėlį, rodyk naudotojo fotografiją. Vien HTTP 200 nepatvirtina nuotraukos tinkamumo.
- Kortelėje ir galerijoje kataloginė fotografija turi būti pirmoji. Naudotojo pagrindinė modeliuko fotografija turi būti paskutinė; tarp jų galima pateikti aiškiai pavadintas naudotojo dugno ar pakuotės nuotraukas. Išsaugok aiškius nuotraukų perjungimo mygtukus.
- Jei kataloginis vaizdas nepasiekiamas, naudok to įrašo pagrindinę naudotojo fotografiją kaip atsarginę.
- Išsaugok galerijos šonines rodykles, ← / → klavišus ir horizontalų braukimą telefone. Vertikalus slinkimas bei mastelio keitimas turi likti galimi; vienos nuotraukos galerijai rodyklių nereikia.

## Patikra ir publikavimas

- Keisdamas JS ar CSS atnaujink jų versijų žymas `index.html`, kad naršyklė gautų naują kodą.
- Patikrink senų įrašų išsaugojimą, dublikatus, nuotraukų kelių ir kontrolinių sumų atitikimą, skaitliukus, filtrus, paiešką, būklės ir mastelio tekstus, galerijų tvarką, šaltinių nuorodas, atsarginę fotografiją ir telefono plotį. Patikrink, kad nėra JS klaidų.
- Publikuok tik turėdamas naudotojo autorizaciją ir realiai patvirtintus įrankių leidimus. Pakartotinių pokalbio patvirtinimų neprašyk, kai galiojanti autorizacija jau apima veiksmą; privalomų įrankio patvirtinimų neapeik.
- Po commit patikrink tikslų nuotolinės `main` SHA, šiam commit skirtą GitHub Pages vykdymą bei jo publikavimo žingsnį ir tikrą viešą svetainę. Publikavimo nelaikyk visiškai patikrintu, kol viešas rezultatas nepatikrintas. Jei jį tikrina naudotojas kitame pokalbyje, aiškiai atskirk GitHub patvirtintą publikavimą nuo dar laukiančios viešo puslapio patikros.
- Laikykis debesijos tinklo politikos. Daryk tik oficialiai palaikomus konfigūracijos pakeitimus ir tikrink jų taikymą vykdomai sesijai. Reusable aplinkos Publish neįrodo, kad sena sesija jau atnaujinta. Nebandyk tinklo ribojimų apeiti; pateik tikslų blokavimą ir tęstinumo instrukciją naujai sesijai.

Bendrauk lietuviškai, glaustai ir paprastai. Visada aiškiai pasakyk, kas tik paruošta, kas įkelta, kas paskelbta ir kas dar nepatikrinta.

## Temų priežiūra

Išsaugok aiškų „Šviesi / Tamsi“ pasirinkimą ir `aria-pressed` būseną. Pirmo apsilankymo temą nustatyk anksti `head` pagal `prefers-color-scheme`; galiojantį rankinį pasirinkimą laikyk `localStorage`, klaidas apdorok saugiai. Rankinio pasirinkimo sistemos temos pokytis neturi pakeisti. Visų komponentų spalvas imk iš temos kintamųjų. Keičiant temų kodą patikrink abu režimus telefono plotyje, išsaugojimą po reload, sistemos pasirinkimą be įrašo, sistemos temos pasikeitimą, neprieinamą storage ir `theme-color`.
