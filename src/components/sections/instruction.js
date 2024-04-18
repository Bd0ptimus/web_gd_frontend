import { Table, 
    TableHeader, 
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell, 
    Card, 
    CardHeader, 
    Tooltip, 
    Button,
    Divider,
    CardBody,
    Input,
    Link } from "@nextui-org/react";
function Instruction () {
    return (
        <div className="py-4">
            <Card className="max-w-[400px]">
                <CardBody>
                    <p className="text-xl text-default-500">App hỗ trợ quét mã КИЗ</p>
                    <p>Hướng dẫn sử dụng: </p>
                    <p>1. Tải file Excel từ sàn WB về máy tính </p>
                    <p>2. Up file excel lên app </p>
                    <p>3. Trên điện thoại nhập mã số file sau đó ấn Tìm file </p>
                    <p>4. Sử dụng điện thoại để quét mã QR và КИЗ </p>
                    <p>5. Tải file đã điền КИЗ về máy tính</p>
                    <p>6. Up file Excel đã điền КИЗ lên sàn WB</p>
                </CardBody>
            </Card>
        </div>
    )
}

export default (Instruction);