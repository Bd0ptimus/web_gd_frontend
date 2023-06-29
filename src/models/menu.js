class Menu {
    constructor(id, translationId, path, forAdmin, isParent, childs, isSubmenu) {
        this.id = id;
        this.translationId = translationId;
        this.path = path;
        this.forAdmin = forAdmin;
        this.isParent = isParent;
        this.childs = childs;
        this.isSubmenu = isSubmenu;

    }
}

export default Menu;