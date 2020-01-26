package com.example.healthapp;

import android.bluetooth.BluetoothGatt;
import android.bluetooth.BluetoothGattCallback;
import android.bluetooth.BluetoothGattCharacteristic;
import android.bluetooth.BluetoothGattDescriptor;
import android.bluetooth.BluetoothGattService;
import android.bluetooth.BluetoothProfile;

import java.util.List;

public class MyGattCallback extends BluetoothGattCallback {
    @Override
    public void onConnectionStateChange(BluetoothGatt gatt, int status,
                                        int newState) {
        if (newState == BluetoothProfile.STATE_CONNECTED) {
            gatt.discoverServices();
        }
    }

    @Override
    public void onServicesDiscovered(BluetoothGatt gatt, int status) {
        List<BluetoothGattService> services = gatt.getServices();
        for (BluetoothGattService service : services) {
            System.out.println("Service " + service.getUuid());
            List<BluetoothGattCharacteristic> chs = service.getCharacteristics();
            for (BluetoothGattCharacteristic ch : chs) {
                System.out.println("read " + ch.getUuid());
                System.out.println("len " + ch.getDescriptors().size());
                gatt.readCharacteristic(ch);
                gatt.setCharacteristicNotification(ch, true);
                List<BluetoothGattDescriptor> dd = ch.getDescriptors();
                for (BluetoothGattDescriptor d : dd) {
                    System.out.println("read desc " + d.getUuid());
                    gatt.readDescriptor(d);
                }
            }
        }
    }

    @Override
    public void onCharacteristicRead(BluetoothGatt gatt, BluetoothGattCharacteristic ch,
                                     int status) {
        System.out.println(ch.getStringValue(0));
        System.out.println(status == BluetoothGatt.GATT_SUCCESS);
    }

    @Override
    public void onDescriptorRead(BluetoothGatt gatt, BluetoothGattDescriptor descriptor,
                                 int status) {
        byte[] b = descriptor.getValue();
        System.out.println("DESC " + descriptor.getUuid());
        for (byte bb : b) {
            System.out.println(bb);
        }
    }
}
