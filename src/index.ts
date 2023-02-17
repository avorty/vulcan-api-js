import { Api } from "./api";
import {
  DATA_GRADE,
  DATA_LUCKY_NUMBER,
  DATA_MESSAGEBOX,
  DATA_TIMETABLE,
  DATA_TIMETABLE_CHANGES,
  DEVICE_REGISTER,
  STUDENT_LIST,
} from "./endpoints";
import { Keystore } from "./keystore";
import { uuid, getBaseUrl, APP_OS } from "./utils";
import { FilterType } from "./apiHelper";
import dateFormat from "dateformat";
import {
  Account,
  LuckyNumber,
  Student,
  Lesson,
  Grade,
  ChangedLesson,
} from "./models";
import { MessageBox } from "./models/messageBox";

export { AccountTools } from "./utils";
export * from "./keystore";

export const registerAccount = async (
  keystore: Keystore,
  token: string,
  symbol: string,
  pin: string
): Promise<Account> => {
  token = token.toUpperCase();
  symbol = symbol.toLowerCase();

  const body = {
    OS: APP_OS,
    DeviceModel: keystore.deviceModel,
    Certificate: keystore.certificate,
    CertificateType: "X509",
    CertificateThumbprint: keystore.fingerprint,
    PIN: pin,
    SecurityToken: token,
    SelfIdentifier: uuid(keystore.fingerprint),
  };

  const baseUrl = await getBaseUrl(token);
  const fullUrl = [baseUrl, symbol, DEVICE_REGISTER].join("/");
  const api = new Api(keystore);
  const response = await api.post(fullUrl, body);
  if (!response.RestUrl) {
    response.RestUrl = `${await getBaseUrl(token)}/${symbol}/`;
  }

  return new Account().serialize(response);
};

export class VulcanHebe {
  private readonly account: Account;
  private readonly api: Api;
  private student?: Student;
  constructor(keystore: Keystore, account: Account) {
    this.account = account;
    this.api = new Api(keystore, this.account);
  }

  public async getStudents() {
    const data = await this.api.get(STUDENT_LIST);
    const studentsToReturn: Student[] = data.map(
      (item: any): Student => new Student().serialize(item)
    );
    return studentsToReturn;
  }

  public async selectStudent(studentToSet?: Student) {
    if (studentToSet) {
      this.student = studentToSet;
      this.api.setStudent(studentToSet);
    } else {
      const students = await this.getStudents();
      if (students.length === 0) {
        throw new Error("Student not found!");
      } else {
        const studentToSet = students[0];
        this.student = studentToSet;
        this.api.setStudent(studentToSet);
      }
    }
  }

  public async getLessons(dateFrom?: Date, dateTo?: Date) {
    const dFrom = dateFrom ? dateFrom : new Date();
    const dTo = dateTo ? dateTo : new Date();
    const data = await this.api.helper.getList(
      DATA_TIMETABLE,
      false,
      undefined,
      dFrom,
      dTo,
      FilterType.BY_PUPIL
    );
    return data.map(
      (item: any): Lesson => new Lesson().serialize(item)
    ) as Lesson[];
  }

  public async getChangedLessons(dateFrom?: Date, dateTo?: Date) {
    const dFrom = dateFrom ? dateFrom : new Date();
    const dTo = dateTo ? dateTo : new Date();
    const data = await this.api.helper.getList(
      DATA_TIMETABLE_CHANGES,
      false,
      undefined,
      dFrom,
      dTo,
      FilterType.BY_PUPIL
    );
    return data.map(
      (item: any): ChangedLesson => new ChangedLesson().serialize(item)
    ) as ChangedLesson[];
  }

  public async getLuckyNumber(): Promise<LuckyNumber> {
    const data = await this.api.helper.getData(DATA_LUCKY_NUMBER, {
      constituentId: this.api.student.school.id,
      day: dateFormat(new Date(), "yyyy-mm-dd"),
    });
    return new LuckyNumber().serialize(data);
  }

  private getPeriodById(periodId: number) {
    if (!this.student) {
      throw Error("Student was undefined!");
    }
    const arr = this.student.periods.filter((period) => {
      return period.id === periodId;
    });
    return arr?.length === 0 ? undefined : arr[0];
  }

  public async getGrades(lastSync: Date) {
    const data = await this.api.helper.getList(
      DATA_GRADE,
      false,
      lastSync,
      undefined,
      undefined,
      FilterType.BY_PUPIL
    );
    return (await Promise.all(
      data.map(async (grade: any) =>
        new Grade(
          (periodId: number) => this.getPeriodById(periodId) as any
        ).serialize(grade)
      )
    )) as Grade[];
  }
  public async getMessageBoxes() {
    const data = await this.api.helper.getList(
      DATA_MESSAGEBOX,
    );
    return (Promise.all(
      data.map(async (messageBox: any) =>
        new MessageBox().serialize(messageBox)
      )
    ));
  }
}