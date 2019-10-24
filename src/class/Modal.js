class Modal {
    element:HTMLElement = null
    closeBtn:HTMLElement = null
    onOpenCallback:Function = null
    onCloseCallback:Function = null
    data = null

    constructor(idElement:string, classOpenBtn:string) {
        this.element = document.getElementById(idElement);
        this.closeBtn = this.element.getElementsByClassName("app__modal__close")[0]

        this.listenerClose()
    }

    /** Listeners **/

    listenerClose(){
        // When the user clicks on <span> (x), close the modal
        this.closeBtn.onclick = () => {
            this.close()
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = (event) => {
            if (event.target == this.element) {
                this.close()
            }
        }
    }

    /** Callback **/
    onOpen(callback){
        this.onOpenCallback = callback
    }

    onClose(callback){
        this.onCloseCallback = callback
    }

    /** Methodes **/

    open(data = null){
        this.element.style.display = "block";
        this.data = data
        if(this.onOpenCallback !== null){
            this.onOpenCallback(this.data)
        }
    }

    close(){
        this.element.style.display = "none";
        if(this.onCloseCallback !== null){
            this.onCloseCallback()
        }
    }
}

export default Modal