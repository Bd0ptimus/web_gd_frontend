import Image from 'next/image'


export const listToTree = (list) => {
    var map = {}, node, roots = [], i;

    for (i = 0; i < list.length; i += 1) {
        if (!list[i].pid) {
            list[i].label = <span className={`d-flex`}><img style={{ height: 30, width: 'auto', marginTop: 3, marginRight: 10 }} src={process.env.NEXT_PUBLIC_APP_BACKEND_URL + list[i].logoPath} /><p style={{ fontSize: 15, marginBottom: 0, marginTop: 4 }}>{list[i].label}</p></span>;

        } else {
            list[i].label = <span className={`d-flex`}><p style={{ fontSize: 15, marginBottom: 0, marginTop: 4 }}>{list[i].label}</p></span>;

        }


        map[list[i].id] = i; // initialize the map
        list[i].nodes = []; // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.pid !== null) {
            // if you have dangling branches check that map[node.parentId] exists
            list[map[node.pid]].nodes.push(node);
        } else {
            roots.push(node);
        }
    }
    return roots;
}
