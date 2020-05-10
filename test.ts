// tests go here; this will not be compiled when this package is used as a library
softPWM.initPwm(pwmMode.servo, 20000);
softPWM.setPwmValue(DigitalPin.P8, 90)