$(document).ready(function() {
    /*  
    ------------------------------
    TIME MEASUREMENT CODE START
    ------------------------------
    */
    var startTime = new Date().getTime();
    var endTime;    
    var startTimeSaved = false;

    // Save time that user took to start answering question
    $('#firstQuestion').focus(function() {
        // saveTime(1);
    });

    // Save time that elapsed between last click and submitting the question
    $('#lastQuestion').focus(function() {
        endTime = new Date().getTime();
    });

    // Function for displaying time results
    function displayTimes() {
        var result = ""
        var username = localStorage.getItem('username');
        
        result = result + `<ul class="list-group">
                                <li class="list-group-item"><strong>Pytanie nr: ` + i + `</strong></li>
                                <li class="list-group-item">Czas rozpoczęcia: ` + startTime/1000  + ` s</li>
                                <li class="list-group-item">Czas zakończenia: ` + endTime/1000 + ` s</li>
                                <li class="list-group-item">Całkowity czas: ` + totalTime/1000 + ` s</li>
                            </ul>`                     

        $(".result").html(result);                    
    }
    /*  
    ------------------------------
    TIME MEASUREMENT CODE END
    ------------------------------
    */
    
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

        console.log(data)
        if(inputValidation(data)) {
            if(questionNo == "6") {
                // Show results and clear local storage
                window.location.replace("result.html");             
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

    $(".game-data").click(function() {        
        var data = $(this).serializeArray();
        // console.log(data)
        // if(inputValidation(data)) {            
            if(questionNo == '6') {
                // Show results and clear local storage                
                window.location.replace("result.html");             
                localStorage.setItem("questionNo", "");
                localStorage.setItem("askedQuestions", "");                                           
            } else {
                // Increment question number                
                localStorage.setItem("questionNo", ++questionNo);
                goToNextQuestion();
            }
        // }

    });


    function goToNextQuestion() {
        // rand = Math.floor((Math.random() * 5) + 1);

        // while(true) {
        //     if(isAsked(rand)) {
        //         rand = Math.floor((Math.random() * 5) + 1);
        //     } else {
        //         break;
        //     }   
        // }
        var num = localStorage.getItem('questionNo');
        window.location.replace("question" + num + ".html");
        // addAskedQuestion(rand);
    }

    // Add asked question to list
    // function addAskedQuestion(rand) {
    //     askedQuestions = localStorage.getItem("askedQuestions");

    //     if(askedQuestions == "") {
    //         localStorage.setItem("askedQuestions", rand);
    //     } 
    //     else {
    //         localStorage.setItem("askedQuestions", askedQuestions + ", " + rand);
    //     }
    // }

    // // Check if question was already asked
    // function isAsked(rand) {
    //     askedQuestions = localStorage.getItem("askedQuestions");

    //     if(askedQuestions != null) {
    //         var askedQuestionsArray = askedQuestions.split(',');

    //         $.each(askedQuestionsArray, function(key, val) {
    //             if(val == rand) {
    //                 response = true;
    //             } else {
    //                 response = false;
    //             }
    //         });

    //     } else {
    //         response = false;
    //     }
        
    //     return response;
    // }

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