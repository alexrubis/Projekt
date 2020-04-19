function saveCompleteLog() 
{
    // var storedLog = JSON.parse(localStorage.getItem("contentArray"));
     
    var atag = document.createElement("a");
    var file = new Blob([JSON.stringify(sessionStorage.getItem("contentArray")).replace('"','').replace('[','').replace(']','').replace(']','').replace('/','')], {type: 'text/plain'});
    atag.href = URL.createObjectURL(file);
    atag.download = "stymulacjaKompletnyLog.txt";
    atag.click();
}

$(document).ready(function() {
    if(window.location.pathname.indexOf("/result.html") >= 0) {
        displayTimes();
        // saveCompleteLog();
    }

    /*  
    ------------------------------
    TIME MEASUREMENT CODE START
    ------------------------------
    */
    var startTime = new Date().getTime();
    var endTime;    
    var startTimeSaved = false;
    var firstQuestionTime, lastQuestionTime, totalTime;
    var firstQuestionTimeSaved = false;
    var lastQuestionTimeSaved = false;
    var userName;

    // Save time that user took to start answering question
    $('#firstQuestion').focus(function() {
        if(!firstQuestionTimeSaved) {
            firstQuestionTime = new Date().getTime() - startTime;
            console.log("Time to first input click:");
            console.log(firstQuestionTime);
            // saveTime(1);
            firstQuestionTimeSaved = true;
        }
    });

    // Save time that elapsed between last click and submitting the question
    $('#lastQuestion').focus(function() {
        if(!lastQuestionTimeSaved) {
            lastQuestionTime = new Date().getTime() - startTime;
            console.log("Time to last input click:");
            console.log(lastQuestionTime);

            lastQuestionTimeSaved = true;
        }
    });

    // Function for displaying time results
    function displayTimes() {
        var result = "";
        var report = localStorage.getItem("report");
        reportArray = JSON.parse(report);

        $.each(reportArray[0].questions, function(index, value) {
            result = result + `<ul class="list-group mt-4">
                                <li class="list-group-item"><strong>Pytanie nr ` + value.questionNo + `</strong></li>
                                <li class="list-group-item">Czas rozpoczęcia: ` + value.firstQuestionTime/1000  + ` s</li>
                                <li class="list-group-item">Czas zakończenia: ` + value.lastQuestionTime/1000 + ` s</li>
                                <li class="list-group-item">Całkowity czas: ` + value.totalTime/1000 + ` s</li>
                            </ul>`   
        });                  

        $(".result").html(result);
        
        $.ajax({
            url: "php/send-report.php",
            type: "post",
            data: {data: reportArray}
        })
        .done(function(res) {
            console.log(res);
        });
    }
    /*  
    ------------------------------
    TIME MEASUREMENT CODE END
    ------------------------------
    */
    
    // Get current question number
    questionNo = localStorage.getItem("questionNo");
    $(".question-no").html("Zadanie " + questionNo + "/10");

    if(questionNo == "10") {
        $(".next-question").html("Zakończ &nbsp;<i class='fas fa-check'></i>");
        $(".next-question").removeClass("btn-dark");
        $(".next-question").addClass("btn-success");
    }

    // Submit user data
    $("#user-data").submit(function(e) {
        var data = $(this).serializeArray();

        param = {
            userName: data[0].value,
            questions: []
        }

        addReportUsername(param);

        if(inputValidation(data)) {
            // Set first question number
            localStorage.setItem("questionNo", 1);
            localStorage.setItem("userName", userName);
            goToNextQuestion();
        }

        e.preventDefault();
    });

    // Submit question data
    $("#question-data").submit(function(e) {
        totalTime = new Date().getTime() - startTime;
    
        reportParam = {
            questionNo: parseInt(questionNo),
            firstQuestionTime: firstQuestionTime,
            lastQuestionTime: lastQuestionTime,
            totalTime: totalTime,
            score: 3,
            totalScore: 3
        };

        var data = $(this).serializeArray();

        // console.log(data)
        if(inputValidation(data)) {
            addReportParam(reportParam);
            if(questionNo == "10") {
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

    // $(".game-data").click(function() {        
    //     var data = $(this).serializeArray();
    //     // console.log(data)
    //     // if(inputValidation(data)) {            
    //         if(questionNo == '6') {
    //             // Show results and clear local storage                
    //             window.location.replace("result.html");             
    //             localStorage.setItem("questionNo", "");
    //             localStorage.setItem("askedQuestions", "");                                           
    //         } else {
    //             // Increment question number                
    //             localStorage.setItem("questionNo", ++questionNo);
    //             goToNextQuestion();
    //         }
    //     // }

    // });


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
        // console.log(data)
        $.each(data, function(key, val) {
            if(val.value.trim() == "") {
                $("input[name=" + val.name + "]").addClass("is-invalid");
                $("select[name=" + val.name + "]").addClass("is-invalid");
                $(".invalid-feedback").html("Wypełnij to pole");

                response = false;
            } else {
                $("input[name=" + val.name + "]").removeClass("is-invalid");
                $("select[name=" + val.name + "]").removeClass("is-invalid");
                $(".invalid-feedback").html("");

                response = true;
            }
        });
        return response;
    }    

    function addReportUsername(userName) {
        localStorage.setItem("report", "[" + JSON.stringify(userName) + "]");
    }

    function addReportParam(param) {
        var report = localStorage.getItem("report");

        reportArray = JSON.parse(report);
        reportArray[0].questions.push(param);
        localStorage.setItem("report", JSON.stringify(reportArray));
    }
});