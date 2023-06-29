
import axios from '../../../axios'
import autoAuth from '@/utils/autoAuth';
import { ChangeEvent, useState } from 'react';

function FileUploadMultiple() {
    autoAuth(123);
    const [fileList, setFileList] = useState(null);

    const handleFileChange = (e) => {
        setFileList(e.target.files);
    };

    const handleUploadClick = async () => {
        if (!fileList) {
            return;
        }

        // 👇 Create new FormData object and append files
        const data = new FormData();
        // data.append(`fileSelected`, fileList);
        for (const key of Object.keys(fileList)) {
            data.append('fileSelected', fileList[key])
        }
        data.append('name', "dung");

        // files.forEach((file, i) => {
        //     console.log('check file in foreach : ', file);
        //     data.append(`fileSelected`, file, file.name);
        // });

        // for (var pair of data.entries()) {
        //     console.log(pair[0] + ', ' + pair[1]);
        // }

        // console.log(data);

        // 👇 Uploading the files using the fetch API to the server
        console.log(data);
        let res = await axios.post(`/api/product/test`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',

            },
            credentials: 'include',
            method: 'POST',
        });
        console.log(res);
    };

    // 👇 files is not an array, but it's iterable, spread to get an array of files
    const files = fileList ? [...fileList] : [];

    return (
        <div>
            {/* <form method="POST" action="http://localhost:3005/api/product/test" encType="multipart/form-data" >
                <input type="file" onChange={handleFileChange} multiple name="fileSelected" />
                <button type="submit" > oke</button>
            </form> */}

            <input type="file" onChange={handleFileChange} multiple name="fileSelected" />

            <ul>
                {files.map((file, i) => (
                    <li key={i}>
                        {file.name} - {file.type}
                    </li>
                ))}
            </ul>

            <button onClick={handleUploadClick}>Upload</button>
        </div>
    );
}

export default FileUploadMultiple;