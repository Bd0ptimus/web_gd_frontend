import Menu from '../models/menu.js';

const AdminCateProductManager = new Menu(2, 'menu.productCategoryManager', '/admin/products/productCategoryManager', true, false, [], true);
const AdminProductManager = new Menu(3, 'menu.productManager', '/admin/products/productManager', true, false, [], true);
const AdminRequestManager = new Menu(8, 'menu.requestManager', '/admin/requests', true, false, [], true)
export const MENUS = [
    new Menu(0, 'menu.home', '/', false, false, [], false),
    new Menu(1, 'menu.adminManager', '', true, true, [AdminCateProductManager, AdminProductManager, AdminRequestManager], false),
    AdminCateProductManager,
    AdminProductManager,
    AdminRequestManager,
    new Menu(4, 'menu.product', '/products', false, false, [], false),
    new Menu(5, 'menu.about', '', false, false, [], false),
    new Menu(6, 'menu.service', '', false, false, [], false),
    new Menu(7, 'menu.contacts', '', false, false, [], false),


]