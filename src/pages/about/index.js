// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from 'next/font/google';
// import { connect } from 'react-redux';

// import * as actions from "@/store/action";


// import WorkingStep from '@/components/elements/mainpage/workingStep';
// import HowWorking from '@/components/elements/mainpage/howWorking';
// import Intro from '@/components/elements/mainpage/intro';
// import Overview from '@/components/elements/mainpage/overview';
// import Partners from '@/components/elements/mainpage/partners';
// import Order from '@/components/elements/mainpage/order';
// import styles from '../index.module.scss';

// import FooterCpn from '@/components/layouts/footerCpn';
// import HeaderCpn from '@/components/layouts/headerCpn';
// import ProductCpn from '@/components/elements/product/productCpn';
// import ProductsApi from '@/api/products';

// const inter = Inter({ subsets: ['latin'] })



// function Home({ children, lang, changeLanguage, userLogout, data }) {
//     function changeLangHandler(langid) {
//         changeLanguage(langid);
//     }
//     function logoutHandler() {
//         userLogout();
//     }
//     return (
//         <>
//             <div>
//                 <Head>
//                     <title>Về chúng tôi</title>
//                     <meta name="description" content="Generated by create next app" />
//                     <meta name="viewport" content="width=device-width, initial-scale=1" />
//                     <link rel="icon" href="/favicon.ico" />
//                 </Head>
//             </div>
//             <div>
//                 <HeaderCpn></HeaderCpn>
//                 <div className={`${styles.bodySec}`}>
//                     {/* <button onClick={() => { changeLangHandler('vi') }}>VI</button>
//                     <button onClick={() => { changeLangHandler('en') }}>EN</button>
//                     <button onClick={() => { changeLangHandler('ru') }}>RU</button> */}
//                     <Intro></Intro>
//                     <ProductCpn data={data}></ProductCpn>
//                     {/* <WorkingStep></WorkingStep> */}
//                     <HowWorking></HowWorking>
//                     <Overview></Overview>
//                     {/* <Partners></Partners> */}
//                     <Order></Order>
//                     {/* <button onClick={() => { logoutHandler() }}>EN</button> */}

//                 </div>

//                 <FooterCpn></FooterCpn>


//             </div>
//         </>
//     )
// }
// export async function getServerSideProps() {
//     let data = {};
//     let products = await ProductsApi.getAllProductsPagination(1, null);
//     let categories = await ProductsApi.getAllCategories();
//     categories.data.data.data.map((item, index) => {
//         item.label = item.name;
//         item.key = item.id;
//     });

//     data.products = products.data;
//     data.categories = categories.data;
//     data.totalProducts = products.data.data.products.count;

//     console.log(categories.data);
//     return { props: { data } }
// }

// function mapStateToProps(state) {
//     return { lang: state.system.language };
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         changeLanguage: (langId) => dispatch(actions.changeSystemLanguage(langId)),
//         userLogout: () => dispatch(actions.userLogout()),

//     };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Home);