package com.example.healthapp;

import android.os.AsyncTask;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;

import org.json.JSONArray;


public class MessagesFragment extends Fragment {

    private HomeActivity home;

    private TextView messageStatus;
    private EditText editMessage;
    private ListView messageList;
    private int numMessages;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        getActivity().setTitle("Messages");

        home = (HomeActivity) getActivity();

        View view = inflater.inflate(R.layout.fragment_messages, container, false);

        messageStatus = view.findViewById(R.id.messageStatus);
        editMessage = view.findViewById(R.id.editMessage);
        messageList = view.findViewById(R.id.messageList);
        messageList.setAdapter(new MyMessageAdapter(home, new JSONArray()));

        Button send = view.findViewById(R.id.buttonSend);
        send.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String message = editMessage.getText().toString();
                editMessage.setText("");
                new UserMessageTask(message).execute();
            }
        });

        messageStatus.setText(R.string.loading);

        fetchMessages();

        waitMessage();

        return view;
    }

    private void fetchMessages() {
        new FetchMessageTask(home.getPatientID(), new FetchMessageTask.AsyncResponse() {
            @Override
            public void processFinish(JSONArray output) {
                messageStatus.setText("");
                numMessages = output.length();
                messageList.setAdapter(new MyMessageAdapter(home, output));
            }
        }).execute();
    }

    private void waitMessage() {
        new WaitMessageTask(home.getPatientID(), numMessages, new WaitMessageTask.AsyncResponse() {
            @Override
            public void processFinish() {
                waitMessage();
                fetchMessages();
            }
        }).execute();
    }

    public class UserMessageTask extends AsyncTask<Void, Void, Boolean> {

        private final String message;

        UserMessageTask(String message) {
            this.message = message;
        }

        @Override
        protected Boolean doInBackground(Void... voids) {
            Util.sendMessage(home.getPatientID(), message);
            return true;
        }
    }

    public static class WaitMessageTask extends AsyncTask<Void, Void, Boolean> {

        // you may separate this or combined to caller class.
        interface AsyncResponse {
            void processFinish();
        }

        private String patientID;
        private int num;
        private AsyncResponse delegate;

        WaitMessageTask(String patientID, int num, AsyncResponse delegate) {
            this.patientID = patientID;
            this.num = num;
            this.delegate = delegate;
        }

        @Override
        protected Boolean doInBackground(Void... voids) {
            Util.waitMessage(patientID, num);
            return true;
        }

        @Override
        protected void onPostExecute(Boolean result) {
            delegate.processFinish();
        }
    }

    public static class FetchMessageTask extends AsyncTask<Void, Void, JSONArray> {

        // you may separate this or combined to caller class.
        interface AsyncResponse {
            void processFinish(JSONArray output);
        }

        private String patientID;
        private AsyncResponse delegate;

        public FetchMessageTask(String patientID, AsyncResponse delegate) {
            this.patientID = patientID;
            this.delegate = delegate;
        }

        @Override
        protected JSONArray doInBackground(Void... voids) {
            return Util.getMessages(this.patientID);
        }

        @Override
        protected void onPostExecute(JSONArray result) {
            delegate.processFinish(result);
        }
    }
}
