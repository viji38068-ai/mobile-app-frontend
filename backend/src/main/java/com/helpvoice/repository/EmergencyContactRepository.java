package com.helpvoice.repository;

import com.helpvoice.model.EmergencyContact;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EmergencyContactRepository extends MongoRepository<EmergencyContact, String> {

    List<EmergencyContact> findByUserId(String userId);

    @Query("{ 'userId' : ?0, 'isActive' : true }")
    List<EmergencyContact> findActiveByUserId(String userId);

    EmergencyContact findByUserIdAndPhoneNumber(String userId, String phoneNumber);
}
