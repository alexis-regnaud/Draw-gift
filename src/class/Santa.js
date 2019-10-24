import Member from "./Member"

export type Draw = {
    from: number,
    to: number
}

class Santa {
    id:number = null;
    admin:number = null;
    members:Array<Member> = [];
    draw:Array<Draw> = []

    constructor(name:string, admin:Member ) {
        this.name = name;
        this.membersAdd(admin)
        this.admin = admin.id;
    }
    get id():number {
        return this.id;
    }
    set id(x:number) {
        this.id = x;
    }
    get admin():Member {
        return this.members.find((member:Member) => member.id === this.admin);
    }
    set admin(x:Member) {
        this.admin = x.id;
    }
    membersAdd(x:Member) {
        x.id = this.members.length + 1
        this.members.push(x);
    }
    get members():Array<Member> {
        return this.members;
    }
    getMemberById(id:number):Member{
        return this.members.find((member:Member) => member.id === id)
    }
    getMemberByName(name:string):Member{
        return this.members.find((member:Member) => member.name === name)
    }
    hasMembers():boolean {
        return this.members.length > 0;
    }

    get drawIsDone():number {
        return this.draw.length > 0;
    }
    get draw():Array<Draw> {
        return this.draw;
    }
    set draw(x:Array<Draw>) {
        this.draw = x;
    }
    addDraw(from:number, to:number){
        this.draw.push({
            from,
            to
        })
    }

    getAuthorizedMember(member:Member):Member{
        let membersAut = this.members.filter((member_item:Member) => member.id !== member_item.id && member.spouse !== member_item.name && this.draw.filter((draw) => draw.to === member_item.id).length === 0 )
        return membersAut.length > 0 ? membersAut[Math.floor(Math.random()*membersAut.length)] : null
    }

    launchDraw(){
        this.members.forEach((member:Member) => {
            let authorizedMember = this.getAuthorizedMember(member)
            this.addDraw(member.id, authorizedMember ? authorizedMember.id : null)
        })
    }
}

export default Santa