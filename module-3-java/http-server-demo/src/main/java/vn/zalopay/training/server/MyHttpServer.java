package vn.zalopay.training.server;

import com.sun.net.httpserver.HttpServer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import vn.zalopay.training.config.ConfigReader;
import vn.zalopay.training.handler.EmployeeRequestHandler;

import java.io.IOException;
import java.net.InetSocketAddress;

public class MyHttpServer {

    private final HttpServer httpServer;

    private static final Logger log = LoggerFactory.getLogger(MyHttpServer.class);

    public MyHttpServer() throws IOException {
        int port = ConfigReader.getProperties("server").get("port").asInt();
        httpServer = HttpServer.create(new InetSocketAddress(port), 0);
        httpServer.createContext("/employee", new EmployeeRequestHandler());
        httpServer.setExecutor(null);
    }

    public void start() {
        this.httpServer.start();
        log.info("HttpServer started on port {}", this.httpServer.getAddress().getPort());
    }
}
