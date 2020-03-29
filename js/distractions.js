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
                
                distractions.push(new Array(name, frequency, size));
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
            var element = $('#'+id);       

            // Show distraction
            element.removeClass('hidden');

            // Change size of a distraction
            if (size == 'x2') {
                element.css('width', '300px');
                element.css('height', '300px');
            }

            // Set blinking frequency
            var freq = 0;
            switch(frequency) {
                case "1 Hz":
                    freq = 1;                    
                    break;
                case '2 Hz':
                    freq = 2;
                    break;
                case '4 Hz':
                    freq = 4;
                    break;
            }
                        
            window.setInterval(function() {
                if(element.hasClass('hidden')) {
                    element.removeClass('hidden');
                } else {
                    element.addClass('hidden');
                }
            }, 1000 / freq);
        });
    }
    
});