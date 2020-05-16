basic.forever(function () {
    for(let d=0;d<=180;d+=10){
        softservo.softServo(DigitalPin.P1, d)
        basic.pause(1000)
    }
})
