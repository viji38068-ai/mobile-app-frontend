# MongoDB Integration TODO

**Completed Steps:**
## 1. Update pom.xml
- Added spring-boot-starter-data-mongodb dependency
- Removed spring-boot-starter-data-jpa, h2database dependencies

**Pending Steps:**
## 2. Update application.yml
- Add MongoDB connection properties

## 3. Update main application class
- Add MongoDB auto-configuration annotations

## 4. Update Models (4 files)
- User.java: @Entity → @Document, JPA annotations → MongoDB
- Alert.java
- Complaint.java  
- EmergencyContact.java

## 5. Update Repositories (4 files)
- UserRepository.java: JpaRepository → MongoRepository
- AlertRepository.java
- ComplaintRepository.java
- EmergencyContactRepository.java

## 6. Verify Services & Controllers
- No major changes expected (generic repo methods)

## 7. Test
- Run MongoDB instance
- mvn clean compile
- mvn spring-boot:run
- Test API endpoints

## 8. Frontend Compatibility
- No changes needed (API contract preserved)

**Next Step:** 1. Replace backend/pom.xml with backend/pom-updated.xml&#10;2. cd backend && mvn clean compile&#10;3. Update application.yml with MongoDB config (see application-mongodb.yml as template)&#10;4. Update HelpVoiceApplication.java
