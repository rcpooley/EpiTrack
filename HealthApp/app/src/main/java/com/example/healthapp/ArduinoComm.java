package com.example.healthapp;

import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothGatt;
import android.bluetooth.BluetoothGattCallback;
import android.bluetooth.BluetoothGattService;
import android.bluetooth.BluetoothManager;
import android.content.Context;
import android.content.Intent;

import java.util.List;
import java.util.Set;

public class ArduinoComm {

    private static final int REQUEST_ENABLE_BT = 1;

    private Activity activity;
    private BluetoothAdapter bluetoothAdapter;
    private BluetoothDevice epitrack;
    private BluetoothGatt bluetoothGatt;
    private boolean connected;

    private double currentOxygen;
    private double currentTemperature;

    public ArduinoComm(Activity activity) {
        this.activity = activity;
        final BluetoothManager bluetoothManager = (BluetoothManager) activity.getSystemService(Context.BLUETOOTH_SERVICE);
        bluetoothAdapter = bluetoothManager.getAdapter();

        currentOxygen = Integer.MIN_VALUE;
        currentTemperature = Integer.MIN_VALUE;

        if (isEnabled()) {
            Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            activity.startActivityForResult(enableBtIntent, REQUEST_ENABLE_BT);
            Set<BluetoothDevice> pairedDevices = bluetoothAdapter.getBondedDevices();

            if (pairedDevices.size() > 0) {
                // There are paired devices. Get the name and address of each paired device.
                for (BluetoothDevice device : pairedDevices) {
                    if (device.getName().equals("Epitrack")) {
                        epitrack = device;
                    }
                }
            }

            if (epitrack != null) {
                initGatt();
            }
        }
    }

    private void initGatt() {
        bluetoothGatt = epitrack.connectGatt(activity, false, new MyGattCallback());
        bluetoothGatt.connect();
    }

    public boolean isEnabled() {
        return bluetoothAdapter != null && bluetoothAdapter.isEnabled();
    }

    public boolean isConnected() {
        return connected;
    }
}
