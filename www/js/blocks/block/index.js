export class Block {

    constructor(element = document.createElement('div')) {
        this._element = element;
    }

    set text(content) {
        this._element.textContent = content;
    }

    set html(inner) {
        this._element.innerHTML = inner;
    }

    get html() {
        return this._element.innerHTML;
    }

    get id() {
        return this._element.id;
    }

    set id(id) {
        return this._element.setIdAttribute(id);
    }

    static Create(tag = 'div', attrs = {}, classes = [], text = null) {
        const block = new Block(document.createElement(tag));
        block.setAttributes(attrs);
        block.setClasses(classes);
        block.text = text;
        return block;
    }

    setAttributes(attrs = {}) {
        for (let key in attrs) {
            this._element.setAttribute(key, attrs[key]);
        }
    }

    setClasses(classes = []) {
        classes.forEach(className => this._element.classList.add(className));
    }

    clear() {
        this._element.innerHTML = '';
        return this;
    }

    hide() {
        this._element.hidden = true;
        return this;
    }

    show() {
        this._element.hidden = false;
        return this;
    }

    append(element) {
        this._element.appendChild(element._element);
        return this;
    }

    on(event, callback) {
        this._element.addEventListener(event, callback);
        return function () {
            this._element.removeEventListener(event);
        }.bind(this);
    }
}
