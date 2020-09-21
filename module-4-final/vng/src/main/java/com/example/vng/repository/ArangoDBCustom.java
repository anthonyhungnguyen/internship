package com.example.vng.repository;

import com.arangodb.ArangoDB;
import com.example.vng.model.CustomQuery;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Map;

@Repository
public class ArangoDBCustom {

    private final ArangoDB arangoDB = new ArangoDB.Builder().user("root").password("ngph").build();

    public ArrayList<Object> getDataByDynamicQuery(CustomQuery customQuery) {
        Map<String, Object> bindVars = customQuery.getBindVars();
<<<<<<< HEAD
        Map<String, Object> options = customQuery.getOptions();
        String query = String.format(customQuery.getQuery(), options.get("direction"), options.get("filter"), options.get("collect"), options.get("return"));
=======
        String query = customQuery.getQuery();
>>>>>>> caaf7c9bf6a44fb1136cfdbd9314a7629acc0a59
        System.out.println(query);
        return new ArrayList<>(arangoDB.db("_system").query(query, bindVars, null, Object.class).asListRemaining());
    }
}
