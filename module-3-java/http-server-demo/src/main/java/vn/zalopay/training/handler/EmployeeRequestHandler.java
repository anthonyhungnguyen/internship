package vn.zalopay.training.handler;

import com.sun.net.httpserver.HttpExchange;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import vn.zalopay.training.config.ConfigReader;
import vn.zalopay.training.entity.Employee;
import vn.zalopay.training.entity.SimpleMessageResponse;

import java.io.IOException;
import java.io.InputStream;
import java.sql.*;

public class EmployeeRequestHandler extends SimpleRequestHandler {

    private static final Logger log = LoggerFactory.getLogger(EmployeeRequestHandler.class);
    private final String dbURL = ConfigReader.getProperties("mysql").get("url").asText();
    private final String dbUser = ConfigReader.getProperties("mysql").get("user").asText();
    private final String dbPassword = ConfigReader.getProperties("mysql").get("password").asText();


    @Override
    protected String onGet(HttpExchange httpExchange) throws IOException {

//        Initialization
        Employee employee = new Employee();

//        Read requestBody and Parse requestBody to JSON Object
        InputStream inputStream = httpExchange.getRequestBody();
        JSONObject jsonObject = new JSONObject(new JSONTokener(inputStream));

        if (!jsonObject.has("id")) {
            SimpleMessageResponse failMessage = new SimpleMessageResponse("Please re-check all fields");
            httpExchange.sendResponseHeaders(200, failMessage.getMessage().length());
            log.error("Get employee failed - id is null");
            return failMessage.getMessage();
        }

//        1. Connect to database
//        2. Perform query on employee table based on id
//        3. Create Employee instance and store detail of employee

        try (Connection connection = DriverManager.getConnection(dbURL, dbUser, dbPassword)) {
            try (Statement stmt = connection.createStatement()) {
                String queryUser = String.format("SELECT * FROM employee where id='%s'",
                        jsonObject.getInt("id"));
                try (ResultSet resultSet = stmt.executeQuery(queryUser)) {
                    while (resultSet.next()) {
                        employee.setId(resultSet.getInt("id"));
                        employee.setFull_name(resultSet.getString("full_name"));
                        employee.setSex(resultSet.getString("sex"));
                        employee.setDob(resultSet.getDate("dob"));
                        employee.setJoin_date(resultSet.getDate("join_date"));
                        employee.setDepartment(resultSet.getString("department"));
                    }
                }
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        httpExchange.sendResponseHeaders(200, employee.toString().length());
        log.info("Get user successfully: " + employee.toString());
        return employee.toString();
    }

    @Override
    protected String onPost(HttpExchange httpExchange) throws IOException {
//        Read requestBody and Parse requestBody to JSON Object
        InputStream inputStream = httpExchange.getRequestBody();
        JSONObject jsonObject = new JSONObject(new JSONTokener(inputStream));

        if (!jsonObject.has("full_name") || !jsonObject.has("sex") || !jsonObject.has("dob")) {
            SimpleMessageResponse failMessage = new SimpleMessageResponse("Please re-check all fields");
            httpExchange.sendResponseHeaders(200, failMessage.getMessage().length());
            log.error("Create employee failed - one of fields is null");
            return failMessage.getMessage();
        }

        try (Connection connection = DriverManager.getConnection(dbURL, dbUser, dbPassword)) {
            try (Statement stmt = connection.createStatement()) {
                String createUser = String.format("INSERT INTO employee(full_name, sex, dob, join_date, " +
                                "department) VALUES('%s', '%s', '%s', '%s', '%s')",
                        jsonObject.getString("full_name"),
                        jsonObject.getString("sex"),
                        jsonObject.getString("dob"),
                        jsonObject.getString("join_date"),
                        jsonObject.getString("department"));
                stmt.execute(createUser);
                log.info("Insert new employee successfully: " + createUser);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        SimpleMessageResponse successMessage = new SimpleMessageResponse("Insert new employee successfully");
        httpExchange.sendResponseHeaders(200, successMessage.getMessage().length());
        return successMessage.getMessage();
    }

    @Override
    protected String onPut(HttpExchange httpExchange) throws IOException {
//        Read requestBody and Parse requestBody to JSON Object
        InputStream inputStream = httpExchange.getRequestBody();
        JSONObject jsonObject = new JSONObject(new JSONTokener(inputStream));

//        Parse body params
        if (!jsonObject.has("id") || !jsonObject.has("full_name") || !jsonObject.has("sex") || !jsonObject.has("dob")) {
            SimpleMessageResponse failMessage = new SimpleMessageResponse("Please re-check all fields");
            httpExchange.sendResponseHeaders(200, failMessage.getMessage().length());
            log.error("Update employee failed - one of fields is null");
            return failMessage.getMessage();
        }

        try (Connection connection = DriverManager.getConnection(dbURL, dbUser, dbPassword)) {
            try (Statement stmt = connection.createStatement()) {
                String updateUser = String.format("UPDATE employee SET full_name='%s', sex='%s', dob='%s', " +
                                "join_date='%s', department='%s' WHERE id=%s",
                        jsonObject.getString("full_name"),
                        jsonObject.getString("sex"),
                        jsonObject.getString("dob"),
                        jsonObject.getString("join_date"),
                        jsonObject.getString("department"),
                        jsonObject.getString("id"));
                stmt.execute(updateUser);
                log.info("Update employee successfully: " + updateUser);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        SimpleMessageResponse successMessage = new SimpleMessageResponse("Update employee successfully");
        httpExchange.sendResponseHeaders(200, successMessage.getMessage().length());
        return successMessage.getMessage();
    }

    @Override
    protected String onDelete(HttpExchange httpExchange) throws IOException {
        //        Read requestBody and Parse requestBody to JSON Object
        InputStream inputStream = httpExchange.getRequestBody();
        JSONObject jsonObject = new JSONObject(new JSONTokener(inputStream));

//        Parse body params
        if (!jsonObject.has("id")) {
            SimpleMessageResponse failMessage = new SimpleMessageResponse("Please re-check all fields");
            httpExchange.sendResponseHeaders(200, failMessage.getMessage().length());
            log.error("Delete employee failed - one of fields is null");
            return failMessage.getMessage();
        }

        try (Connection connection = DriverManager.getConnection(dbURL, dbUser, dbPassword)) {
            try (Statement stmt = connection.createStatement()) {
                String deleteUser = String.format("DELETE FROM employee WHERE id=%s",
                        jsonObject.getString("id"));
                stmt.execute(deleteUser);
                log.info("Delete employee successfully: " + deleteUser);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        SimpleMessageResponse successMessage = new SimpleMessageResponse("Delete employee successfully");
        httpExchange.sendResponseHeaders(200, successMessage.getMessage().length());
        return successMessage.getMessage();
    }
}
