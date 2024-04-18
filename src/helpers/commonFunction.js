import Router from 'next/router';
import filesApi from "@/api/file";
import useAxiosRequest from './axiosRequest';
const useCommonFunction = () => {
    const axiosRequest = useAxiosRequest()
    const commonFunction = {
        async getFileById (fileId) {
            let data = {};
            const response = await axiosRequest.axiosGet(`/api/file/get-file/${fileId}`);
            const fileData = response;
            if (fileData.errCode != 0) {
                Router.push(`/error404`);
                return null
            }
        
            if (fileData.data.file.data == undefined) {
                Router.push(`/error404`);
                return null
            }
            data.products = fileData.data.file.data;
            data.fileId = fileId
            return data
        },
        async createNewFile (products) {
            const createFileRes = await axiosRequest.axiosPost(`/api/file/create-file`, {
                products
            });

            const newFileData = createFileRes
            if (newFileData.errCode != 0 ) {
                console.error('create file error : ', newFileData)
                return 0
            }
        
            if (newFileData.data.newFileId == undefined) {
                console.error('create file error undefined : ', newFileData)
                return 0
            }
        
            const newFileId = newFileData.data.newFileId
            Router.push(`/${newFileId}`);
            return 1
        },
    }
    return commonFunction
}
export default useCommonFunction;

// export const convertDateString = async (dateString) => {
//     const date = new Date(dateString);

//     const day = date.getDate();
//     const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
//     const year = date.getFullYear();

//     const formattedDate = `${day}/${month}/${year}`;
//     return formattedDate;
// };

// export const getFileById = async (fileId) => {
//     let data = {};
//     const response = await filesApi.getFile(fileId);
//     const fileData = response;
//     if (fileData.errCode != 0) {
//         console.log('Lỗi get file id : ', fileId, ' --> ', fileData);
//         Router.push(`/error404`);
//         return null
//     }

//     if (fileData.data.file.data == undefined) {
//         console.log('Lỗi get resquest fileId : ', fileId, ' --> ', fileData);
//         Router.push(`/error404`);
//         return null
//     }
//     console.log('filedata : ', fileData)
//     data.products = fileData.data.file.data;
//     data.fileId = fileId
//     return data
// }