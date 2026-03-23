package com.helpvoice.repository;

import com.helpvoice.model.Alert;
import com.helpvoice.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AlertRepository extends MongoRepository<Alert, String> {
    List<Alert> findByUserAndStatusOrderByCreatedAtDesc(User user, String status);
    
    @Query("{ 'user.$id' : ?0 }")
    List<Alert> findRecentAlertsByUser(User user);
    
    long countByUserAndType(User user, String type);
    
    long countByUserAndStatus(User user, String status);
}
