import Head from 'next/head';

import 'react-simple-tree-menu/dist/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import ProductsApi from '@/api/products';
import FooterCpn from '@/components/layouts/footerCpn';
import HeaderCpn from '@/components/layouts/headerCpn';
import mainStyles from '@/pages/index.module.scss';
import ProductCpn from '@/components/elements/product/productCpn';

function ProductMain({ data }) {

    return (
        <>
            <div>
                <Head>
                    <title>Các sản phẩm </title>
                    <meta name="description" content="Generated by create next app" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
            </div>
            <div>
                <HeaderCpn></HeaderCpn>
                <div className={`${mainStyles.bodySec}`}>

                    <ProductCpn data={data}></ProductCpn>

                </div>

                <FooterCpn></FooterCpn>
            </div>
        </>);
}

export async function getServerSideProps() {
    let data = {};
    let products = await ProductsApi.getAllProductsPagination(1, null);
    let categories = await ProductsApi.getAllCategories();
    categories.data.data.data.map((item, index) => {
        item.label = item.name;
        item.key = item.id;
    });
    data.products = products.data;
    data.categories = categories.data;
    data.totalProducts = products.data.data.products.count;

    console.log(products.data);
    return { props: { data } }

}

export default ProductMain;