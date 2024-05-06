var whatsnew = {
    st: window.localStorage,
    lang: app.lang,
    whatsNewId: config.whatsNewId,
    currentStep: 1,
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

    },
    changeStep: function(step) {
        console.log("changeStep", step);
        if(step<1){
            step = 1;
        }
        if(step>this.currentStepCount){
            step = this.currentStepCount;
        }
        this.currentStep = step;
        console.log("currentStep", this.currentStep);
       
    },
    updateLang: function(el) {
        console.log("updateLang", el.value);
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
                    callback: function(){
                        console.log("Step 1");
                
                    }
                },
                {   step:2, 
                    callback: function(){
                        console.log("Step 2");
                
                    }
                },
                {   step:3, 
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
        {lang: "en", text: "What's New"},
        {lang: "de", text: "Was ist neu"},
        {lang: "pg", text: "O que há de novo"},
        {lang: "es", text: "Qué hay de nuevo"},
        {lang: "fr", text: "Quoi de neuf"},
        {lang: "nl", text: "Wat is nieuw"},
        {lang: "it", text: "Cosa c'è di nuovo"},

    ],
    closeWhatsNew: function() {
        document.querySelector("body").classList.remove("whatsnew-open");
        document.querySelector("#whatsnew-wrapper").remove();
        //this.st.setItem('whatsnewseen', '1');
    },
    showWhatsNew: function() {
        document.querySelector("body").classList.add("whatsnew-open");
        var popup = `<div id="whatsnew-wrapper">
                        <div id="whatsnew-backdrop" class="backdrop"></div>
                        <div id="whatsnew-modal" class="popup">
                            <div class="popup-inner">
                                <div class="popup-title">
                                    ${this.copy.find(x => x.lang === this.lang).text}
                                    ${whatsnew.createLanguageSelector()}
                                </div>
                                <div class="popup-content" id="loadWhatsNew">
                                    
                                </div>
                                <div class="popup-buttons">
                                    <a href="#" class="whatsnew-close button button-block button-positive">Close</a>
                                </div>
                            </div>
                    </div>`;
        document.querySelector('body').insertAdjacentHTML('beforeend', popup);
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
        steps.forEach(function(step) {
            stepsHtml += `<div class="whatsnew-step">
                            <h3>Step ${step.step}</h3>
                            <p>Step ${step.step} description</p>
                        </div>`;
            sliderDotsHtml += `<div class="slider-dot" data-step="${step.step}"><span class="sr-only">${step.step}</span></div>`;            
        });
        let content = `<h2>${title}</h2>
                        <p>${description}</p>
                        <p>${date}</p>
                        ${stepsHtml}
                        <div class="slider">
                            <div class="slider-buttons text-center">
                                <div class="btn-group">
                                    <button type="button" class="slider-prev btn btn-secondary">Prev</button>
                                    <button type="button" class="slider-next btn btn-secondary">Next</button>
                                </div>
                            </div>
                            <div class="slider-dots">${sliderDotsHtml}</div>
                        </div>`;
                        
        target.innerHTML = content;
    },
}

// fire when page is domContent is loaded
document.addEventListener('DOMContentLoaded', function() {
    whatsnew.init();
}, false);