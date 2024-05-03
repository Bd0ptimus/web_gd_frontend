import { useRouter } from "next/router";

const useCommonFunction = () => {
    const router = useRouter();

    const commonFunction = {
        async reloadPage() {
            const pathWithParams = router.asPath;
            router.replace(pathWithParams);
        },
    }
    return commonFunction;
}

export default useCommonFunction;