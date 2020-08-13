package vn.zalopay.training.handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import vn.zalopay.training.entity.SimpleMessageResponse;
import vn.zalopay.training.utils.JacksonUtils;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;

public abstract class SimpleRequestHandler implements HttpHandler {

    private static final Logger log = LoggerFactory.getLogger(SimpleRequestHandler.class);

    @Override
    public void handle(HttpExchange httpExchange) throws IOException {

        URI requestUri = httpExchange.getRequestURI();
        String requestMethod = httpExchange.getRequestMethod();

        log.info("[{}] {}", requestMethod, requestUri.toString());

        String response;
        switch (requestMethod) {
            case "GET":
                response = onGet(httpExchange);
                break;
            case "POST":
                response = onPost(httpExchange);
                break;
            case "PUT":
                response = onPut(httpExchange);
                break;
            case "DELETE":
                response = onDelete(httpExchange);
                break;
            default: {
                SimpleMessageResponse messageResponseObj =
                        new SimpleMessageResponse("Not support method: " + requestMethod);
                httpExchange.sendResponseHeaders(200, 0);
                response = JacksonUtils.objectToJsonString(messageResponseObj);
            }
        }
        responding(httpExchange.getResponseBody(), response);
    }

    protected abstract String onGet(HttpExchange httpExchange) throws IOException;

    protected abstract String onPost(HttpExchange httpExchange) throws IOException;

    protected abstract String onPut(HttpExchange httpExchange) throws IOException;

    protected abstract String onDelete(HttpExchange httpExchange) throws IOException;

    private void responding(OutputStream os, String response) throws IOException {
        os.write(response.getBytes());
        os.close();
    }
}
