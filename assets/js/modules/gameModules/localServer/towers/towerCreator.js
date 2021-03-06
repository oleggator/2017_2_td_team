export default class TowerCreator {
    constructor(towerFactory, idSource) {
        this._towerFactory = towerFactory;
        this.idSource = idSource;

    }

    createTower() {
        const tower = this._towerFactory.Create();
        tower.id = this.idSource.next().value;
        tower.typeid = this._towerFactory.typeid;
        return tower;
    }
}
