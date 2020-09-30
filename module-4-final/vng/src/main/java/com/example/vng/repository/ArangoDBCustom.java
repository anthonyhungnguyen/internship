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
        String query = customQuery.getQuery();
        return new ArrayList<>(arangoDB.db("_system").query(query, bindVars, null, Object.class).asListRemaining());
    }
}
