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
    Pagination
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenToSquare,
    faUpload,
    faCircleXmark,
    faDownload,
    faTrash,
    faMagnifyingGlass,
    faPlay,
    faStop
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef, useLayoutEffect  } from 'react';
import Link from "next/link";
import { BsCalendar2Week, BsChevronDown   } from 'react-icons/bs';
import React from "react";
import { useRouter } from "next/router";

import {ssrAxiosGet} from '@/helpers/ssrAxiosRequest';
import useAxiosRequest from '@/helpers/axiosRequest';
import SelectionV1 from "@/components/elements/selectionV1";
import SelectionV2 from "@/components/elements/selectionV2";
import {formatTimeStampToCommonDate, roundToCustomDecimal} from '@/helpers/commonFunction';
import ToastCpn from '@/components/layouts/toastCpn';
import UploadStudentInfoModal from "@/components/sections/uploadStudentInfoModal";
import UploadStudentInfoErrorModal from "@/components/sections/uploadStudentInfoErrorModal";
import useCommonFunction from "@/helpers/commonFunctionHook";
import UpdateStudentInfoModal from "@/components/sections/updateStudentInfoModal";
function ResultPage ({data}) {
    const [studentInfo, setStudentInfo] = useState([]);
    const [years, setYears] = useState([]);
    const [exams, setExams] = useState([]);
    const [qValue, setQValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [sortDescriptor, setSortDescriptor] = useState({});
    const [importDataMapped, setImportDataMapped] = useState([]);
    const [uploadStudentInfoModalOpen, setUploadStudentInfoModalOpen] = useState(false);
    const [uploadStudentInfoErrorModalOpen, setUploadStudentInfoErrorModalOpen] = useState(false);
    const [uploadErrorYear, setUploadErrorYear] = useState(null);
    const [uploadErrorExam, setUploadErrorExam] = useState('');
    const [uploadErrorInfos, setUploadErrorInfos] = useState([]);
    const [selectedYear, setSelectedYear] = useState();
    const [updateStudentInfoModalOpen, setUpdateStudentInfoModalOpen] = useState(false);
    const [selectedInfo, setSelectedInfo] = useState({});

    const axiosRequest = useAxiosRequest();
    const commonFunction = useCommonFunction();
    const router = useRouter();
    const columns = [
        { name: "STT", uid: "external_id", sortable: true},
        { name: "Họ tên", uid: "name" },
        { name: "Số báo danh", uid: "student_id" },
        { name: "Số điện thoại", uid: "contact" },
        { name: "Số điện thoại 2", uid: "contact2" },
        { name: "Ngày sinh", uid: "birth_date", sortable: true},
        { name: "Năm thi", uid: "year"},
        { name: "Kỳ thi", uid: "exam"},
        { name: "Phòng thi", uid: "room" },
        { name: "Địa điểm", uid: "location" },
        { name: "Môn thi", uid: "subject" },
        { name: "Thời gian", uid: "time" },
        { name: "Điểm Toán", uid: "math", sortable: true},
        { name: "Điểm Tiếng Việt", uid: "literature", sortable: true},
        { name: "Điểm Tiếng Anh", uid: "english", sortable: true},
        { name: "Tổng điểm", uid: "total", sortable: true},
        { name: "Link bài thi", uid: "link_exam" },
        { name: "Thao tác", uid: "actions" },
    ];
    const importDataTemplate = [
        {
            value: 'full_name',
            options: [
                'Họ Và Tên',
                'họ và tên',
                'họ Và tên',
                'họ và Tên',
                'hoj vaf teen',
                'Họ và tên',
                'Họ tên',
                'Họ Tên',
                'họ tên',
                'HỌ VÀ TÊN',
                'HỌ TÊN',
                'tên',
                'Tên',
                'TÊN',
                'tên học sinh',
                'Tên Học Sinh',
                'Ho ten',
                'Ho va ten',
                'Ho Va Ten',
                'Ho Ten',
                'Họ và tên thí sinh',
                'Họ Và Tên Thí Sinh',
            ]
        }, {
            value: 'birth_date',
            options: [
                'Ngày sinh',
                'Ngày Sinh',
                'ngày sinh',
                'NGÀY SINH',
                'ngày Sinh',
                'sinh ngày',
                'Sinh ngày',
                'sinh Ngày',
                'SINH NGÀY',
                'Ngay sinh',
                'Ngay Sinh',
                'Sinh Ngay',
                'Sinh ngay'
            ]
        }, {
            value: "student_id",
            options: [
              "Số báo danh",
              "Số Báo Danh",
              "số báo danh",
              "SỐ BÁO DANH",
              "số Báo Danh",
              "báo danh số",
              "Báo Danh Số",
              "báo Danh Số",
              "BÁO DANH SỐ",
              "SBD",
              "sbd",
              "Sbd",
              'So bao danh',
              'So Bao Danh'
            ]
        }, {
            value: "room",
            options: [
              "Phòng thi",
              "Phòng Thi",
              "phòng thi",
              "PHÒNG THI",
              "phòng Thi",
              "thi phòng",
              "Thi Phòng",
              "thi Phòng",
              "THI PHÒNG",
              'Phong Thi',
              'Phong thi'
            ]
        }, {
            value: "math_score",
            options: [
              "Điểm toán",
              "Điểm Toán",
              "điểm toán",
              "ĐIỂM TOÁN",
              "điểm Toán",
              "toán điểm",
              "Toán Điểm",
              "toán Điểm",
              "TOÁN ĐIỂM",
              'Diem toan',
              'Diem Toan',
              'Toans',
              'Toán',
              'toán',
              'Toan'
            ]
        }, {
            value: "literature_score",
            options: [
              "Điểm tiếng việt",
              "Điểm Tiếng Việt",
              "điểm tiếng việt",
              "ĐIỂM TIẾNG VIỆT",
              "điểm Tiếng Việt",
              "tiếng việt điểm",
              "Tiếng Việt Điểm",
              "tiếng Việt Điểm",
              "TIẾNG VIỆT ĐIỂM",
              'Diem Tieng Viet',
              'Diem tieng viet',
              'Tiếng Việt',
              'Tiếng việt',
              'tiếng việt'
            ]
        }, {
            value: "english_score",
            options: [
              "Điểm tiếng anh",
              "Điểm Tiếng Anh",
              "điểm tiếng anh",
              "ĐIỂM TIẾNG ANH",
              "điểm Tiếng Anh",
              "tiếng anh điểm",
              "Tiếng Anh Điểm",
              "tiếng Anh Điểm",
              "TIẾNG ANH ĐIỂM",
              'Diem Tieng Anh',
              'Diem tieng anh',
              'Tiếng Anh',
              'Tiếng anh',
              'tiếng anh',
            ]
        }, {
            value: "link_exam",
            options: [
              "Link bài thi",
              "Link Bài Thi",
              "link bài thi",
              "LINK BÀI THI",
              "link Bài Thi",
              "bài thi link",
              "Bài Thi Link",
              "bài Thi Link",
              "BÀI THI LINK",
              'Link bai thi',
              'Link Bai Thi'
            ]
        }, {
            value: "year",
            options: [
                "Năm thi",
                "Năm Thi",
                "năm thi",
                "NĂM THI",
                "năm Thi",
                "thi năm",
                "Thi Năm",
                "thi Năm",
                "THI NĂM",
                'Nam thi',
                'nam thi',
                'Nam Thi'
            ]
        }, {
            value: "exam",
            options: [
                "Kỳ thi",
                "Kỳ Thi",
                "kỳ thi",
                "KỲ THI",
                "kỳ Thi",
                "thi kỳ",
                "Thi Kỳ",
                "thi Kỳ",
                "THI KỲ",
                'Ky thi',
                'ky thi',
                'Ky Thi'
            ]
        }, {
            value: "contact",
            options: [
                "Số điện thoại",
                "Số Điện Thoại",
                "Số điện thoại liên hệ",
                "Số Điện Thoại Liên Hệ",
                "SDT",
                "sdt",
                "Sdt",
                "Số Điện Thoại Người Thân",
                "Số điện thoại người thân",
                "Số điện thoại 1",
                "Số Điện Thoại 1",
                "Số điện thoại liên hệ 1",
                "Số Điện Thoại Liên Hệ 1",
                "SDT 1",
                "sdt 1",
                "Sdt 1",
                "Số Điện Thoại Người Thân 1",
                "Số điện thoại người thân 1",
                "Số điện thoại1",
                "Số Điện Thoại1",
                "Số điện thoại liên hệ1",
                "Số Điện Thoại Liên Hệ1",
                "SDT1",
                "sdt1",
                "Sdt1",
                "Số Điện Thoại Người Thân1",
                "Số điện thoại người thân1",
            ]
        },
        {
            value: "contact2",
            options: [
                "Số điện thoại 2",
                "Số Điện Thoại 2",
                "Số điện thoại liên hệ 2",
                "Số Điện Thoại Liên Hệ 2",
                "SDT 2",
                "sdt 2",
                "Sdt 2",
                "Số Điện Thoại Người Thân2",
                "Số điện thoại người thân2",
                "Số điện thoại2",
                "Số Điện Thoại2",
                "Số điện thoại liên hệ2",
                "Số Điện Thoại Liên Hệ2",
                "SDT2",
                "sdt2",
                "Sdt2",
                "Số Điện Thoại Người Thân2",
                "Số điện thoại người thân2",
            ]
        },
        {
            value: "external_id",
            options: [
                "STT",
                "stt",
                "Stt",
                "Số thứ tự",
                "Số Thứ Tự",
            ]
        }, {
            value: "location",
            options: [
                "Địa điểm",
                "Địa Điểm",
                "Dia Diem",
                "Dia diem",
                "địa điểm",
                "Địa điểm thi",
                "Địa Điểm Thi",
                'địa điểm thi'
            ]
        }, {
            value: "time",
            options: [
                "Thời gian thi",
                "thời gian thi",
                "Thời Gian Thi",
                "Thời gian",
                "Thời Gian",
                "thời gian",
            ]
        }, {
            value: "subject",
            options: [
                "Môn thi",
                "môn thi",
                "Mon thi",
                "mon thi",
                "Môn Thi",
            ]
        }
    ];

    
    useEffect(() => {
        setStudentInfo(data.studentInfo.data)
        handleImportData();
    }, [data.studentInfo.data])

    useEffect(() => {
        const yearData = data.filterData.years.map((item) => {
            return {
                value: item.year,
                content: item.year
            }
        });
        yearData.unshift({
            value: 'all',
            content: 'Tất cả'
        })

        setYears(yearData)
    }, [data.filterData.years])

    useEffect(() => {
        const examData = data.filterData.exams.map((item) => {
            return {
                value: item.id,
                content: item.exam
            }
        });

        examData.unshift({
            value: 'all',
            content: 'Tất cả'
        })
        setExams(examData)
    }, [data.filterData.exams])

    useEffect(() => {
        setCurrentPage(data.studentInfo.current_page)
    }, [data.studentInfo.current_page])

    useEffect(() => {
        setPages(data.studentInfo.last_page)
    }, [data.studentInfo.last_page])

    useEffect(() => {
        setTotalRecords(data.studentInfo.total)
    }, [data.studentInfo.total])

    useEffect(() => {
        setupRouterParams('page', currentPage)
    }, [currentPage])

    useEffect(() => {
        let sortValue = ''
        switch (sortDescriptor.direction) {
            case 'descending':
                sortValue = 'desc';
                break;
            case 'ascending':
                sortValue = 'asc';
                break
        }
        setMultipleRouterParams ([
            {
                key: 'direction',
                value: sortValue
            }, {
                key: 'sort',
                value: sortDescriptor.column
            }
        ])
    }, [sortDescriptor])

    const setupRouterParams = (key, value) => {
        router.query[`${key}`] = value
        router.push(router)
    }
    const setMultipleRouterParams = (queries) => {
        queries.forEach((item) => {
            router.query[`${item.key}`] = item.value
        })
        router.push(router)
    }

    const qInputDown = (e) => {
        if (e.key === 'Enter') {
            // setupRouterParams('q', qValue)
            setMultipleRouterParams ([
                {
                    key: 'q',
                    value: qValue
                }, {
                    key: 'page',
                    value: 1
                }
            ])
        }
    }

    const setYearStudy = (data) => {
        // setupRouterParams('school_year', data)
        setMultipleRouterParams ([
            {
                key: 'school_year',
                value: data
            }, {
                key: 'page',
                value: 1
            }
        ])
    }

    const setExam = (data) => {
        // setupRouterParams('exam_type', data)
        setMultipleRouterParams ([
            {
                key: 'exam_type',
                value: data
            }, {
                key: 'page',
                value: 1
            }
        ])
    }

    const onPreviousPage = () => {

    }

    const onNextPage = React.useCallback(() => {
    }, [currentPage, pages]);
    

    const onRowsPerPageChange = React.useCallback((e) => {
        setMultipleRouterParams ([
            {
                key: 'per_page',
                value: Number(e.target.value)
            }, {
                key: 'page',
                value: 1
            }
        ])
    }, []);

    const handleUploadBtnClick = () => {
        setUploadStudentInfoModalOpen(true);
    };

    const onModalWarning = (message) => {
        ToastCpn.toastWarning(message);
    }

    const onModalSuccess = (message) => {
        ToastCpn.toastSuccess(message);
    }

    const onGetErrorFromUploadInfo = (e) => {
        setUploadErrorYear(e.year)
        const exam = exams.find(item => item.value == e.exam)
        setUploadErrorExam(exam.content)
        setUploadErrorInfos(e.infos)
        setUploadStudentInfoErrorModalOpen(true);
    }

    const handleImportData = () => {
        let data = []
        importDataTemplate.forEach((item) => {
            item.options.forEach((op) => {
                data[op] = item.value
            })
        })
        setImportDataMapped(data);
    }

    const editInfoHandler = (item) => {
        setSelectedInfo(item)
        setUpdateStudentInfoModalOpen(true)
    }

    const topContent = React.useMemo(() => {
        return (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-default-400 text-small">Tổng cộng {totalRecords} kết quả</span>
              <label className="flex items-center text-default-400 text-small">
                Số dòng mỗi trang:
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  onChange={onRowsPerPageChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="500">500</option>
                </select>
              </label>
            </div>
          </div>
        );
      }, [
        totalRecords,
        onRowsPerPageChange,
      ]);

    const bottomContent = React.useMemo(() => {
        return (
          <div className="py-2 px-2 flex justify-between items-center">
            <span className="w-[30%] text-small text-default-400">
              Trang hiện tại : {currentPage}
            </span>
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={currentPage}
              total={pages}
              onChange={setCurrentPage}
            />
            <div className="hidden sm:flex w-[30%] justify-end gap-2">
              <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={() => onPreviousPage()}>
                Previous
              </Button>
              <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={() => onNextPage()}>
                Next
              </Button>
            </div>
          </div>
        );
    }, [currentPage, pages]);
    
    return (
        <div style={{marginTop:120}}>
            <div className={`m-3 p-0 d-block d-md-flex justify-content-start`}>
                <div className={`col-6 col-sm-4 col-md-3 p-2`}>
                    <Button
                        variant="bordered"
                        startContent={<FontAwesomeIcon icon={faUpload} />}
                        onClick={handleUploadBtnClick}
                    >
                        Tải dữ liệu lên
                    </Button>
                </div>
            </div>

            <div className={`m-3 p-0 d-block d-md-flex justify-content-start`}>
                <div className={`col-12 col-sm-6 col-md-4 p-2`}>
                    <Input
                        type="text"
                        label="Tìm kiếm học sinh"
                        labelPlacement='outside'
                        variant="bordered"
                        placeholder='Tìm kiếm'
                        value={qValue}
                        onChange={(e) => setQValue(e.target.value)}
                        onKeyDown={(e) => qInputDown(e)}
                        endContent={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                    />
                </div>
                <div className={`col-12 col-sm-6 col-md-4 p-2`}>
                    <SelectionV1 label="Năm thi" placeholder="Chọn năm thi" options={years} endContent={<BsCalendar2Week />} response={(e) => setYearStudy(e)} />
                </div>
                <div className={`col-12 col-sm-6 col-md-4 p-2`}>
                    <SelectionV2 label="Kì thi" placeholder="Chọn kì thi" options={exams} endContent={<BsChevronDown />} response={(e) => setExam(e)} />
                </div>
            </div>
           
            <div className={`mx-3 my-5 p-0 d-block d-md-flex justify-content-center`}>
                <Table aria-label="Result Table"
                    color="default"
                    selectionMode="single"
                    bottomContent={bottomContent}
                    topContent={topContent}
                    bottomContentPlacement="outside"
                    topContentPlacement="outside"
                    onSortChange={setSortDescriptor}
                    sortDescriptor={sortDescriptor}
                    classNames={{
                        wrapper: "max-h-[382px]",
                    }}
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn 
                            key={column.uid} 
                            align={column.uid === "actions" ? "center" : "start"}
                            allowsSorting={column.sortable}
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody>
                        {
                            studentInfo.map((item) => {
                                const mathScore = Number(item.math) ?? 0;
                                const literatureScore = Number(item.literature) ?? 0;
                                const englishScore = Number(item.english) ?? 0;
                                const totalScore = roundToCustomDecimal(mathScore + literatureScore + englishScore, 2);
                                let itemYear = '';
                                let itemExam = '';
                                if (item.examination_school_year && item.examination_school_year.school_years && item.examination_school_year.school_years.year) {
                                    itemYear = item.examination_school_year.school_years.year
                                }

                                if (item.examination_school_year && item.examination_school_year.examinations && item.examination_school_year.examinations.exam) {
                                    itemExam = item.examination_school_year.examinations.exam
                                }
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <p className="text-bold text-sm capitalize">{item.external_id ?? ''}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <p className="text-bold text-sm capitalize">{item.full_name ?? ''}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <p className="text-bold text-sm capitalize">{item.student_id ?? ''}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <p className="text-bold text-sm capitalize">{item.contact ?? ''}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <p className="text-bold text-sm capitalize">{item.contact2 ?? ''}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <p className="text-bold text-sm capitalize">{formatTimeStampToCommonDate(item.birth_date) ?? ''}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <p className="text-bold text-sm capitalize">{itemYear ?? ''}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <p className="text-bold text-sm capitalize">{itemExam ?? ''}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <p className="text-bold text-sm capitalize">{item.room ?? ''}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <p className="text-bold text-sm capitalize">{item.location ?? ''}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <p className="text-bold text-sm capitalize">{item.subject ?? ''}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <p className="text-bold text-sm capitalize">{item.time ?? ''}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <p className="text-bold text-sm capitalize">{mathScore != 0 ? mathScore : ''}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <p className="text-bold text-sm capitalize">{literatureScore != 0 ? literatureScore : ''}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <p className="text-bold text-sm capitalize">{englishScore != 0 ? englishScore : ''}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <p className="text-bold text-sm capitalize">{totalScore != 0 ? totalScore : ''}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <Link href={item.link_exam ?? ''} target="_blank">{item.link_exam ? 'Click để xem' : ''}</Link>
                                                {/* <p className="text-bold text-sm capitalize">{(item.exam_link) ?? ''}</p> */}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="relative flex items-center gap-2">
                                                <Button variant="bordered" startContent={<FontAwesomeIcon icon={faPenToSquare} />} onClick={() => editInfoHandler(item)}> Sửa thông tin</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
                <ToastCpn />
                <UploadStudentInfoModal
                    years={years}
                    exams={exams}
                    importDataMapped={importDataMapped}
                    show={uploadStudentInfoModalOpen}
                    onHide={() => { setUploadStudentInfoModalOpen(false); commonFunction.reloadPage(); }}
                    onErrorGet={(e) => onGetErrorFromUploadInfo(e)}
                    onModalWarning={(e) => onModalWarning(e)}
                    onModalSuccess={(e) => onModalSuccess(e)} />
                <UploadStudentInfoErrorModal
                    year={uploadErrorYear}
                    exam={uploadErrorExam}
                    infos={uploadErrorInfos}
                    show={uploadStudentInfoErrorModalOpen}
                    onHide={() => { setUploadStudentInfoErrorModalOpen(false); commonFunction.reloadPage(); }}
                    onModalWarning={(e) => onModalWarning(e)}
                    onModalSuccess={(e) => onModalSuccess(e)} />
                
                <UpdateStudentInfoModal 
                    years={years}
                    exams={exams}
                    data={selectedInfo}
                    show={updateStudentInfoModalOpen}
                    onHide={() => { setUpdateStudentInfoModalOpen(false);}}
                    onSuccessGet={() =>  commonFunction.reloadPage()}
                    onModalWarning={(e) => onModalWarning(e)}
                    onModalSuccess={(e) => onModalSuccess(e)}
                />

            </div>
            

        </div>
    )
}

export async function getServerSideProps(context) {
    const filterData = await ssrAxiosGet(context, `/api/public/years-exams-info`);
    const queryParams = context.query;
    const queryString = Object.keys(queryParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&');
    const studentInfoUrl = `/api/student-information/list?${queryString}`;
    const studentInfo = await ssrAxiosGet(context, studentInfoUrl);
    const data = {
        "studentInfo": studentInfo?.data ?? null,
        "filterData": filterData?. data ?? null
    }
    return { props: { data } }
}

export default ResultPage;