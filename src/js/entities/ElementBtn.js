class ElementBtn {
    constructor (tagName, attObj, event, classArr) {
        this.childElem = document.createElement(tagName);
        classArr.map(item => {
            this.childElem.classList.add(item)
        });
        this.childElem.addEventListener('click', event);

        for (let key in attObj) {
            this.childElem.setAttribute(key, attObj[key]);
        }

    }

    render (parent) {
        parent.appendChild(this.childElem);
    }
}