package com.example.vng.repository;

import com.arangodb.springframework.annotation.BindVars;
import com.arangodb.springframework.annotation.Query;
import com.arangodb.springframework.repository.ArangoRepository;
import org.springframework.data.repository.query.Param;

import java.util.Map;
import java.util.List;

public interface FundingChannelRepository extends ArangoRepository<String, String> {
    @Query("RETURN KEEP(DOCUMENT(@id), @keepList)")
    Map<String, Object> getFundingChannelInfo(@Param("id") String id, @Param("keepList") List<String> keepList);
}
