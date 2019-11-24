$(document).ready(function() {
    // Get current question number
    questionNo = localStorage.getItem("questionNo");
    $(".question-no").html("Zadanie " + questionNo + "/6");

    if(questionNo == "6") {
        $(".next-question").html("Zakończ &nbsp;<i class='fas fa-check'></i>");
        $(".next-question").removeClass("btn-dark");
        $(".next-question").addClass("btn-success");
    }

    // Submit user data
    $("#user-data").submit(function(e) {

        var data = $(this).serializeArray();

        if(inputValidation(data)) {
            // Set first question number
            localStorage.setItem("questionNo", 1);
            
            goToNextQuestion();
        }

        e.preventDefault();
    });

    // Submit question data
    $("#question-data").submit(function(e) {
        var data = $(this).serializeArray();

        if(inputValidation(data)) {
            if(questionNo == "6") {
                // Return to main page & clear localStorage items
                window.location.replace("index.html");
                localStorage.setItem("questionNo", "");
                localStorage.setItem("askedQuestions", "");
            } else {
                // Increment question number
                localStorage.setItem("questionNo", ++questionNo);
                goToNextQuestion();
            }
        }

        e.preventDefault();
    });

    function goToNextQuestion() {
        rand = Math.floor((Math.random() * 2) + 1);

        while(true) {
            if(isAsked(rand)) {
                // Do poprawy
                rand = Math.floor((Math.random() * 2) + 1);
            } else {
                break;
            }
        }

        window.location.replace("question" + rand + ".html");
        addAskedQuestion(rand);
    }

    // Add asked question to list
    function addAskedQuestion(rand) {
        askedQuestions = localStorage.getItem("askedQuestions");

        if(askedQuestions == "") {
            localStorage.setItem("askedQuestions", rand);
        } 
        else {
            localStorage.setItem("askedQuestions", askedQuestions + ", " + rand);
        }
    }

    // Check if question was already asked
    function isAsked(rand) {
        askedQuestions = localStorage.getItem("askedQuestions");

        if(askedQuestions != null) {
            var askedQuestionsArray = askedQuestions.split(',');

            $.each(askedQuestionsArray, function(key, val) {
                if(val == rand) {
                    response = true;
                } else {
                    response = false;
                }
            });

        } else {
            response = false;
        }
        
        return response;
    }

    // Validate inputs
    function inputValidation(data) {
        $.each(data, function(key, val) {
            if(val.value.trim() == "") {
                $("input[name=" + val.name + "]").addClass("is-invalid");
                $(".invalid-feedback").html("Wypełnij to pole");

                response = false;
            } else {
                $("input[name=" + val.name + "]").removeClass("is-invalid");
                $(".invalid-feedback").html("");

                response = true;
            }
        });
        return response;
    }
});