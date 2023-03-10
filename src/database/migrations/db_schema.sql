CREATE TABLE IF NOT EXISTS cities (
    id      INT PRIMARY KEY AUTO_INCREMENT,
    name    VARCHAR(1000) NOT NULL
);

CREATE TABLE IF NOT EXISTS plans (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(1000) NOT NULL,
    ui_params   JSON
);

CREATE TABLE IF NOT EXISTS services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(1000) NOT NULL,
    type VARCHAR(100) NOT NULL -- internet, tv, other
);

CREATE TABLE IF NOT EXISTS services_plans (
    plan_id     INT NOT NULL,
    service_id  INT NOT NULL,
    FOREIGN KEY (plan_id) REFERENCES plans (id),
    FOREIGN KEY (service_id) REFERENCES services (id)
);

CREATE TABLE IF NOT EXISTS cities_plans (
    city_id INT NOT NULL,
    plan_id INT NOT NULL,
    price   DOUBLE,
    FOREIGN KEY (city_id) REFERENCES cities (id),
    FOREIGN KEY (plan_id) REFERENCES plans (id)
);

CREATE TABLE IF NOT EXISTS frequent_questions (
    id       INT PRIMARY KEY AUTO_INCREMENT,
    question VARCHAR(500)  NOT NULL,
    answer   VARCHAR(1500) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    id              INT PRIMARY KEY AUTO_INCREMENT,
    name            VARCHAR(500) NOT NULL,
    description     VARCHAR(1500) NOT NULL,
    price           DOUBLE NOT NULL,
    previous_price  DOUBLE NOT NULL
);

CREATE TABLE IF NOT EXISTS images (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    path        VARCHAR(1500) NOT NULL
);

CREATE TABLE IF NOT EXISTS product_images (
    product_id  INT NOT NULL,
    image_id    INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products (id),
    FOREIGN KEY (image_id)   REFERENCES images (id)
);

CREATE TABLE IF NOT EXISTS categories (
    name VARCHAR(100) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS products_categories (
    product_id  INT NOT NULL,
    category_name VARCHAR(100) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products (id),
    FOREIGN KEY (category_name) REFERENCES categories (name)
);

CREATE TABLE IF NOT EXISTS users (
    id        INT PRIMARY KEY AUTO_INCREMENT,
    name      VARCHAR(100) NOT NULL,
    email     VARCHAR(150) NOT NULL,
    password  VARCHAR(500) NOT NULL,
    rol       VARCHAR(50)  NOT NULL,
    is_active BOOLEAN DEFAULT false
);

