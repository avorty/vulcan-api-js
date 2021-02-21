import { vulcanStudent } from './vulcan_interfaces/vulcanStudent';
import { cert } from './vulcan_interfaces/cert';
import { getCertificate } from "./certificate.js";
import {Api} from './api.js';
import {VulcanHebe} from './hebe';

export const register = (token: string, symbol: string, pin: string) => {
    return getCertificate(token, symbol, pin);
}

export { VulcanHebe };

export class Vulcan{
    private api;
    constructor(cert: cert){
        this.api = new Api(cert);
    }
    getStudents(){
        return this.api.getStudents();
    }
    async setStudent(student: vulcanStudent){
        return await this.api.setStudent(student);
    }
    getGrades(){
        return this.api.getGrades();
    }
    getLessons(date: undefined | Date = undefined){
        return this.api.getLessons(date);
    }
    getExams(date: undefined | Date = undefined){
        return this.api.getExams(date);
    }
    getHomework(date: undefined | Date = undefined){     // WARNING! I don't have a way to test this!
        return this.api.getHomework(date);
    }
    getMessages(dateFrom: undefined | Date = undefined,
        dateTo: undefined | Date = undefined) {
        return this.api.getMessages(dateFrom, dateTo);
    }
}