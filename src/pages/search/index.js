import InstructionSearching from "@/components/sections/instructionSearching";
import {Input, Button} from "@nextui-org/react";
import { BsCalendar2Week, BsChevronDown   } from 'react-icons/bs';
import { useEffect, useState, useRef } from 'react';


import styles from './search.module.scss';
import SelectionV1 from "@/components/elements/selectionV1";
import SelectionV2 from "@/components/elements/selectionV2";
import SearchResult from "@/components/sections/searchResult";
function SearchPage() {
    const [yearStudy, setYearStudy] = useState(0);
    const [openModalResult, setOpenModalResult] = useState(false);
    const yearOptions = [
        {
            value: 2020,
            content: 2020
        },
        {
            value: 2021,
            content: 2021
        },
        {
            value: 2022,
            content: 2022
        },
        {
            value: 2023,
            content: 2023
        },
        {
            value: 2024,
            content: 2024
        },
        {
            value: 2025,
            content: 2025
        },
        {
            value: 2026,
            content: 2026
        },
        {
            value: 2027,
            content: 2027
        },
        {
            value: 2028,
            content: 2028
        },
        {
            value: 2029,
            content: 2029
        }
    ]

    const items = [
        {
            value: "examination",
            content: "Thi sát hạch đầu vào",
        },
        {
            value: "audition1",
            content: "Thi thử đợt 1",
        },
        {
            value: "audition2",
            content: "Thi thử đợt 2",
        },
    ];
    const searchHandler = () => {
        setOpenModalResult(true);
    }
    const searchResultModalOnHide = () => {
        setOpenModalResult(false);
    }
    return (
        <div style={{marginTop:120}}>
            <div className = {`d-flex justify-content-center`}>
                <div className = {`d-block justify-content-center mx-3 mx-md-0`}>
                    <div className = {`row d-flex justify-content-center`}>
                        <h1 className={`text-center`} style={{fontSize:40, fontWeight:700}}>Tra cứu điểm thi, kết quả học tập</h1>
                    </div>
                    <div className = {`row d-flex justify-content-center mx-1 mx-md-0`}>
                        <InstructionSearching/>
                    </div>
                    <div className = {`d-block justify-content-center`}>

                        <div className={`my-3 d-flex justify-content-center`}>
                            <SelectionV1 label="Năm thi" placeholder="Chọn năm thi" options={yearOptions} endContent={<BsCalendar2Week/>} response = {(e)=>setYearStudy(e)}/>
                        </div>
                        <div className={`my-3 d-flex justify-content-center`}>
                            <SelectionV2 label="Kì thi" placeholder="Chọn kì thi" options={items} endContent={<BsChevronDown/>} response = {(e)=>setYearStudy(e)}/>
                        </div>
                        <div className={`my-3 d-flex justify-content-center`}>
                            <Input
                                type="number"
                                label="Số báo danh"
                                labelPlacement='outside'
                                variant="bordered"
                                placeholder="Nhập số báo danh"
                            />
                        </div>

                        <div className={`my-5 d-flex justify-content-center`}>
                            <Button className={`${styles.searchBtn}`} onClick={()=>searchHandler()}>
                                Tra cứu điểm thi
                            </Button>
                        </div>
                        
                    </div>
                </div>
            </div>
            <SearchResult show={openModalResult}
                onHide={()=>searchResultModalOnHide()}/>
        </div>
    );
}

export default SearchPage;