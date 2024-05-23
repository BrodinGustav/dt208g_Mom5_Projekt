### Angular Frontend Project README

### Om projektet
Detta projekt är en Angular-baserad frontendapplikation för hantering av kurser och ramschema.

### Installation
Klona detta repository till din lokala maskin.
Öppna en terminal och navigera till projektmappen.
Kör kommandot npm install för att installera alla projektets beroenden.

### Användning
Starta applikationen genom att köra kommandot ng serve.
Öppna din webbläsare och navigera till http://localhost:4200/.

### Projektstruktur
index.html
Huvud-HTML-filen som definierar grunderna för applikationens struktur.

### models/
course.ts: Ett interface som definierar strukturen för kurser.
framework.ts: Ett interface som definierar strukturen för ramschema.

### Assets/
miun_courses.json: En JSON-fil som innehåller kursdata.

### Components/
app-header/: En komponent som representerar applikationens header.
app-footer/: En komponent som representerar applikationens footer.

### courses/: En komponent för att visa och hantera kurser.

### framework/: En komponent för att visa och hantera ramschema.

### not-found/: En komponent för att visa en 404-sida.

### Services/

### courses.service.ts: En service för att hantera kursdata.

### framework.service.ts: En service för att hantera ramscheman.

### Komponenter
app.component
Huvudkomponenten som innehåller grundläggande layout för hela applikationen.

header.component
En komponent som visar navigeringsmenyn för att välja mellan kurser och ramschema.

footer.component
En komponent som visar footer-information för applikationen.

courses.component
En komponent som hanterar visning och filtrering av kurser.

framework.component
En komponent som hanterar visning och hantering av ramschema.

### Routes
/courses: Visar kurser.
/framework: Visar ramschema.
/404: Visas vid felaktig sökväg.
/: Omdirigerar till kurssidan som standard.

### Förberedelser
Se till att ha Node.js och Angular CLI installerade på din maskin.

### Teknologier
Angular
TypeScript
HTML
CSS

###Skapad av Gustav Brodin - DT208G - Mom 5 - VT 2024
