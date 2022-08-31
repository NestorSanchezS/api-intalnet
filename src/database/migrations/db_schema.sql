CREATE TABLE cities (
    id INT PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(1000) NOT NULL
)

CREATE TABLE plans (
    id INT PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(1000) NOT NULL 
)

CREATE TABLE services (
    id INT PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(1000) NOT NULL,
    type VARCHAR(100) NOT NULL
)

CREATE TABLE services_plans (
    plan_id INT NOT NULL,
    service_id INT NOT NULL,
    FOREIGN KEY (plan_id) REFERENCES plans (id),
    FOREIGN KEY (service_id) REFERENCES services (id)
)

CREATE TABLE cities_plans (
    city_id INT NOT NULL,
    plan_id INT NOT NULL,
    price DOUBLE,
    FOREIGN KEY (city_id) REFERENCES cities (id),
    FOREIGN KEY (plan_id) REFERENCES plans (id),
)
