// src/app/models/users.ts
export class Users {
    constructor(
      
      public firstname: string,
      public lastname: string,
      public email: string,
      public addresstype: string,
      public homeaddress1: string,
      public homeaddress2: string,
      public companyaddress1: string,
      public companyaddress2: string,
      public gender: string,
      public age: number,
      public interests: string,
      public profilePhoto: string
    ) {}
  }
  