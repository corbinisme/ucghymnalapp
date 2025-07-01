var whatsnew = {
    st: window.localStorage,
    lang: app.lang,
    whatsNewId: config.whatsNewId,
    currentStep: 1,
    showingSteps: true,
    currentStepCount: 0,
    init: function() {

        if(this.st.getItem('whatsnewseen') == null || this.st.getItem('whatsnewseen')=="0") {
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
                pt: "Atualizações mais recentes",
                es: "Últimas actualizaciones",
                fr: "Dernières mises à jour",
                nl: "Laatste updates",
                it: "Ultimi aggiornamenti"

               
            },
            date: "2024-05-06",
            "description": {
                "en": "This is the latest version of the Hymnal app. Read about what changes and updates were made",
                "de": "Dies ist die neueste Version der Gesangbuch-App. Lesen Sie, welche Änderungen und Updates vorgenommen wurden",
                "pt": "Esta é a versão mais recente do aplicativo Hinário. Leia sobre as alterações e atualizações que foram feitas",
                "es": "Esta es la última versión de la aplicación del Himnario. Lea acerca de los cambios y actualizaciones que se hicieron",
                "fr": "Ceci est la dernière version de l'application du recueil de cantiques. Lisez les changements et les mises à jour qui ont été effectués",
                "nl": "Dit is de nieuwste versie van de Liedboek-app. Lees hier welke wijzigingen en updates zijn doorgevoerd",
                "it": "Questa è l'ultima versione dell'app Innario. Leggi quali modifiche e aggiornamenti sono stati apportati"
            },
            steps: [
                {   
                    step:1, 
                    title: [
                        {lang: "en", text: "Topical and Scriptural Index"},
                        {lang: "de", text: "Themen- und Schriftindex"},
                        {lang: "pt", text: "Índice Temático e Escriturístico"},
                        {lang: "es", text: "Índice Temático y de Escrituras"},
                        {lang: "fr", text: "Index thématique et des Écritures"},
                        {lang: "nl", text: "Thematisch en Schriftuurlijke Index"},
                        {lang: "it", text: "Indice Tematico e Scritturale"}
                    ],
                    example: `<br /><span class="navbar-toggler-override fa fa-bars"></span><br />
                    <a href="#" class="btn body-text"><i class="fa fa-th"></i> <span class="translate" data-id="topical"></span></a> <br />        
                    <a href="#" class="btn body-text"><i class="fa fa-book"></i> <span class="translate" data-id="scripture"></span></a>
                             
                             `,                    
                   
                    content: [
                        {
                        "lang": "en",
                        "text": "You can view the topical categories of hymns and scriptural index by clicking the 'Topical Index and \"Scriptural Index' buttons in the upper right menu."
                        },
                        {
                        "lang": "de",
                        "text": "Sie können die thematischen Kategorien von Liedern und den Schriftindex anzeigen, indem Sie auf die Schaltflächen 'Themenindex' und 'Schriftindex' im oberen rechten Menü klicken."
                        },
                        {
                        "lang": "pt",
                        "text": "Você pode visualizar as categorias temáticas dos hinos e o índice escriturístico clicando nos botões 'Índice Temático' e 'Índice Escriturístico' no menu superior direito."
                        },
                        {
                        "lang": "es",
                        "text": "Puede ver las categorías temáticas de los himnos y el índice de las escrituras haciendo clic en los botones 'Índice Temático' e 'Índice de Escrituras' en el menú superior derecho."
                        },
                        {
                        "lang": "fr",
                        "text": "Vous pouvez afficher les catégories thématiques des cantiques et l'index des Écritures en cliquant sur les boutons 'Index thématique' et 'Index des Écritures' dans le menu supérieur droit."
                        },
                        {
                        "lang": "nl",
                        "text": "U kunt de thematische categorieën van liederen en de schriftuurlijke index bekijken door te klikken op de knoppen 'Thematisch Index' en 'Schriftuurlijke Index' in het bovenste rechter menu."
                        },
                        {
                        "lang": "it",
                        "text": "È possibile visualizzare le categorie tematiche degli inni e l'indice scritturale facendo clic sui pulsanti 'Indice tematico' e 'Indice scritturale' nel menu in alto a destra."
                        }
                    ]
  
                },
                {
                    step:2, 
                    title: [
                        {
                        "lang": "en",
                        "text": "Holy Day Calendar"
                        },
                        {
                        "lang": "de",
                        "text": "Feiertagskalender"
                        },
                        {
                        "lang": "pt",
                        "text": "Calendário de Dias Santos"
                        },
                        {
                        "lang": "es",
                        "text": "Calendario de Días Festivos"
                        },
                        {
                        "lang": "fr",
                        "text": "Calendrier des Jours Saints"
                        },
                        {
                        "lang": "nl",
                        "text": "Heilige Dagen Kalender"
                        },
                        {
                        "lang": "it",
                        "text": "Calendario Giorni Festivi"
                        }
                    ],
                    example: `<br /><span class="navbar-toggler-override fa fa-bars"></span><br />
                              <a href="#" class="btn body-text"><i class="fa fa-calendar"></i> 
                              <span class="translate" data-id="holydays"></span></a>`,
                    content: [
                        {
                        "lang": "en",
                        "text": "You can view the Holy Day Calendar dates by selecting \"Holy Day Calendar\" from the button in the upper right menu."
                        },
                        {
                        "lang": "de",
                        "text": "Sie können die Daten des Feiertagskalenders anzeigen, indem Sie „Feiertagskalender“ aus der Schaltfläche im oberen rechten Menü auswählen."
                        },
                        {
                        "lang": "pt",
                        "text": "Você pode visualizar as datas do Calendário de Dias Santos selecionando \"Calendário de Dias Santos\" no botão no menu superior direito."
                        },
                        {
                        "lang": "es",
                        "text": "Puede ver las fechas del Calendario de Días Festivos seleccionando \"Calendario de Días Festivos\" en el botón del menú superior derecho."
                        },
                        {
                        "lang": "fr",
                        "text": "Vous pouvez consulter les dates du calendrier des jours saints en sélectionnant « Calendrier des jours saints » dans le bouton du menu supérieur droit."
                        },
                        {
                        "lang": "nl",
                        "text": "U kunt de data van de Heilige Dagen Kalender bekijken door \"Heilige Dagen Kalender\" te selecteren via de knop in het menu rechtsboven."
                        },
                        {
                        "lang": "it",
                        "text": "È possibile visualizzare le date del Calendario dei Giorni Festivi selezionando \"Calendario Giorni Festivi\" dal pulsante nel menu in alto a destra."
                        }
                    ],
                   
                },
                {   
                    step:3, 
                    title: [
                        {lang: "en", text: "Play All Hymns"},
                        {lang: "de", text: "Alle Lieder abspielen"},
                        {lang: "pt", text: "Reproduzir todos os hinos"},
                        {lang: "es", text: "Reproducir todos los himnos"},
                        {lang: "fr", text: "Jouer tous les cantiques"},
                        {lang: "nl", text: "Speel alle liederen af"},
                        {lang: "it", text: "Riproduci tutti gli inni"}

                    ],
                    example: `<br /><a class="btn btn-outline-secondary musicControl active" id="musicControlExample">
                        <i class="fa-solid fa-music"></i>
                        </a> <span class="ms-2 fa fa-arrow-right"></span> 
                        <a href="#" id="playAllExample"  class=" btn text-white">
                                <i class="fas fa-repeat"></i>
                        </a>`,
                    content: [
                        {lang: "en", text: "Autoplay all hymns in the hymnal. Open the music panel and toggle the 'Play All' button.<br />"},
                        {lang: "de", text: "Alle Lieder im Gesangbuch automatisch abspielen. Öffnen Sie das Musikpanel und schalten Sie die Schaltfläche 'Alle abspielen' um.<br />"},
                        {lang: "pt", text: "Reproduza automaticamente todos os hinos do hinário. Abra o painel de música e alterne o botão 'Reproduzir todos'.<br />"},
                        {lang: "es", text: "Reproduzca automáticamente todos los himnos del himnario. Abra el panel de música y cambie el botón 'Reproducir todos'.<br />"},
                        {lang: "fr", text: "Lecture automatique de tous les cantiques du cantique. Ouvrez le panneau de musique et basculez le bouton 'Jouer tout'.<br />"},
                        {lang: "nl", text: "Speel alle liederen in het gezangboek automatisch af. Open het muziekpaneel en schakel de knop 'Alles afspelen'.<br />"},
                        {lang: "it", text: "Riproduci automaticamente tutti gli inni del canto. Apri il pannello della musica e attiva il pulsante 'Riproduci tutto'.<br />"}
                    ],
                    
                },
                {   
                    step:4, 
                    title: [
                        {lang: "en", text: "Custom Playlist"},
                        {lang: "de", text: "Benutzerdefinierte Wiedergabeliste"},
                        {lang: "pt", text: "Lista de Reprodução Personalizada"},
                        {lang: "es", text: "Lista de Reproducción Personalizada"},
                        {lang: "fr", text: "Liste de lecture personnalisée"},
                        {lang: "nl", text: "Aangepaste afspeellijst"},
                        {lang: "it", text: "Playlist personalizzata"}

                    ],
                    example: `<br /><div class="d-flex align-items-center align-content-center justify-content-center">
                            <a href="#" class="btn body-text"><i class="fa fa-music"></i></a>
                            <span class="ms-2 fa fa-arrow-right"></span> 
                            <a class="btn body-text" href="#"><i class="fa-solid fa-list active"></i></a><br />
                            <span class="ms-2 fa fa-arrow-right"></span> 
                            <div id="exampleCheck" class="text-center d-flex justify-content-center"><div class="form-check form-switch"  id="example_custom_playlist_toggle">
                                <label class="form-check-label" 
                                for="example_custom_playlist"><span class="translate" data-id="custom">Custom</span>
                                </label>
                                <input class="form-check-input" checked
                                type="checkbox" id="example_custom_playlist">
                                </div>
                            </div>
                            <span class="ms-2 fa fa-arrow-right"></span> 
                            <a href="#" class="btn body-text" id="addToPlaylistExample">
                                <i class="fa fa-plus"></i> <span class="translate" data-id="add"></span>
                            </a>
                        </div>
                        `,
                    content: [
                        {
                            "lang": "en",
                            "text": "Open the music player, then toggle the playlist icon, then toggle 'Custom.' Click the 'Add' button to select hymns to add to the list. When finished, hit the <i class='fa fa-chevron-right'></i> button to get back to the playlist, and click on a hymn to view it.<br />"
                        },
                        {
                            "lang": "de",
                            "text": "Öffnen Sie den Musik-Player, schalten Sie dann das Wiedergabelisten-Symbol um, und aktivieren Sie anschließend „Benutzerdefiniert“. Klicken Sie auf die Schaltfläche „Hinzufügen“, um Hymnen auszuwählen, die Sie der Liste hinzufügen möchten. Wenn Sie fertig sind, klicken Sie auf die Schaltfläche <i class='fa fa-chevron-right'></i>, um zur Wiedergabeliste zurückzukehren, und klicken Sie auf eine Hymne, um sie anzuzeigen.<br />"
                        },
                        {
                            "lang": "pt",
                            "text": "Abra o reprodutor de música, alterne o ícone da playlist e, em seguida, alterne a opção 'Personalizado'. Clique no botão 'Adicionar' para selecionar os hinos a serem adicionados à lista. Ao terminar, clique no botão <i class='fa fa-chevron-right'></i> para retornar à playlist e clique em um hino para visualizá-lo.<br />"
                        },
                        {
                            "lang": "es",
                            "text": "Abre el reproductor de música, activa el icono de la lista de reproducción y luego activa la opción 'Personalizada'. Haz clic en el botón 'Añadir' para seleccionar los himnos que quieras añadir a la lista. Al terminar, pulsa el botón <i class='fa fa-chevron-right'></i> para volver a la lista de reproducción y haz clic en un himno para verlo.<br />"
                        },
                        {
                            "lang": "fr",
                            "text": "Ouvrez le lecteur de musique, puis basculez l'icône de la playlist, puis basculez sur « Personnalisé ». Cliquez sur le bouton « Ajouter » pour sélectionner les hymnes à ajouter à la liste. Une fois terminé, cliquez sur le bouton <i class='fa fa-chevron-right'></i> pour revenir à la playlist, puis cliquez sur un hymne pour l'afficher.<br />"
                        },
                        {
                            "lang": "nl",
                            "text": "Open de muziekspeler, schakel vervolgens het afspeellijstpictogram in en uit, en vervolgens 'Aangepast'. Klik op de knop 'Toevoegen' om hymnes te selecteren die je aan de lijst wilt toevoegen. Klik na afloop op de knop <i class='fa fa-chevron-right'></i> om terug te gaan naar de afspeellijst en klik op een hymne om deze te bekijken.<br />"
                        },
                        {
                            "lang": "it",
                            "text": "Apri il lettore musicale, quindi attiva l'icona della playlist, quindi attiva 'Personalizzato'. Fai clic sul pulsante 'Aggiungi' per selezionare gli inni da aggiungere alla lista. Al termine, premi il pulsante <i class='fa fa-chevron-right'></i> per tornare alla playlist e fai clic su un inno per visualizzarlo.<br />"
                        }
                    ],
                    
                }
            ]
        },

    ],
    createLanguageSelector: function() {
        let currentLang = this.lang;
        
        var langSelector = `<div id="lang-selector" class="text-end d-flex justify-content-end">
                                <img src="./images/languageIcon.svg" alt="Language Icon" class="languageIconImg" />                        
                                <select id="lang-select" class="form-select w-auto" onChange="whatsnew.updateLang(this)">
                                    <option value="en" ${(currentLang=="en"?"selected":"")}>English</option>
                                    <option value="de" ${(currentLang=="de"?"selected":"")}>Deutsch</option>
                                    <option value="pt" ${(currentLang=="pt"?"selected":"")}>Português</option>
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
        {lang: "pt", text: "O que há de novo", tourbutton: "Fazer um tour"},
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
        this.st.setItem('whatsnewseen', '1');
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
                                    <a href="#" class="whatsnew-close btn btn-primary button button-block button-positive"><i class="fa fa-times"></i></a>
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
                                        <button type="button" class="slider-prev btn btn-secondary"><i class="fa fa-chevron-left"></i></button>
                                        <button type="button" class="slider-next btn btn-secondary"><i class="fa fa-chevron-right"></i></button>
                                    </div>
                                </div>
                                <div class="slider-dots">${sliderDotsHtml}</div>
                            </div>
                        </div>`;
                        
        target.innerHTML = content;
        document.querySelectorAll("#whatsnew-wrapper .translate").forEach(function(el) {
            let id = el.getAttribute("data-id");
            if(id){
                el.innerHTML = window['menu_' + app.lang][id];
            }
        });

        //this.changeStep(1);
    },
}

// fire when page is domContent is loaded
document.addEventListener('DOMContentLoaded', function() {
    whatsnew.init();
}, false);
