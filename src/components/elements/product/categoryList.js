import { useState, useEffect } from 'react';
import {
    Tree,
    TreeItem,
    TreeItemLayout,
    TreeOpenChangeData,
    TreeOpenChangeEvent,
} from "@fluentui/react-components/unstable";
import Button from 'react-bootstrap/Button';
import {
    faPenToSquare,

} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from './categoryList.module.scss';
function CategoryList(props) {
    const [tree, setTree] = useState([]);
    useEffect(() => {
        setTree(props.tree);
    }, [props.tree]);

    const onOpenChange = (
        event,
        data
    ) => {
        if (data.type === "Click" || data.type === "Enter") {
            event.preventDefault();
            // TODO: We might need to add the ID of the treeeItem to the event
            // alert("click on item" + data.value);
            console.log('check data : ', data.value);
        }
    };
    function loadTree(item) {
        return (
            <TreeItem key={item.id} itemType={item.nodes.length != 0 ? "branch" : "leaf"} value={item.id}>
                <TreeItemLayout>
                    <div className={`${styles.listSec} d-flex justify-content-between`}>
                        {item.pid == null ? <img className={`${styles.logo}`} src={process.env.NEXT_PUBLIC_APP_BACKEND_URL + item.logoPath} /> : ''}
                        <h5>{item.name}</h5>
                        <FontAwesomeIcon icon={faPenToSquare} size="2xl" onClick={() => props.categoryChoose({ id: item.id, name: item.name, pid: item.pid, logoPath: item.logoPath })} />

                    </div>
                </TreeItemLayout>
                {
                    item.nodes.length != 0 ? item.nodes.map((subItem) => { return (<Tree key={item.id}>{loadTree(subItem)}</Tree>); }) : ''
                }
            </TreeItem>
        );
    }

    return (
        <>
            <Tree aria-label="Tree" onOpenChange={onOpenChange}>
                {
                    tree.map((item, index) => loadTree(item))
                }
            </Tree>

        </>
    );

}

export default CategoryList;