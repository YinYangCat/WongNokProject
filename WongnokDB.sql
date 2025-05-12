
-- If you want to Drop everything use line 3-6 (Remove the -- part)
--DROP SCHEMA public CASCADE;
--CREATE SCHEMA public;
--GRANT ALL ON SCHEMA public TO postgres;
--GRANT ALL ON SCHEMA public TO public;

-- 1. Photo table
CREATE TABLE photo(
    photoid SERIAL PRIMARY KEY,
    photourl VARCHAR(200) UNIQUE
);

-- 2. Restaurants table
CREATE TABLE restaurants(
    res_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone_no VARCHAR(20),
    address VARCHAR(200),
    province VARCHAR(200) NOT NULL,
    avg_rating FLOAT NOT NULL,
    review_count INT NOT NULL,
    open_time TIME NOT NULL,
    close_time TIME NOT NULL,
    respic INT,
    CONSTRAINT fk_resphoto
        FOREIGN KEY (respic) REFERENCES  photo(photoid)
    
);


-- 5. Users table
CREATE TABLE users(
    userid SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    phonenum VARCHAR(15) UNIQUE,
    profilepic INT,
    CONSTRAINT fk_profilephoto
        FOREIGN KEY (profilepic) REFERENCES photo(photoid)
);

-- 6. Review table
CREATE TABLE review(
    reviewid SERIAL PRIMARY KEY,
    userid INT,
    res_id VARCHAR(10),
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    reviewtext VARCHAR(200),
    timestamp DATE NOT NULL,
    CONSTRAINT fk_userreview
        FOREIGN KEY (userid) REFERENCES users(userid)
            ON DELETE CASCADE,
    CONSTRAINT fk_resreview
        FOREIGN KEY (res_id) REFERENCES restaurants(res_id)
            ON DELETE CASCADE
);



-- 8. Admin table
CREATE TABLE admin(
    adminid SERIAL PRIMARY KEY,
    userid INT UNIQUE,
    permissionlevel INT NOT NULL,
    CONSTRAINT fk_useradmin
        FOREIGN KEY (userid) REFERENCES users(userid)
);

--Add users to the Admin table to be able to manage restaurants
--INSERT INTO Admin (UserID,permissionlevel)
--VALUES ('1',2);

--No need you can just drop all and run the create table again (from the 1-6 line)
-- CREATE SEQUENCE users_userid_seq;
-- ALTER TABLE users
-- ALTER COLUMN userid SET DEFAULT nextval('users_userid_seq');
-- ALTER SEQUENCE users_userid_seq OWNED BY users.userid;
