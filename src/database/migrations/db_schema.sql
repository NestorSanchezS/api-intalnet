CREATE TABLE IF NOT EXISTS cities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(1000) NOT NULL
);

CREATE TABLE IF NOT EXISTS plans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(1000) NOT NULL,
    ui_params JSON
);

CREATE TABLE IF NOT EXISTS services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(1000) NOT NULL,
    type VARCHAR(100) NOT NULL -- internet, tv, other
);

CREATE TABLE IF NOT EXISTS services_plans (
    plan_id INT NOT NULL,
    service_id INT NOT NULL,
    FOREIGN KEY (plan_id) REFERENCES plans (id),
    FOREIGN KEY (service_id) REFERENCES services (id)
);

CREATE TABLE IF NOT EXISTS cities_plans (
    city_id INT NOT NULL,
    plan_id INT NOT NULL,
    price DOUBLE,
    FOREIGN KEY (city_id) REFERENCES cities (id),
    FOREIGN KEY (plan_id) REFERENCES plans (id)
);


CREATE TABLE IF NOT EXISTS frequent_questions (
    id       INT PRIMARY KEY AUTO_INCREMENT,
    question VARCHAR(500)  NOT NULL,
    answer   VARCHAR(1500) NOT NULL
);
