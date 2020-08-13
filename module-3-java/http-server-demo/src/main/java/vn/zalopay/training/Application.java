package vn.zalopay.training;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import vn.zalopay.training.config.ConfigReader;
import vn.zalopay.training.server.MyHttpServer;

import java.io.IOException;

public class Application {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) throws JsonProcessingException {
        try {
            ConfigReader.init();
            MyHttpServer myHttpServer = new MyHttpServer();
            myHttpServer.start();
        } catch (IOException e) {
            log.error("Cannot start service", e);
        }
    }
}
