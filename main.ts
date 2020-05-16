/*
  softServo
*/
//% color=#006464 weight=20 icon="\uf1b9" block="softServo"
namespace softservo {

    let initFlag = 0;
    let PinNo: number;
    let PwmValue: number;
    const interval = 20000;
    let nextTime: number;


    /**
     * softServo
     * @param pin Output pin number , eg: DigitalPin.P8
     * @param value degree, eg: 90
     */
    //% blockId="softServo" block="soft Servo %pin %degree"
    export function softServo(pin: DigitalPin, degree: number): void {

        PinNo = pin;
        PwmValue = Math.round(degree * 1000 / 90) + 500;

        if (initFlag == 0) {
            loop();
            initFlag = 1;
        }
    }
    function loop() {

        let nextTime = input.runningTimeMicros();
        control.inBackground(function () {
            while (true) {
                while (input.runningTimeMicros() < nextTime) {
                    basic.pause(2)
                }
                nextTime += interval;
                pins.digitalWritePin(PinNo, 1)
                control.waitMicros(PwmValue)
                pins.digitalWritePin(PinNo, 0)
                nextTime += interval;
            }
        })
    }
}
