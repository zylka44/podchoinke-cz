export interface User {
  name: string;
  fullName: string;
  password: string;
  gifts: Gift[];
}

export interface Gift {
  name: string;
  link: string;
  reservation: string;
}
