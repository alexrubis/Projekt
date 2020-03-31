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
                var displaytime = $('#input'+(i+1)+'-displaytime').val();
                var displaymoment = $('#input'+(i+1)+'-displaymoment').val();
                var type = $('#input'+(i+1)+'-type').val();
                var teaserdisplay = $('#input'+(i+1)+'-teaserdisplay').val();
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
                distractions.push(new Array(name, displaytime, displaymoment, type, teaserdisplay));
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
            var type = el[3];
            // var teaserdisplay = el[4] * 1000;
            var element = $('#'+id);       
            element.addClass('hidden');
            var maxtimes = 10;
            var displaytime = 5000;
            var displaymoment = 1000;
            var teaserdisplay = 2000;
            

            switch(type) {
                case 'Wyłaniająca się':
                    setTimeout(function() {
                        if(element.hasClass('hidden')){
                           element.fadeIn(teaserdisplay);
                        }
                    }, displaytime/8);
                    setTimeout(function() {
                        element.delay(displaytime).hide(0);
                    }, displaytime);
                    break;
                    
                case 'Poprzedzona bodźcem':
                    window.setTimeout(function() {
                        element.css('width', '50px');
                        element.css('height', '50px');
                        element.css('background-color', 'blue');
                        if(element.hasClass('hidden')){
                            element.delay(displaymoment).fadeIn(teaserdisplay);
                        }
                    }, displaytime/8);

                    window.setTimeout(function() {
                        element.css('width', '350px');
                        element.css('height', '200px');
                        element.css('background-color', 'red');
                        element.delay(0).fadeIn(0);
                    }, displaytime);
                    break;

                case 'Normalna':
                    window.setTimeout(function() {
                        if(element.hasClass('hidden')) {
                           element.fadeIn(0);
                        }
                    }, 0);
                    setTimeout(function() {
                        element.delay(0).hide(0);
                    }, displaytime);
                    break;
            }

            var options = ['Wyłaniająca się', 'Poprzedzona bodźcem', 'Normalna']
            var options_index = 0;
            // while (maxtimes > 0){
            //     options_index = (Math.floor(Math.random() * (3 - 0)) + 0);
            // for (let i = 0; i < 5; i++) {
            setInterval(function() {
                switch(options[1]) {
                    case 'Wyłaniająca się':
                        setTimeout(function() {
                            if(element.hasClass('hidden')){
                               element.fadeIn(teaserdisplay);
                            }
                        }, displaytime/8);
                        setTimeout(function() {
                            element.delay(displaytime).hide(0);
                            element.addClass('hidden');
                        }, displaytime);
                        break;
                        
                    case 'Poprzedzona bodźcem':
                        window.setTimeout(function() {
                            element.css('width', '50px');
                            element.css('height', '50px');
                            element.css('background-color', 'blue');
                            if(element.hasClass('hidden')){
                                element.delay(displaymoment/100).fadeIn(teaserdisplay);
                            }
                            element.addClass('hidden');
                        }, displaytime/8);

                        window.setTimeout(function() {
                            if(element.hasClass('hidden')){
                                element.removeClass('hidden')
                                element.css('width', '350px');
                                element.css('height', '200px');
                                element.css('background-color', 'red');
                                element.delay(0).fadeIn(0);
                            }
                        }, displaytime);

                        window.setTimeout(function() {
                            element.delay(0).hide(0);
                            element.addClass('hidden');
                        }, displaytime+1000);
                        break;

                    case 'Normalna':
                        window.setTimeout(function() {
                            if(element.hasClass('hidden')) {
                               element.fadeIn(0);
                            }
                        }, 0);
                        setTimeout(function() {
                            element.delay(0).hide(0);
                            element.addClass('hidden');
                        }, displaytime);
                        break;
                }
            }, 15000);
        });

    }

});