import store from 'storejs';
import Santa from "./Santa";
import Member from "./Member"
import Modal from "./Modal";
import Form from "./Form";

//Singleton
class App {
    santas:Array<Santa> = [];

    constructor() {
        this.santasInit()

        if (App.exists) {
            return App.instance;
        }
        App.instance = this;
        App.exists = true;
        return this;
    }

    santasInit(){
        let store = this.getStore()
        if(store.santas){
            this.santas = store.santas.map((santa:Santa) => {
                let members = santa.members.map((member:Member) => {
                    return Object.assign(this.createMember(member.name, member.spouse, member.isAdmin),member)
                })
                let santaUpdate = Object.assign(this.createSanta(santa.name, members.find((member:Member) => member.id === santa.admin)),santa)
                santaUpdate.members = members
                return santaUpdate
            })
        }
    }
    santasAdd(x:Santa) {
        x.id = this.santas.length + 1
        this.santas.push(x);
    }
    get santas():Array<Santa> {
        return this.santas;
    }
    getSantaById(id:number):Santa{
        return  this.santas.find((santa) => santa.id === id)
    }
    hasSantas():boolean {
        return this.santas.length > 0;
    }

    /** Store **/
    saveStore(){
        store.set("drawGift",this)
    }

    getStore(){
        if(store("drawGift")){
            return store("drawGift")
        }
        return {}
    }

    /** Factory **/
    createMember(memberName:string, memberSpouse:string, isAdmin:boolean = false):Member{
        return new Member(memberName, memberSpouse, isAdmin)
    }
    createSanta(name:string, member:string):Santa{
        return new Santa(name, member)
    }
    createModal(idElement:string):Modal{
        return new Modal(idElement)
    }
    createForm(idElement:string):Form{
        return new Form(idElement)
    }
}

export default new App()