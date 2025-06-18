// window.open wasn't opening a link in the system browser on iOS, so we have to use this function (requires phonegap.js)
function redirectToSystemBrowser(url) {
    // Wait for Cordova to load
    // open URL in default web browser
    var ref = window.open(encodeURI(url), '_system', 'location=yes');  
  }
  
  var hymn = 1;
  var brand = "";
  var path = config.path;
  var vocal_path = (config.vocal_path? config.vocal_path:null);
  
  


  var app = {
      brand: "",
      lang: "en",
      size: 16,
      contrast: "false",
      currentHymn: 1,
      fontKey: "size",
      langKey:"lang",
      languages: null,
      searchTitleOnly: false,
      hasVocal: false,
      hymn: 1,
      autoplay: false,
      shuffle: false,
      storage: null,

      currentSearchFilter: "",
      currentTitles: [],
      musicPlayer: null,
      musicOpen: false,
      currentMusicType: "piano",
      selectedTopic: "0",
      selectedBook: "all",
      isPlaying: false,
      randomPlaylists:[],
      playlists: [],
      useLogos: false,
      currentLangHymns: null,
      userplaylist: [],
      init: function(){
            app.getConfig();
            app.eventBindings();
            app.setScrollbarWidth();
            app.loadCurrentLang(true);
            app.getPageSizing();
            
            
            window.addEventListener("resize", function(){
                app.getPageSizing();
            })
            app.setMusicOptions();
            if(window.MobileAccessibility){

                window.MobileAccessibility.usePreferredTextZoom(false);
            }
            app.loadLogos();
      },
      setCurrentHymnObject: function(){
        const thisLanguageList = window['lyrics_'+ app.lang];
        const thisLanguageTitles = window['title_'+ app.lang];
        let hymnKeys = Object.keys(thisLanguageList);
        let newObj = {};
        let hymnArr = hymnKeys.map(function(key){
            return parseInt(key.replace("hymn", ""));
        });
        hymnArr.forEach(function(i){
            let paddedIndex = app.getHymnWithZeros(i);
            let hymnTitle = thisLanguageTitles.filter(function(title){
                return title.indexOf(i + ")") === 0;
            })[0];
            // remove the number and ) from the start

            if(hymnTitle){

            } else {
                // probably has padded zeros in the title
                hymnTitle = thisLanguageTitles.filter(function(title){
                    return title.indexOf(paddedIndex + ")") === 0;
                })[0];
            }
            let displayTitle = hymnTitle.substring(hymnTitle.indexOf(")")+2).trim();
            newObj[i] = {
                title: displayTitle,
                lyrics: thisLanguageList["hymn" + paddedIndex]
            } 
        })

        app.currentLangHymns = newObj;
      },
      loadLogos: function() {
      
        if(app.useLogos==true){
            window['refTagger'] = {
            settings: {
                bibleVersion: 'NKJV'
            }
            }; 


            (function(d, t) {
            var n=d.querySelector('[nonce]');
            window['refTagger'].settings.nonce = n && (n.nonce||n.getAttribute('nonce'));
            var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
            g.src = 'https://api.reftagger.com/v2/RefTagger.js';
            g.nonce = window['refTagger'].settings.nonce;
            s.parentNode.insertBefore(g, s);
            }(document, 'script'));
        }

      },
      loadCurrentLang: function(random){
        app.setCurrentHymnObject();
        app.makeLanguageDropdown();
        app.makeHymnList();

        app.makeSearchContent();
        if(random){
            app.startRandom();
        } 
        app.setHymn(app.currentHymn);
        app.updateMenus();
        app.populateAbout();
        app.populateUcg();

        
        app.setNormalPlaylistForLang();
        app.setRandomPlaylistForLang();
        
      },
      setScrollbarWidth: function(){
        document.documentElement.style.setProperty('--scrollbar-width', app.getScrollbarWidth() + 'px');
      },
      getScrollbarWidth: function(){
        // Creating invisible container
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll'; // forcing scrollbar to appear
        outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
        document.body.appendChild(outer);

        // Creating inner element and placing it in the container
        const inner = document.createElement('div');
        outer.appendChild(inner);

        // Calculating difference between container's full width and the child width
        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
        // Removing temporary elements from the DOM
        document.body.removeChild(outer);

        return scrollbarWidth;
      },
      getPageSizing: function(){
        // detect if there is a vertical scrollbar

        let isMobile = false;
        if (/Mobi/.test(navigator.userAgent)) {
            // The user is on a mobile device

            isMobile = true;
        } else {
            // The user is not on a mobile device

        }

        let hasScrollbar = document.getElementById("hymns").scrollHeight > window.innerHeight;
        if(hasScrollbar && !isMobile){

            document.querySelector("body").classList.add("scrollbar");
        } else {
            document.querySelector("body").classList.remove("scrollbar");
        }
      },
      shuffleArray: function(array){
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
      },
      setNormalPlaylistForLang: function(){
        app.playlists = [];
        let numArr = Object.keys(app.currentLangHymns);
        app.playlists = numArr;
        app.populatePlaylist();
    
      },
      setRandomPlaylistForLang: function(){
        let numArr = Object.keys(app.currentLangHymns);
        let randomPlaylist = app.shuffleArray(numArr);
        app.randomPlaylists = numArr;
        /*
        config.langs.split(",").forEach(function(lang){
            //randomPlaylists

            let hymnCount = window['title_'+ lang].length;
            let playlist = [];
            for(let i=1; i<=hymnCount; i++){
                playlist.push(i);
            }
            // randomize the playlist
            playlist = app.shuffleArray(playlist);
            app.randomPlaylists[lang] = playlist;
        })
        */

      },
      changePage: function(id){
        if(document.querySelector("#" + id)){
            document.querySelectorAll(".page.wrapper").forEach(function(page){
                page.classList.remove("active");
            })

            document.querySelector("#" + id).classList.add("active");
            // more logic
            const mainContent= document.querySelector(".mainContent");
            mainContent.setAttribute("data-page-show", id)
            if(id=="hymns"){
                mainContent.classList.remove("showOtherPage");
            } else {
                mainContent.classList.add("showOtherPage");
            }


            if(id=="number"){
                window.setTimeout(function(){
                    const numInput  =document.getElementById("searchByNumber");
                    numInput.value = "";
                    numInput.focus();
                }, 400);
            }
            else if(id=="search"){
                window.setTimeout(function(){
                    document.getElementById("filterSearch").focus();
                }, 400);
            } else {
                document.getElementById("searchByNumber").blur();
                document.getElementById("filterSearch").blur();
            }
        } else {
            alert("no page yet")
        }

      },
      changeStorage:function(key,val){
          app.storage.setItem(key, val);
      },
      updateMenus: function(){
        const dropdownContent = document.getElementById("dropdownContent");
        const currentLang = app.lang;
        let html = "";
        const menuItems = window['menu_' + currentLang];
        const menuItemsBackup = window["menu_en"];
        dropdownContent.querySelectorAll(".nav-link").forEach(function(item){
            const id = item.getAttribute("id");
            const page = item.getAttribute("data-page");
            const textNode = item.querySelector(".text");
            let newText = (menuItems[page]? menuItems[page]: menuItemsBackup[page]);
            textNode.innerHTML = newText;

            document.querySelector("#" + page + " .navbar-brand").innerHTML = newText;
            
        });

        const scriptureRef = document.querySelector(".scripturalReferenceContent .text");
        if(scriptureRef){
            let translatedTitle = (menuItems["scriptureref"]? menuItems["scriptureref"]: menuItemsBackup["scriptureref"]);
            scriptureRef.innerHTML = translatedTitle;
        }

      },
      populatePages: function(){

        app.populateAbout();
        app.populateCopyright();
        app.populateUcg();
        app.populateTopics();
        app.populateScriptural();
        app.populateHolyDayCalendar();
        app.populateReportBug();

      },
    populateReportBug: function(){
        const reportBugButtonText = window['menu_'+ app.lang].clickhere;
        document.getElementById("reportBugButton").innerText = reportBugButtonText;

    },
      populateHolyDayCalendar: function(){
        const pageWrapper = document.querySelector(".page#holydays");
        const currentLang = app.lang;

        const textLink = pageWrapper.querySelector(".more-info-holy-day-calendar");

        const moreInfoText = window[`menu_${currentLang}`]? window[`menu_${currentLang}`]['moreabout'] : window['menu_en']['moreabout'];
       
        textLink.innerText = moreInfoText;

        const holydaycalParentNode = document.getElementById("holydayContent");

        let holydayData = window['holydaycalendar'].data;
        let holydayStrings = window['holydaycalendar'].strings;

        
        let beginsEveningBefore = holydayStrings.interface.eveningbefore[currentLang] || holydayStrings.interface.eveningbefore['en'];
        let observedEveningBefore = holydayStrings.interface.observedeveningbefore[currentLang] || holydayStrings.interface.observedeveningbefore['en'];

        let legendHtml = `<aside class='alert alert-info'>
        * ${beginsEveningBefore};<br />
        ++ ${observedEveningBefore}
        </aside>`;
        holydaycalParentNode.innerHTML = legendHtml;

        // get object keys for holydayData
        const years = Object.keys(holydayData);

        years.forEach(function(year){
            let yearData = holydayData[year];
            let yearHtml = `<h3 class="pageHeading mb-4 mt-4">${year}</h3>`;
            
            yearHtml+=`<table class="table"><tbody class="calendarBody">`;
            // loop through each holyday
            
            Object.keys(yearData).forEach(function(holyday){
                let holydayName = holydayStrings.festivaldays[holyday][currentLang] + "*";
                if(holyday=="passover"){
                    holydayName += "++";
                }
                
                let holydayStart = yearData[holyday].start;
                let holydayEnd = yearData[holyday].end? yearData[holyday].end: null;

                let holydayStartDate;

                // Split the string into year, month, and day
                const parts = holydayStart.split('-');
                const year = parseInt(parts[0], 10);
                const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JavaScript Date
                const day = parseInt(parts[2], 10);

                // Create a Date object in the local time zone
                holydayStartDate = new Date(year, month, day);

                //let holydayStartDate = new Date(holydayStart);
                let holydayStartFormatted = holydayStartDate.toLocaleDateString(currentLang, {year: 'numeric', month: 'long', day: 'numeric'});
                let holydayEndFormatted = "";
                if(holydayEnd){
                    let holydayEndDate = new Date(holydayEnd);
                    holydayEndFormatted = holydayEndDate.toLocaleDateString(currentLang, {year: 'numeric', month: 'long', day: 'numeric'});
                }
                yearHtml+=`<tr><td>${holydayName}</td><td>${holydayStartFormatted}${holydayEnd? " - <br />" + holydayEndFormatted : ""}</td></tr>`;
            });

            holydaycalParentNode.innerHTML+=yearHtml;
        });
       
      },
      populateScriptural: function(){
        const wrapper = document.getElementById("scriptureContent");
        //const scripturalText = window['pages_en']['scriptural'].title;
        let html = "";
        const scriptural = window['scriptural'];
        const books = Object.keys(scriptural);

        const scriptureDropdown = document.getElementById("searchScripture");
        scriptureDropdown.innerHTML = "";
        books.forEach(function(book){
            const chapters = scriptural[book];
            let bookName = window['bible_' + app.lang][book];
            const thisOp = document.createElement("option");
            thisOp.value = book;
            thisOp.innerHTML = bookName;
            scriptureDropdown.append(thisOp);

            
            html+=`<div class="book" data-id="${book}"><h3 class="bookName pageHeading mb-4 mt-4">${bookName}</h3><div class="bookChapters"><table class="table"><tbody class="tocBody">`;
            chapters.forEach(function(chapter){

                const verses = Object.keys(chapter)[0];
                const hymns = chapter[verses];
               
                html+=`<tr><td>${verses}</td><td>
                    <ul>`;

                    hymns.forEach(function(hymn){

                        const hymnLookup = app.getHymnWithZeros(hymn);
                        const hymnSelector = document.getElementById("hymnSelect");
                        let hymnTitle = "";
                        if(app.currentLangHymns && app.currentLangHymns[hymn]){
                            
                            hymnTitle = app.currentLangHymns[hymn].title;
                        }

                        if(hymnTitle==""){
                            window['title_en'].forEach(function(title){
                                if(title.indexOf(hymn + ")") === 0){
                                    hymnTitle = title.substring(title.indexOf(")")+2).trim();
                                }
                            });
                            html+=`<li>${hymn}) ${hymnTitle}</li>`;
                        } else {
                            html+=`<li><a href="#" onClick='app.loadSearch("${hymnLookup}")' class="topicSearchLink" data-page="hymns" data-hymn="${hymn}">${hymn}) ${hymnTitle}</a></li>`;
                        }
                        

                        
                    });
                html+=`</ul>
                </td></tr>`;
            })
            html+=`</tbody></table></div></div>`;
        })
        wrapper.innerHTML = html;

      },
      populateUcg: function(){
        const ucgContent = document.getElementById("ucgContent");
        const currentLang = app.lang; 
        const ucgText = window[`pages_${currentLang}`]? window[`pages_${currentLang}`]['ucg'].content: window['pages_en']['ucg'].content;
        ucgContent.innerHTML = ucgText;
      },

      populateCopyright: function(){
        const copyContent = document.getElementById("loadCopyright");
        copyContent.innerHTML = "";
        const copyrightData = window['copyright'];
        copyrightData.forEach(function(item){
            let html = "";
            html+=`<div class="copyItem">
                <div class="copyEntity">
                    <h3 class="pageHeading mb-4 mt-4">${item.entity}</h3>
                </div>
                <div class="copyPermission"><h4>${item.permission}</h4></div>
                <div class="copySelection"><ul>`;
                let splits = item.selection.split(",");
                splits.forEach(function(hymn){
                    hymn = hymn.trim();
                    let hymnLookup = app.getHymnWithZeros(hymn.trim());
                    let hymnTitle = "";
                    if(app.currentLangHymns && app.currentLangHymns[hymn]){
                        hymnTitle = app.currentLangHymns[hymn].title;
                    }
                    //let hymnTitle = app.getHymnTitle(hymnLookup);
                    html+=`<li><a href="#" onClick='app.loadSearch("${app.getHymnWithZeros(hymn)}")' class="topicSearchLink" data-page="hymns" data-hymn="${hymn}">${hymn}) ${hymnTitle}</a></li>`
                });
                html+=`</ul></div>`;
            copyContent.innerHTML+=html;
        });
        const copyText = window[`pages_${app.lang}`]? window[`pages_${app.lang}`]['copyright'].content: window['pages_en']['copyright'].content;
        copyContent.innerHTML += copyText;
      },
      getHymnTitle: function(hymnLookup){
        const hymnSelector = document.getElementById("hymnSelect");
        let hymnTitle = hymnSelector.querySelector(`option[value="${hymnLookup}"]`).innerText;

        // get rid of the characters before the ) in the title
        hymnTitle = hymnTitle.substring(hymnTitle.indexOf(")")+2, hymnTitle.length).trim()
        return hymnTitle;
      },
      populateAbout: function(){
        const aboutContent = document.getElementById("aboutContent");
        const currentLang = app.lang;
        const aboutText = (window[`pages_${currentLang}`]? window[`pages_${currentLang}`]['about'].content : window['pages_en']['about'].content);
        aboutContent.innerHTML = aboutText;
      },
      populateTopics: function(){

        const container = document.getElementById("topicsContent");
        const topicDropdown = document.getElementById("topicSelect");
        let html = "";

        
        topicDropdown.querySelectorAll("option").forEach(function(op){
            if(op.id!="allTopics")
                op.remove();
        });
        let firstOption = document.getElementById("allTopics");
        let topicText= (window[`topics_${app.lang}`]? window[`topics_${app.lang}`]['all'] : window['topics_en']['all']);
        firstOption.innerHTML = topicText;

        topics.forEach(function(topic){

            const thisOp = document.createElement("option");
            thisOp.value = topic.id;
            let topicNameTranslated = window['topics_' + app.lang]? window['topics_' + app.lang][topic.id]: topic.name;
            thisOp.innerHTML = topicNameTranslated;
            topicDropdown.append(thisOp);


            html+=`<div class="topic" data-id="${topic.id}"><h3 class="pageHeading mb-4 mt-4">${topicNameTranslated}</h3><div class="topicHymns"><table class="table"><tbody class="tocBody">`;
            topic.hymns.forEach(function(hymn){
                const hymnLookup = app.getHymnWithZeros(hymn);
                let hymnTitle = "";
                if(app.currentLangHymns && app.currentLangHymns[hymn]){
                    hymnTitle = app.currentLangHymns[hymn].title;
                }
                
                if(hymnTitle==""){
                    // get the English title
                    window['title_en'].forEach(function(title){
                        if(title.indexOf(hymn + ")") === 0){
                            hymnTitle = title.substring(title.indexOf(")")+2).trim();
                        }
                    });
                    html+=`<tr><td>${hymn}</td><td>${hymnTitle}</td></tr>`;
                } else {
                    html+=`<tr><td>${hymn}</td><td><a href="#" onClick='app.loadSearch("${hymnLookup}")' class="topicSearchLink" data-page="hymns" data-hymn="${hymn}">${hymnTitle}</a></td></tr>`;
                }
                
            })
            html+=`</tbody></table></div></div>`;
        });
        container.innerHTML = html;
      },
      getTitle: function(){
          let currentLang = app.lang;
          let currentTitle = "Hymnal";
          let searchTitle = "Search";
          let hymnTitle = "Hymn Number";
          let informationTitle = "Information";
          let ScripturalTitle = "Scriptural Index";
          let TopicalTitle = "Topical Index";
          let langObj = 'menu_' + currentLang;
          if(window[langObj]){
              currentTitle = window[langObj].Hymnal;
              searchTitle = window[langObj]["Search By Title"];
              hymnTitle = window[langObj]["Search By Number"];
              informationTitle = (window[langObj]["Information"]? window[langObj]["Information"] : informationTitle) ;
          }
          

          // update currentLanguageCode text
          document.getElementById("currentLanguageCode").innerHTML = currentLang.toLowerCase();

          document.getElementById("brand").innerHTML = currentTitle;
          document.getElementById("searchTitle").innerHTML = searchTitle;
          document.getElementById("byNumberTitle").innerHTML = hymnTitle;
      },
      getHymnWithZeros:function(num){
        let newnum = num;
        if(num<100){
            newnum = "0"+newnum;
        }
        if(num<10){
            newnum = "0"+newnum;
        }
        return newnum;
      },

      toggleScripturalReference: function(forceClose){

        const target = document.getElementById("scripturalReferenceModal");
        const node = document.getElementById("scripturalReferenceButton");
        const body = document.querySelector("body");
        if(node.classList.contains("active") || forceClose==true){
            node.classList.remove("active");
            target.classList.remove("active");
            body.classList.remove("scripturalReferenceOpen");
        } else {
            node.classList.add("active");
            target.classList.add("active");
            body.classList.add("scripturalReferenceOpen");
        }
      },
      searchScriptureByHymn: function(hymn){
        //loop through object `scriptural`
        let result = [];
        const scriptureArr = window['scriptural'];
        const books = Object.keys(scriptureArr);
        books.forEach(function(book){
            const chapters = scriptureArr[book];
            chapters.forEach(function(chapter){
                const verses = Object.keys(chapter)[0];
                const hymns = chapter[verses];
                hymns.forEach(function(hymnNum){
                    if(hymnNum==hymn){
                        result.push(book + " " + verses);
                    }
                })
            })
        });

        return result;

      },
      getHymnText: function(){
        let result;
        let target = document.getElementById("loader");
        
       
        const scriptureActive = document.getElementById("scripturalReferenceButton");
        if(scriptureActive.classList.contains("active")){
            //app.toggleScripturalReference(false);
        }

        
        
        let file = "hymn" + app.getHymnWithZeros(app.currentHymn);

        // get scriptural references
        let scriptureForHymn = app.searchScriptureByHymn(app.currentHymn)


        if(window['lyrics_' + app.lang]){

            result = window['lyrics_' + app.lang][file];
            let output = "";
            if(result==null || typeof result == "undefined"){
                
                let translation404 = window['menu_' + app.lang]['404'];
                result = `<p>${translation404}</p>`;
                //result = `<p>Cannot find hymn # ${app.currentHymn}</p>`;
            } else{
                // add scripture references
               

                if(scriptureForHymn.length>0){

                   
                    output += `<div class="scriptureReferences">
                    <a href="#" onClick="app.toggleScripturalReference(false)" class="btn btn-outline-tertiary scripturalReferenceButtonClose"><i class="fa fa-times"></i></a>
                        <div class="scripturalReferenceContent"><p class="text">Scriptural References</p><ul>`;
                    scriptureForHymn.forEach(function(scripture){
                        let book = scripture.substring(0, scripture.indexOf(" "));
                        let bookName = window['bible_' + app.lang][book];
                        let verses = scripture.substring(scripture.indexOf(" ")+1, scripture.length);
                        output+=`<li>${bookName} ${verses}</li>`;
                    })
                    output+=`</ul></div></div>`;
                }
                const scriptureTarget = document.getElementById("scripturalReferenceModal");
                scriptureTarget.innerHTML = output;


                
            } 


            target.innerHTML = result;

            // check for copyright
                let copyrightText = "";

                let copyrightArr = [];
                if(window['copyright']){
                    let counter = 0;
                    
                    Object.keys(window['copyright']).forEach(function(index){
                        let item = window['copyright'][index];
                        item.selection.split(",").forEach(function(hymn){
                            hymn = hymn.trim();
                            if(parseInt(hymn)==app.currentHymn){
                                copyrightArr.push(item);
                                
                            }
                        });
                    });
                }
                if(copyrightArr.length>0){
   
                    const copyrightDiv = document.createElement("div");

                    let copyrightDivText = "";
                    let counter = 0;
                    let max = copyrightArr.length;
                    copyrightArr.forEach(function(hymn){
                        if(max>1 && counter==0 || max==1){
                            copyrightDivText +="&copy;<br />";
                        }
                        
                        copyrightDivText +=`${hymn.entity} ${hymn.permission}<br />`;
                        counter++;

                    });
                    copyrightDiv.innerHTML = copyrightDivText;
                    copyrightDiv.classList.add("copyrightText");
                    document.getElementById("loader").appendChild(copyrightDiv)
                }
            document.querySelector(".page#hymns .contentMain").scrollTo(0,0);

            
        }

        // if music is playing, stop it
        if(app.musicPlayer) {
            app.musicPlayer.pause();

            app.makeMusic(app.currentMusicType, app.autoplay);

            // remove crrent source
            
        }

        
        document.querySelectorAll(".hymnFooter .musicType").forEach(function(elem){
            elem.classList.remove("active");
        });

        // scroll back to top
        document.querySelector(".page#hymns").scrollTo(0,0);

        if ( window['refTagger']) {
             window['refTagger'].tag();
        }

        app.populatePages();
        app.checkPlaylistButton();

      },
      toggleTheme: function(reverse){

        if(document.querySelector("html").classList.contains("dim")){
            app.contrast = "false";
            document.querySelector("html").classList.remove("dim")
        } else {
            app.contrast = "true";
            document.querySelector("html").classList.add("dim")
        }

        const sunSolid = document.getElementById("sunSolid");
        const moonSolid =   document.getElementById("moonSolid");
        if(app.contrast=="false"){
            sunSolid.classList.add("hidden");
            moonSolid.classList.remove("hidden");
        } else {
            sunSolid.classList.remove("hidden");
            moonSolid.classList.add("hidden");
        }
        app.storage.setItem("contrast", app.contrast)

      },
      setFontSize: function(size){
        app.size = size;
        app.storage.setItem(app.fontKey, size);
        document.documentElement.style.setProperty('--fontSize', size + "px");
        document.querySelector("body").setAttribute("data-font-size", size);
        document.getElementById("fontSlider").value=size;
        //set font slider
        app.getPageSizing()
      },
      getConfig: function(){
        app.brand = config.brand;
        let current = document.querySelector("#brand").innerHTML;
        document.querySelector("head title").innerHTML = app.brand + " hymnal";
        
        let langs = config.langs;
        app.storage = window.localStorage;
        
        let langValue = app.storage.getItem(app.langKey); 
        
        let browserLang = navigator.language || navigator.userLanguage;
        let langOverride = "";

        let allLangs = config.langs.split(",");
        allLangs.forEach(function(la){
            if(browserLang.indexOf(la)>-1){
                langOverride = la;
            }
        })

        if(config.useLogos){
            app.useLogos = true;
        }

        if(langValue==null || langValue==""){
            
            if(langOverride!==""){
                langValue = langOverride;
            } else {
                langValue = app.lang;
            }
           
        }

        if(langValue=="null"){
            langValue = "en";
        }
        app.setLang(langValue);
        app.getTitle();

        let currentMusicType = app.storage.getItem("currentMusicType");
        if(currentMusicType!=null){
            app.currentMusicType = currentMusicType;
        }
        if(app.currentMusicType=="vocal"){
            document.getElementById("vocal_version").checked=true;
        }

        
        var fontKey = "size";
        var fontSize = app.storage.getItem(fontKey);
        if(fontSize==null){
            fontSize = "24";
        }
        app.setFontSize(fontSize);
       
        var contrastKey = "contrast";
        var contrastVal = app.storage.getItem(contrastKey);

        if(contrastVal==null){
            contrastVal = "true";
            app.storage.setItem(contrastKey, contrastVal);
            
        }
        app.contrast = contrastVal;
        if(app.contrast=="true"){
            document.querySelector("html").classList.add("dim");
        } else {
            document.querySelector("html").classList.remove("dim");
        }

        const sunSolid = document.getElementById("sunSolid");
        const moonSolid =   document.getElementById("moonSolid");
        if(app.contrast=="false"){
            sunSolid.classList.add("hidden");
            moonSolid.classList.remove("hidden");
        } else {
            sunSolid.classList.remove("hidden");
            moonSolid.classList.add("hidden");
        }

        /*
        if(config.icon!=""){
            var icon = config.icon;
            var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = icon;
            //document.getElementsByTagName('head')[0].appendChild(link);
        }
        */
  
        app.languages = langs.split(",");
        

        
      },
      playNext: function(){
        let current = parseInt(app.currentHymn);

        let hymnList = app.currentLangHymns;
        let next = null;
        let currentIndex = 0;
        let currentHymnListArr = Object.keys(hymnList);
        const userList = app.userplaylist;

        if(currentHymnListArr.indexOf(current.toString())==-1){
            return;
        } else {
            // if found, get the previous index
            currentIndex = currentHymnListArr.indexOf(current.toString());
        }

        
        if(app.shuffle){
            // look at the random playlist generated when the shuffle button was enabled
            let list = app.randomPlaylists;
            let currentIndex = list.indexOf(current.toString());
            let next = list[currentIndex+1];
            if(next==undefined){
                next = list[0];
            }
            app.currentHymn = next;
            //app.startRandom();
            app.setHymn(app.currentHymn);
        } else {
            next = currentIndex + 1;
            let hymnCount = window['title_'+ app.lang].length;
            if(next>=hymnCount){
                next = 0;
            }

            let nextSong = currentHymnListArr[next]
            
            let formatNext = app.getHymnWithZeros(nextSong);
            app.currentHymn = nextSong;
            app.setHymn(nextSong);
        }
        if(app.isPlaying==true)

            app.makeMusic(app.currentMusicType, true);
        
      },
      playPrevious: function(){
        let current = parseInt(app.currentHymn);
        let hymnList = app.currentLangHymns;
 
        let next = null;
        let currentIndex = 0;
        let currentHymnListArr = Object.keys(hymnList);
        
        
        if(currentHymnListArr.indexOf(current.toString())==-1){

            // if not found, return
            return;
        } else {
            // if found, get the previous index
            currentIndex = currentHymnListArr.indexOf(current.toString());
        }

        if(app.shuffle){
            let list = app.randomPlaylists;
            let currentIndex = list.indexOf(current.toString());
            next = list[currentIndex-1];
            if(next==undefined){
                next = list[list.length-1];
            }
            app.currentHymn = next;
            //app.startRandom();
            app.setHymn(app.currentHymn);
        } else {
            next = currentIndex - 1;
            let hymnCount = window['title_'+ app.lang].length;
            if(next<1){
                next = hymnCount-1;
            }

            let nextSong = currentHymnListArr[next]

            app.currentHymn = nextSong;
            app.setHymn(nextSong);
        }
        if(app.isPlaying==true)

            app.makeMusic(app.currentMusicType, true);
      },
      setLang: function(langValue){
        app.lang = langValue;
        app.storage.setItem(app.langKey, langValue)
        document.querySelector("html").setAttribute("lang", langValue);
        app.getTitle();
        app.setMusicOptions();
        
      },
      toggleHamburger: function(){

        let button = document.querySelector(".navbar-toggler")
        let menu = document.getElementById("navbarSupportedContent");
        let body = document.querySelector("body");
        if(button.classList.contains("collapsed")){
            button.classList.remove("collapsed");
            menu.classList.remove("shown")
            body.classList.remove("menuOpen");
        } else {
            button.classList.add("collapsed")
            menu.classList.add("shown")
            body.classList.add("menuOpen");
        }
        app.closeAllMenus("menu")
      },
      setMusicOptions: function(){
        
        const bodyTag = document.querySelector("body");
        const vocal_version_toggle = document.getElementById("vocal_version_toggle");

        if(app.lang=="en" || app.lang=="fr"){
            app.hasVocal = true;
        } else {
            app.hasVocal = false;
        }
        if(app.hasVocal==true){
            
            bodyTag.classList.add("hasVocal");
            vocal_version_toggle.classList.remove("hidden");
        } else {

            
            bodyTag.classList.remove("hasVocal");
            vocal_version_toggle.classList.add("hidden");
            
        }
      },

      setCurrentMusicState: function(type){
        //app.storage.setItem("music", type);
        app.currentMusicType = type;
        document.querySelectorAll(".musicType").forEach(function(elem){
            elem.classList.remove("active")
        })
        //document.querySelector(`#${type}Icon`).classList.add("active");
      },
      togglePlaylist: function(){

            let tar = document.getElementById("togglePlaylist");
            tar.classList.toggle("active");
            const targetNode = document.getElementById("playlistContent");
            targetNode.classList.toggle("active");
            console.log(app.playlists);
            Sortable.create(playlistUl, {
                group: 'playlistUl',
                animation: 100
            });
      },
      closeAllMenus: function(exclude){
        
        const navbarToggle = document.querySelector(".navbar-toggler");
        const dropdownMain = document.querySelector(".navbar-collapse");
        const languageButton = document.getElementById("chooseLanguage");
        const languageDropdown = document.getElementById("langDropdown");

        if(exclude!="language"){
            languageDropdown.classList.remove("shown");
        }
        if(exclude!="menu"){
            navbarToggle.classList.remove("collapsed");
            dropdownMain.classList.remove("show");
        }
      },
      playlistDragAndDrop: function(){
        const sortableList = document.getElementById('playlistUl');
        //const newItemText = document.getElementById('newItemText');
        //const addButton = document.getElementById('addButton');

        let draggedItem = null;
        let isDragging = false; // Flag to indicate a drag is active
        let initialTouchY = 0; // 


        // --- Helper to get touch/mouse coordinates ---
        function getCoords(e) {
            if (e.touches && e.touches.length > 0) {
                return { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
            return { x: e.clientX, y: e.clientY };
        }

        // --- Helper to find the element under a point ---
        function getElementUnderPoint(x, y) {
            // Hide the dragged item temporarily to find the element underneath
            if (draggedItem) draggedItem.style.display = 'none';
            const element = document.elementFromPoint(x, y);
            if (draggedItem) draggedItem.style.display = ''; // Show it again
            return element;
        }

        // --- Common logic for both mouse and touch ---

        function handleDragStart(item, e) {
            draggedItem = item;
            draggedItem.classList.add('dragging');
            isDragging = true;

            // Prevent default browser behavior like selection (for mouse)
            // For touch, preventDefault is often in touchstart to stop scrolling
            e.dataTransfer && e.dataTransfer.effectAllowed === 'move'; // For HTML5 DnD API
        }

        function handleDragEnd() {
            if (draggedItem) {
                draggedItem.classList.remove('dragging');
                draggedItem = null;
            }
            isDragging = false;
            document.querySelectorAll('.sortable-item').forEach(item => {
                item.classList.remove('drag-over');
            });
        }

        function handleDragOver(targetElement, clientY) {
            if (!draggedItem || targetElement === draggedItem) return;

            // Remove 'drag-over' from other items
            document.querySelectorAll('.sortable-item').forEach(item => {
                item.classList.remove('drag-over');
            });

            // Determine if dragging over the upper or lower half of the item
            const boundingBox = targetElement.getBoundingClientRect();
            const offset = clientY - boundingBox.top;
            const insertBefore = offset < boundingBox.height / 2;

            // Visual feedback
            targetElement.classList.add('drag-over');

            // Reorder DOM
            if (insertBefore) {
                sortableList.insertBefore(draggedItem, targetElement);
            } else {
                sortableList.insertBefore(draggedItem, targetElement.nextSibling);
            }
        }


        // --- Mouse Event Listeners (Existing) ---
        sortableList.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('sortable-item')) {
                handleDragStart(e.target, e);
                e.dataTransfer.setData('text/plain', e.target.id || 'dragged-item');
            }
        });

        sortableList.addEventListener('dragend', handleDragEnd);

        sortableList.addEventListener('dragover', (e) => {
            e.preventDefault();
            const coords = getCoords(e);
            const target = getElementUnderPoint(coords.x, coords.y);

            if (target && target.classList.contains('sortable-item')) {
                handleDragOver(target, coords.y);
            } else if (target === sortableList && draggedItem) {
                // Dragging over the list background, append to end
                sortableList.appendChild(draggedItem);
            }
        });

        sortableList.addEventListener('drop', (e) => {
            e.preventDefault();
            // The DOM reordering has already happened in `dragover` / `touchmove`
            handleDragEnd();
        });


        // --- Touch Event Listeners (NEW) ---
        sortableList.addEventListener('touchstart', (e) => {
            // Only consider single touch for dragging
            if (e.touches.length === 1 && e.target.classList.contains('sortable-item')) {
                // Prevent default scrolling/zooming immediately
                e.preventDefault();
                draggedItem = e.target;
                initialTouchY = e.touches[0].clientY; // Store initial Y for threshold
                // No 'dragging' class yet, wait for actual move to start drag
            }
        }, { passive: false }); // `passive: false` is important to allow preventDefault

        sortableList.addEventListener('touchmove', (e) => {
            if (!draggedItem || e.touches.length !== 1) return;

            e.preventDefault(); // Prevent scrolling while dragging

            const currentTouchY = e.touches[0].clientY;
            const threshold = 5; // Pixels to move before considering it a drag

            // Only start the "drag" (add dragging class, etc.) after a significant move
            if (!isDragging && Math.abs(currentTouchY - initialTouchY) > threshold) {
                handleDragStart(draggedItem, e);
            }

            if (isDragging) {
                const coords = getCoords(e);
                const target = getElementUnderPoint(coords.x, coords.y);

                if (target && target.classList.contains('sortable-item')) {
                    handleDragOver(target, coords.y);
                } else if (target === sortableList) {
                    // Dragging over the list background, append to end
                    sortableList.appendChild(draggedItem);
                }
            }
        }, { passive: false });

        sortableList.addEventListener('touchend', (e) => {
            if (isDragging) {
                // Drop logic is essentially handleDragEnd
                handleDragEnd();
            } else if (draggedItem) {
                // If it was just a tap and no drag, reset draggedItem
                draggedItem.classList.remove('dragging');
                draggedItem = null;
            }
        });

        sortableList.addEventListener('touchcancel', (e) => {
            // Handle cases where the touch is interrupted (e.g., call, alert)
            handleDragEnd();
        });

      },
      populatePlaylist: function(){
        const playlistContent = document.getElementById("playlistContent");
        
        const playListUl = document.getElementById("playlistUl");
        playListUl.innerHTML = "";
        let playlist = app.userplaylist.length>0? app.userplaylist: app.playlists;
        if(playlist.length==0){
            return;
        } else {
            playlist.forEach(function(hymn){
                let hymnLookup = app.getHymnWithZeros(hymn);
                let hymnTitle = "";
                if(app.currentLangHymns && app.currentLangHymns[hymn]){
                    hymnTitle = app.currentLangHymns[hymn].title;
                }
                if(hymnTitle==""){
                    window['title_en'].forEach(function(title){
                        if(title.indexOf(hymn + ")") === 0){
                            hymnTitle = title.substring(title.indexOf(")")+2).trim();
                        }
                    });
                }
                let li = document.createElement("li");
                li.classList.add("sortable-item");
                li.setAttribute("data-hymn", hymnLookup);
                li.setAttribute("draggable", "true");
                li.classList.add("p-2");
                li.setAttribute("data-title", hymnTitle);
                li.innerHTML = `<span class="playlistLeft"><span class="playlistItemHandle"><i class="fa  fa-arrows"></i></span><span class="hymnTitle"><strong>${hymn}) ${hymnTitle}</strong></span></span><a href="#" class="playlistItemRemove"><i class="fa fa-times"></i></a>`;
                playListUl.appendChild(li);
            });

            document.querySelectorAll(".playlistItemRemove").forEach(function(elem){
                elem.addEventListener("click", function(e){
                    e.preventDefault();
                    console.log("remove from playlist");
                    let hymn = parseInt(e.target.closest("li").getAttribute("data-hymn"));
                    // remove from userplaylist
                    let index = app.userplaylist.indexOf(hymn);
                    if(index>-1){
                        app.userplaylist.splice(index, 1);
                    }
                    // remove from playlists
                    index = app.playlists.indexOf(hymn.toString());
                    if(index>-1){
                        app.playlists.splice(index, 1);
                    }
                    
                    app.populatePlaylist();
                    app.checkPlaylistButton();
                });
            });
        }
    },
    checkPlaylistButton: function(){
        const addToPlaylistButton = document.getElementById("addToPlaylist");
        if(app.userplaylist.length>0){
           if(app.userplaylist.indexOf(app.currentHymn)>-1 || app.playlists.indexOf(app.currentHymn)>-1){
                // already in playlist
                addToPlaylistButton.classList.add("inPlaylist");
            } else {
                addToPlaylistButton.classList.remove("inPlaylist");
            }
        } else {
            addToPlaylistButton.classList.remove("inPlaylist");
        }
        
    },

      eventBindings: function(){

        document.getElementById("scripturalReferenceButton").addEventListener("click", function(e){
            e.preventDefault();
            app.toggleScripturalReference(false);
        });

        document.getElementById("addToPlaylist").addEventListener("click", function(e){
            e.preventDefault();
            let hymn = app.currentHymn;
            if(e.target.classList.contains("inPlaylist")){
                // remove from playlist
                e.target.classList.remove("inPlaylist");
                // remove from userplaylist 
                let index = app.userplaylist.indexOf(hymn);
                if(index>-1){
                    app.userplaylist.splice(index, 1);
                }
            } else {
                app.userplaylist.push(hymn);
            }
            
            app.checkPlaylistButton();
            app.populatePlaylist();
        });

        document.querySelectorAll(".playlistControlBulk").forEach(function(elem){
            
            elem.addEventListener("click", function(e){
                let action = e.target.getAttribute("data-action");
                if(action=="add"){
                    app.setNormalPlaylistForLang();
                    app.populatePlaylist();
                }
                if(action=="remove"){
                    // remove all hymns from playlist
                    app.playlists = [];
                    app.populatePlaylist();
                }
            });
        });

        document.querySelector(".playlistClose").addEventListener("click", function(e){
            e.preventDefault();
            app.togglePlaylist();
        });

         document.querySelector("#togglePlaylist").addEventListener("click", function(e){
            e.preventDefault();
            app.togglePlaylist();
        });

      

        document.getElementById("searchScripture").addEventListener("change", function(e){

            let val = e.target.value;
            app.selectedBook = val;
            
            if(app.selectedBook=="all"){
                document.querySelectorAll("#scriptureContent .book").forEach(function(elem){
                    elem.classList.remove("hidden");
                });
            } else {
                let target = document.querySelector(`#scriptureContent .book[data-id="${val}"]`);
            
                document.querySelectorAll("#scriptureContent .book").forEach(function(elem){
                    elem.classList.add("hidden");
                });
                target.classList.remove("hidden");
            }
            
            
            
        })
        document.getElementById("topicSelect").addEventListener("change", function(e){
            app.selectedTopic = e.target.value;
            if(app.selectedTopic=="0"){
                document.querySelectorAll(".topic").forEach(function(elem){
                    elem.classList.remove("hidden");
                })
            } else {
                document.querySelectorAll(".topic").forEach(function(elem){
                    elem.classList.add("hidden");
                })
                document.querySelector(`.topic[data-id="${app.selectedTopic}"]`).classList.remove("hidden");
            }
        });

        document.querySelectorAll(".music-control-toggler").forEach(function(elem){
            elem.addEventListener("click", function(e){
                e.preventDefault();
                let id = e.target.id;
                if(id=="hymnPrev"){
                    app.playPrevious();
                } else if(id=="hymnNext"){
                    app.playNext();
                    
                } else {

                }
            });
        });

        document.querySelectorAll(".music-control-btn").forEach(function(el){
            el.addEventListener("click", function(e){

                e.preventDefault();
                let thisbutton = e.target;
                let thisProp = thisbutton.getAttribute("data-id");
                app[thisProp] = !app[thisProp];
                if(app[thisProp]==true){
                    thisbutton.classList.add("active");
                } else {
                    thisbutton.classList.remove("active");
                }
                
            });
            
        })

        //close language and menu when clicking anywhere else
        document.addEventListener("click", function(e){
            let target = e.target;


            let body = document.querySelector("body");
            if(body.classList.contains("menuOpen")){
                // if menu is already open
                if(target.classList.contains("navbar-toggler") || target.closest(".navbar-toggler")){
                    //its the menu button");
                    return;
                } else {
                    if(target.closest(".navbar-collapse") || target.closest(".navbar-toggler")){
                        //its the manu itsself
                       
                        if(target.classList.contains("changePageButton")){
                             // but is it a link?
                        } else {
                            // nope, just the menu container
                            app.toggleHamburger();
                        }

                    } else {
                        //its clicking on something else
                        app.toggleHamburger();
                    }
                }
               
            }
            
            
            if(target.classList.contains("incorrectTarget")){;
                target.closest("a").click();
                return;
            }
            if(target.id && (target.id=="chooseLanguage" || target.id=="currentLanguageCaret" || target.id=="currentLanguageCode")){
                return;
            }
            let hasLanguageButtonParent = false;
            if(target.parentElement){
                if(target.closest(".btn")){
                    if(target.closest(".btn").id=="chooseLanguage"){
                        hasLanguageButtonParent = true;
                        
                        return;
                    }
                }
            }
           

            // music player controls
            let isMusicPlayerControl = false;
            if(target.classList.contains("vjs-icon-placeholder") || target.classList.contains("vjs-icon") || target.classList.contains("vjs-control-text")){
                // check parent
                let parent = target.parentElement;
                if(parent.classList.contains("vjs-play-control")){
                    isMusicPlayerControl = true;
                }
            }
            if(target.classList.contains("vjs-play-control")){
                
                isMusicPlayerControl = true;
            }
            if(isMusicPlayerControl){
                let buttonstate = document.querySelector(".vjs-play-control");
                let title = buttonstate.getAttribute("title");

                if(title=="Play" || title=="Replay"){
                    app.isPlaying = true;
                } else {
                    app.isPlaying = false;
                }
                return;
                
            }

            if (target.parentElement) {
                // Code to handle the parent element of target
                const parentElement = target.parentElement;
                if(parentElement.classList.contains("music-control-toggler")){
                    parentElement.click();
                }
            }
           
            if(target.classList.contains("navbar-toggler") || target.classList.contains("navbar-toggler-override")){
                return;
            }
            
            app.closeAllMenus("");
            
           
        })
        
        

        document.getElementById("chooseLanguage").addEventListener("click", function(e){
            e.preventDefault();
            const languageDropdown = document.getElementById("langDropdown");
            if(languageDropdown.classList.contains("shown")){
                languageDropdown.classList.remove("shown");
            } else {
                languageDropdown.classList.add("shown");
            }
            app.closeAllMenus("language")
            
        });
        
        document.getElementById("musicControl").addEventListener("click", function(e){
            let thisbutton = document.getElementById("musicControl");

            
            let originalState = app.musicOpen;
            app.musicOpen = !app.musicOpen;

            if(app.musicOpen==false){
                app.autoplay = false;
            } else {
                const autoPlayNode = document.getElementById("playAll");
                if(autoPlayNode.classList.contains("active")){
                    app.autoplay = true;
                }
            }   

            const bodyTag = document.querySelector("body");
            const musicPlayerWrapper  = document.querySelector(".musicPlayer");
            const hymnFooter = document.querySelector(".hymnFooter");
            if(app.musicOpen==false){
                
                bodyTag.classList.remove("hasMusicOpen");
                
                musicPlayerWrapper.classList.remove("active");
                hymnFooter.classList.remove("musicOpen");
                app.musicPlayer.pause();
                thisbutton.classList.remove("active");
            } else {
                
                bodyTag.classList.add("hasMusicOpen");
                
                musicPlayerWrapper.classList.add("active");
                hymnFooter.classList.add("musicOpen")
                thisbutton.classList.add("active");
            }

            let musicType = app.currentMusicType;
            
            if(originalState==false){

                app.makeMusic(musicType, app.autoplay);

            }
            
        });


        document.querySelectorAll("#dropdownContent li a").forEach(function(elem){
 
            
            elem.addEventListener("click", function(e){
                e.preventDefault();
                const thisNode = e.target;
                const anchor = thisNode.closest("a");
                const page = anchor.getAttribute("data-page");
                app.toggleHamburger();
                app.changePage(page);

            })
        });



        document.getElementById("closeMusic").addEventListener("click", function(e){
            e.preventDefault();
            app.musicOpen = false;

            const bodyTag = document.querySelector("body");
            const musicPlayerWrapper  = document.querySelector(".musicPlayer");
            const hymnFooter = document.querySelector(".hymnFooter");
            const musicToggle= document.getElementById("musicControl");

            musicToggle.classList.remove("active");
           
            bodyTag.classList.remove("hasMusicOpen");
                
            musicPlayerWrapper.classList.remove("active");
            hymnFooter.classList.remove("musicOpen");
            app.musicPlayer.pause();

        });

        document.getElementById("vocal_version").addEventListener("change", function(e){
            let val = e.target.checked;
            let currentType = "piano";
            if(val){
                currentType = "vocal";
            }
            app.hasVocal = val;
            app.currentMusicType = currentType;
            app.storage.setItem("currentMusicType", currentType);

            app.setMusicOptions();

            app.makeMusic(currentType, app.autoplay);
        });


        document.querySelector(".navbar-toggler").addEventListener("click", function(e){
            let button = e.target;
            app.toggleHamburger();
        });

        

        

        if(document.querySelector("#midiIcon")){
            document.querySelector("#midiIcon").addEventListener("click", function(e){

                e.preventDefault();
                app.makeMusic("midi");
                app.setCurrentMusicState("midi")
                
            })
        }
        

        document.querySelectorAll(".changePageButton").forEach(function(item){

            item.addEventListener("click", function(e){
                e.preventDefault();
               
                let page ="";
                if(e.target.getAttribute("data-page")){
                    page = e.target.getAttribute("data-page");
                } else {
                    page = e.target.closest("a").getAttribute("data-page");
                }

                document.querySelectorAll(".changePageButton").forEach(function(item){
                    item.classList.add("inactive");

                    window.setTimeout(function(){
                        item.classList.remove("inactive");
                    }, 1000)
                })

                
                app.changePage(page)
            })
        });

        document.getElementById("hymnSelect").addEventListener("change", function(e){
            app.currentHymn = parseInt(e.target.value);
            app.getHymnText();
        })

        document.getElementById("contrast").addEventListener("click", function(e){
            e.preventDefault();
            app.toggleTheme();
            
        })

        document.getElementById("formByNum").addEventListener("submit", function(e){
            e.preventDefault();
            app.currentHymn = document.getElementById("searchByNumber").value;
            app.changePage("hymns");
            app.setHymn(app.currentHymn);
            
        })

        document.querySelectorAll(".fontSizeToggle").forEach(function(el){
            el.addEventListener("click", function(e){
                e.preventDefault();
                let target = e.target;
                if(target.tagName=="I"){
                    target = target.parentElement;
                }
                target.classList.toggle("active");
                const body = document.querySelector("body");
                body.classList.toggle("hasFontsizerOpen")
                
            
              
            })
        })

        document.querySelectorAll(".fontSizer").forEach(function(el){
            el.addEventListener("click", function(e){
                e.preventDefault();
                const togglerIcon = document.querySelector(".fontSizeToggle");
                const tar = document.querySelector("#hymns");
                const body = document.querySelector("body");
                body.classList.toggle("hasFontsizerOpen")
                togglerIcon.classList.toggle("active");
                
              
            })
        })
        
        
        document.querySelector("#fontSlider").addEventListener("input", function(e){
            app.setFontSize(e.target.value)
        });
        

        document.getElementById("filterSearch").addEventListener("keyup", function(e){
            let val = e.target.value;
            app.updateSearchFilter(e.target)
        })
      
  
      },

      loadSearch: function(num){

        let numInt = parseInt(num);
        document.getElementById("hymnSelect").value = num;
        app.currentHymn = numInt;
        app.changePage("hymns");
        app.getHymnText();
        
      },
      updateSearchFilter: function(node){
          let value = node.value;
          app.currentSearchFilter = value;
          app.makeSearchContent();
      },
      highlightMatches: function(text, filterText) {
        // Use a regular expression with 'gi' flags for case-insensitive global matching
        const regex = new RegExp(filterText, 'gi');
        
        // Replace matched substrings with <mark> tags
        return text.replace(regex, match => `<mark>${match}</mark>`);
      },
      filterAndHighlightData: function(data, filterText) {
        const filteredData = [];
    
        data.forEach(item => {
            const { title } = item;
    
            // Case-insensitive search for the filter text in title and lyrics
            const titleMatched = title.toLowerCase().includes(filterText.toLowerCase());
            //const lyricsMatched = lyrics.toLowerCase().includes(filterText.toLowerCase());
    
            if (titleMatched) {
                // Create a new object with highlighted matches
                const highlightedItem = {
                    title: titleMatched ? highlightMatches(title, filterText) : null,
                    lyrics: lyricsMatched ? highlightMatches(lyrics, filterText) : lyrics,
                };
    
                filteredData.push(highlightedItem);
            }
        });
    
        return filteredData;
      },
      sortTable: function(column) {
        const table = document.getElementById("tocBody");
        const rows = Array.from(table.querySelectorAll('tr'));
    
        rows.sort((a, b) => {
            const numA = parseFloat(a.cells[0].textContent);
            const numB = parseFloat(b.cells[0].textContent);
            const alphaA = a.cells[1].textContent.toLowerCase();
            const alphaB = b.cells[1].textContent.toLowerCase();
    
            if(column === 0){
                return numA - numB;
            } else if(column === 1){
                return alphaA.localeCompare(alphaB);
            } else {
                return 0;
            }
            
        });
        
    
        // Remove existing rows from the table
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
    
        // Append sorted rows back to the table
        rows.forEach(row => {
            table.appendChild(row);
        });
    },
    trimHighlightedMatches: function(text) {

        // trim the text before and after the first occurance of <mark>
        let firstMark = text.indexOf("<mark>");
        let lastMark = text.indexOf("</mark>");
        let newText = text;
        let startIndex = firstMark - 95;
        let startPrefix = "...";
        let endPrefix = "...";
        if(startIndex<0){
            startIndex = 0;
            startPrefix = "";
        }
        // get number of characters of the text
        let totalChars = text.length;
        let endIndex = lastMark + 95;
        if(endIndex>totalChars){
            endIndex = totalChars;
            endPrefix = "";
        }
        let splits = newText.split(" ");
        // find out what entry in the splits array our firstMark is
        let markIndex = 0;
        for(var i=0; i<splits.length; i++){
            let split = splits[i];
            if(split.indexOf("<mark>")>-1){
                markIndex = i;
                break;
            }
        }

        let startIndex2 = ((markIndex - 17)>=0? markIndex - 17:0);
        let endIndex2 = markIndex+17;

        let newString = splits.slice(startIndex2, endIndex2).join(" ");



        newText = startPrefix + newText.substring(startIndex, endIndex) + endPrefix;

        return  startPrefix +  newString + endPrefix;
    },
    
      makeSearchContent: function(){

        let title;
        if(window['title_'+app.lang]){
            title = window['title_'+app.lang];

          let content = '';

          for(var i=0; i<title.length; i++){
  
            // see if this makes the cut using the current search filter
            let addThis = false;
            
            let titleSub = title[i];
            titleSub = titleSub.substring(0, titleSub.indexOf(")"));
            let titleInt = parseInt(titleSub);
            titleSub = titleInt.toString();
            let origTitle = titleSub;

            let num = app.getHymnWithZeros(titleSub);
            
  
            var name = title[i];
            name = name.substring(name.indexOf(")")+2,name.length);

            let lowerFilter = app.currentSearchFilter.toLowerCase();
            let theseLyrics = window['lyrics_' + app.lang]["hymn" + num];

            theseLyrics = theseLyrics.substring(theseLyrics.indexOf("</h1>")+5);
            var dom = new DOMParser().parseFromString(theseLyrics, 'text/html');
            let theseSearchLyrics = dom.body.textContent;
            let showLyrics = false;
            let highlightedSearchLyrics = null;

            if(lowerFilter==""){
                addThis = true;
            } else {
                // lots of search logic
                if(name.toLowerCase().indexOf(lowerFilter)>-1){
                    addThis = true;
                
                    name = app.highlightMatches(name, lowerFilter);

                }
                if(origTitle == lowerFilter){
                    addThis = true;
                }
                if(theseSearchLyrics.toLowerCase().indexOf(lowerFilter) >-1){
                    addThis = true;
                    showLyrics = true;

                    
                    highlightedSearchLyrics = theseSearchLyrics;
                    let searchSplits = lowerFilter.split(" ");
                    let filterText = app.currentSearchFilter;

                    highlightedSearchLyrics = highlightedSearchLyrics.replace(/;/g, ' ');
                    highlightedSearchLyrics = highlightedSearchLyrics.replace(/\./g, ' ');
                    highlightedSearchLyrics = highlightedSearchLyrics.replace(/,/g, " ");
                    highlightedSearchLyrics = highlightedSearchLyrics.replace(/:/g, " ");
                    highlightedSearchLyrics = highlightedSearchLyrics.replace(/Chorus/g, " ");
                    
                    highlightedSearchLyrics = app.highlightMatches(highlightedSearchLyrics, filterText);
                    highlightedSearchLyrics = app.trimHighlightedMatches(highlightedSearchLyrics);
                }
            }
            

            if(addThis==true){
                content += `
              
                    <tr>
                        <td>${origTitle}</td>
                        <td>
                            <a href="javascript:app.loadSearch('${num}');" class="searchLink">
                                <span class="text-link d-block">${name}</span>
                                
                            </a>
                            ${(showLyrics? "<br />" + highlightedSearchLyrics: "")}
                        </td>
                    </tr>
                 `
            }
  
          }
          document.getElementById("tocBody").innerHTML=content;
        }
      },
      
      makeHymnList: function(){
        let lang = app.lang;
        let hymn = app.hymn;
        let title = null;
        let hymnSelector = document.getElementById("hymnSelect");
        hymnSelector.innerHTML = "";
          
        if(window['menu_'+lang]){
            title = window['title_'+lang];

            for(var i=0; i<title.length; i++){
  
                // need to get actual number, not just index
                let titleSub = title[i];
                titleSub = titleSub.substring(0, titleSub.indexOf(")"));

                let titleInt = parseInt(titleSub);
                titleSub = titleInt.toString();
                if(titleInt<100){
                    titleSub = "0"+titleSub;
                }
                if(titleInt<10){
                    titleSub = "0"+titleSub;
                }
                var num = i+1;

                if(num<100){
                    num = "0"+num;
                }
                if(num<10){
                    num = "0"+num;
                }
                var option = document.createElement("option");
                option.setAttribute("value", titleSub);
                option.innerHTML = title[i]; 
                hymnSelector.append(option);
            }

            
            
        }

      },
      
      setHymn: function(number){
        
        let startVal = number;
        let pre = "";
        app.currentHymn = number;
        if(startVal<100) {
            pre="0";
        }
        if(startVal<10){
            pre="00";
        }
        startVal = pre + "" +startVal;

        
        let hymnSelector = document.getElementById("hymnSelect");
            hymnSelector.value = startVal;
        app.getHymnText();
        
      }, 

      startRandom: function(){
        // get actual list of values for the current lang
        let titles = window["title_" + app.lang];
        let startVal = "";

         // start is a variable set from the url
            if(typeof start=="undefined"){
               
                var random;
                var min=1;
                var max = titles.length;
                random = Math.floor(Math.random() * (max - min +1)) + min;
    
                let title = titles[random];
                if(title){
                    title = parseInt(title.substring(0, title.indexOf(")")));
        
                    startVal = title;
                } else {
                    startVal = 1;
                }
            
            } else {
                 // if we hardcode the hymn in the url, load it
                startVal = start;
            }
    
            app.currentHymn = startVal;
            
      },

      makeMusic:function(type, autoplay){
        
       

        let audio = document.querySelector(".video-js");
        let source = audio.querySelector("source");
        let sourcePath = app.getHymnWithZeros(app.currentHymn) + ".mp3";
        let autoPlayVal = false;
        if((app.autoplay==true && app.isPlaying) || autoplay==true){
            autoPlayVal = true;
        }
        if(type=="piano" || type=="vocal"){
            if(type=="vocal"){
                let vocal_path_suffix = "";
                if(app.lang=="fr"){
                    vocal_path_suffix = "fr/";
                }
                sourcePath = vocal_path + vocal_path_suffix + sourcePath;
                if(config.novocal.includes(app.currentHymn)){
                    sourcePath = null;
                }
            } else if(type=="piano"){
                sourcePath = path + sourcePath
            } 

            if(sourcePath!=null){

                /* create music system notification */
                
                if(false && typeof MusicControls !== "undefined"){

                    // Music title
                    let hymnTitle = window['title_'+app.lang][app.currentHymn-1];
                    hymnTitle = hymnTitle.substring(hymnTitle.indexOf(")")+2, hymnTitle.length);
                    MusicControls.create({
                        track       : hymnTitle,	// optional, default : ''
                        artist      : 'UCG',		// optional, default : ''
                        album       : 'Hymnal',     // optional, default: ''
                        cover       : 'images/iconTransparent.png',		// optional, default : nothing
                        // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
                        // or a remote url ('http://...', 'https://...', 'ftp://...')
                        isPlaying   : true,							// optional, default : true
                        dismissable : true,							// optional, default : false
                    
                        // hide previous/next/close buttons:
                        hasPrev   : false,		// show previous button, optional, default: true
                        hasNext   : false,		// show next button, optional, default: true
                        hasClose  : true,		// show close button, optional, default: false
                    
                        // iOS only, optional
                        
                        duration : 60, // optional, default: 0
                        elapsed : 10, // optional, default: 0
                        hasSkipForward : false, //optional, default: false. true value overrides hasNext.
                        hasSkipBackward : false, //optional, default: false. true value overrides hasPrev.
                        skipForwardInterval : 15, //optional. default: 0.
                        skipBackwardInterval : 15, //optional. default: 0.
                        hasScrubbing : true, //optional. default to false. Enable scrubbing from control center progress bar 
                    
                        // Android only, optional
                        // text displayed in the status bar when the notification (and the ticker) are updated
                        ticker	  : 'Now playing "' + hymnTitle + '"', // optional, default: 'Now playing ...'
                        //All icons default to their built-in android equivalents
                        //The supplied drawable name, e.g. 'media_play', is the name of a drawable found under android/res/drawable* folders
                        playIcon: 'media_play',
                        pauseIcon: 'media_pause',
                        prevIcon: 'media_prev',
                        nextIcon: 'media_next',
                        closeIcon: 'media_close',
                        notificationIcon: 'notification'
                    }, onSuccess, onError);
                }

                document.querySelector(".musicPlayer").classList.add("active");

                source.setAttribute("src", sourcePath);

                if(app.musicPlayer){

                    app.musicPlayer.pause();
                    if(typeof MusicControls !== "undefined")
                        MusicControls.updateIsPlaying(false);
                } else {

                    app.musicPlayer = videojs('audio_player', {
                        "playbackRates": [0.8, 0.9, 1, 1.1, 1.2],
                        controls: true,
                        autoplay: autoPlayVal,
                        preload: 'auto'
                    });

                    


                    app.musicPlayer.on('ended', function(e) {
                   
                        const playerWrapper = document.querySelector(".video-js");
                        const musicWrapper = document.querySelector(".musicPlayer");
                        playerWrapper.setAttribute("data-playing", "false");
                        musicWrapper.setAttribute("data-playing", "false");

                
                        if(app.autoplay==true){
    
                            window.setTimeout(function(){
                            app.playNext();
                                
                            }, 1000)
                           
                           
                        } 
                    });

                    app.musicPlayer.on('play',()=>{

                        const playerWrapper = document.querySelector(".video-js");
                        const musicWrapper = document.querySelector(".musicPlayer");
                        playerWrapper.setAttribute("data-playing", "true");
                        musicWrapper.setAttribute("data-playing", "true");
                        if(typeof MusicControls !== "undefined")
                            MusicControls.updateIsPlaying(true);
    
                    });
                    app.musicPlayer.on('pause',()=>{
  
                        const playerWrapper = document.querySelector(".video-js");
                        const musicWrapper = document.querySelector(".musicPlayer");
                        playerWrapper.setAttribute("data-playing", "false");
                        musicWrapper.setAttribute("data-playing", "false");
                    });
                    app.musicPlayer.ready(function() {
    
                        // add logic to know if we should auto play
                    });
                }

                app.musicPlayer.src({type: 'audio/mp3', src: sourcePath});

               
                if(autoPlayVal==true){
                    app.musicPlayer.play();
                }
   
              
            }
        } else {
           // future functionality for midi

            
        }

      },
      
      makeLanguageDropdown: function(){
          if(app.languages.length==1){
              // only english
              // hide dropdown
              document.querySelector(".navbar-toggler").remove();
          } else {
              let target = document.getElementById("langDropdown");
              target.innerHTML = "";
              for(var i=0;i<app.languages.length; i++){
                  var thisLang = app.languages[i];
                
                  var li = document.createElement("li");
                  li.classList.add("nav-item");
                  if(thisLang==app.lang){
                    li.classList.add("active");
                  }
                  var a = document.createElement("a");
                  a.setAttribute("data-lang", thisLang);
                  a.classList.add("nav-link")
                  
                  a.setAttribute("href", "#");
                  
                  let languageDisplay = "Hymnal";
                  if(window['menu_'+ thisLang]){
                      languageDisplay = window['menu_'+ thisLang]["Language"]
                  } 
                  a.innerHTML = "(" + thisLang + ") " + languageDisplay;
  
                  li.append(a);
                  target.append(li);
              }


              const dropmenu = document.getElementById("langDropdown");
                    dropmenu.classList.remove("shown");

              document.querySelectorAll("#langDropdown li a").forEach(element=>{
                element.addEventListener("click", function(el){
                    el.preventDefault();

                    let lang = el.target.getAttribute("data-lang");
                    const dropmenu = document.getElementById("langDropdown");
                    dropmenu.classList.remove("shown");
                    app.setLang(lang)
                    app.loadCurrentLang();

                })
              });
              
          }
      },
      
      
  
  }
  
  app.init();
  