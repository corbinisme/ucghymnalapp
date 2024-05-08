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
        thisStep.callback();
       
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
    whatsNewData: [
        {
            id: 1, 
            revision: "6.1.0", 
            title: {
                en: "Initial release",
                de: "Erstveröffentlichung",
                pg: "Lançamento inicial",
                es: "Lanzamiento inicial",
                fr: "Première version",
                nl: "Eerste versie",
                it: "Rilascio iniziale"
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
                    ],
                    content: [
                        {lang: "en", text: "This is the first step"},
                    ],
                    callback: function(){
                        document.getElementById("musicControl").classList.add("whatsNewHighlighted")
                        console.log("Step 1");
                
                    }
                },
                {   step:2, 
                    title: [
                        {lang: "en", text: "Scripture Index"},
                    ],
                    content: [
                        {lang: "en", text: "This is the second step"},
                    ],
                    callback: function(){
                        document.getElementById("musicControl").classList.remove("whatsNewHighlighted")
                        console.log("Step 2");
                
                    }
                },
                {   step:3, 
                    title: [
                        {lang: "en", text: "Play All Hymns"},
                    ],
                    content: [
                        {lang: "en", text: "This is the third step"},
                    ],
                    callback: function(){
                        console.log("Step 3");
                
                    }
                }
            ]
        },

    ],
    createLanguageSelector: function() {
        let currentLang = this.lang;
        var langSelector = `<div id="lang-selector">
                                <select id="lang-select" onChange="whatsnew.updateLang(this)">
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
        document.querySelector("#whatsnew-wrapper").remove();
        //this.st.setItem('whatsnewseen', '1');
    },
    showWhatsNew: function() {
        document.getElementById("loader").classList.add("hidden")
        document.querySelector("body").classList.add("whatsnew-open");
        var popup = `<div id="whatsnew-wrapper">
                        
                        <div id="whatsnew-modal" class="popup">
                            <div class="popup-inner">
                                <div class="popup-title text-center">
                                    ${this.copy.find(x => x.lang === this.lang).text}
                                    ${whatsnew.createLanguageSelector()}
                                </div>
                                <div class="popup-content" id="loadWhatsNew">
                                    
                                </div>
                                <div class="popup-buttons text-center">
                                    <a href="#" class="whatsnew-close button button-block button-positive">Close</a>
                                </div>
                            </div>
                    </div>`;
        //document.querySelector('body').insertAdjacentHTML('beforeend', popup);
        document.querySelector('#whatsNewHolder').innerHTML += popup;
        //$('#whatsnew').addClass('popup-visible');

        
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
            stepsHtml += `<div class="whatsnew-step" data-step="${counter}">
                            <h3>${stepTitle}</h3>
                            <p>${stepContent}</p>
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
        this.changeStep(1);
    },
}

// fire when page is domContent is loaded
document.addEventListener('DOMContentLoaded', function() {
    whatsnew.init();
}, false);