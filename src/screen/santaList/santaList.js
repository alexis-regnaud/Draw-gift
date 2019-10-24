
require("./santaList.scss")

import App from "../../class/App";
import Santa from "../../class/Santa";
import Modal from "../../class/Modal";

class santaList {

    modalJoinSanta:Modal = null
    modalShowSanta:Modal = null
    santaListDom:HTMLElement = null

    constructor() {

        this.initListSanta()

        this.initFormNewSanta()
        this.initFormJoinSanta()
        this.initFormShowSanta()
        this.initListerners()
    }

    initListSanta(){
        this.santaListDom = document.getElementById("santa-list__list")
        App.santas.forEach((santa:Santa) => {
            this.addSataListItem(santa)
        })
    }

    initFormNewSanta(){
        let modalNewSanta = App.createModal("santa-list__modal__new"),
            formNewSanta = App.createForm("santa-list__form__new");

        //If click open
        document.getElementById("santa-list__new").onclick= () => {
            modalNewSanta.open()
        }

        //If submit form
        formNewSanta.onSubmit((results) => {
            let member_name = results["santa-list__form__new__member_name"],
                spouse_name = results["santa-list__form__new__spouse_name"],
                name = results["santa-list__form__new__name"]

                // Check form error
                formNewSanta.hiddenError()
                if(name === "") {
                    formNewSanta.showError("no-name")
                    return false
                }
                if(member_name === "") {
                    formNewSanta.showError("no-member-name")
                    return false
                }
                ///////////////////

                let member = App.createMember(member_name, spouse_name, true),
                    santa = App.createSanta(name, member);
                App.santasAdd(santa)
                App.saveStore()
                this.addSataListItem(santa)
                modalNewSanta.close()
        })
        modalNewSanta.onClose(() => {
            formNewSanta.clean()
        })
    }

    initFormJoinSanta(){
        this.modalJoinSanta = App.createModal("santa-list__modal__join", "santa-list__item__join")
        let formJoinSanta =  App.createForm("santa-list__form__join");

        //If close
        this.modalJoinSanta.onClose(() => {
            formJoinSanta.clean()
        })

        //If submit form
        formJoinSanta.onSubmit((results) => {

            let name = results["santa-list__form__join__name"],
                spouse =  results["santa-list__form__join__spouse"],
                santa =  App.getSantaById(this.modalJoinSanta.data.santaId);

            // Check form error
            formJoinSanta.hiddenError()
            if(name === "") {
                formJoinSanta.showError("no-name")
                return false
            }
            if(santa.getMemberByName(name)) {
                formJoinSanta.showError("name-already")
                return false
            }
            ///////////////////

            let member = App.createMember(name, spouse);
            santa.membersAdd(member)
            App.saveStore()
            this.modalJoinSanta.close()
        })
    }

    initFormShowSanta(){
        this.modalShowSanta = App.createModal("santa-list__modal__show")
        let formShowSanta =  App.createForm("santa-list__form__show");

        //If close
        this.modalShowSanta.onClose(() => {
            formShowSanta.clean()
        })

        //If submit form
        formShowSanta.onSubmit((results) => {
            let santa = App.getSantaById(this.modalShowSanta.data.santaId),
                name = results["santa-list__form__join__name"],
                member = santa.getMemberByName(name)

            // Check form error
            formShowSanta.hiddenError()
            if(name === "") {
                formShowSanta.showError("no-name")
                return false
            }
            if(!member) {
                formShowSanta.showError("no-member")
                return false
            }
            ///////////////////

            location.href = `./santaDetail.html?santaId=${santa.id}&memberId=${member.id}`;
            this.modalShowSanta.close()
        })
    }

    initListerners(){
        // reference to a list
        const list = document.querySelector('#santa-list__list');

        // add a single listener on list item
        list.addEventListener('click', (event) => {
            if (event.target.matches('.santa-list__item__show')) {
                let santaId = parseInt(event.target.closest(".santa-list__item").getAttribute("data-santa-id"))
                this.modalShowSanta.open({santaId})
            }
            if (event.target.matches('.santa-list__item__join')) {
                let santaId = parseInt(event.target.closest(".santa-list__item").getAttribute("data-santa-id"))
                this.modalJoinSanta.open({santaId})
            }
        });
    }

    addSataListItem(santa:Santa){
       this.santaListDom.insertAdjacentHTML("beforeend", this.getSantaListItem(santa));
    }

    getSantaListItem(santa:Santa){
        return `
            <li class="santa-list__item app__item" data-santa-id="${santa.id}">
                <span class="santa-list__item__span">${santa.name}</span>
                <div>
                    <button class="app__btn santa-list__item__join ${santa.drawIsDone ? 'display_none' : ''}">Join</button>
                    <button class="app__btn santa-list__item__show">Show</button>
                </div>
            </li>
        `
    }
}

new santaList()

