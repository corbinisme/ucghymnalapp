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
      sheetMusicEnabled: false,
      sheetMusicActive: false,
      currentSearchFilter: "",
      currentTitles: [],
      musicPlayer: null,
      musicOpen: false,
      currentMusicType: "piano",
      selectedTopic: "0",
      selectedBook: "all",
      isPlaying: false,
      randomPlaylists:[],
      init: function(){
            app.getConfig();
            app.eventBindings();
            app.setScrollbarWidth();
            app.loadCurrentLang(true);
            app.getPageSizing();
            app.populatePages();
            
            window.addEventListener("resize", function(){
                app.getPageSizing();
            })
            app.setMusicOptions();
      },
      loadCurrentLang: function(random){
        app.makeLanguageDropdown();
        app.makeHymnList();
        app.makeSearchContent();
        if(random){
            app.startRandom();
        } 
        app.setHymn(app.currentHymn);
        app.populateAbout();
        app.populateUcg();
        app.updateMenus();
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
            console.log("mobile")
            isMobile = true;
        } else {
            // The user is not on a mobile device
            console.log("not actual mobile")
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
      setRandomPlaylistForLang: function(){
        config.langs.split(",").forEach(function(lang){
            //randomPlaylists
            console.log("setting random playlist for", lang);
            let hymnCount = window['title_'+ lang].length;
            let playlist = [];
            for(let i=1; i<=hymnCount; i++){
                playlist.push(i);
            }
            // randomize the playlist
            playlist = app.shuffleArray(playlist);
            app.randomPlaylists[lang] = playlist;
        })
        console.log("random playlists", app.randomPlaylists)
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
      },
      populateScriptural: function(){
        const wrapper = document.getElementById("scriptureContent");
        //const scripturalText = window['pages_en']['scriptural'].title;
        let html = "";
        const scriptural = window['scriptural'];
        const books = Object.keys(scriptural);

        const scriptureDropdown = document.getElementById("searchScripture");
        books.forEach(function(book){
            const chapters = scriptural[book];
            
            const thisOp = document.createElement("option");
            thisOp.value = book;
            thisOp.innerHTML = book;
            scriptureDropdown.append(thisOp);

            html+=`<div class="book" data-id="${book}"><h3 class="bookName pageHeading mb-4 mt-4">${book}</h3><div class="bookChapters"><table class="table"><tbody class="tocBody">`;
            chapters.forEach(function(chapter){

                const verses = Object.keys(chapter)[0];
                const hymns = chapter[verses];
               
                html+=`<tr><td>${verses}</td><td>
                    <ul>`;
                    hymns.forEach(function(hymn){
                        const hymnLookup = app.getHymnWithZeros(hymn);
                        const hymnSelector = document.getElementById("hymnSelect");
                        let hymnTitle = hymnSelector.querySelector(`option[value="${hymnLookup}"]`).innerText;
                        
                        // get rid of the characters before the ) in the title
                        hymnTitle = hymnTitle.substring(hymnTitle.indexOf(")")+2, hymnTitle.length).trim()

                        html+=`<li><a href="#" onClick='app.loadSearch("${hymnLookup}")' class="topicSearchLink" data-page="hymns" data-hymn="${hymn}">${hymn}) ${hymnTitle}</a></li>`;
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
                    let hymnLookup = app.getHymnWithZeros(hymn.trim());
                    let hymnTitle = app.getHymnTitle(hymnLookup);
                    html+=`<li><a href="#" onClick='app.loadSearch("${app.getHymnWithZeros(hymn)}")' class="topicSearchLink" data-page="hymns" data-hymn="${hymn}">${hymn}) ${hymnTitle}</a></li>`
                });
                html+=`</ul></div>`;
            copyContent.innerHTML+=html;
        });
        const copyText = window['pages_en']['copyright'].content;
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

        topics.forEach(function(topic){

            const thisOp = document.createElement("option");
            thisOp.value = topic.id;
            thisOp.innerHTML = topic.name;
            topicDropdown.append(thisOp);


            html+=`<div class="topic" data-id="${topic.id}"><h3 class="pageHeading mb-4 mt-4">${topic.name}</h3><div class="topicHymns"><table class="table"><tbody class="tocBody">`;
            topic.hymns.forEach(function(hymn){
                const hymnLookup = app.getHymnWithZeros(hymn);
                const hymnTitle = app.getHymnTitle(hymnLookup);
                
                html+=`<tr><td>${hymn}</td><td><a href="#" onClick='app.loadSearch("${hymnLookup}")' class="topicSearchLink" data-page="hymns" data-hymn="${hymn}">${hymnTitle}</a></td></tr>`;
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
      showPdfViewer: function(val){
        if(val==true){

            document.getElementById("pdfloader").classList.add("active");
            document.getElementById("pdfloader").classList.remove("hidden");
            document.getElementById("loader").classList.add("hidden");
            document.getElementById("loader").classList.remove("active");
            //check if pdf has loaded yet
            
        } else {

            document.getElementById("pdfloader").classList.remove("active");
            document.getElementById("pdfloader").classList.add("hidden");
            document.getElementById("loader").classList.add("active");
            document.getElementById("loader").classList.remove("hidden");
        }
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
        let pdfTarget = document.getElementById("pdfloader");
       
        const scriptureActive = document.getElementById("scripturalReferenceButton");
        if(scriptureActive.classList.contains("active")){
            app.toggleScripturalReference(false);
        }

        if(app.sheetMusicActive){
           // make a shell for pdf viewing
           // show pdf div
           app.showPdfViewer(true);
           let hymnNumber =app.getHymnWithZeros(app.currentHymn);
           
           const pdfurl = config.pdfpath + hymnNumber + " Guitar.pdf";


            pdf.url = pdfurl;
            pdf.init();
        } else {
            app.showPdfViewer(false);
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
                        output+=`<li>${scripture}</li>`;
                    })
                    output+=`</ul></div></div>`;
                }
                const scriptureTarget = document.getElementById("scripturalReferenceModal");
                scriptureTarget.innerHTML = output;
            } 


            target.innerHTML = result;
            document.querySelector(".page#hymns .contentMain").scrollTo(0,0);

            
        }

        // if music is playing, stop it
        if(app.musicPlayer) {
            app.musicPlayer.pause();
            app.makeMusic(app.currentMusicType, false);
            //app.musicPlayer.dispose();
            // remove crrent source
            
        }

        
        document.querySelectorAll(".hymnFooter .musicType").forEach(function(elem){
            elem.classList.remove("active");
        });

        // scroll back to top
        document.querySelector(".page#hymns").scrollTo(0,0);

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
        const sheetMusicOption = (config.pdf? config.pdf:false);
        app.sheetMusicEnabled = sheetMusicOption;
        if(app.sheetMusicEnabled){
            const sheetMusicToggleWrapperNode = document.getElementById("toggleType");
            sheetMusicToggleWrapperNode.classList.remove("hidden");
            const sheetMusicToggleNode = document.getElementById("sheetMusicToggle");
            let sheetMusicActiveInit = (app.storage.getItem("sheetMusicActive")? app.storage.getItem("sheetMusicActive"): false);

            app.sheetMusicActive =  (sheetMusicActiveInit=="true"? true:false);
            if(app.sheetMusicActive){
                app.sheetMusicEnabled = true;
                // get the sheetMusicToggleNode node and set it to checked
                sheetMusicToggleNode.checked=true;
            }

            }
      },
      playNext: function(){
        let current = parseInt(app.currentHymn);
        
        if(app.shuffle){
            // look at the random playlist generated when the shuffle button was enabled
            let list = app.randomPlaylists[app.lang];
            let currentIndex = list.indexOf(current);
            let next = list[currentIndex+1];
            if(next==undefined){
                next = list[0];
            }
            app.currentHymn = next;
            //app.startRandom();
            app.setHymn(app.currentHymn);
        } else {
            let next = current + 1;
            let hymnCount = window['title_'+ app.lang].length;
            if(next>hymnCount){
                next = 1;
            }
            // @TODO account for languages with missing numbers in the sequence
            
            let formatNext = app.getHymnWithZeros(next);
            app.currentHymn = next;
            app.setHymn(next);
        }
        if(app.isPlaying==true)
            app.makeMusic(app.currentMusicType, true);
        
      },
      playPrevious: function(){
        let current = parseInt(app.currentHymn);
        
        if(app.shuffle){
            let list = app.randomPlaylists[app.lang];
            let currentIndex = list.indexOf(current);
            let next = list[currentIndex-1];
            if(next==undefined){
                next = list[list.length-1];
            }
            app.currentHymn = next;
            //app.startRandom();
            app.setHymn(app.currentHymn);
        } else {
            let next = current - 1;
            let hymnCount = window['title_'+ app.lang].length;
            if(next<1){
                next = hymnCount;
            }
            app.currentHymn = next;
            app.setHymn(next);
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
        if(button.classList.contains("collapsed")){
            button.classList.remove("collapsed");
            menu.classList.remove("shown")
        } else {
            button.classList.add("collapsed")
            menu.classList.add("shown")
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

      eventBindings: function(){

        document.getElementById("scripturalReferenceButton").addEventListener("click", function(e){
            e.preventDefault();
            app.toggleScripturalReference(false);
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
                if(thisProp=="shuffle"){
                    //make random playlist
                    app.setRandomPlaylistForLang();
                }
            });
            
        })

        //close language and menu when clicking anywhere else
        document.addEventListener("click", function(e){
            let target = e.target;
            console.log("clicked",target)
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
                console.log("music player control")
                let buttonstate = document.querySelector(".vjs-play-control");
                let title = buttonstate.getAttribute("title");
                console.log("current play button title", title)
                if(title=="Play"){
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
                //app.setCurrentMusicState("piano")
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

        document.getElementById("sheetMusicToggle").addEventListener("change", function(e){
            let val = e.target.checked;

            app.sheetMusicActive = val;

            if(val==true){
                app.showPdfViewer(true);
               
                
            } else {
                app.showPdfViewer(false);
               
            }
            app.storage.setItem("sheetMusicActive", val);
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
                let tar = document.querySelector("#hymns");
                if(tar.classList.contains("showFontSizer")){
                    tar.classList.remove("showFontSizer")
                } else {
                    tar.classList.add("showFontSizer")
                }
            
              
            })
        })

        document.querySelectorAll(".fontSizer").forEach(function(el){
            el.addEventListener("click", function(e){
                e.preventDefault();
                let togglerIcon = document.querySelector(".fontSizeToggle");
                let tar = document.querySelector("#hymns");
                if(tar.classList.contains("showFontSizer")){
                    tar.classList.remove("showFontSizer");
                    togglerIcon.classList.remove("active"); 
                } else {
                    tar.classList.add("showFontSizer")
                }
            
              
            })
        })
        
        
        document.querySelector("#fontSlider").addEventListener("change", function(e){
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
        app.getHymnText();
        app.changePage("hymns");
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
                title = parseInt(title.substring(0, title.indexOf(")")));
    
                startVal = title;
            
            } else {
                 // if we hardcode the hymn in the url, load it
                startVal = start;
            }
    
            app.currentHymn = startVal;
            
      },

      makeMusic:function(type, autoplay){
        
        console.group("Make music function");
        console.log("music type", type);
        console.log("autoplay", autoplay, app.autoplay);  
        console.log("current music type", app.currentMusicType);
        console.log("app.isPlaying", app.isPlaying);
        console.groupEnd();
        

        
        app.toggleScripturalReference(true);

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
                document.querySelector(".musicPlayer").classList.add("active");

                source.setAttribute("src", sourcePath);

                if(app.musicPlayer){

                    app.musicPlayer.pause();
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
                        console.log("music has ended",e)
                
                        if(app.autoplay==true){
    
                            window.setTimeout(function(){
                            app.playNext();
                                
                            }, 1000)
                           
                           
                        } 
                    });
                }

                app.musicPlayer.src({type: 'audio/mp3', src: sourcePath});

               
                app.musicPlayer.on('play',()=>{
                    console.log("playing")
                    const playerWrapper = document.querySelector(".video-js");
                    const musicWrapper = document.querySelector(".musicPlayer");
                    playerWrapper.setAttribute("data-playing", "true");
                    musicWrapper.setAttribute("data-playing", "true");

                });
                app.musicPlayer.on('pause',()=>{
                    console.log("pause")
                    const playerWrapper = document.querySelector(".video-js");
                    const musicWrapper = document.querySelector(".musicPlayer");
                    playerWrapper.setAttribute("data-playing", "false");
                    musicWrapper.setAttribute("data-playing", "false");
                });
                app.musicPlayer.ready(function() {

                    // add logic to know if we should auto play
                });

                if(autoPlayVal==true){
                    app.musicPlayer.play();
       
                  
                }
   
              
            }
        } else {
           // future functionality

            
            
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
  