export interface User {
  name: string;
  fullName: string;
  password: string;
  gifts: Gift[];
}

export interface Gift {
  description: string;
  link: string;
  reservation: string;
}
