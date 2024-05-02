
function Home({ children }) {
    return (
        <>
        </>
    )
}
export async function getServerSideProps() {
    const data = {}
    return { props: { data } }
}

export default Home;