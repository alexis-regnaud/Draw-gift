class Member {
    id:number = null
    name:string = "";
    spouse:string = "";
    isAdmin:boolean = false;

    constructor(name, spouse = "", isAdmin = false) {
        this.name = name;
        this.spouse = spouse;
        this.isAdmin = isAdmin;
    }
    get id() {
        return this.id;
    }
    set id(x) {
        this.id = x;
    }
    get name() {
        return this.name;
    }
    set name(x) {
        this.name = x;
    }
    get spouse() {
        return this.spouse;
    }
    hasSpouse() {
        return this.spouse !== "";
    }
    set spouse(x) {
        this.spouse = x;
    }
    get isAdmin() {
        return this.isAdmin;
    }
    set isAdmin(x) {
        this.isAdmin = x;
    }
}

export default Member