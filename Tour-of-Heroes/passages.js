//! TOUR OF HEROES PASSAGGI

/*
! 1) CREAZIONE PROGETTO
- CLI ng new <project-name> e attivare l'applicazione con ng serve --open
- In app.component modificare il valore della proprietà 'title' e utilizzare la string interpolation nel Template per mostrarla a schermo
- Applicare lo stile globale dell'applicazione in style.css

! 2) IL COMPONENTE HERO
- Creare componente 'heroes' con CLI ng generate component <name>
- Inserire una proprietà con un valore e mostrarlo con string interpolation nel Template
- Inserire in app.html il selettore del componente 'heroes' per mostrare il suo Template
- Creare Interfaccia con file esterno TS ed esportarla. L'interfaccia serve x creare uno stampino per le future proprietà.
- Importare l'Interfaccia nel componente 'heroes' e creare una proprietà legata ad essa
- Mostrare i dettagli nel Template con la string Interpolation e le proprietà (Se necessario usare PIPE)
- Utilizzare la direttiva [(ngModel)]='proprietà' in un <input> per ottenere il Two-Way Binding e aggiornare il valore della proprietà in ambo le direzione attraverso l'azione utente
! Importare FormsModule in app.module per utilizzare ngModel

! 3) DIRETTIVE STRUTTURALI E LISTA HEROES
- Creare file TS con Array di Oggetti legati all'Interfaccia creata prima e assegnare valori
- Importare la variabile nel componente 'hero' e assegnarla ad una variabile
- Utilizzare direttiva *ngFor per ciclare i valori della proprietà indicata [*ngFor='let hero of heroes'
?EVENTO CLICK => (event)="method()"
- Utilizzare un event-binding per legare un elemento ad un metodo nel componete 'heroes'
- Definire il metodo e modificare il Template
?CLASS BINDING => [class.classCss]='condition'
- Utiliizzare il class-binding per attivare delle classi solo quando la condizione viene verificata

! 4) CREARE SOTTO-COMPONENTI E RELAZIONI TRA ESSI
- Creare un nuovo componente 'hero-detail'
- Nel componente importare l'Interfaccia e il decoratore @Input(), associando a questo una proprietà legata all'interfaccia
- In heroes.component Template inserire il selettore del componente legando, con property-binding la proprietà di 'hero-detail' con quella di 'heroes'
- Spostare la parte dei dettagli da 'heroes' a 'hero-detail'

? Divisione dei compiti per componente.
? Delegare una funzionalità ad un altro componente e creare una relazione parent-child.
? Nel Template parente viene inserito il selettore del componente Child e i dati vengono collegati con PROPERTY BINDING => [Child]="Parent"
?Child --> la proprietà Child utilizzata assieme al decoratore @Input()
?Parent --> la proprietà del Parent che contiene i dati che vogliamo associare con la proprietà Child
! Il PROPERTY BINDING è a ONE-WAY e collega PARENT -> CHILD

! 5) Servizi nelle Applicazioni
? Usa delle DI di Angular invece del 'new' keyword di JS. I servizi permettono di condividere la funzionalità con tutta l'applicazione
- Creare il servizio hero con CLI ng generate service <name>
- Importare l'Interfaccia e l'Array di Oggetti e creare un metodo che ritorni l'Array stesso.
- Nel componente 'heroes' importare il Servizio e modificare la proprietà
- Iniettare il servizio nel costruttore del componente con il modificatore 'private'
- Creare un metodo nel componente 'heroes' (che ha la stessa funzione) utilizzando quello creato nel Servizio
- Implementare la funzionalità OnInit e richiamare il metodo creato quando il componente viene inizializzato.

! Al momento funziona perché i dati sono richiamati in modo Sincrono avendo il file TS. Tuttavia in realtà le chiamate devono essere ASINCRONE

- Importare Observable e of in Servizio e aggiornare il metodo di ritorno 'heroes' nel Service
- Aggiornare il metodo nel componente 'heroes' utilizzando la funzionalità Observable .subscribe

- Creazione componente 'message' e inserire il selettore in app.component Template
- Creare il Servizio 'message' e creare dei metodi e proprietà
- Importare 'message service' in 'hero-service' e iniettarlo nel costruttore
- Utilizzare i metodi del 'message' nel 'hero'
- Importare 'message-service' nel componente 'message' e iniettarlo con modificatore 'public' [PERMETTE IL BINDING]. Poi definire il Template


Creare un Service per importare i valori locali / remoti dei dati
Rendere fruibile questo Service a tutto il progetto o solo a specifici componenti e importarlo
Creare metodi nel service che i componenti possano usare
Creare metodi simili nei componenti e richiamare dentro i metodi del service
Nle costruttore usare PRIVATE per poter usare il Service solo nel componente.ts mentre PUBLIC per poter usare il service direttamente nel Template

! 6) ROUTING E NAVIGAZIONE
- Se non creato usare il CLI -> ng g module app-routing --flat --module=app -> per creare il file ROUTING dell'applicazione
?(Genera il file app-routing all'interno della cartella app e che appartiene al modulo app-module.ts)
- Compilare l'array 'routes' con oggetti aventi la proprietà 'path' e 'component'
- Il file routing deve importare ed esportare questo Array
- Utilizzare il selettore <router-outlet> per importare il routing delle routes creato e aggiungere la navigazione in app.component Template
- Creare componente 'dashboard' e inserirlo nel Routing come default route, poi aggiungerlo nella navigazione in app.component Template

- Aggiungere 'hero-detail' al routing e modificare i componenti 'dashboard' e 'heroes' con un link di navigazione al 'hero-detail'

? RENDERE DINAMICO E NAVIGABILE 'HERO-DETAIL'
- Importare nel componente LOCATION - ACTIVATEDROUTE - 'HERO-SERVICE' e iniettarli nel costruttore
- Creare metodi nel servizio per prelevare l'id e passarlo al componente con un metodo asincrono

[
 ? Utilizzare il tag <a> assieme a routerLink:"path-routing" (+ eventuale interpolation) per creare dei collegamenti tra i componenti. Per eseguire il routing bisogna togliere il property binding dai template ed usare routerLink.

  Nel componente che ha l'url (name-component/:id) importare:
- ActivatedRoute --> Contiene le informazioni sulla route del componente in cui viene importato
- Location --> Servizio Angular per navigare tra i template

  Prelevare l'esatto parametro route id con la sintassi
--> this.ActivatedRoute.snapshot.paramMap.get('id') [o valore necessario del routing path]
--> Aggiungere metodo del servizio con parametro id + subscribe

  Nel servizio aggiungere metodo di prelevamento id
]

! 7) DATA FROM SERVER CON HTTP
- Importare HttpClientModule in app.module (necessario per comunicare con server remoto)
? SIMULAZIONE CON In-memopry Web API
- Importare HttpClient e HttpHeaders in 'hero-service' e iniettarli nel costruttore (httpclient)
- Definire una proprietà come url per le chimate http
- Convertire i metodi nei corrispettivi usando http method (get | )
- Importare catchError, map, tap per gestire gli Errori - unito all'operatore RxJS .pipe
- Aggiornare i metodi del 'hero-service'

- Creare metodo nel 'hero-service' (http put) per salvare i dati modificati e un metodo nel componente 'hero-details' collegato ad un event-binding nel Template (necessario il subscribe)

- Creare metodo nel 'hero-service' (http.post) per creare un dato e un metodo nel componenente 'heroes' collegato ad un event-binding nel Template (necessario il subscribe)

- Creare metodo nel 'hero-service' (http.delete) per creare un dato e un metodo nel componenente 'heroes' collegato ad un event-binding nel Template (necessario il subscribe)

- Creare componente 'search' e definire metodo in 'hero-service' di ricerca dato.
- Inserire il selettore del componente in 'dashboard'
- Importare de
*/


