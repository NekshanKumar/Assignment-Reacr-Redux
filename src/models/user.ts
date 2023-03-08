export interface IUser {
    id: string
    firstName: string;
    lastName: string;
    phoneNumber: string;
    age: string;
}

export interface IUserList extends IUser {
    dateCreated: any
}