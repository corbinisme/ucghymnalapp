var whatsnew = {
    st: window.localStorage,
    lang: app.lang,
    whatsNewId: config.whatsNewId,
    currentStep: 1,
    showingSteps: false,
    currentStepCount: 0,
    init: function() {
        console.log("whatsnew init")
        if(this.st.getItem('whatsnewseen') == null) {
            if(this.whatsNewId !==null && this.whatsNewId !== undefined && this.whatsNewId !== "" && this.whatsNewId !== 0){
                this.showWhatsNew();
                
            }
  
            
        }
    },
    bindEvents: function() {
        document.querySelectorAll(".whatsnew-close").forEach(function(el) {

            el.addEventListener('click', function(e) {
                e.preventDefault();
                whatsnew.closeWhatsNew();
                //this.st.setItem('whatsnewseen', '1');
            }, false);
        }
        );
        document.querySelectorAll("#whatsnew-modal .slider .slider-buttons button").forEach(function(el) {
            el.addEventListener('click', function(e) {
                e.target.classList.contains("slider-prev") ? whatsnew.changeStep(whatsnew.currentStep-1) : whatsnew.changeStep(whatsnew.currentStep+1);
            }, false);
        }
        );

        document.querySelectorAll("#whatsnew-modal .slider-dots .slider-dot").forEach(function(el) {
            el.addEventListener('click', function(e) {
                whatsnew.changeStep(parseInt(el.getAttribute("data-step")));
            }, false);
        });
        document.querySelector("#take-a-tour").addEventListener('click', function(e) {
            e.preventDefault();
            whatsnew.showTour();
            whatsnew.changeStep(1);
        }, false);

    },
    changeStep: function(step) {

        if(step<1){
            step = 1;
        }
        if(step>this.currentStepCount){
            step = this.currentStepCount;
        }
        this.currentStep = step;

        // update currently shown step
        document.querySelectorAll("#whatsnew-steps .whatsnew-step").forEach(function(el) {
            el.classList.remove("active");
            let thisStep = parseInt(el.getAttribute("data-step"));

            if(thisStep == step){
                el.classList.add("active");
            }
        })


        // update dot
        document.querySelectorAll(".slider-dots .slider-dot").forEach(function(el) {
            el.classList.remove("active");
            if(el.getAttribute("data-step") == whatsnew.currentStep){
                el.classList.add("active");
            }
        }); 

        // run step callback
        let thisData = this.whatsNewData.find(x => x.id === whatsnew.whatsNewId);
        let thisStep = thisData.steps.find(x => x.step === whatsnew.currentStep);
        //thisStep.callback();
       
    },
    showTour: function() {
        this.showingSteps = true;
        document.querySelector("#take-tour-wrapper").classList.add("active");
        document.querySelector("#whatsnew-modal .take-tour").classList.remove("active");
        document.querySelector("#whatsnewintro").classList.remove("active");
    },
    updateLang: function(el) {

        app.lang = el.value;
        this.lang = el.value;
        app.setLang(el.value);
        app.loadCurrentLang();
        this.closeWhatsNew();
        this.showWhatsNew();
    },
    makeHighlightedElement: function(elem){
        elem.classList.add("whatsNewHighlighted");
        // clone element and place above everything else?
        // get position of element
        let rect = elem.getBoundingClientRect();
        let top = rect.top + window.scrollY;
        let left = rect.left + window.scrollX;
        let width = rect.width;
        let height = rect.height;

        let clone = elem.cloneNode(true);
        clone.classList.add("whatsNewClone");
        // set same position
        clone.style.top = top + "px";
        clone.style.left = left + "px";
        clone.style.width = width + "px";
        clone.style.height = height + "px";
        clone.style.position = "fixed";
        clone.style.zIndex = 1001;

        document.querySelector("body").appendChild(clone);   

        
        // scroll to element

    },
    whatsNewData: [
        {
            id: 1, 
            revision: "6.1.0", 
            title: {
                en: "Latest Updates",
                de: "Neueste Updates",
                pg: "Atualizações mais recentes",
                es: "Últimas actualizaciones",
                fr: "Dernières mises à jour",
                nl: "Laatste updates",
                it: "Ultimi aggiornamenti"

               
            },
            date: "2024-05-06",
            description: {
                en: "This is the initial release of the app. It includes the full hymnal with search by number and title.",
                de: "Dies ist die Erstveröffentlichung der App. Es enthält das vollständige Gesangbuch mit Suche nach Nummer und Titel.",
                pg: "Este é o lançamento inicial do aplicativo. Inclui o hinário completo com pesquisa por número e título.",
                es: "Esta es la versión inicial de la aplicación. Incluye el himnario completo con búsqueda por número y título.",
                fr: "Il s'agit de la première version de l'application. Il comprend le cantique complet avec recherche par numéro et titre.",
                nl: "Dit is de eerste versie van de app. Het bevat het volledige gezangboek met zoekopdracht op nummer en titel.",
                it: "Questa è la versione iniziale dell'app. Include l'inno completo con ricerca per numero e titolo."
            },
            steps: [
                {   step:1, 
                    title: [
                        {lang: "en", text: "Topical Index"},
                        {lang: "de", text: "Themenindex"},
                        {lang: "pg", text: "Índice Temático"},
                        {lang: "es", text: "Índice Temático"},
                        {lang: "fr", text: "Index thématique"},
                        {lang: "nl", text: "Thematisch Index"},
                        {lang: "it", text: "Indice tematico"}
                    ],
                    example: `<span class="navbar-toggler-override fa fa-bars"></span><br />
                             <br /><a class="nav-link btn btn-primary" href="#">
                                <i class="fa fa-th"></i> 
                                <span class="text">Topical Index</span>
                            </a>
                             `,                    
                    content: [
                        {lang: "en", text: `You can view the topical categories of hymns by clicking on the 'Topical Index' button in the upper left menu.`},
                        {lang: "de", text: `Sie können die thematischen Kategorien von Liedern anzeigen, indem Sie auf die Schaltfläche 'Themenindex' im oberen linken Menü klicken.`},
                        {lang: "pg", text: `Você pode visualizar as categorias temáticas dos hinos clicando no botão 'Índice Temático' no menu superior esquerdo.`},
                        {lang: "es", text: `Puede ver las categorías temáticas de los himnos haciendo clic en el botón 'Índice Temático' en el menú superior izquierdo.`},
                        {lang: "fr", text: `Vous pouvez afficher les catégories thématiques des cantiques en cliquant sur le bouton 'Index thématique' dans le menu supérieur gauche.`},
                        {lang: "nl", text: `U kunt de thematische categorieën van liederen bekijken door te klikken op de knop 'Thematisch Index' in het bovenste linker menu.`},
                        {lang: "it", text: `È possibile visualizzare le categorie tematiche degli inni facendo clic sul pulsante 'Indice tematico' nel menu in alto a sinistra.`}

                    ],
                    
                },
                {   step:2, 
                    title: [
                        {lang: "en", text: "Scripture Index"},
                        {lang: "de", text: "Schriftindex"},
                        {lang: "pg", text: "Índice das Escrituras"},
                        {lang: "es", text: "Índice de las Escrituras"},
                        {lang: "fr", text: "Index des Écritures"},
                        {lang: "nl", text: "Schriftuur Index"},
                        {lang: "it", text: "Indice delle Scritture"}

                    ],
                    example: `<span class="navbar-toggler-override fa fa-bars"></span><br />
                                <br />
                            <a class="nav-link btn btn-primary" href="#">
                                <i class="fa fa-book"></i> 
                                <span class="text">Scriptural Index</span>
                            </a>`,
                    content: [
                        {lang: "en", text: `You can view the Scriptures used by the hymns filterable by book by clicking on the 'Scriptural Index'
                             button in the upper left menu. `},
                        {lang: "de", text: `Sie können die von den Liedern verwendeten Schriften filtern, indem Sie auf die Schaltfläche 'Schriftindex' im oberen linken Menü klicken.`},
                        {lang: "pg", text: `Você pode visualizar as Escrituras usadas pelos hinos filtráveis por livro clicando no botão 'Índice das Escrituras' no menu superior esquerdo.`},
                        {lang: "es", text: `Puede ver las Escrituras utilizadas por los himnos filtrables por libro haciendo clic en el botón 'Índice de las Escrituras' en el menú superior izquierdo.`},
                        {lang: "fr", text: `Vous pouvez afficher les Écritures utilisées par les cantiques filtrables par livre en cliquant sur le bouton 'Index des Écritures' dans le menu supérieur gauche.`},
                        {lang: "nl", text: `U kunt de Schriften die door de liederen worden gebruikt, filteren op boek door te klikken op de knop 'Schriftuur Index' in het bovenste linker menu.`},
                        {lang: "it", text: `È possibile visualizzare le Scritture utilizzate dagli inni filtrabili per libro facendo clic sul pulsante 'Indice delle Scritture' nel menu in alto a sinistra.`}
                    ],
                   
                },
                {   step:3, 
                    title: [
                        {lang: "en", text: "Play All Hymns"},
                        {lang: "de", text: "Alle Lieder abspielen"},
                        {lang: "pg", text: "Reproduzir todos os hinos"},
                        {lang: "es", text: "Reproducir todos los himnos"},
                        {lang: "fr", text: "Jouer tous les cantiques"},
                        {lang: "nl", text: "Speel alle liederen af"},
                        {lang: "it", text: "Riproduci tutti gli inni"}

                    ],
                    example: `<br /><a class="btn btn-outline-secondary musicControl active" id="musicControlExample">
                        <i class="fa-solid fa-music"></i>
                        </a> <span class="translate" data-translation-id="then">then</span> 
                        <a href="#" id="playAllExample"  class=" btn btn-outline-secondary">
                                <i class="fas fa-repeat"></i>
                        </a>`,
                    content: [
                        {lang: "en", text: "Autoplay all hymns in the hymnal. Open the music panel and toggle the 'Play All' button.<br />"},
                        {lang: "de", text: "Alle Lieder im Gesangbuch automatisch abspielen. Öffnen Sie das Musikpanel und schalten Sie die Schaltfläche 'Alle abspielen' um.<br />"},
                        {lang: "pg", text: "Reproduza automaticamente todos os hinos do hinário. Abra o painel de música e alterne o botão 'Reproduzir todos'.<br />"},
                        {lang: "es", text: "Reproduzca automáticamente todos los himnos del himnario. Abra el panel de música y cambie el botón 'Reproducir todos'.<br />"},
                        {lang: "fr", text: "Lecture automatique de tous les cantiques du cantique. Ouvrez le panneau de musique et basculez le bouton 'Jouer tout'.<br />"},
                        {lang: "nl", text: "Speel alle liederen in het gezangboek automatisch af. Open het muziekpaneel en schakel de knop 'Alles afspelen'.<br />"},
                        {lang: "it", text: "Riproduci automaticamente tutti gli inni del canto. Apri il pannello della musica e attiva il pulsante 'Riproduci tutto'.<br />"}
                    ],
                    
                }
            ]
        },

    ],
    createLanguageSelector: function() {
        let currentLang = this.lang;
        var langSelector = `<div id="lang-selector" class="text-end d-flex justify-content-end">
                                <select id="lang-select" class="form-select w-auto" onChange="whatsnew.updateLang(this)">
                                    <option value="en" ${(currentLang=="en"?"selected":"")}>English</option>
                                    <option value="de" ${(currentLang=="de"?"selected":"")}>Deutsch</option>
                                    <option value="pg" ${(currentLang=="pg"?"selected":"")}>Português</option>
                                    <option value="es" ${(currentLang=="es"?"selected":"")}>Español</option>
                                    <option value="fr" ${(currentLang=="fr"?"selected":"")}>Français</option>
                                    <option value="nl" ${(currentLang=="nl"?"selected":"")}>Nederlands</option>
                                    <option value="it" ${(currentLang=="it"?"selected":"")}>Italiano</option>
                                </select>
                            </div>`;
        return langSelector;
    },
    copy: [
        {lang: "en", text: "What's New", tourbutton: "Take a tour"},
        {lang: "de", text: "Was ist neu", tourbutton: "Tour machen"},
        {lang: "pg", text: "O que há de novo", tourbutton: "Fazer um tour"},
        {lang: "es", text: "Qué hay de nuevo", tourbutton: "Hacer un recorrido"},
        {lang: "fr", text: "Quoi de neuf",  tourbutton: "Faire un tour"},
        {lang: "nl", text: "Wat is nieuw", tourbutton: "Maak een rondleiding"},
        {lang: "it", text: "Cosa c'è di nuovo", tourbutton: "Fai un giro"},

    ],
    closeWhatsNew: function() {
        document.querySelector("body").classList.remove("whatsnew-open");
        document.getElementById("loader").classList.remove("muted")
        document.querySelector("#whatsnew-wrapper").remove();
        document.querySelectorAll(".whatsNewClone").forEach(function(el) { 
            el.remove();
        });
        // set hymnal
        app.startRandom();
        app.getHymnText();
        //this.st.setItem('whatsnewseen', '1');
    },
    showWhatsNew: function() {
        document.getElementById("loader").classList.add("muted")
        document.querySelector("body").classList.add("whatsnew-open");
        var popup = `<div id="whatsnew-wrapper">
                        
                        <div id="whatsnew-modal" class="popup">
                            <div class="popup-inner card">
                                <div class="card-header popup-title text-center">
                                    <div class="row">
                                        <div class="col text-start align-content-center">
                                        ${this.copy.find(x => x.lang === this.lang).text}
                                        </div>
                                        <div class="col text-end">
                                        ${whatsnew.createLanguageSelector()}
                                        </div>
                                    </div>
                                </div>
                                <div class="popup-content card-body" id="loadWhatsNew">
                                    
                                </div>
                                <div class="popup-buttons text-end card-footer">
                                    <a href="#" class="whatsnew-close btn btn-primary button button-block button-positive">Close</a>
                                </div>
                            </div>
                    </div>`;
        document.querySelector('body').insertAdjacentHTML('beforeend', popup);
        //document.querySelector('#whatsNewHolder').innerHTML += popup;
        document.querySelector('#whatsnew-wrapper').classList.add('popup-visible');

        
        this.loadWhatsNew();
        this.bindEvents();
    },
    loadWhatsNew: function() {
        let target = document.getElementById("loadWhatsNew");
        let whatsNewData = this.whatsNewData;
        let thisData = whatsNewData.find(x => x.id === whatsnew.whatsNewId);
        this.currentStepCount = thisData.steps.length;
        let title = thisData.title[this.lang];
        let description = thisData.description[this.lang];
        let date = thisData.date;
        let steps = thisData.steps;
        let stepsHtml = "";
        let sliderDotsHtml = "";
        let tourbuttonText = this.copy.find(x => x.lang === this.lang).tourbutton;
        
        let counter = 1;
        steps.forEach(function(step) {
            stepTitle = step.title.find(x => x.lang === whatsnew.lang)?step.title.find(x => x.lang === whatsnew.lang).text: "No title";
            stepContent = step.content.find(x => x.lang === whatsnew.lang)?step.content.find(x => x.lang === whatsnew.lang).text: "No content";
            stepExample = step.example;
            stepsHtml += `<div class="whatsnew-step" data-step="${counter}">
                            <h3>${stepTitle}</h3>
                            <p>${stepContent}${stepExample}</p>
                        </div>`;
            sliderDotsHtml += `<div class="slider-dot" data-step="${step.step}"><span class="sr-only">${step.step}</span></div>`;  
            counter++;          
        });

        let content = `<div id="whatsnewintro" class="text-center mb-4 mt-4 ps-4 pe-4 active">
                            
                            <h2>${title}</h2>
                            <p>${date}</p>
                            
                            <p>${description}</p>
                            
                        </div>
                        <div class="take-tour text-center active">
                            <button type="button" class="btn btn-secondary" id="take-a-tour">
                                <span class="take-tour-text">${tourbuttonText}</span>
                            </button>
                        </div>
                        <div id="take-tour-wrapper">
                            <div id="whatsnew-steps">
                            ${stepsHtml}
                            </div>
                            <div class="slider">
                                <div class="slider-buttons text-center">
                                    <div class="btn-group">
                                        <button type="button" class="slider-prev btn btn-secondary">Prev</button>
                                        <button type="button" class="slider-next btn btn-secondary">Next</button>
                                    </div>
                                </div>
                                <div class="slider-dots">${sliderDotsHtml}</div>
                            </div>
                        </div>`;
                        
        target.innerHTML = content;
        //this.changeStep(1);
    },
}

// fire when page is domContent is loaded
document.addEventListener('DOMContentLoaded', function() {
    whatsnew.init();
}, false);