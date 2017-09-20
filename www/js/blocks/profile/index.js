import Block from '../block/index.jsstar';

export class Profile extends Block {
    constructor(template) {
        super(document.createElement('div'));
        this._template = template;
    }

    setContent(renderContext) {
        this._element = this._template({context: renderContext});
    }
}