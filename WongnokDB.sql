-- Drop everything
--DROP SCHEMA public CASCADE;

-- 1. Photo table
CREATE TABLE photo (
    photoid VARCHAR(10) PRIMARY KEY,
    photourl VARCHAR(200) UNIQUE
);

-- 2. Restaurants table
CREATE TABLE restaurants (
    res_id VARCHAR(15) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone_no VARCHAR(20) NOT NULL,
    address VARCHAR(200),
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    avg_rating FLOAT NOT NULL
);

-- 3. Category table
CREATE TABLE category (
    categoryid VARCHAR(10) PRIMARY KEY,
    categoryname VARCHAR(20) NOT NULL
);

-- 4. Restaurant_Category (Join Table)
CREATE TABLE restaurant_category (
    res_id VARCHAR(10),
    categoryid VARCHAR(10),
    CONSTRAINT fk_joinres
        FOREIGN KEY (res_id) REFERENCES restaurants(res_id)
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT fk_joincat
        FOREIGN KEY (categoryid) REFERENCES category(categoryid)
        DEFERRABLE INITIALLY DEFERRED
);

-- 5. Users table
CREATE TABLE users (
    userid VARCHAR(10) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    phonenum VARCHAR(15) NOT NULL UNIQUE,
    profilepic VARCHAR(10),
    CONSTRAINT fk_profilephoto
        FOREIGN KEY (profilepic) REFERENCES photo(photoid)
        DEFERRABLE INITIALLY DEFERRED
);

-- 6. Review table
CREATE TABLE review (
    reviewid VARCHAR(10) PRIMARY KEY,
    userid VARCHAR(10),
    res_id VARCHAR(10),
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    reviewtext VARCHAR(200),
    timestamp DATE NOT NULL,
    CONSTRAINT fk_userreview
        FOREIGN KEY (userid) REFERENCES users(userid)
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT fk_resreview
        FOREIGN KEY (res_id) REFERENCES restaurants(res_id)
        DEFERRABLE INITIALLY DEFERRED
);

-- 7. ReportedReview table
CREATE TABLE reportedreview (
    reportid VARCHAR(10) PRIMARY KEY,
    reviewid VARCHAR(10),
    reportedby VARCHAR(10),
    reason VARCHAR(200),
    status INT NOT NULL,
    timestamp DATE NOT NULL,
    CONSTRAINT fk_repreview
        FOREIGN KEY (reviewid) REFERENCES review(reviewid)
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT fk_repuser
        FOREIGN KEY (reportedby) REFERENCES users(userid)
        DEFERRABLE INITIALLY DEFERRED
);

-- 8. Admin table
CREATE TABLE admin (
    adminid VARCHAR(10) PRIMARY KEY,
    userid VARCHAR(10) UNIQUE,
    permissionlevel INT NOT NULL,
    CONSTRAINT fk_useradmin
        FOREIGN KEY (userid) REFERENCES users(userid)
        DEFERRABLE INITIALLY DEFERRED
);

