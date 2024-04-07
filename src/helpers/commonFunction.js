import Router from 'next/router';
import filesApi from "@/api/file";

export const createNewFile = async (products) => {
    const createFileRes = await filesApi.createFile({
        products
    })
    const newFileData = createFileRes.data
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
};

export const getFileById = async (fileId) => {
    let data = {};
    const response = await filesApi.getFile(fileId);
    const fileData = response.data;
    if (fileData.errCode != 0) {
        console.log('Lỗi get file id : ', fileId, ' --> ', fileData);
        Router.push(`/error404`);
        return null
    }

    if (fileData.data.file.data == undefined) {
        console.log('Lỗi get resquest fileId : ', fileId, ' --> ', fileData);
        Router.push(`/error404`);
        return null
    }
    data.products = fileData.data.file.data;
    data.fileId = fileId
    return data
}