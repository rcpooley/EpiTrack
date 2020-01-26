package com.example.healthapp;

public class ArduinoComm {

    private double currentOxygen;

    private double currentTemperature;

    public ArduinoComm() {
        currentOxygen = Integer.MIN_VALUE;
        currentTemperature = Integer.MIN_VALUE;
    }
}
