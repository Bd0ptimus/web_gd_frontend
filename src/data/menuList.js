import Menu from '../models/menu.js';

const AdminCateProductManager = new Menu(2, 'menu.productCategoryManager', '/admin/products/productCategoryManager', true, false, [], true);
const AdminProductManager = new Menu(3, 'menu.productManager', '/admin/products/productManager', true, false, [], true);
const AdminRequestManager = new Menu(8, 'menu.requestManager', '/admin/requests', true, false, [], true);
const AdminBlogManager = new Menu(9, 'menu.blogManager', '/admin/blogs', true, false, [], true)

export const MENUS = [
    new Menu(0, 'menu.home', '/', false, false, [], false),
    new Menu(5, 'menu.about', '/about', false, false, [], false),
    new Menu(4, 'menu.product', '/products', false, false, [], false),
    new Menu(6, 'menu.transportation', '', false, false, [], false),
    new Menu(7, 'menu.payment', '', false, false, [], false),
    new Menu(10, 'menu.blog', '/blogs', false, false, [], false),
    new Menu(1, 'menu.adminManager', '', true, true, [AdminCateProductManager, AdminProductManager, AdminRequestManager, AdminBlogManager], false),
    AdminCateProductManager,
    AdminProductManager,
    AdminRequestManager,
    AdminBlogManager,

]