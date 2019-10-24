require("./santaDetail.scss")
import App from "../../class/App";
import Santa from "../../class/Santa";
import type {Draw} from "../../class/Santa";
import Member from "../../class/Member";

class santaDetail {
    member:Member = null
    santa:Santa = null

    constructor() {
        let url = new URL(window.location.href),
            memberId = parseInt(url.searchParams.get("memberId")),
            santaId = parseInt(url.searchParams.get("santaId"));
        this.santa = App.getSantaById(santaId)
        this.member = this.santa.getMemberById(memberId)

        this.initBtnLaunchDraw()
        this.initBtnBack()
        this.addDrawList()
        this.initAdmin()
    }

    initBtnLaunchDraw(){
        //If click
        document.getElementById("santa-detail__admin__launch").onclick= () => {
            if(!this.santa.drawIsDone){
                this.santa.launchDraw()
                App.saveStore()
                this.addDrawList()
            }
        }
    }

    initBtnBack(){
        //If click
        document.getElementById("app__header__back").onclick= () => {
            location.href = `/`;
        }
    }

    addDrawList(){
        if(this.santa.drawIsDone){
            document.getElementById("santa-detail__draw__waiting").classList.add("display_none")
            document.getElementById("santa-detail__admin__launch").setAttribute("disabled", true)
            this.santa.draw.forEach((draw:Draw) => {
                document.getElementById("santa-detail__draw__list").insertAdjacentHTML("beforeend", this.getDrawListItem(draw));
            })
        }
    }

    getDrawListItem(draw:Draw){
        return `
            <li class="santa-detail__item app__item ${draw.from === this.member.id ? 'myMatch' : '' }">
                  <span class="santa-detail__item__span">${draw.from ? this.santa.getMemberById(draw.from).name : ''}</span>
                  ==>
                  <span class="santa-detail__item__span">${draw.to ? this.santa.getMemberById(draw.to).name : ''}</span>
            </li>
        `
    }

    initAdmin(){
        if(this.member.isAdmin){
            document.getElementById("santa-detail__admin").classList.remove("display_none");
        }
    }
}

new santaDetail()