export interface UserInterface {
  _id?: string;
  nom: string;
  prenom: string;
  mobile: number;
  email: string;
  photo: string;
  role?: string;
  active?: boolean;
}
