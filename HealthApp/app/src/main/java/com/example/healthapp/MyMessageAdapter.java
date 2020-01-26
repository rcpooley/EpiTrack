package com.example.healthapp;

import android.content.Context;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.RelativeLayout;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class MyMessageAdapter extends BaseAdapter {

    private static LayoutInflater inflater;

    private Context context;
    private JSONArray data;

    public MyMessageAdapter(Context context, JSONArray data) {
        this.context = context;
        this.data = data;
        inflater = (LayoutInflater) context
                .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
    }

    @Override
    public int getCount() {
        return data.length();
    }

    @Override
    public Object getItem(int position) {
        try {
            return data.getJSONObject(position);
        } catch (JSONException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        View vi = convertView;
        if (vi == null)
            vi = inflater.inflate(R.layout.message_item, null);
        TextView text = vi.findViewById(R.id.messageView);
        JSONObject obj;
        try {
            obj = data.getJSONObject(position);
            text.setText(obj.getString("msg"));
            if (!obj.getBoolean("me")) {
                text.setGravity(Gravity.END);
            }
        } catch (JSONException e) {
            e.printStackTrace();
            return vi;
        }
        return vi;
    }
}
