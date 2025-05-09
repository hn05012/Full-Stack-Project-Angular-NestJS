export interface CreateUser {
  name: string;
  position: string;
  email: string;
  address: string;
  companyId?: string;
  relatedCoworkerIds?: string[];
}

export interface UpdateUser {
  name: string;
  position: string;
  email: string;
  address: string;
  companyId: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  position: string;
  company: { id: string; name: string } | null;
  relatedCoworkers: User[] | null;
}
