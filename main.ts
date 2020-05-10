/*
  softPWM
*/
//% color=#006464 weight=20 icon="\uf1b9" block="softPWM"
enum pwmMode {
	//%block servo
servo = 0,
	//%block analog
analog = 1
}
namespace softPWM {
    let PwmMode: pwmMode;
    let PinNo: DigitalPin;
    let Interval: number;
    let InitFlag = 0;
    let StartTime: number, NextTime: number;
    let PwmValue = 0;

    /**
     * PWM in software
     * @param mode PWM mode , eg: pwmMode.servo
     * @param interval pwm Interval in uS, eg: 20000
     */
    //% blockId="initpwm" block="initPWM %mode:pwmMode %interval"
    export function initPwm(mode: pwmMode,  interval: number): void {
        StartTime = input.runningTimeMicros();
        NextTime = StartTime;
        PwmMode = mode;
        Interval = interval;
    }

    /**
     * start PWM
     * @param pin Output pin number , eg: DigitalPin.P8
     * @param value PWM value, eg: 90
     */
    //% blockId="setPwmValue" block="set PWM value %pin %value"
    export function setPwmValue(pin: DigitalPin,value: number): void {
        PinNo = pin;
        PwmValue = value;
        if (InitFlag == 0) {
            loop();
        }
    }
    function loop(){
        control.inBackground(function () {
            while (true) {
                while (input.runningTimeMicros() < NextTime) {
                    basic.pause(2)
                }
                NextTime += Interval;
                switch (PwmMode) {
                    case pwmMode.servo:
                        pins.digitalWritePin(PinNo, 1)
                        control.waitMicros(Math.round(PwmValue * 1000 / 95) + 400)
                        pins.digitalWritePin(PinNo, 0)
                        break;
                    case pwmMode.analog:
                        pins.digitalWritePin(PinNo, 1)
                        control.waitMicros(Math.round(PwmValue * 1000 / 95) + 400)
                        pins.digitalWritePin(PinNo, 0)
                        break;
                }
            }
        })
    }
}
