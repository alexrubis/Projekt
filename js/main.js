$(document).ready(function() {
    var startTime = new Date().getTime();
    var endTime;    
    var startTimeSaved = false;

    var firebaseConfig = {
        apiKey: "AIzaSyCcCWbVcFj_6rG2eqxCfMoZRnyF1NHhmm4",
        authDomain: "test-app-572fa.firebaseapp.com",
        databaseURL: "https://test-app-572fa.firebaseio.com",
        projectId: "test-app-572fa",
        storageBucket: "test-app-572fa.appspot.com",
        messagingSenderId: "247352338453",
        appId: "1:247352338453:web:633baa043b785538bc461c"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var db = firebase.database();

    // Save new user to database
    function createNewUser(username) {
        var date = new Date();
        var dateTime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDay()+'/'+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        db.ref('users/' + username).set({
            created: dateTime
        });
        localStorage.setItem('username', username);
    }

    // Save time to database that user took to answer the question
    function saveTime(which) {        
        var username = localStorage.getItem('username');
        var questionNumber = localStorage.getItem('questionNo')             
        // Time from showing question to first click
        if (which == 1 && !startTimeSaved) {   
            var time = new Date().getTime() - startTime;         
            db.ref('users/' + username + "/" + questionNumber + "/startTime").set({
                value: time
            });
            startTimeSaved = true;
        } 
        // Time from last click to submitting question
        else if (which == 2) {                        
            var time = new Date().getTime() - endTime;
            db.ref('users/' + username + "/" + questionNumber + "/endTime").set({
                value: time
            });
        } 
        // Time that user take to complete while question
        else if (which == 3) {
            var time = new Date().getTime() - startTime;
            db.ref('users/' + username + "/" + questionNumber + "/totalTime").set({
                value: time
            });
        }
    }

    $('#firstQuestion').focus(function() {
        saveTime(1);
    });

    $('#lastQuestion').focus(function() {
        endTime = new Date().getTime();
    });

    function displayTimes() {
        var result = ""
        var username = localStorage.getItem('username');
        return db.ref('users/' + username).once('value', (snapshot) => {
            var questionsCount = snapshot.numChildren() - 1;
            for(i=1; i<=questionsCount; i++) {
                var totalTime = snapshot.val()[i].totalTime.value;
                var startTime = snapshot.val()[i].startTime.value;
                var endTime = snapshot.val()[i].endTime.value;
                // console.log('Pytanie numer ' + i);
                // console.log('Total time: ' + totalTime / 1000 + 's');     
                // console.log('Start time: ' + startTime / 1000 + 's');
                // console.log('End time: ' + endTime / 1000 + 's');           

                result = result + `<ul class="list-group">
                                        <li class="list-group-item"><strong>Pytanie nr: ` + i + `</strong></li>
                                        <li class="list-group-item">Czas rozpoczęcia: ` + startTime/1000  + ` s</li>
                                        <li class="list-group-item">Czas zakończenia: ` + endTime/1000 + ` s</li>
                                        <li class="list-group-item">Całkowity czas: ` + totalTime/1000 + ` s</li>
                                    </ul>`                
            }            
            
            $(".result").html(result);                    
        });     
    }        

    if (window.location.href.indexOf("result") > -1) {
        displayTimes();
    }
    
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
        createNewUser(data[0].value);

        if(inputValidation(data)) {
            // Set first question number
            localStorage.setItem("questionNo", 1);            
            goToNextQuestion();
        }

        e.preventDefault();
    });

    // Submit question data
    $("#question-data").submit(function(e) {
        saveTime(2);
        saveTime(3);             
        var data = $(this).serializeArray();
        // console.log(data)
        if(inputValidation(data)) {
            if(questionNo == "6") {
                // Return to main page & clear localStorage items
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
        // saveTime(2);
        // saveTime(3);             
        var data = $(this).serializeArray();
        // console.log(data)
        // if(inputValidation(data)) {
            if(questionNo == "6") {
                // Return to main page & clear localStorage items
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
        rand = Math.floor((Math.random() * 5) + 1);

        while(true) {
            if(isAsked(rand)) {
                rand = Math.floor((Math.random() * 5) + 1);
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