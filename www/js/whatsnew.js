var whatsnew = {
    st: window.localStorage,
    lang: app.lang,
    init: function() {
        console.log("whatsnew init")
        if(this.st.getItem('whatsnewseen') == null) {
            this.showWhatsNew();
            this.bindEvents();
            //this.st.setItem('whatsnewseen', '1');
        }
    },
    bindEvents: function() {
        document.querySelectorAll(".whatsnew-close").forEach(function(el) {

            el.addEventListener('click', function(e) {
                e.preventDefault();
                whatsnew.closeWhatsNew();
            }, false);
        }
        );
    },
    updateLang: function(el) {
        console.log("updateLang", el.value);
        app.lang = el.value;
        this.lang = el.value;
        this.closeWhatsNew();
        this.showWhatsNew();
    },
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
                                <div class="popup-content">
                                    <p>Version 1.0.0</p>
                                    <ul>
                                        <li>Initial release</li>
                                    </ul>
                                </div>
                                <div class="popup-buttons">
                                    <a href="#" class="whatsnew-close button button-block button-positive">Close</a>
                                </div>
                            </div>
                    </div>`;
        document.querySelector('body').insertAdjacentHTML('beforeend', popup);
        //$('#whatsnew').addClass('popup-visible');
    }
}

// fire when page is domContent is loaded
document.addEventListener('DOMContentLoaded', function() {
    whatsnew.init();
}, false);