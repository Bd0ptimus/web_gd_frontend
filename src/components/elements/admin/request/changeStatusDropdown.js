import { Carousel, Dropdown, DropdownButton } from "react-bootstrap";
import * as Constants from '@/config/constants/Constants';
import { useState, useEffect } from "react";
import { connect } from 'react-redux';

import requestsApi from "@/api/request";
function ChangeStatusDropdown({ JWT, status, requestId, errorAlert, successAlert, reloadPage }) {
    // const [status, setStatus] = useState(null);
    const [statusSlug, setStatusSlug] = useState('');

    useEffect(() => {
        // setStatus(status);
        const statusData = Constants.REQUEST_STATUS_SLUG.filter((item) => item.id == status);
        setStatusSlug(statusData[0].slug);
    }, [status]);

    function changeStatusHandler(e) {
        console.log('change status : ', e);
        requestsApi.updateRequestStatus({
            requestId: requestId,
            status: e,
        }, JWT).then((response) => {
            console.log('response : ', response);
            if (response.data.errCode == 0) {
                successAlert('Thay đổi thành công');
                reloadPage();
            } else {
                errorAlert('Đã có lỗi xảy ra, vui lòng thử lại');
            }
        }).catch((e) => {
            errorAlert('Đã có lỗi xảy ra, vui lòng thử lại');
            console.log(e)

        });
    }

    return (
        <DropdownButton variant="secondary" id="dropdown-basic-button" title={`Trạng thái hiện tại : ${statusSlug}`} onSelect={(e) => { changeStatusHandler(e) }}>
            {
                Constants.REQUEST_STATUS_SLUG.map((item, index) => {
                    return (
                        <Dropdown.Item key={item.id} eventKey={item.id}>{item.slug}</Dropdown.Item>

                    );
                })
            }


        </DropdownButton >
    );
}
function mapStateToProps(state) {
    return { JWT: state.system.userJWT };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeStatusDropdown);