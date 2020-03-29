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
                var frequency = $('#input'+(i+1)).val();
                var size = $('#input'+(i+1)+'-size').val();
                var type = $('#input'+(i+1)+'-type').val();
                var time = $('#input'+(i+1)+'-time').val();
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
                
                distractions.push(new Array(name, frequency, size, type, time));
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
            var frequency = el[1];
            var size = el[2];     
            var type = el[3];
            var time = el[4];
            var element = $('#'+id);       
            element.addClass('hidden');
            var small_element = element;

            small_element.css('width', '100px');
            small_element.css('height', '100px');
            small_element.css('background-color', 'blue');
            // Show distraction
            //element.removeClass('hidden');

            // Change size of a distraction
            if (size == 'x2') {
                element.css('width', '300px');
                element.css('height', '300px');
            }

            var tim = 0;
            switch(time) {
                case '10s':
                    tim = 10000;                    
                    break;
                case '20s':
                    tim = 20000;  
                    break;
                case 'Losowo':
                    tim = 1000;  
                    break;
            }

            switch(type) {
                case 'Wyłaniająca się':
                    setTimeout(function() {
                        if(element.hasClass('hidden')){
                           element.delay(1000).fadeIn(1000);
                        }
                    }, tim);
                    setTimeout(function() {
                        element.delay(tim).hide(0);
                    }, tim);
                    break;
                    
                case 'Poprzedzona bodźcem':
                    window.setTimeout(function() {
                        small_element.delay(1000).fadeIn(1000);
                    }, tim);

                    setTimeout(function() {
                        small_element.delay(tim).fadeOut(100);
                    }, tim);

                    setTimeout(function() {
                        element.fadeIn(1000);
                    }, tim);

                    setTimeout(function() {
                        element.delay(tim).hide(0);
                    }, tim);
                    break;

                case 'Normalna':
                    window.setTimeout(function() {
                        if(element.hasClass('hidden')) {
                           element.removeClass('hidden');
                        }
                    }, tim);
                    setTimeout(function() {
                        element.delay(tim).hide(0);
                    }, tim);
                    break;
            }

        });

    }

});