package com.example.healthapp;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;


public class VitalsFragment extends Fragment {

    private ArduinoComm comm;

    private RelativeLayout vitalContainer;
    private TextView status;
    private TextView currentTemp;
    private TextView currentOxygen;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        getActivity().setTitle("Vitals");

        HomeActivity home = (HomeActivity) getActivity();
        comm = home.getArduinoComm();

        View view = inflater.inflate(R.layout.fragment_vitals, container, false);
        vitalContainer = view.findViewById(R.id.vitalContainer);
        status = view.findViewById(R.id.textStatus);
        currentTemp = view.findViewById(R.id.currentTemp);
        currentOxygen = view.findViewById(R.id.currentOxygen);

//        if (!comm.isEnabled()) {
//            vitalContainer.setVisibility(View.GONE);
//            status.setText(R.string.enable_bluetooth);
//        } else if (!comm.isConnected()) {
//            vitalContainer.setVisibility(View.GONE);
//            status.setText(R.string.bt_connecting);
//        }

        currentTemp.setText("98.6 F");
        currentOxygen.setText("99%");

        return view;
    }
}
