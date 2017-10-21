import Route from './route.js';
import {globalEventBus} from './globalEventBus.js';

export default class Router {

    constructor(root, viewsParent) {

        this.currentView = null;
        this.viewsParent = viewsParent;
        this.routes = new Map();
        this.currentView = null;
        this.bus = globalEventBus;
    }

    register(route, viewConstructor) {

        this.routes.set(route, new Route(new viewConstructor(this.viewsParent)));

    }

    start() {
        window.onpopstate = () =>
            this.go(window.location.pathname);

        this.viewsParent.addEventListener('click', event => {
            if (event.target.tagName.toLowerCase() !== 'a') {
                return;
            }
            if (event.target.getAttribute('target') === '_blank') {
                return;
            }
            event.preventDefault();
            const pathname = event.target.pathname;
            this.go(pathname);
        });

        this.bus.register('router:redirect', (payload) => {
            this.go(payload.path);
        });

        this.go(window.location.pathname);
    }

    go(path) {
        const route = this.routes.get(path);
        if (!route) {
            return;
        }
        if (this.currentView) {
            this.currentView.pause();
        }
        window.history.pushState({}, '', path);
        route.prepare();
        route.view.resume();
        this.currentView = route.view;
    }

}
