import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import styles from './instructionSearching.module.scss';

function InstructionSearching () {
    return (
        <Card className={`${styles.cardSection} py-4`}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Hướng dẫn tra cứu:</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <div className={`${styles.pcSection} justify-content-around`}>
                    <div className={`d-flex justify-content-center`}>
                        <div className={`${styles.numberStep} d-flex justify-content-center`}>1</div>
                        <p className={`${styles.textStep} text-center`}>Chọn năm thi</p>
                    </div>
                    <div className={`d-flex justify-content-center`}>
                        <div className={`${styles.horizontalArrow}`}></div>
                    </div>
                    <div className={`d-flex justify-content-center`}>
                        <div className={`${styles.numberStep} d-flex justify-content-center`}>2</div>
                        <p className={`${styles.textStep} text-center`}>Chọn kì thi</p>
                    </div>
                    <div className={`d-flex justify-content-center`}>
                        <div className={`${styles.horizontalArrow}`}></div>
                    </div>
                    <div className={`d-flex justify-content-center`}>
                        <div className={`${styles.numberStep} d-flex justify-content-center`}>3</div>
                        <p className={`${styles.textStep} text-center`}>Nhập số báo danh</p>
                    </div>
                    <div className={`d-flex justify-content-center`}>
                        <div className={`${styles.horizontalArrow}`}></div>
                    </div>
                    <div className={`d-flex justify-content-center`}>
                        <div className={`${styles.numberStep} d-flex justify-content-center`}>4</div>
                        <p className={`${styles.textStep} text-center`}>Tra cứu</p>
                    </div>
                </div>
                <div className={`${styles.mbSection}`}>
                    <div className={`d-flex justify-content-start mx-2 my-2`}>
                        <div className={`${styles.numberStep} d-flex justify-content-center`}>1</div>
                        <p className={`${styles.textStep} text-center`}>Chọn năm thi</p>
                    </div>
                    <div className={`d-flex justify-content-start mx-2`}>
                        <div className={`${styles.verticalArrow}`}></div>
                    </div>
                    <div className={`d-flex justify-content-start mx-2  my-2`}>
                        <div className={`${styles.numberStep} d-flex justify-content-center`}>2</div>
                        <p className={`${styles.textStep} text-center`}>Chọn kì thi</p>
                    </div>
                    <div className={`d-flex justify-content-start mx-2`}>
                        <div className={`${styles.verticalArrow}`}></div>
                    </div>
                    <div className={`d-flex justify-content-start mx-2 my-2`}>
                        <div className={`${styles.numberStep} d-flex justify-content-center`}>3</div>
                        <p className={`${styles.textStep} text-center`}>Nhập số báo danh</p>
                    </div>
                    <div className={`d-flex justify-content-start mx-2`}>
                        <div className={`${styles.verticalArrow}`}></div>
                    </div>
                    <div className={`d-flex justify-content-start mx-2 my-2`}>
                        <div className={`${styles.numberStep} d-flex justify-content-center`}>4</div>
                        <p className={`${styles.textStep} text-center`}>Tra cứu</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default InstructionSearching;