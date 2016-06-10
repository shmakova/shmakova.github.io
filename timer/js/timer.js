var intervalCount = 1;

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    
    return {
        'total': t,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);

        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

function getEndtime(minutes, seconds) {
    return new Date(Date.parse(new Date()) + (minutes * 60 + seconds) * 1000);
}



$('#start').on('click', function(event) {
    event.preventDefault();
    
    for (i = 0; i < intervalCount; i++) {
        var minutes = 0;
        var seconds = 10;
        beep(); 
        
        (function() {
            setTimeout(function() {
                var deadline = getEndtime(minutes, seconds);
                console.log(seconds);
                initializeClock('clock', deadline);
            }, (minutes * 60 + seconds) * 1000);  
        });
    }
    
});

$('#add').on('click', function(event) {
    event.preventDefault();
    var $newRow = $(".interval-row").eq(intervalCount - 1).clone(true);
    intervalCount++;
    $newRow.find(".interval-number").html(intervalCount + ".");
    var $curRow = $(this).closest('tr');
    $curRow.before($newRow);
});

function beep() {
    var sound = document.getElementById("audio");
    sound.play()
}

