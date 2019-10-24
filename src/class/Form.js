class Form {
    element:HTMLElement = null
    onSubmitCallback:Function = null

    constructor(idElement:string) {
        this.element = document.getElementById(idElement);
        this.listenerSubmit()
    }

    get values(){
        let inputs = this.element.querySelectorAll(".app__form__input"),
            values = [];
        inputs.forEach(input => {
            values[input.name] = input.value
        })
        return values
    }

    /** Listeners **/

    listenerSubmit(){
        this.element.onsubmit = (event) => {
            event.preventDefault()
            //this.element.getElementsByClassName("app__form__input")
            if(this.onSubmitCallback !== null){
                this.onSubmitCallback(this.values)
            }
        }
    }

    /** Callback **/

    onSubmit(callback){
        this.onSubmitCallback = callback
    }

    /** Methodes **/

    clean(){
        let inputs = this.element.querySelectorAll(".app__form__input")
        inputs.forEach(input => {
            input.value = ""
        })
        this.hiddenError()
    }

    showError(error:string){
        this.element.getElementsByClassName(error)[0].classList.remove("display_none");
    }

    hiddenError(){
        let elems = this.element.querySelectorAll(".app__form__error__item")
        elems.forEach(elem => {
            elem.classList.add("display_none")
        })
    }
}

export default Form