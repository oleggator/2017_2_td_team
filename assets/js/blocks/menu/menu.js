import './menu.styl';

import Block from '../block/block.js';

/**
 * Компонент главного меню
 * [Конфигурация кнопок] {@link '../configs/menu-button.js'}
 *
 * @module Menu
 */
export default class Menu extends Block {

    /**
     * Конструирует меню с заданными параметрами
     *
     * @param {Array<Button>}buttons - список кнопок меню
     * @param {*}attrs - объект с полями, содержащими аттрибуты компонента
     * @param {Array<string>}classes - список классов компонента
     */
    constructor(buttons, attrs = {}, classes = []) {
        const menu = document.createElement('div');
        super(menu);
        this.setAttributes(attrs);
        this.setClasses(classes);
        buttons.forEach(button => this.append(button));
    }
}
