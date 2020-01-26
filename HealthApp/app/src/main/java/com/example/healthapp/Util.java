package com.example.healthapp;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

public class Util {

    private static final String HOST = "http://10.0.2.2:7766";

    private static JSONObject failResp;

    static {
        try {
            failResp = new JSONObject().put("success", false);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    public static JSONObject request(String endpoint, String data) {
        try {
            URL url = new URL(HOST + endpoint);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("charset", "utf-8");
            conn.setRequestProperty("Content-Length", Integer.toString(data.length()));
            conn.setDoInput(true);
            conn.setDoOutput(true);

            OutputStream os = conn.getOutputStream();
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(os, "UTF-8"));
            writer.write(data);
            writer.flush();
            writer.close();
            os.close();

            int respCode = conn.getResponseCode();
            if (respCode != HttpURLConnection.HTTP_OK) {
                return failResp;
            }

            StringBuilder response = new StringBuilder();

            String line;
            BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }

            return new JSONObject(response.toString());
        } catch (Exception e) {
            e.printStackTrace();
            return failResp;
        }
    }

    public static String jsonData(String... params) {
        JSONObject obj = new JSONObject();
        for (int i = 0; i < params.length; i += 2) {
            try {
                obj.put(params[i], params[i + 1]);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return obj.toString();
    }
}
