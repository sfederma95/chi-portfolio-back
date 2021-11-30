\c chi

CREATE TABLE admin (
    admin_id SERIAL PRIMARY KEY,
    admin_pass TEXT NOT NULL,
    email TEXT NOT NULL
);

CREATE TABLE image (
    img_type VARCHAR(25) NOT NULL DEFAULT '',
    img_path TEXT NOT NULL DEFAULT '',
    img_size VARCHAR(25) NOT NULL DEFAULT '',
    img_ctgy VARCHAR(25) NOT NULL DEFAULT '',
    img_name VARCHAR(50) NOT NULL DEFAULT '',
    img_desc TEXT DEFAULT '',
    img_id SERIAL PRIMARY KEY 
)