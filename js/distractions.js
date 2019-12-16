$(document).ready(function() {

    $('#check1').change(function() {
        this.checked ? $('#check1-form').removeClass('hidden') : $('#check1-form').addClass('hidden');
    });

    $('#check2').change(function() {
        this.checked ? $('#check2-form').removeClass('hidden') : $('#check2-form').addClass('hidden');
    });
    
    $('#check3').change(function() {
        this.checked ? $('#check3-form').removeClass('hidden') : $('#check3-form').addClass('hidden');
    });

    $('#check4').change(function() {
        this.checked ? $('#check4-form').removeClass('hidden') : $('#check4-form').addClass('hidden');
    });

    $('#check5').change(function() {
        this.checked ? $('#check5-form').removeClass('hidden') : $('#check5-form').addClass('hidden');
    });

    $('#check6').change(function() {
        this.checked ? $('#check6-form').removeClass('hidden') : $('#check6-form').addClass('hidden');
    });

    $('#check7').change(function() {
        this.checked ? $('#check7-form').removeClass('hidden') : $('#check7-form').addClass('hidden');
    });

    $('#check8').change(function() {
        this.checked ? $('#check8-form').removeClass('hidden') : $('#check8-form').addClass('hidden');
    });

    $('#setup-form').submit(function(e) {

        var topLeft = $('#check1').is(":checked");
        var topCenter = $('#check2').is(":checked");
        var topRight = $('#check3').is(":checked");
        var rightCenter = $('#check4').is(":checked");
        var bottomRight = $('#check5').is(":checked");
        var bottomCenter = $('#check6').is(":checked");
        var bottomLeft = $('#check7').is(":checked");
        var leftCenter = $('#check8').is(":checked");

        var active = [topLeft, topCenter, topRight, rightCenter, bottomRight, bottomCenter, bottomLeft, leftCenter];

        localStorage.setItem('activeDistractions', active);

        e.preventDefault();
    });
    
});