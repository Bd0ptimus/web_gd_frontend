export const LANGUAGE_VI = 'vi';
export const LANGUAGE_EN = 'en';
export const LANGUAGE_RU = 'ru';

export const REQUEST_STATUS_CREATED = 0;
export const REQUEST_STATUS_ON_NEGOTIATION = 1;
export const REQUEST_STATUS_PAID = 2;
export const REQUEST_STATUS_ON_DELIVERY = 3;
export const REQUEST_STATUS_DONE = 4;

export const REQUEST_STATUS_ARR = [REQUEST_STATUS_CREATED,
    REQUEST_STATUS_ON_NEGOTIATION,
    REQUEST_STATUS_PAID,
    REQUEST_STATUS_ON_DELIVERY,
    REQUEST_STATUS_DONE
];

export const REQUEST_STATUS_SLUG = [{
    id: REQUEST_STATUS_CREATED,
    slug: 'Yêu cầu đang đợi xử lý',
    tagColor: 'orange'
},
{
    id: REQUEST_STATUS_ON_NEGOTIATION,
    slug: 'Yêu cầu đang được thương lượng',
    tagColor: 'blue'
},
{
    id: REQUEST_STATUS_PAID,
    slug: 'Khách hàng đã thanh toán theo yêu cầu',
    tagColor: '#6366F1',
},
{
    id: REQUEST_STATUS_ON_DELIVERY,
    slug: 'Đơn hàng đang được gửi đi',
    tagColor: '#rgb(7,196,232)',
},
{
    id: REQUEST_STATUS_DONE,
    slug: 'Đơn hàng đã được hoàn thành',
    tagColor: 'green',
}
];

export const ROLE_USER = 2;
export const ROLE_ADMIN = 1;