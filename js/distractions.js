contentArray = [];
function logEvent(eventType) {
    //czas
    var today = new Date(); 

    var time =      	      		     	 
    +today.getFullYear()
    +(today.getMonth() < 10 ? '0' : '')     	      		         
    +today.getMonth()
    +(today.getDate() < 10 ? '0' : '')     	      		         
    +today.getDate()
    +(today.getHours() < 10 ? '0' : '')     	      		         
    +today.getHours()
    +(today.getMinutes() < 10 ? '0' : '')     	      		       
    +today.getMinutes() 
    +(today.getSeconds() < 10 ? '0' : '')     	      		       
    +today.getSeconds()
    +(today.getMilliseconds() < 10 ? '00' : today.getMilliseconds() < 100 ? '0': '')
    +today.getMilliseconds();
  
    //var time = today.getFullYear().toString()+(("0" + (today.getMonth() + 1)).slice(-2))+(("0" + today.getDate()).slice(-2))+today.getHours()+ today.getMinutes()+ today.getSeconds()+today.getMilliseconds().toString().padEnd(3, "0");
    //tworzenie pliku
    content = time + "," + localStorage.getItem('questionNo') + eventType + ",none,none,none,none,none,none,none,none,none\n";    
    var existing = sessionStorage.getItem('contentArray');
    var data = existing ? existing + content: content;
    sessionStorage.setItem('contentArray', data);   

    //zapisywanie do pliku
        //var atag = document.createElement("a");
        //var file = new Blob([content], {type: 'text/plain'});
        //atag.href = URL.createObjectURL(file);
        //atag.download = "stymulacja.txt";
        //atag.click();
    //tworzenie kompletnego logu
    //contentArray.push(content);
    //console.log("contentArray.push(content);"+sessionStorage.getItem("contentArray"))
   // sessionStorage.setItem("contentArray", JSON.stringify(contentArray));
    //console.log("storedContentArray;"+sessionStorage.getItem("contentArray"))

}


function allPossibleCases(arr) {    
  if (arr.length == 1) {
    return arr[0];
  } else {
    var result = [];
    var allCasesOfRest = allPossibleCases(arr.slice(1));  // recur with the rest of array
    for (var i = 0; i < allCasesOfRest.length; i++) {
      for (var j = 0; j < arr[0].length; j++) {
        result.push([arr[0][j], allCasesOfRest[i]]);
      }
    }
    return result;
    //console.log(result);
  }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

$(document).ready(function() { 
    $('#check1').change(function() {
        this.checked ? $('.check1-form').removeClass('hidden') : $('.check1-form').addClass('hidden');
    });

    $('#check2').change(function() {
        this.checked ? $('.check2-form').removeClass('hidden') : $('.check2-form').addClass('hidden');
    });
    
    $('#check3').change(function() {
        this.checked ? $('.check3-form').removeClass('hidden') : $('.check3-form').addClass('hidden');
    });

    $('#check4').change(function() {
        this.checked ? $('.check4-form').removeClass('hidden') : $('.check4-form').addClass('hidden');
    });

    $('#check5').change(function() {
        this.checked ? $('.check5-form').removeClass('hidden') : $('.check5-form').addClass('hidden');
    });

    $('#check6').change(function() {
        this.checked ? $('.check6-form').removeClass('hidden') : $('.check6-form').addClass('hidden');
    });

    $('#check7').change(function() {
        this.checked ? $('.check7-form').removeClass('hidden') : $('.check7-form').addClass('hidden');
    });

    $('#check8').change(function() {
        this.checked ? $('.check8-form').removeClass('hidden') : $('.check8-form').addClass('hidden');
    });

    $('#check9').change(function() {
        this.checked ? $('.check9-form').removeClass('hidden') : $('.check9-form').addClass('hidden');
    });

    $('#setup-form').submit(function(e) {
        var data = $(this).serializeArray();
        console.log(data);

        var topLeft = $('#check1').is(":checked");
        var topCenter = $('#check2').is(":checked");
        var topRight = $('#check3').is(":checked");
        var rightCenter = $('#check4').is(":checked");
        var bottomRight = $('#check5').is(":checked");
        var bottomCenter = $('#check6').is(":checked");
        var bottomLeft = $('#check7').is(":checked");
        var leftCenter = $('#check8').is(":checked");        
        var centered = $('#check9').is(":checked");

        var distractions = [];                
        var active = [topLeft, topCenter, topRight, rightCenter, bottomRight, bottomCenter, bottomLeft, leftCenter, centered];                     

        for(var i=0; i<active.length; i++) {
            if (active[i]) {                                
                // var displaytime = $('#input'+(i+1)+'-displaytime').val();
                // var displaymoment = $('#input'+(i+1)+'-displaymoment').val();
                // var type = $('#input'+(i+1)+'-type').val();
                // var teaserdisplay = $('#input'+(i+1)+'-teaserdisplay').val();
                var block_teaser = $('#input'+(i+1)+'-blockTeaser').val();
                var name = '';

                switch(i) {
                    case 0:
                        name = 'top-left';
                        break;
                    case 1:
                        name = 'top-center';
                        break;                
                    case 2:
                        name = 'top-right';
                        break;
                    case 3:
                        name = 'right-center';
                        break;
                    case 4:
                        name = 'bottom-right';
                        break;                    
                    case 5:
                        name = 'bottom-center';
                        break;
                    case 6:
                        name = 'bottom-left';
                        break;
                    case 7:
                        name = 'left-center';
                        break;
                    case 8:
                        name = 'centered';
                        break;
                }
                // distractions.push(new Array(name, displaytime, displaymoment, type, teaserdisplay));
                distractions.push(new Array(name, block_teaser));
            }
        }                      
        localStorage.setItem('distractions', JSON.stringify(distractions));
        window.location.replace('index.html');
        e.preventDefault();
    });
    
    // Check if distractions are set and question page is being shown
    if(localStorage.getItem('distractions') != null && window.location.href.indexOf("question") != -1) {
        var distractions = JSON.parse(localStorage.getItem('distractions'));
        distractions.forEach(el => {
            var id = el[0];
            // var displaytime = el[1] * 1000;
            // var displaymoment = el[2] * 1000;     
            // var type = el[3];
            // var teaserdisplay = el[4] * 1000;
            var blockTeaser = el[1];
            var element = $('#'+id);       
            // element.addClass('hidden');
            // var img_static1 = document.createElement("img");
            // img_static1.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Carved_by_Massive_Stars.jpg/300px-Carved_by_Massive_Stars.jpg";

            // var img_static2 = document.createElement("img");
            // img_static2.src = "https://b.rgbimg.com/users/v/vo/vorfay/300/mllmu58.jpg";

            // var img_static3 = document.createElement("img");
            // img_static3.src = "https://media.giphy.com/media/WcddPgiWWsUFO/giphy.gif";

            // var img_static4 = document.createElement("img");
            // img_static4.src = "https://media.giphy.com/media/RYKFEEjtYpxL2/giphy.gif";

            // var img_static5 = document.createElement("img");
            // img_static5.src = "https://media.giphy.com/media/WiTFa9I5AfrEY/giphy.gif";

            // var img_static6 = document.createElement("img");
            // img_static6.src = "https://kids.kiddle.co/images/thumb/a/a8/Bees_Collecting_Pollen_2004-08-14.jpg/300px-Bees_Collecting_Pollen_2004-08-14.jpg";
            
           
            //CZY WYBRANO WERSJĘ Z ZAJAWKĄ LUB BEZ ("TAK" = bez zajawki)
            if(localStorage.getItem("distractions").includes("Tak"))
            { 
                var advert_dir = [];
                for (let i=1; i <= 3; i++) {
            	    for (let j=1; j <= 15; j++) {
                        var img_static = new Image();                     
            		    img_static.src =  "exp2_images/" + i + "/"+j+".jpg";
            		    advert_dir.push(img_static);
            	    }
                }
            }   
            if(localStorage.getItem("distractions").includes("Nie"))
            { 
                var advert_dir = [];
                for (let i=1; i <= 15; i++) {
                    for (let j=1; j <= 3; j++) {
                        var img_static = new Image();
                        img_static.src = "exp1_images/" + i + "_" + j + ".gif";
                        advert_dir.push(img_static);
                    }
                }
            }
            for (var i = 0; i < advert_dir.length; i++) {
                advert_dir[i].style.height = "210px";
                advert_dir[i].style.width = "350px";
                advert_dir[i].style.display = "inline";
                advert_dir[i].style.position = "fixed";
            }

            var src = document.getElementById("overlay");
            var maxtimes = 10;
            var displaytime = 3000;
            var displaymoment = 3000;
            var teaserdisplay = 5000;
            var pick = (Math.floor(Math.random() * (3)));

            var img = advert_dir[0];

            $("#question-data :input").prop('disabled', false);
            $(':input[type="submit"]').prop('disabled', false);
            $("#question-data :input").prop('style', "visibility: visible");
            if (blockTeaser == "Nie") {
                var options = ['Wyłaniająca się', 'Poprzedzona bodźcem', 'Normalna'];
            } else {
                var options = ['Wyłaniająca się', 'Normalna'];
            }
            
            var i = 0;

            var perm_array = shuffleArray(allPossibleCases([advert_dir, options]));
            // perm_array = perm_array.concat(shuffleArray(allPossibleCases([advert_dir, options])), shuffleArray(allPossibleCases([advert_dir, options])), 
            //                                 shuffleArray(allPossibleCases([advert_dir, options])), shuffleArray(allPossibleCases([advert_dir, options])),
            //                                 shuffleArray(allPossibleCases([advert_dir, options])), shuffleArray(allPossibleCases([advert_dir, options])));
            console.log(perm_array);
            if (i < perm_array.length)
            {
                type = perm_array[i][1];
                img = perm_array[i][0];
                console.log(i);
            }

            switch(type) {
                case 'Wyłaniająca się':
                    window.setTimeout(function() {
                        $(':input[type="submit"]').prop('disabled', true);
                        $("#question-data :input").prop('disabled', true);
                        $("#question-data :input").prop('style', "visibility: visible");
                        logEvent(",start,srodek,"+type.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g,'') + "," + img.src);
                        src.appendChild(img);
                        $(img).hide().fadeIn(displaymoment);
                        $(img).delay(displaytime).hide(0);
                    }, displaymoment);

                    window.setTimeout(function() {
                        $(':input[type="submit"]').prop('disabled', false);
                        $("#question-data :input").prop('disabled', false);
                        $("#question-data :input").prop('style', "visibility: visible");
                        $(img).delay(0).hide(0);
                        i++;
                        logEvent(",stop,srodek,"+type.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g,'') + "," + img.src);
                    }, displaytime*2);

                    break;
                    
                case 'Poprzedzona bodźcem':
                    window.setTimeout(function() {
                        $(':input[type="submit"]').prop('disabled', true);
                        $("#question-data :input").prop('disabled', true);
                        $("#question-data :input").prop('style', "visibility: visible");
                        logEvent(",zajawka,start,srodek,zajawka");
                        element.css('width', '11px');
                        element.css('height', '11px');
                        element.css('background-color', 'lime');
                        $("#centered").addClass("blink_me");
                        // if(element.hasClass('hidden')){
                        element.delay(0).fadeIn(0);
                        // }
                    }, 0);

                    window.setTimeout(function() {
                        logEvent(",zajawka,stop,srodek,zajawka");
                        element.delay(0).hide(0);
                    }, displaytime);

                    window.setTimeout(function() {
                        logEvent(",start,srodek,"+type.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g,'') + "," + img.src);
                        src.appendChild(img);
                        $(img).hide().fadeIn(2000);
                    }, displaytime);

                    window.setTimeout(function() {
                        $(':input[type="submit"]').prop('disabled', false);
                        $("#question-data :input").prop('disabled', false);
                        $("#question-data :input").prop('style', "visibility: visible");
                        logEvent(",stop,srodek,"+type.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g,'') + "," + img.src);
                        $(img).delay(0).hide(0);
                        i++;
                    }, displaytime*2);

                    break;

                case 'Normalna':
                    setTimeout(function() {
                        $(':input[type="submit"]').prop('disabled', true);
                        $("#question-data :input").prop('disabled', true);
                        $("#question-data :input").prop('style', "visibility: visible");
                        logEvent(",start,srodek,"+type.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g,'') + "," + img.src);
                        src.appendChild(img);
                        $(img).delay(1000).fadeIn(0);
                    }, 1000);

                    setTimeout(function() {
                        $(':input[type="submit"]').prop('disabled', false);
                        $("#question-data :input").prop('disabled', false);
                        $("#question-data :input").prop('style', "visibility: visible");
                        logEvent(",stop,srodek,"+type.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g,'') + "," + img.src);
                        $(img).delay(0).hide(0);
                        i++;
                    }, displaytime);

                    break;
            }
            
            

            setInterval(function() {
                if (i < perm_array.length)
                {
                    type = perm_array[i][1];
                    img = perm_array[i][0];
                    console.log(i);
                }
                switch(type) {
                    case 'Wyłaniająca się':
                        window.setTimeout(function() {
                            $(':input[type="submit"]').prop('disabled', true);
                            $("#question-data :input").prop('disabled', true);
                            $("#question-data :input").prop('style', "visibility: visible");
                            logEvent(",start,srodek,"+type.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g,'') + "," + img.src);
                            src.appendChild(img);
                            $(img).hide().fadeIn(teaserdisplay);
                            // $(img).delay(displaytime).hide(0);
                        }, teaserdisplay);
                        window.setTimeout(function() {
                            $(':input[type="submit"]').prop('disabled', false);
                            $("#question-data :input").prop('disabled', false);
                            $("#question-data :input").prop('style', "visibility: visible");
                            $(img).delay(0).hide(0);
                            i++;
                            logEvent(",stop,srodek,"+type.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g,'') + "," + img.src);
                        }, displaytime*2);
                        break;
                        
                    case 'Poprzedzona bodźcem':
                        window.setTimeout(function() {
                            logEvent(",zajawka,start,srodek,zajawka");
                            element.css('width', '11px');
                            element.css('height', '11px');
                            element.css('background-color', 'lime');
                            $("#centered").addClass("blink_me");

                            // if(element.hasClass('hidden')){
                            element.delay(0).fadeIn(0);
                            // }
                        }, 0);

                        window.setTimeout(function() {
                            logEvent(",zajawka,stop,srodek,zajawka");
                            element.delay(0).hide(0);
                        }, displaytime);

                        window.setTimeout(function() {
                            $(':input[type="submit"]').prop('disabled', true);
                            $("#question-data :input").prop('disabled', true);
                            $("#question-data :input").prop('style', "visibility: visible");
                            logEvent(",start,srodek,"+type.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g,'') + "," + img.src);
                            src.appendChild(img);
                            $(img).hide().fadeIn(2000);
                        }, displaytime);

                        window.setTimeout(function() {
                            $(':input[type="submit"]').prop('disabled', false);
                            $("#question-data :input").prop('disabled', false);
                            $("#question-data :input").prop('style', "visibility: visible");
                            logEvent(",stop,srodek,"+type.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g,'') + "," + img.src);
                            $(img).delay(0).hide(0);
                            i++;
                        }, displaytime*2);
                        break;

                    case 'Normalna':
                        // working normal advert
                        setTimeout(function() {
                            $(':input[type="submit"]').prop('disabled', true);
                            $("#question-data :input").prop('disabled', true);
                            $("#question-data :input").prop('style', "visibility: visible");
                            logEvent(",start,srodek,"+type.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g,'') + "," + img.src);
                            src.appendChild(img);
                            $(img).delay(100).fadeIn(0);
                        }, 3000);

                        setTimeout(function() {
                            $(':input[type="submit"]').prop('disabled', false);
                            $("#question-data :input").prop('disabled', false);
                            $("#question-data :input").prop('style', "visibility: visible");
                            logEvent(",stop,srodek,"+type.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g,'') + "," + img.src);
                            $(img).delay(0).hide(0);
                            i++;
                        }, displaytime*2);
                        break;

                }
                $(':input[type="submit"]').prop('disabled', false);
                $("#question-data :input").prop('disabled', false);
                $("#question-data :input").prop('style', "visibility: visible");
            }, 29000);

        });

    }

});