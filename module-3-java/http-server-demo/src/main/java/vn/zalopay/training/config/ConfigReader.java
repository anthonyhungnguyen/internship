package vn.zalopay.training.config;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;

import java.io.File;
import java.io.IOException;

public class ConfigReader {

    private static JsonNode CONFIG_PROPERTIES = null;

    private static final String CONFIG_URL = "config/config.yaml";

    public static void init() throws IOException {
        ObjectMapper mapper = new ObjectMapper(new YAMLFactory());
        CONFIG_PROPERTIES = mapper.readTree(new File("config/config.yaml"));
    }

    public static JsonNode getProperties(String name) {
        if (CONFIG_PROPERTIES == null)
            throw new NullPointerException("ConfigReader is not initialized");
        return CONFIG_PROPERTIES.get(name);
    }
}
