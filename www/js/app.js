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
  
  const copyrightEnglishBackup = `
  <html>
<body>
  <button class="btn btn-default closeCopyright">X</button>

  <div class="en pg de es">
    <ul class="tabs">
      <li class="current"><a href="#" class="" data-id="app">About App</a></li>
      <li><a href="#" class="" data-id="ucg">About UCG</a></li>
      <li><a href="#" class="" data-id="copyright">Copyrights</a></li>
    </ul>
    <div class="tabContents">
    <div class="app current">
      <h1>Hymnal</h1>
    <p> <em><strong>Praise  the  LORD!  For  it  is  good  to  sing  praises  to  our  God; for  it  is  pleasant,  and  praise  is  beautiful. - Psalm  147:1</strong></em></p>
    <p>Singing  has  been  an  integral  part  of  godly  worship  through  the ages—from the angels singing at the creation of the earth (Job 38:7), to  the  children  of  Israel  singing  praise  to God  for  deliverance  from the  Egyptian  army  (Exodus  15),  to  brethren  in  the New  Testament 
      being  instructed  to  sing  and  make  melody  to  God  in  their  hearts 
    (Ephesians 5:19). God wants us to delight in singing His praises.</p>
    <p> The book of Revelation reveals singing will continue to be a vital part 
      of worship in the coming Kingdom of God. Revelation 14:3 and 15:3 
      describe the saints singing a new song, as well as the song of Moses 
      and the song of the Lamb.</p>
    <p>Today  this  tradition  of  singing  continues  as  we  fulfill  God’s 
      instruction  by  devoting  a  significant  portion  of  our  services  to 
      collectively  sing  praise  to  Him.  Inspiring  lyrics  remind  us  of  the 
      magnificent truths of His Word. Through singing hymns we have an 
      opportunity  to  musically  express  our  deepest  emotions  of  grateful 
      appreciation  to  God  for  His  plan  of  salvation  for  us  and  all  of 
      humanity.  Because  of  the  magnitude  of  His  wonderful  work  and 
      incredible  love,  God  deserves  our  deepest  love,  honor  and  respect 
      through praise.</p>
    <p>Colossians 3:16 instructs us to sing “psalms and hymns and spiritual 
      songs” to God with thankful hearts. As you will note in the table of 
      contents, this hymnal has been organized with this scripture in mind. 
    May we use this hymnal to fulfill God’s instruction: “I will praise the LORD with my whole heart, in the assembly of the upright and in the congregation&quot; (Psalm 111:1) and &quot;I will sing to the LORD as long as I live; I will sings praise to my God while I have my being&quot; (Psalm 104:33).</p>
    <p>&nbsp;</p>
    </div>
    <div class="ucg">
    <h1>About the United Church of God</h1>
    <h2>Who We Are</h2>
    <p>This hymnal app is published by the United Church of God, <em>an International Association</em> , which has ministers and local congregations in the United States and many countries around the world. We trace our origins to the Church that Jesus founded in the early first century. We follow the same teachings, doctrines and practices established then. Our commission is to proclaim the gospel of the coming Kingdom of God to all the world as a witness and teach all nations to observe what Christ commanded. If you would like to know more about the United Church of God please visit our website at <a href="http://www.ucg.org">www.ucg.org</a> .</p>
    <h2>Personal Counsel Available</h2>
    <p>Jesus commanded His followers to feed His sheep. To fulfill this command, the United Church of God has congregations around the world. In these congregations believers assemble on the Saturday Sabbath and biblical Holy Days to be instructed from the Scriptures and to fellowship. The United Church of God is committed to understanding and practicing New Testament Christianity. We desire to share God's way of life with those who earnestly seek to worship and follow our Savior, Jesus Christ. Our ministers are available to counsel, answer questions and explain the Bible.</p>
    <p>If you would like to contact a minister or visit one of our congregations, you can <a href="http://www.ucg.org/congregations/all">view all UCG congregations</a> , <a href="http://www.ucg.org/find-congregation">search by zip code</a> or send an email to <a href="mailto:info@ucg.org">info@ucg.org</a> for the congregation nearest you. If you would like to call, please refer to the <a href="http://www.ucg.org/contact/">contact</a> page at ucg.org for our phone numbers.</p>
    <p><strong>Mailing address: </strong>United Church of God, <em>an International
    Association</em>, PO Box 541027, Cincinnati, OH 45254</p>
    <p><strong>For additional information:</strong> Visit our Web site <a href="http://www.ucg.org">www.ucg.org</a> to
      download or request any of our publications, including issues of <em>The Good
      News</em>, dozens of free Bible study aid booklets, Beyond Today programs
    and much more.</p>
    <p>&nbsp;</p>
    <hr />
    </div>
    <div class="copyright">
    <h1>Copyright Acknowledgments</h1>
    <p>Babcock,  Sharon  Treybig.  Used  by  permission:  Selection  116                                    <br>
      Bowles,  Jonathan.  Used  by  permission:  Selection  156                                      <br>
      Breitkopf  &amp;  Härtel,  Walkmühlstrasse  52,  65195    Wiesbaden,  Germany:  Selection  171<br>
      Cokesbury,  c/o  The  Copyright  Company,  P.O.  Box  128139,  Nashville,  TN  37212  8139:  Selection  115<br>
      Delamater,  Scott.  Used  by  permission:  Selection  114                                                <br>
      E.  C.  Schirmer  Company,  c/o  ECS  Publishing,  138    Ipswich  St.,  Boston,  MA  02215:  Selection  136<br>
      Ford,  Kevin.  Used  by  permission:  Selections  159,  161                                                        <br>
      Fred  Bock  Music  Company,  P.O.  Box  570567,  Tarzana,  CA  91357:  Selection  133<br>
      Graham,  Mark.,  P.O.  Box  770261,  Cleveland,  OH  44107.  Used  by  permission:                Selections  2,  7,  53,  73,  75,  96,  99,  109,  112,  123,  135,  146,  148,  158,  160,  167,  174,  191<br>
      Hammett,  Thomas.  ©Thomas  Hammett,  5603  Cold  Springs  Rd.,  Hixson,  TN  37343.Used  by  permission:  Selection  165                                                        <br>
      Hoover,  David  E.  Used  by  permission:  Selections  16,  187Hope  Publishing  Company,  380  S.  Main  Place,  Carol  Stream,  IL  60188:  Selection  147        <br>
      Hoyer,  Gerald  E.  Used  by  permission:  Selections  149,  154,  174<br>
      Johnson,  Janel.  Used  by  permission:  Selections  164,  184                                                <br>
      Jutsum,  Ross  F.,  State  of  the  Heart  Productions,  P.O.  Box  56,  Sierra  Madre,  CA  91204.Used  by  permission:  Selections  59,  98,  104,  105,  108,  132,  150,  157,  163,  190        <br>
      King,  Sonia  J.  Used  by  permission:  Selections  134,  143<br>
      Manna  Music,  c/o  Manna  Music,  Inc.,  P.O.  Box  218,  Pacific  City,  OR  97135:  Selection  129<br>
      Maranatha  Music,  c/o  Music  Services,  1526  Otter  Creek  Rd.,  Nashville,  TN  37212  8139:    Selections  100,  121<br>
      McKinney  Music,  c/o  Genevox  Music  Group,  127  Ninth  Ave.  N.,  Nashville,  TN  37234: Selection:  186<br>
      Miller,  Terry.  Used  by  permission:  Selection  181<br>
      Mirigian,  David.  Used  by  permission:  Selections  69,  89<br>
      Myrick,  Ruth.  Used  by  permission:  Selections  142,  168,  176<br>
      Philp,  Mary  Beth.  ©Mary  Beth  Philp.  Used  by  permission:  Selections  111,  120,  153,  177,  179<br>
      Ranew,  Jason.  Used  by  permission:  Selection  142<br>
      Rigdon,  Becky.  ©Becky  Rigdon.  Used  by  permission:  Selections  172,  182,  189<br>
      Seifert,  Dottie.  Used  by  permission:  Selections  94,  107<br>
      Shemet,  Paul  R.  Used  by  permission:  Selection  170<br>
      Singspiration  Music,  c/o  Brentwood  Benson  Music  Publishing,  Inc.,  741  Cool  Springs  Blvd.,  Franklin,  TN  36067:  Selections  124,  127<br>
      Tannert,  Ann.  Used  by  permission:  Selections  22,  62,  67,  69,  86,  88,  116,  122,  141,  152,  155,  166<br>
    The  Hymn  Society  in  the  U.S.  and  Canada,  c/o  Hope  Publishing  Company,  380  S.  Main  Place,  Carol  Stream,      IL  60188:  Selection  183</p>
    <p>Extensive  effort  has  been  made  to  locate  the  owners  of  copyrighted  material  used  in  this  hymnal app. Upon  notification,  the  publisher  will  make  proper  correction  in  subsequent  app updates.</p>
    </div>
    </div>
</div>
<div class="fr">
   <ul class="tabs">
      <li class="current"><a href="#" class="" data-id="app">À propos de Cantiques EDU</a></li>
      <li><a href="#" class="" data-id="ucg">À propos de l’Église de Dieu Unie</a></li>
      <li><a href="#" class="" data-id="copyright">Remerciements et droits d’auteurs</a></li>
    </ul>
   <div class="tabContents">
    <div class="app current">
      <h1>À propos de Cantiques EDU</h1>
      « Louez l’Éternel ! Car il est beau de célébrer notre Dieu ; Car il est doux, il est bienséant de le louer. » Psaumes 147 : 1<br /><br />
Le chant a toujours fait partie intégrale de l’adoration de Dieu à travers les âges — depuis la création de la Terre lorsque les anges éclatèrent en chants d’allégresse (Job 38 : 7), jusqu’aux enfants d’Israël qui élevèrent des chants de louanges vers Dieu lorsqu’Il les délivra de l’armée Égyptienne. Les frères du Nouveau Testament furent également instruits de chanter et de célébrer de tout leur cœur les louanges de Dieu (Éphésiens 5 : 19). Dieu désire que nous prenions plaisir à chanter Ses louanges. <br /><br />
Le livre de L’Apocalypse révèle que le chant fera encore partie intégrale de l’adoration dans le Royaume de Dieu à venir. Apocalypse 14 : 3 et 15 : 3 décrit les saints en train de chanter un cantique nouveau, ainsi que le cantique de Moïse et celui de l’Agneau. <br /><br />
De nos jours, cette tradition continue alors que nous mettons en pratique les instructions divines en consacrant une partie importante de nos assemblées sabbatiques à chanter ensemble Ses louanges. Les paroles inspirantes nous rappellent les magnifiques vérités contenues dans Sa Parole. En chantant des cantiques, nous avons la chance d’exprimer en musique nos émotions de gratitude et de reconnaissance les plus profondes envers Dieu pour Son plan de salut pour nous et l’humanité entière.  À cause de la grandeur de Ses œuvres magnifiques et de Son amour incroyable, Dieu mérite que nous lui démontrions notre amour, notre honneur et notre respect les plus profonds par des chants de louange. <br /><br />
Colossiens 3 : 16 nous instruit de nous exhorter « les uns les autres ... par des hymnes et des cantiques spirituels, chantant à Dieu » d’un cœur reconnaissant. Comme vous pouvez le remarquer, la table des matières de ce livre de cantiques a été organisée en tenant compte des instructions données dans ce passage. <br /><br />
Utilisons donc cette application de cantiques dans le but d’accomplir les instructions divines : « Louez l’Éternel   Je louerai l’Éternel de tout mon cœur, dans la réunion des hommes droits et dans l’assemblée. » (Psaumes 111 : 1) et « Je chanterai l’Éternel tant que je vivrai, Je célèbrerai mon Dieu tant que j’existerai. » (Psaumes 104 : 33)<br /><br />
Nous remercions M. Jean-Paul Gorisse qui a fait toute la retranscription musicale, ainsi que son équipe de volontaires, pour les nombreuses heures passées à coordonner la traduction en langue française de tous ces cantiques.

    </div>
    <div class="ucg">
      <h1>À propos de l’Église de Dieu Unie</h1>
      Qui sommes-nous ?<br /><br />
Cette application de cantiques est publiée par l’Église de Dieu Unie, une association internationale, qui compte des ministres et des assemblées locales aux États-Unis et dans de nombreux pays du monde. Nos origines remontent à l'Église que Jésus a fondée au début du premier siècle. Nous suivons les mêmes enseignements, doctrines et pratiques établis à l’époque. Notre mission est de proclamer l’Évangile du Royaume de Dieu à venir au monde entier en tant que témoignage et d’enseigner à toutes les nations à observer ce que le Christ a ordonné. Si vous souhaitez en savoir plus sur l’Église de Dieu Unie, veuillez consulter notre site web à l’adresse : www.eglisededieuunie.fr <br /><br />

Conseil personnel disponible<br />
Jésus a ordonné à Ses disciples de faire paître Ses brebis. Pour accomplir ce commandement, l’Église de Dieu Unie a des congrégations dans le monde entier. Dans ces congrégations, les croyants se rassemblent le samedi, le jour du sabbat, et les jours saints bibliques pour recevoir des instructions des Écritures et pour fraterniser. L’Église de Dieu Unie s’engage à comprendre et à pratiquer le christianisme du Nouveau Testament. Nous désirons partager le mode de vie de Dieu avec ceux qui cherchent sincèrement à adorer et à suivre notre Sauveur, Jésus-Christ. Nos ministres sont disponibles pour conseiller, répondre aux questions et expliquer la Bible.<br /><br />
Si vous souhaitez contacter un ministre ou visiter l’une de nos assemblées, vous pouvez consulter toutes les assemblées d’EDU, faire une recherche par code postal ou envoyer un courriel à info@edu-france.fr pour trouver l’assemblée la plus proche de chez vous. Si vous souhaitez nous contacter par téléphone, veuillez vous référer aux pages des assemblées.
Adresse postale : <br /><br />
Église de Dieu Unie, France<br />
24 avenue Descartes<br />
33160 Saint-Médard-en-Jalles<br />
FRANCE<br />
Pour plus d’informations : Visitez notre site web des publications www.pourlavenir.org pour télécharger ou demander l’une de nos publications, y compris les numéros de Pour l’Avenir, des dizaines de brochures gratuites pour vous aider dans l’étude de la Bible, et bien plus encore.



    </div>
    <div class="copyright">
      <h1>Remerciements et droits d’auteurs</h1>
      Babcock, Sharon Treybig. Utilisée avec permission : Sélection 116, Jonathan. Utilisée avec permission : Sélection 156<br />
Breitkopf & Hartel, Walkmuhlstrasse 52, 65195 Wiesbaden, Germany : Sélection 171
Cokesbury, c/o The Copyright Company, P.O. Box 128139, Nashville, TN 37212-8139 : Sélection 115
Delamater, Scott. Utilisée avec permission : Sélection 114
E. C. Schirmer Company, c/o ECS Publishing, 138 Ipswich St., Boston, MA 02215 : Sélection 136
Ford, Kevin. Utilisées avec permission : Sélections 159, 161
Fred Bock Music Company, P.O. Box 570567, Tarzana, CA 91357 : Sélection 133
Graham, Mark, P.O. Box 770261, Cleveland, OH 44107. Utilisées avec permission : Sélections 2, 7, 53, 73, 75, 96, 99, 109, 112, 123, 135,146, 148, 158, 160, 167, 174, 191
Hammett, Thomas. ©Thomas Hammett, 5603 Cold Springs Rd., Hixson, TN 37343. Utilisée avec permission : Sélection 165<br />
Hoover, David E. Utilisées avec permission : Sélections 16, 187
Hope Publishing Company, 380 S. Main Place, Carol Stream, IL 60188 ; Sélection : 147
Hoyer, Gerald E. Utilisées avec permission : Sélections 149, 154, 174
Johnson, Janel. Utilisées avec permission : Sélections 164, 184
Johnson, Paula Marler. Utilisée avec permission : Sélection 171
Jutsum, Ross F., State of the Heart Productions, P.O. Box 56, Sierra Madre, CA 91204 Utilisées avec permission : Sélections 59, 98, 104, 105, 108, 132, 150, 157, 163, 190
King, Sonia J. Utilisées avec permission : Sélections 134, 143
Manna Music, c/o Manna Music, Inc., P.O. Box 218, Pacific City, OR 97135 : Sélection 129
Maranatha Music, c/o Music Services, 1526 Otter Creek Rd., Nashville, TN 37212-8139 : Sélections 100, 121<br />
McKinney Music, c/o Genevox Music Group, 127 Ninth Ave. N., Nashville, TN 37234 : Sélection 186
Miller, Terry. Utilisée avec permission : Sélection 181
Mirigian, David. Utilisées avec permission : Sélections 69, 89
Myrick, Ruth. Utilisées avec permission : Sélections 168, 176
Philp, Mary Beth. ©Mary Beth Philp. Utilisées avec permission : Sélections 111, 120,153,177, 179<br />
Ranew, Jason. Utilisée avec permission : Sélection 142
Rigdon, Becky. ©Becky Rigdon. Utilisées avec permission : Sélections 172, 182, 189
Seifert, Dottie. Utilisées avec permission : Sélections 94, 107
Shemet, Paul R. Utilisée avec permission : Sélection 170
Singspiration Music, c/o Brentwood-Benson Music Publishing, Inc., 741 Cool Springs Blvd. Franklin, TN 36067 : Sélections 124, 127<br />
Tannert, Ann. Utilisées avec permission : Sélections 22, 62, 67, 69, 86, 88, 116, 122, 141, 152, 155, 166<br />
The Hymn Society in the U.S. and Canada, c/o Hope Publishing Company, 380 S. Main Place, Carol Stream, IL 60188 : Sélection 183<br />
Toutes les références bibliques sont tirées de la version Louis Segond Nouvelle Edition de Genève, © 1979 Société Biblique de Genève.<br />
De grands efforts ont été déployés afin de trouver les propriétaires des pièces de musique à droit d’auteur utilisées dans cet ouvrage. Lorsqu’il en recevra notice, l’éditeur apportera les changements nécessaires lors des mises à jour ultérieures. La traduction de tous les cantiques anglaise en français fut collective et gratuite, mais elle fut principalement coordonnée par Jean-Paul Gorisse, et est utilisée avec la permission des traducteurs.

    </div>
    </div>
</div>
<!--
<div class="pg">
   <ul class="tabs">
      <li><a href="#" class="" data-id="app">About App</a></li>
      <li><a href="#" class="" data-id="ucg">About UCG</a></li>
      <li><a href="#" class="" data-id="copyright">Copyrights</a></li>
    </ul>
    <h1>About [Portugese]</h1>

</div>
<div class="es">
   <ul class="tabs">
      <li><a href="#" class="" data-id="app">About App</a></li>
      <li><a href="#" class="" data-id="ucg">About UCG</a></li>
      <li><a href="#" class="" data-id="copyright">Copyrights</a></li>
    </ul>
    <h1>Sobre de Himnario</h1>

</div>
<div class="de">
   <ul class="tabs">
      <li><a href="#" class="" data-id="app">About App</a></li>
      <li><a href="#" class="" data-id="ucg">About UCG</a></li>
      <li><a href="#" class="" data-id="copyright">Copyrights</a></li>
    </ul>
    <h1>About [German]</h1>

</div>
-->

</body>
</html>`;


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
      storage: null,
      sheetMusicEnabled: false,
      sheetMusicActive: false,
      currentSearchFilter: "",
      currentTitles: [],
      musicPlayer: null,
      musicOpen: false,
      currentMusicType: "piano",
      init: function(){
            app.getConfig();
            app.eventBindings();
            app.loadCurrentLang(true);
            app.getPageSizing();
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
      changePage: function(id){
        document.querySelectorAll(".page.wrapper").forEach(function(page){
            page.classList.remove("active");
        })

        document.querySelector("#" + id).classList.add("active");
        // more logic
        document.querySelector(".mainContent").setAttribute("data-page-show", id)
        


        if(id=="number"){
            window.setTimeout(function(){
                document.getElementById("searchByNumber").focus();
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

      },
      changeStorage:function(key,val){
          app.storage.setItem(key, val);
      },
      getTitle: function(){
          let currentLang = app.lang;
          let currentTitle = "Hymnal";
          let searchTitle = "Search";
          let hymnTitle = "Hymn Number";
          let langObj = 'menu_' + currentLang;
          if(window[langObj]){
              currentTitle = window[langObj].Hymnal;
              searchTitle = window[langObj]["Search By Title"];
              hymnTitle = window[langObj]["Search By Number"];
          }
          
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
      getHymnText: function(){
        let result;
        let target = document.getElementById("loader");
        let pdfTarget = document.getElementById("pdfloader");
       
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
        if(window['lyrics_' + app.lang]){
            result = window['lyrics_' + app.lang][file];

            if(result==null || typeof result == "undefined"){

                result = `<p>Cannot find hymn # ${app.currentHymn}</p>`;
            } 
            target.innerHTML = result;
            document.querySelector(".page#hymns .contentMain").scrollTo(0,0);

            
        }

        // if music is playing, stop it
        if(app.musicPlayer)
            app.musicPlayer.pause()

        
        document.querySelectorAll(".hymnFooter .musicType").forEach(function(elem){
            elem.classList.remove("active");
        });
       
        /*if(app.musicOpen){
            document.querySelector(".musicPlayer").classList.add("active");
        } else {
            document.querySelector(".musicPlayer").classList.remove("active");
        }
        */
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
        
        let browserLang = navigator.language;
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
        console.log(langValue, "langValue")
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
            menu.classList.remove("show")
        } else {
            button.classList.add("collapsed")
            menu.classList.add("show")
        }
      },
      setMusicOptions: function(){
        
        const bodyTag = document.querySelector("body");
        const vocal_version_toggle = document.getElementById("vocal_version_toggle");

        if(app.lang=="en"){
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
      makeCopyrightTabs: function(){
       
        
        document.querySelectorAll("#loadCopyright .tabs li a").forEach(elem=>{
            elem.addEventListener("click", function(e){

                e.target.closest("ul").querySelectorAll("li a").forEach(element=>{
                    element.classList.remove("active")
                })
                e.target.classList.add("active");
                let tarId = e.target.getAttribute("data-id");
                document.querySelectorAll(`.tabContents>div`).forEach(element=>{
                    element.classList.remove("active");
                })
                document.querySelectorAll(`.tabContents>div.${tarId}`).forEach(element=>{
                    element.classList.add("active");

                })
            });
        })
        document.querySelector("#loadCopyright .tabs>li:nth-child(1) a").click()
        
        // now make dropdown
        let select= document.createElement("select");
        select.classList.add("form-control");
        select.classList.add("tab-alt");
        select.classList.add("form-select");
        document.querySelectorAll(`#loadCopyright .${app.lang} .tabs li a`).forEach(function(tab){
            let id = tab.getAttribute("data-id");
            let text = tab.innerHTML;
            let option = document.createElement("option");
            option.value=id;
            option.innerHTML = text;
            select.append(option);
        });
        let div = document.createElement("div");
        div.append(select)

        document.querySelector(`#loadCopyright .${app.lang} .tabs`).classList.add("p-2")
        document.querySelector(`#loadCopyright .${app.lang} .tabs`).innerHTML = div.innerHTML;
        document.querySelector(`#loadCopyright .${app.lang} .tabs .form-control`).addEventListener("change", function(e){
            
            let tarId = e.target.value;
            document.querySelectorAll(`.tabContents>div`).forEach(element=>{
                element.classList.remove("active");
            })
            document.querySelectorAll(`.tabContents>div.${tarId}`).forEach(element=>{
                element.classList.add("active");

            })
        })


      },
      setCurrentMusicState: function(type){
        //app.storage.setItem("music", type);
        app.currentMusicType = type;
        document.querySelectorAll(".musicType").forEach(function(elem){
            elem.classList.remove("active")
        })
        //document.querySelector(`#${type}Icon`).classList.add("active");
      },

      eventBindings: function(){

        document.getElementById("chooseLanguage").addEventListener("click", function(e){
            e.preventDefault();
            document.getElementById("langDropdown").classList.add("shown")
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
                console.log("should be active")
                
                bodyTag.classList.add("hasMusicOpen");
                
                musicPlayerWrapper.classList.add("active");
                hymnFooter.classList.add("musicOpen")
                thisbutton.classList.add("active");
            }

            let musicType = app.currentMusicType;
            
            if(originalState==false){
                app.makeMusic(musicType);
                app.setCurrentMusicState("piano")
            }
            
        });

        document.querySelector("#copyrightBtn").addEventListener("click", function(el){
            el.preventDefault();
            app.toggleHamburger();
            app.changePage("copyright");
                if(true){
                    //load it in!
                    fetch("about.html?about=true")
                    .then(resp=>{
                        if (!resp.ok) {
                            throw new Error('Network response was not ok');
                            //alert("ahh!")
                        }
                        return resp.text()
                    })
                    .then(data=>{

                        document.getElementById("loadCopyright").innerHTML = data;
                        app.makeCopyrightTabs();
                        document.getElementById("copyright").classList.add("loaded");

                    }).catch(error => {
                        // Handle the error
                        // get the english
                        console.warn('Fetch error, fallback loaded:', error);
                        const target = document.getElementById("loadCopyright");
                        target.innerHTML = copyrightEnglishBackup;
                        app.makeCopyrightTabs();
                        document.getElementById("copyright").classList.add("loaded");

                      });
                }
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
            app.makeMusic(currentType);
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


        document.querySelectorAll(".fontSizer").forEach(function(el){
            el.addEventListener("click", function(e){
                e.preventDefault();
                
                let tar = document.querySelector("#hymns");
                if(tar.classList.contains("showFontSizer")){
                    tar.classList.remove("showFontSizer")
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

      makeMusic:function(type){
        
        let audio = document.querySelector(".video-js");
        let source = audio.querySelector("source");
        let sourcePath = app.getHymnWithZeros(app.currentHymn) + ".mp3";
        if(type=="piano" || type=="vocal"){
            if(type=="vocal"){
                sourcePath = vocal_path + sourcePath;
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
                        "playbackRates": [0.6, 0.7, 0.8, 0.9, 1, 1.2, 1.3, 1.4, 1.5, 2],
                        controls: true,
                        autoplay: false,
                        preload: 'auto'
                    });
                }

                app.musicPlayer.src({type: 'audio/mp3', src: sourcePath});

                app.musicPlayer.on('play',()=>{

                    const playerWrapper = document.querySelector(".video-js");
                    playerWrapper.setAttribute("data-playing", "true");
                });
                app.musicPlayer.on('pause',()=>{

                    const playerWrapper = document.querySelector(".video-js");
                    playerWrapper.setAttribute("data-playing", "false");
                });
                app.musicPlayer.ready(function() {

                    // add logic to know if we should auto play
                    //app.musicPlayer.play();\
                    // in the future, add shuffle controls
                    //app.addShuffleControls();
                });
   
              
            }
        } else {
           // future functionality

            
            
        }

      },
      addShuffleControls: function(){
        const controlBar = document.querySelector(".musicPlayer .video-js .vjs-control-bar");
        let shufflestring = `
        
      `;

      const temp = document.createElement('div');
      temp.classList.add("playlist-controls")
        temp.innerHTML = shufflestring;

      //controlBar.appendChild(temp);
        
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
  