export interface BarButtonActionInterface {
  element: string;
  name: string;
  icons: string[];
  texts: string[];
  displaeds: boolean[];
  clickeds: boolean[];
}
export interface BarElementActionInterface {
  name: string;
}
export const BarElementInitState: BarElementActionInterface = {
  name: 'vide',
};
export const BarButtonInitState: BarButtonActionInterface = {
  element: 'vide',
  name: 'button',
  icons: ['', ''],
  texts: ['', ''],
  displaeds: [false, false],
  clickeds: [false, false],
};
