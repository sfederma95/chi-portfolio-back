\c chi

DROP TABLE admins;
DROP TABLE images;

CREATE TABLE admins (
    admin_id SERIAL PRIMARY KEY,
    admin_pass TEXT NOT NULL,
    email TEXT NOT NULL
);

CREATE TABLE images (
    img_type VARCHAR(25) NOT NULL DEFAULT '',
    img_path TEXT UNIQUE NOT NULL,
    img_size VARCHAR(25) NOT NULL DEFAULT '',
    img_ctgy VARCHAR(25) DEFAULT '',
    img_name VARCHAR(50) UNIQUE NOT NULL,
    img_desc TEXT DEFAULT '',
    img_id SERIAL PRIMARY KEY 
)