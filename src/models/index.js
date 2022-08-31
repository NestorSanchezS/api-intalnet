
class City {
    constructor(name, plans = []) {
        this.name = name
        this.plans = plans
    } 
}


class Plans {
    constructor(name, services = []) {
        this.name = name
        this.services = services
    }
}


class Services {
    constructor(name, type) {
        this.name = name
        this.type = type
    }
}
