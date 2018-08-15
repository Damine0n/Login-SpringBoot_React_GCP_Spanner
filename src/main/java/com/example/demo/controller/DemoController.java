package com.example.demo.controller;

import com.example.demo.user.User;
import com.google.cloud.Timestamp;
import com.google.cloud.spanner.*;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@ComponentScan
public class DemoController {

    @RequestMapping(method = RequestMethod.GET, value ="/login")
    @ResponseBody
    @CrossOrigin
    public boolean getUser(@RequestParam String username, @RequestParam String password){
        boolean result = false;
        List<User> users;
        SpannerOptions options = SpannerOptions.newBuilder().build();
        Spanner spanner = options.getService();
        try {
            DatabaseId db = DatabaseId.of(options.getProjectId(), "test-instance", "example-db");
            DatabaseClient dbClient = spanner.getDatabaseClient(db);
            //DatabaseAdminClient dbAdminClient = spanner.getDatabaseAdminClient();
            users = read(dbClient);
        }finally{
            spanner.close();
        }
        for(int i=0;i<users.size();i++){
            if(users.get(i).getUsername().equalsIgnoreCase(username)){
                result = users.get(i).getPassword().equals(password);
                break;
            }
        }
        return result;
    }

    @RequestMapping(method = RequestMethod.POST, value ="/signup")
    @ResponseBody
    @CrossOrigin
    public boolean postUser(@RequestBody User user){
        System.out.println(user);
        Timestamp result;
        List<User> users;
        SpannerOptions options = SpannerOptions.newBuilder().build();
        Spanner spanner = options.getService();
        try {
            //String command = "read";
            DatabaseId db = DatabaseId.of(options.getProjectId(), "test-instance", "example-db");
            DatabaseClient dbClient = spanner.getDatabaseClient(db);
            DatabaseAdminClient dbAdminClient = spanner.getDatabaseAdminClient();
            result = addNewUser(user,dbClient);
        }catch(Exception ex){
            return false;
        }finally{
            spanner.close();
        }
        return result != null;
    }

    private static List<User> read(DatabaseClient dbClient) {
        List<User> users = new ArrayList<>();
        ResultSet resultSet =
                dbClient
                        .singleUse()
                        .read(
                                "Users",
                                // KeySet.all() can be used to read all rows in a table. KeySet exposes other
                                // methods to read only a subset of the table.
                                KeySet.all(),
                                Arrays.asList("username", "password"));
        /*while (resultSet.next()) {
            System.out.printf(
                    "%s %s\n", resultSet.getString(0), resultSet.getString(1));
        }*/
        while (resultSet.next()) {
            users.add(new User(resultSet.getString(0), resultSet.getString(1)));
        }
        return users;
    }

    private static Timestamp addNewUser(User user, DatabaseClient dbClient) {
        List<Mutation> mutations = new ArrayList<>();
        mutations.add(
                Mutation.newInsertBuilder("Users")
                        .set("username")
                        .to(user.getUsername())
                        .set("password")
                        .to(user.getPassword())
                        .build());
        return  dbClient.write(mutations);
    }
}

