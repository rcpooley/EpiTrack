package com.example.healthapp;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;


public class VitalsFragment extends Fragment {

    private TextView currentTemp;
    private TextView currentOxygen;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        getActivity().setTitle("Vitals");

        View view = inflater.inflate(R.layout.fragment_vitals, container, false);

        currentTemp = view.findViewById(R.id.currentTemp);
        currentTemp.setText(R.string.loading);
        currentOxygen = view.findViewById(R.id.currentOxygen);
        currentOxygen.setText(R.string.loading);

        return view;
    }
}
