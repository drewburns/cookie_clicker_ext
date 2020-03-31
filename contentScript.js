(function() {
  const url = window.location.toString();
  if (url.includes("google.com/")) {
    // dont run on google 
    return;
  }
  var attemptCount = 0;
  var interval = setInterval(function() {
    // get elem
    cookieDivs = $('div:contains("use cookies")');
    if (attemptCount > 20) {
      console.log("No cookie accept found.");
      clearInterval(interval);
    }
    if (cookieDivs.length === 0) {
      attemptCount += 1;
      return;
    }
    clearInterval(interval);
    allOptions = $.merge(
      $.merge(
        cookieDivs.find('button[id*="accept"]'),
        $.merge(
          cookieDivs.find('button[class*="accept"]'),
          cookieDivs.find(
            'button:contains("Accept"), button:contains("Ok"), button:contains("OK") '
          )
        )
      ),
      $.merge(
        cookieDivs.find('a[id*="accept"]'),
        $.merge(
          cookieDivs.find('a[class*="accept"]'),
          cookieDivs.find(
            'a:contains("Accept"), a:contains("Ok"), a:contains("OK")'
          )
        )
      )
    );

    jQuery.each(allOptions, (i, el) => {
      el.click();
    });
    jQuery.each(cookieDivs, (i, el) => {
      try {
        el.hide();
      } catch (err) {
      }
    });
    if (allOptions.length > 0) {
      // set cookieCount
      chrome.storage.sync.get(["cookieList"], function(items) {
        let current_site = domain_from_url(url)
        let isEmpty = Object.keys(items).length === 0 && items.constructor === Object
        let newValue = isEmpty ? [current_site] : items["cookieList"].concat(current_site)
        chrome.storage.sync.set({ "cookieList": newValue }, function() {
          // saved
          // console.log("Cookie List: ", newValue);
        });
      });


    }
  }, 50);
})();

function domain_from_url(url) {
  var result
  var match
  if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
      result = match[1]
      if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
          result = match[1]
      }
  }
  return result
}

// const url = window.location.toString();

//   if (url.includes("student.studentadmin.uconn.edu/psc/CSPR/EMPLOYEE/HRMS/c")) {
//     // content page
//     mainBody = document.getElementsByTagName("body")[0];
//     newHeader = document.createElement("div");
//     newHeader.innerHTML =
//       "<!-- <div style=\"height:50px;width:100%;background-color:blue;color:white;\"> <div style='margin-right:10px;'> <a style='color:white;text-decoration: none;' href='https://student.studentadmin.uconn.edu/psp/CSPR/EMPLOYEE/HRMS/h/?tab=DEFAULT'> <h1>Home</h1> </a> </div></div>--><head> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> <style>*{box-sizing: border-box; font-family: sans-serif;}h2{color: black; text-align: center; margin-top: 10px; /* font-size: 1vw; */ /* font-size: px; */}h3{color: white; text-align: center; margin-top: 13px; padding: 3px; /* font-size: 1vw; */ /* font-size: px; */}@media print{.no-print, .no-print *{display: none !important;}}h2{color: white;}/* Create three equal columns that floats next to each other */ .column{float: left; width: 33.33%; padding: 0px; /* margin-top:0px; */ height: 50px; background-color: #000b24; /* border: 1px black solid; */}.column:hover{background-color: #222e50;}.column2{float: left; width: 33.33%; padding: 0px; /* margin-top:0px; */ height: 80px; background-color: #000b24; /* border: 1px black solid; */}.column2:hover{background-color: #A6ABB9;}/* Clear floats after the columns */ .row:after{content: \"\"; display: table; clear: both;}.popover__title{font-size: 24px; /* line-height: 36px; */ text-decoration: none; color: rgb(228, 68, 68); text-align: center; /* padding: 15px 0; */}.popover__wrapper{position: relative; /* margin-top: 1.5rem; */ display: inline-block;}.popover__content{opacity: 0; /* width:300px; */ /* margin: 0 auto; */ visibility: hidden; position: absolute; /* left: -12%; */ transform: translate(0, 10px); background-color: #222e50; padding: 1.5rem; box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26); width: 100%;}.popover__content:before{position: absolute; z-index: -1; content: \"\"; right: calc(50% - 10px); top: -8px; border-style: solid; border-width: 0 10px 10px 10px; border-color: transparent transparent #bfbfbf transparent; transition-duration: 0.3s; transition-property: transform;}.popover__wrapper:hover .popover__content{z-index: 10; opacity: 1; visibility: visible; transform: translate(0, -8px); transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);}.popover__message{text-align: center;}</style></head><body> <div class=\"row no-print\"> <a href='https://student.studentadmin.uconn.edu/psp/CSPR/EMPLOYEE/HRMS/h/?tab=DEFAULT' id='quick-links'> <div class=\"column\" style='border-right: 1px #A3A7A3 solid;'> <h2>Back to Dashboard</h2> </div></a> <div class=\"popover__wrapper column\" style='border-right: 1px #A3A7A3 solid;'> <div class=\"\"> <h2 class=\"\">Quick Jump</h2> <div class=\"popover__content\" style='z-index:999'> <div class=\"row\"> <a href='https://student.studentadmin.uconn.edu/psc/CSPR/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_GRADE.GBL?Page=SSR_SSENRL_GRADE&Action=A&TargetFrameName=None'> <div class=\"column2\" style='border-right: 1px #A3A7A3 solid;border-bottom: 1px #A3A7A3 solid;'> <h3 class='link'>Grades</h3> </div></a> <a target=\"_blank\" href='https://payplan.uconn.edu/C21646_tsa/web/caslogin.jsp'> <div class=\"column2\" style='border-right: 1px #A3A7A3 solid;border-bottom: 1px #A3A7A3 solid;'> <h3 class='link'>Pay Bill</h3> </div></a> <a href='https://student.studentadmin.uconn.edu/psc/CSPR/EMPLOYEE/HRMS/c/PRJCS_MENU.PRJCS_SCHD_STRT.GBL?Page=PRJCS_SCHD_STRT&Action=U&TargetFrameName=None'> <div class=\"column2\" style='border-bottom: 1px #A3A7A3 solid;'> <h3 class='link'>Schedule Builder</h3> </div></a> </div><div class=\"row\"> <a href='https://student.studentadmin.uconn.edu/psc/CSPR/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES_2.SSR_SSENRL_CART.GBL?Page=SSR_SSENRL_CART&Action=A&ACAD_CAREER=UGRD&EMPLID=2303741&INSTITUTION=UCONN&STRM=1203&TargetFrameName=None'> <div class=\"column2\" style='border-right: 1px #A3A7A3 solid;border-bottom: 1px #A3A7A3 solid;'> <h3 class='link'>Enroll</h3> </div></a> <a href='https://student.studentadmin.uconn.edu/psc/CSPR/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_SCHD_W.GBL?Page=SSR_SS_WEEK&Action=A&ACAD_CAREER=UGRD&AS_OF_DATE=2020-01-21&EMPLID=2303741&INSTITUTION=UCONN&STRM=1203&TargetFrameName=None'> <div class=\"column2\" style='border-right: 1px #A3A7A3 solid;border-bottom: 1px #A3A7A3 solid;'> <h3 class='link'>My Schedule</h3> </div></a> <a href='https://student.studentadmin.uconn.edu/psc/CSPR/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.UC_SS_TERM_BILL.GBL?Page=UC_SS_TERM_BILL&Action=U&TargetFrameName=None'> <div class=\"column2\" style='border-bottom: 1px #A3A7A3 solid;'> <h3 class='link'>View Bill</h3> </div></a> </div><div class=\"row\"> <a href='https://student.studentadmin.uconn.edu/psc/CSPR/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL?Page=SSR_CLSRCH_ENTRY&Action=U&ExactKeys=Y&TargetFrameName=None'> <div class=\"column2\" style='border-right: 1px #A3A7A3 solid;border-bottom: 1px #A3A7A3 solid;'> <h3 class='link'>Search Classes</h3> </div></a> <a href='https://student.studentadmin.uconn.edu/psc/CSPR/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_EXAM_L.GBL?Page=SSR_SSENRL_EXAM_L&Action=A&EMPLID=2303741&TargetFrameName=None'> <div class=\"column2\" style='border-right: 1px #A3A7A3 solid;border-bottom: 1px #A3A7A3 solid;'> <h3 class='link'>Finals Schedule</h3> </div></a> <a href='https://student.studentadmin.uconn.edu/psc/CSPR/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SS_AA_REPORT1.GBL?Page=SS_ES_AARPT_TYPE2&Action=A&TargetFrameName=None'> <div class=\"column2\" style='border-bottom: 1px #A3A7A3 solid;'> <h3 class='link'>Transcript</h3> </div></a> </div></div></div></div><a href='https://student.studentadmin.uconn.edu/psp/CSPR/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?1&FolderPath=PORTAL_ROOT_OBJECT.UC_SELF_SERVICE.UC_SS_STUDENT&IsFolder=false&IgnoreParamTempl=FolderPath%2cIsFolder'> <div class=\"column\"> <h2>Regular Home</h2> </div></a> </div></div>";
//     mainBody.prepend(newHeader);
//     // var script = document.createElement("script");
//     // script.type="text/javascript";
//     // script.innerHTML="\"use strict\";!function(){var t=window.driftt=window.drift=window.driftt||[];if(!t.init){if(t.invoked)return void(window.console&&console.error&&console.error(\"Drift snippet included twice.\"));t.invoked=!0,t.methods=[\"identify\",\"config\",\"track\",\"reset\",\"debug\",\"show\",\"ping\",\"page\",\"hide\",\"off\",\"on\"],t.factory=function(e){return function(){var n=Array.prototype.slice.call(arguments);return n.unshift(e),t.push(n),t}},t.methods.forEach(function(e){t[e]=t.factory(e)}),t.load=function(t){var e=3e5*Math.ceil(new Date\/3e5),n=document.createElement(\"script\");n.type=\"text\/javascript\",n.async=!0,n.crossorigin=\"anonymous\",n.src=\"https:\/\/js.driftt.com\/include\/\"+e+\"\/\"+t+\".js\";var r=document.getElementsByTagName(\"script\")[0];r.parentNode.insertBefore(n,r)}}}(),drift.SNIPPET_VERSION=\"0.3.1\",drift.load(\"r7zn542h46bb\");";
//     // document.getElementsByTagName('head')[0].appendChild(script);
//     if (
//       url ===
//       "https://student.studentadmin.uconn.edu/psc/CSPR/EMPLOYEE/HRMS/c/PRJCS_MENU.PRJCS_SCHD_STRT.GBL?Page=PRJCS_SCHD_STRT&Action=U&TargetFrameName=None"
//     ) {
//       launchButton = document.getElementById("PRJCS_DERIVED_PRJCS_LAUNCH_CS");
//       launchButton.click();
//     }
//   } else if (
//     url.includes(
//       "https://student.studentadmin.uconn.edu/psp/CSPR/EMPLOYEE/HRMS/c/"
//     )
//   ) {
//     mainBody = document.getElementsByTagName("body")[0];
//     newHeader = document.createElement("div");
//     newHeader.innerHTML =
//       "<!-- <div style=\"height:50px;width:100%;background-color:blue;color:white;\"> <div style='margin-right:10px;'> <a style='color:white;text-decoration: none;' href='https://student.studentadmin.uconn.edu/psp/CSPR/EMPLOYEE/HRMS/h/?tab=DEFAULT'> <h1>Home</h1> </a> </div></div>--><head> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> <style>*{box-sizing: border-box; font-family: sans-serif;}h2{color: black; text-align: center; margin-top: 10px; /* font-size: 1vw; */ /* font-size: px; */}h3{color: white; text-align: center; margin-top: 13px; padding: 3px; /* font-size: 1vw; */ /* font-size: px; */}@media print{.no-print, .no-print *{display: none !important;}}h2{color: white;}/* Create three equal columns that floats next to each other */ .column{float: left; width: 33.33%; padding: 0px; /* margin-top:0px; */ height: 50px; background-color: #000b24; /* border: 1px black solid; */}.column:hover{background-color: #222e50;}.column2{float: left; width: 33.33%; padding: 0px; /* margin-top:0px; */ height: 80px; background-color: #000b24; /* border: 1px black solid; */}.column2:hover{background-color: #A6ABB9;}/* Clear floats after the columns */ .row:after{content: \"\"; display: table; clear: both;}.popover__title{font-size: 24px; /* line-height: 36px; */ text-decoration: none; color: rgb(228, 68, 68); text-align: center; /* padding: 15px 0; */}.popover__wrapper{position: relative; /* margin-top: 1.5rem; */ display: inline-block;}.popover__content{opacity: 0; /* width:300px; */ /* margin: 0 auto; */ visibility: hidden; position: absolute; /* left: -12%; */ transform: translate(0, 10px); background-color: #222e50; padding: 1.5rem; box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26); width: 100%;}.popover__content:before{position: absolute; z-index: -1; content: \"\"; right: calc(50% - 10px); top: -8px; border-style: solid; border-width: 0 10px 10px 10px; border-color: transparent transparent #bfbfbf transparent; transition-duration: 0.3s; transition-property: transform;}.popover__wrapper:hover .popover__content{z-index: 10; opacity: 1; visibility: visible; transform: translate(0, -8px); transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);}.popover__message{text-align: center;}</style></head><body> <div class=\"row no-print\"> <a href='https://student.studentadmin.uconn.edu/psp/CSPR/EMPLOYEE/HRMS/h/?tab=DEFAULT' id='quick-links'> <div class=\"column\" style='border-right: 1px #A3A7A3 solid;'> <h2>Back to Dashboard</h2> </div></a> <div class=\"popover__wrapper column\" style='border-right: 1px #A3A7A3 solid;'> <div class=\"\"> <h2 class=\"\">Quick Jump</h2> <div class=\"popover__content\" style='z-index:999'> <div class=\"row\"> <a href='https://student.studentadmin.uconn.edu/psc/CSPR/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_GRADE.GBL?Page=SSR_SSENRL_GRADE&Action=A&TargetFrameName=None'> <div class=\"column2\" style='border-right: 1px #A3A7A3 solid;border-bottom: 1px #A3A7A3 solid;'> <h3 class='link'>Grades</h3> </div></a> <a target=\"_blank\" href='https://payplan.uconn.edu/C21646_tsa/web/caslogin.jsp'> <div class=\"column2\" style='border-right: 1px #A3A7A3 solid;border-bottom: 1px #A3A7A3 solid;'> <h3 class='link'>Pay Bill</h3> </div></a> <a href='https://student.studentadmin.uconn.edu/psc/CSPR/EMPLOYEE/HRMS/c/PRJCS_MENU.PRJCS_SCHD_STRT.GBL?Page=PRJCS_SCHD_STRT&Action=U&TargetFrameName=None'> <div class=\"column2\" style='border-bottom: 1px #A3A7A3 solid;'> <h3 class='link'>Schedule Builder</h3> </div></a> </div><div class=\"row\"> <a href='https://student.studentadmin.uconn.edu/psc/CSPR/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES_2.SSR_SSENRL_CART.GBL?Page=SSR_SSENRL_CART&Action=A&ACAD_CAREER=UGRD&EMPLID=2303741&INSTITUTION=UCONN&STRM=1203&TargetFrameName=None'> <div class=\"column2\" style='border-right: 1px #A3A7A3 solid;border-bottom: 1px #A3A7A3 solid;'> <h3 class='link'>Enroll</h3> </div></a> <a href='https://student.studentadmin.uconn.edu/psc/CSPR/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_SCHD_W.GBL?Page=SSR_SS_WEEK&Action=A&ACAD_CAREER=UGRD&AS_OF_DATE=2020-01-21&EMPLID=2303741&INSTITUTION=UCONN&STRM=1203&TargetFrameName=None'> <div class=\"column2\" style='border-right: 1px #A3A7A3 solid;border-bottom: 1px #A3A7A3 solid;'> <h3 class='link'>My Schedule</h3> </div></a> <a href='https://student.studentadmin.uconn.edu/psc/CSPR/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.UC_SS_TERM_BILL.GBL?Page=UC_SS_TERM_BILL&Action=U&TargetFrameName=None'> <div class=\"column2\" style='border-bottom: 1px #A3A7A3 solid;'> <h3 class='link'>View Bill</h3> </div></a> </div><div class=\"row\"> <a href='https://student.studentadmin.uconn.edu/psc/CSPR/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL?Page=SSR_CLSRCH_ENTRY&Action=U&ExactKeys=Y&TargetFrameName=None'> <div class=\"column2\" style='border-right: 1px #A3A7A3 solid;border-bottom: 1px #A3A7A3 solid;'> <h3 class='link'>Search Classes</h3> </div></a> <a href='https://student.studentadmin.uconn.edu/psc/CSPR/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSR_SSENRL_EXAM_L.GBL?Page=SSR_SSENRL_EXAM_L&Action=A&EMPLID=2303741&TargetFrameName=None'> <div class=\"column2\" style='border-right: 1px #A3A7A3 solid;border-bottom: 1px #A3A7A3 solid;'> <h3 class='link'>Finals Schedule</h3> </div></a> <a href='https://student.studentadmin.uconn.edu/psc/CSPR/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SS_AA_REPORT1.GBL?Page=SS_ES_AARPT_TYPE2&Action=A&TargetFrameName=None'> <div class=\"column2\" style='border-bottom: 1px #A3A7A3 solid;'> <h3 class='link'>Transcript</h3> </div></a> </div></div></div></div><a href='https://student.studentadmin.uconn.edu/psp/CSPR/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?1&FolderPath=PORTAL_ROOT_OBJECT.UC_SELF_SERVICE.UC_SS_STUDENT&IsFolder=false&IgnoreParamTempl=FolderPath%2cIsFolder'> <div class=\"column\"> <h2>Regular Home</h2> </div></a> </div></div>";
//     mainBody.prepend(newHeader);
//     navLinks = document.getElementById("pthdr2syslinks");
//     navLinks.style.marginTop = "50px";
//   } else {
//     // home page
//     x = document.getElementsByClassName("PT_RTE_DISPLAYONLY");
//     var mainContent = document.getElementById("ptpglts");
//     var oldHeader = document.getElementById("UCONN_STDNT_HEADER_TANGERINE");
//     oldHeader.style.display = "none";

//     mainContent.style.display = "none";
//     minHtml =
//       '<!DOCTYPE html><html><head> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> <style>\/* background: #111738 *\/ \/* light background: #222e50 *\/ \/* black text: #262626 *\/ \/* hover color: #A6ABB9 *\/ \/* topbar bg: #000b24 *\/ body{background-color: #222e50;}*{margin: 0 auto; box-sizing: border-box; font-family: sans-serif;}.link-titles{\/* color: black; *\/ text-align: center; padding-top: 20px; padding-bottom: 8px; font-size: 30px; \/* margin-top: -5px; *\/ margin: 0;}.social{height: 30px; padding-left: 10px; padding-right: 10px;}\/* Create three equal columns that floats next to each other *\/ .column{float: left; border-radius: 5px; width: 24%; \/* padding: 10px; *\/ margin: 0.5%; height: 140px; color: #262626; background-color: #ffffff;}#main-header{height: 50px; width: 100%; background-color: #000b24; padding: 0;}.column:hover{background-color: #A6ABB9; \/* color: white !important; *\/}\/* Clear floats after the columns *\/ .row:after{content: \"\"; display: table; clear: both;}#normal-menu{text-decoration: none;}#copy-link{color: red;}.icons{height: 50px; margin-top: 0px;}#button-holder{margin: 0 auto; width: 90%; background-color: #222e50; \/* text-align: center; *\/}.con-tooltip{position: relative; \/* background: #F2D1C9; *\/ \/* border-radius: 9px; *\/ \/* padding: 0 20px; *\/ \/* margin: 10px; *\/ display: inline-block; transition: all 0.3s ease-in-out; cursor: default;}\/*tooltip *\/ .tooltip{visibility: hidden; z-index: 1; opacity: .40; width: 230px; margin-top: -10px; padding: 0px 20px; background: #333; color: #E086D3; position: absolute; \/* top: -140%; *\/ \/* left: -25%; *\/ border-radius: 9px; font: 16px; transform: translateY(9px); transition: all 0.3s ease-in-out; box-shadow: 0 0 3px rgba(56, 54, 54, 0.86);}\/* tooltip after*\/ .tooltip::after{content: \" \"; width: 0; height: 0; border-style: solid; border-width: 12px 12.5px 0 12.5px; border-color: #333 transparent transparent transparent; position: absolute; left: 40%;}.con-tooltip:hover .tooltip{visibility: visible; transform: translateY(-10px); opacity: 1; transition: .3s linear; animation: odsoky 1s ease-in-out infinite alternate;}@keyframes odsoky{0%{transform: translateY(6px);}100%{transform: translateY(1px);}}\/*hover ToolTip*\/ .right:hover{transform: translateX(6px);}\/*right*\/ .right .tooltip{top: -20%; left: 115%;}.right .tooltip::after{top: 40%; left: -12%; transform: rotate(90deg);}.no-show{display: none;}\/* \/\/ main level *\/ .ac{\/* width: 500px; *\/ margin: auto; width: 60%; \/* border: 3px solid #73AD21; *\/ padding: 10px;}.ac-label{font-weight: 700; position: relative; padding: .5em 1em; margin-bottom: .5em; display: block; cursor: pointer; background-color: whiteSmoke; transition: background-color .15s ease-in-out;}.ac-input:checked+label, .ac-label:hover{background-color: #999;}.ac-label:after, .ac-input:checked+.ac-label:after{content: \"+\"; position: absolute; display: block; right: 0; top: 0; width: 2em; height: 100%; line-height: 2.25em; text-align: center; background-color: #e5e5e5; transition: background-color .15s ease-in-out;}.ac-label:hover:after, .ac-input:checked+.ac-label:after{background-color: #b5b5b5;}.ac-input:checked+.ac-label:after{content: \"-\";}.ac-input{display: none;}\/* \/\/ the magic *\/ .ac-text, .ac-sub-text{opacity: 0; height: 0; margin-bottom: .5em; transition: opacity .5s ease-in-out; overflow: hidden;}.ac-input:checked~.ac-text, .ac-sub .ac-input:checked~.ac-sub-text{opacity: 1; height: auto;}#header-title{color: white; margin-left: 15px; margin-top: 4px; \/* padding-top: 6px; *\/ display: inline-block;}#sign-out{float: right; color: white; margin-right: 15px; margin-top: 15px; \/* padding-top: 6px; *\/ display: inline-block;}#sa-message-holder{max-height: 100px; width: 60%; margin-top: 10px; margin-bottom: 10px; padding: 10px; border-radius: 10px; background: #A6ABB9; ;}#sa-messages{font-size: 12px;}<\/style><\/head><body> <div id=\'main-header\'> <h1 id=\'header-title\'>UCONN Student Administration System<\/h1> <a href=\"https:\/\/student.studentadmin.uconn.edu\/psp\/CSPR\/EMPLOYEE\/HRMS\/?cmd=logout\"> <h4 id=\'sign-out\'>Sign Out<\/h4> <\/a> <\/div><div id=\'button-holder\'> <div id=\'sa-message-holder\'> <p id=\'sa-messages\'>No Messages<\/p><\/div><div class=\"row\"> <a href=\'https:\/\/student.studentadmin.uconn.edu\/psc\/CSPR\/EMPLOYEE\/HRMS\/c\/SA_LEARNER_SERVICES.SSR_SSENRL_GRADE.GBL?Page=SSR_SSENRL_GRADE&Action=A&TargetFrameName=None\'> <div class=\"column\" \'> <h2 class=\' link-titles\'>Grades<\/h2> <h1 style=\' text-align: center;\'><img class=\'icons\' src=\"chrome-extension:\/\/nonjinggckfcdobgcojicademlhjaohk\/images\/grades-icon.png\" alt=\"\"> <\/h1> <\/div><\/a> <a href=\'https:\/\/student.studentadmin.uconn.edu\/psc\/CSPR\/EMPLOYEE\/HRMS\/c\/SA_LEARNER_SERVICES.SS_AA_REPORT1.GBL?Page=SS_ES_AARPT_TYPE2&Action=A&TargetFrameName=None\'> <div class=\"column\"> <h2 class=\'link-titles\'>Transcript<\/h2> <h1 style=\'text-align: center;\'><img class=\'icons\' src=\"chrome-extension:\/\/nonjinggckfcdobgcojicademlhjaohk\/images\/transcript-icon.png\" alt=\"\"> <\/h1> <\/div><\/a> <a target=\"_blank\" href=\'https:\/\/payplan.uconn.edu\/C21646_tsa\/web\/caslogin.jsp\'> <div class=\"column\"\'> <h2 class=\' link-titles\'>Pay Bill<\/h2> <h1 style=\' text-align: center;\'><img class=\'icons\' src=\"chrome-extension:\/\/nonjinggckfcdobgcojicademlhjaohk\/images\/paybill-icon.png\" alt=\"\"> <\/h1> <\/div><\/a> <a href=\'https:\/\/student.studentadmin.uconn.edu\/psc\/CSPR\/EMPLOYEE\/HRMS\/c\/SA_LEARNER_SERVICES.UC_SS_TERM_BILL.GBL?Page=UC_SS_TERM_BILL&Action=U&TargetFrameName=None\'> <div class=\"column\"> <h2 class=\'link-titles\'>View Bill<\/h2> <h1 style=\'text-align: center;\'><img class=\'icons\' src=\"chrome-extension:\/\/nonjinggckfcdobgcojicademlhjaohk\/images\/viewbill-icon.ico\" alt=\"\"> <\/h1> <\/div><\/a> <\/div><div class=\"row\"> <a href=\'https:\/\/student.studentadmin.uconn.edu\/psc\/CSPR\/EMPLOYEE\/HRMS\/c\/PRJCS_MENU.PRJCS_SCHD_STRT.GBL?Page=PRJCS_SCHD_STRT&Action=U&TargetFrameName=None\'> <div class=\"column\"> <h2 class=\'link-titles\'>Schedule Builder<\/h2> <h1 style=\'text-align: center;\'><img class=\'icons\' src=\"chrome-extension:\/\/nonjinggckfcdobgcojicademlhjaohk\/images\/builder-icon.png\" alt=\"\"> <\/h1> <\/div><\/a> <a href=\'https:\/\/student.studentadmin.uconn.edu\/psc\/CSPR\/EMPLOYEE\/HRMS\/c\/SA_LEARNER_SERVICES.SSS_MY_PLANNER.GBL?Page=SSS_MY_PLANNER&Action=A&ExactKeys=Y&TargetFrameName=None\'> <div class=\"column\"> <h2 class=\'link-titles\'>Academic Planner<\/h2> <h1 style=\'text-align: center;\'><img class=\'icons\' src=\"chrome-extension:\/\/nonjinggckfcdobgcojicademlhjaohk\/images\/process.png\" alt=\"\"> <\/h1> <\/div><\/a> <a href=\'https:\/\/student.studentadmin.uconn.edu\/psc\/CSPR\/EMPLOYEE\/HRMS\/c\/UC_CC_INQUIRE.UC_SR_CLS_SCH_SRCH.GBL?Page=UC_SR_CLS_SCH_SRCH&Action=C&TargetFrameName=None\'> <div class=\"column\"> <h2 class=\'link-titles\'>Dynamic Search<\/h2> <h1 style=\'text-align: center;\'><img class=\'icons\' src=\"chrome-extension:\/\/nonjinggckfcdobgcojicademlhjaohk\/images\/atom.png\" alt=\"\"> <\/h1> <\/div><\/a> <a href=\'https:\/\/student.studentadmin.uconn.edu\/psc\/CSPR\/EMPLOYEE\/HRMS\/c\/SA_LEARNER_SERVICES.CLASS_SEARCH.GBL?Page=SSR_CLSRCH_ENTRY&Action=U&ExactKeys=Y&TargetFrameName=None\'> <div class=\"column\"> <h2 class=\'link-titles\'>Search Classes<\/h2> <h1 style=\'text-align: center;\'><img class=\'icons\' src=\"chrome-extension:\/\/nonjinggckfcdobgcojicademlhjaohk\/images\/search-icon.png\" alt=\"\"> <\/h1> <\/div><\/a> <\/div><div class=\"row\"> <a href=\'https:\/\/student.studentadmin.uconn.edu\/psc\/CSPR\/EMPLOYEE\/HRMS\/c\/SA_LEARNER_SERVICES_2.SSR_SSENRL_CART.GBL?Page=SSR_SSENRL_CART&Action=A&ACAD_CAREER=UGRD&EMPLID=2303741&INSTITUTION=UCONN&STRM=1203&TargetFrameName=None\'> <div class=\"column\"> <h2 class=\'link-titles\'>Enroll<\/h2> <h1 style=\'text-align: center;\'><img class=\'icons\' src=\"chrome-extension:\/\/nonjinggckfcdobgcojicademlhjaohk\/images\/enroll-icon.png\" alt=\"\"> <\/h1> <\/div><\/a> <a href=\'https:\/\/student.studentadmin.uconn.edu\/psc\/CSPR\/EMPLOYEE\/HRMS\/c\/SA_LEARNER_SERVICES.SSR_SSENRL_SCHD_W.GBL?Page=SSR_SS_WEEK&Action=A&ACAD_CAREER=UGRD&AS_OF_DATE=2020-01-21&EMPLID=2303741&INSTITUTION=UCONN&STRM=1203&TargetFrameName=None\'> <div class=\"column\"> <h2 class=\'link-titles\'>My Schedule<\/h2> <h1 style=\'text-align: center;\'><img class=\'icons\' src=\"chrome-extension:\/\/nonjinggckfcdobgcojicademlhjaohk\/images\/schedule-icon.png\" alt=\"\"> <\/h1> <\/div><\/a> <a href=\'https:\/\/student.studentadmin.uconn.edu\/psc\/CSPR\/EMPLOYEE\/HRMS\/c\/SA_LEARNER_SERVICES.SSR_SSENRL_EXAM_L.GBL?Page=SSR_SSENRL_EXAM_L&Action=A&EMPLID=2303741&TargetFrameName=None\'> <div class=\"column\"> <h2 class=\'link-titles\'>Finals Schedule<\/h2> <h1 style=\'text-align: center;\'><img class=\'icons\' src=\"chrome-extension:\/\/nonjinggckfcdobgcojicademlhjaohk\/images\/exam-icon.svg\" alt=\"\"><\/h1> <\/div><\/a> <a href=\'https:\/\/student.studentadmin.uconn.edu\/psp\/CSPR\/EMPLOYEE\/HRMS\/c\/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?1&FolderPath=PORTAL_ROOT_OBJECT.UC_SELF_SERVICE.UC_SS_STUDENT&IsFolder=false&IgnoreParamTempl=FolderPath%2cIsFolder\'> <div class=\"column\"> <h2 class=\'link-titles\'>Regular Home<\/h2> <h1 style=\'text-align: center;\'><img class=\'icons\' src=\"chrome-extension:\/\/nonjinggckfcdobgcojicademlhjaohk\/images\/internet.png\" alt=\"\"> <\/h1> <\/div><\/a> <\/div><\/div><!-- <div class=\"ac\"> <input class=\"ac-input\" id=\"ac-1\" name=\"ac-1\" type=\"checkbox\"\/> <label class=\"ac-label\" for=\"ac-1\">SA Messages<\/label> <article class=\"ac-text\"> <p id=\'sa-messages\'>Loading...<\/p><\/article> <\/div>--><!-- <br><div style=\'text-align: center;\'> <a target=\"_blank\" href=\"http:\/\/aburns.me\"><img class=\'social\' src=\"chrome-extension:\/\/nonjinggckfcdobgcojicademlhjaohk\/images\/web-icon.png\" alt=\"\"><\/a> <a target=\"_blank\" href=\"mailto:andrew.burns@uconn.edu\"><img class=\'social\' src=\"chrome-extension:\/\/nonjinggckfcdobgcojicademlhjaohk\/images\/email-logo.png\" alt=\"\"><\/a> <div class=\"con-tooltip right\"> <a href=\"\" id=\'copy-link\'><img class=\'social\' src=\"chrome-extension:\/\/nonjinggckfcdobgcojicademlhjaohk\/images\/share-logo.png\" alt=\"\"><\/a> <div class=\"tooltip \"> <p style=\'letter-spacing: 0.5pt;\'>newstudentadmin.com.com<\/p><\/div><\/div><\/div>--> <h4 style=\'text-align: center; color:white;\'>Extension made with <span style=\"color: #e25555;\">&#9829;<\/span> in UConn by Andrew Burns and Tim Noto<\/h4> <h4 style=\'text-align: center; color:white;margin-top: 5px; margin-bottom: 5px;\'><a>Feedback: andrew.burns@uconn.edu<\/a> | Share: newstudentadmin.com<\/h4><\/body><\/html>';
//     // mainContent.outerHTML = minHtml;
//     mainBody = document.getElementsByTagName("body")[0];
//     mainBody.style.backgroundColor = "#222e50";

//     // stuffToHide = document.getElementsByTagName("table");
//     // if (stuffToHide) {
//     //   stuffToHide.style.display = "none";
//     // }
//     // console.log(document.getElementsByTagName('table')[9]);
//     newBody = document.createElement("div");
//     newBody.innerHTML = minHtml;
//     mainBody.appendChild(newBody);

//     var attemptCount = 0;
//     var interval = setInterval(function() {
//       // get elem
//       elems = document.getElementsByClassName("PT_RTE_DISPLAYONLY");
//       if (attemptCount > 75) {
//         clearInterval(interval);
//       }
//       if (elems.length === 0) {
//         attemptCount += 1;
//         return;
//       }
//       clearInterval(interval);

//       stuffToHide = document.getElementsByTagName("table")[9];
//       if (stuffToHide) {
//         stuffToHide.style.display = "none";
//       }
//       notificationElement = document.getElementsByClassName(
//         "PT_RTE_DISPLAYONLY"
//       )[0];
//       if (notificationElement) {
//         notifText = notificationElement.textContent.trim();
//         // console.log(notifText);
//         notifBox = document.getElementById("sa-messages");
//         if (notifBox) {
//           notifBox.textContent = notifText;
//         }
//       }
//     }, 50);
//   }