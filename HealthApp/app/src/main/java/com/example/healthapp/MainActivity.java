package com.example.healthapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    private UserLoginTask loginTask;

    private EditText usernameView;
    private EditText passwordView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        usernameView = findViewById(R.id.usernameField);
        passwordView = findViewById(R.id.passwordField);
    }

    public void login(View view) {
        String username = usernameView.getText().toString();
        String password = passwordView.getText().toString();

        loginTask = new UserLoginTask(username, password);
        loginTask.execute((Void) null);
    }

    public class UserLoginTask extends AsyncTask<Void, Void, Boolean> {

        private final String username;
        private final String password;

        UserLoginTask(String username, String password) {
            this.username = username;
            this.password = password;
        }

        @Override
        protected Boolean doInBackground(Void... voids) {
            JSONObject resp = Util.request("/login", Util.jsonData("username", username, "password", password));
            try {
                if (resp.getBoolean("success")) {
                    String token = resp.getString("token");
                    goToHome(token);
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }
            return false;
        }

        public void goToHome(String token) {
            Intent intent = new Intent(MainActivity.this, HomeActivity.class);
            intent.putExtra("token", token);
            startActivity(intent);
        }
    }
}
