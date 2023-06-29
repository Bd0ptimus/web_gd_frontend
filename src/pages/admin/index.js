import { useRouter } from 'next/router';

function AdminIndex() {
    const router = useRouter()
    router.replace("/admin/login");
}

export default AdminIndex;