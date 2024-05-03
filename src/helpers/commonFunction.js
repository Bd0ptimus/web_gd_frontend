import Router from 'next/router';
import filesApi from "@/api/file";


import useAxiosRequest from './axiosRequest';
import { setCookie } from 'cookies-next';

export const logoutProcessOnCookie = () => {
    setCookie('JWT', '', {
        maxAge: 60 * 60 * 24 * 30,
    })
    setCookie('roleUser', null, {
        maxAge: 60 * 60 * 24 * 30,
    })
}

export const formatTimeStampToCommonDate = (timestamp) => {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

export const convertToCalendarDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
    const day = date.getDate();
  
    const calendarDate = {
      year: year,
      month: month,
      day: day
    };
  
    return calendarDate;
}

export function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}