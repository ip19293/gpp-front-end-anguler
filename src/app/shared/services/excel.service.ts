import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  // Function to convert JSON data to Excel file
  exportToExcel(data: any[], fileName: string): void {
    let exportData = data.map((el) => ({
      'Nom complet': el.nomComplet,
      Banque: el.banque,
      Compte: el.accountNumero,
      'Montant(UM)': el.somme,
    }));
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveExcelFile(excelBuffer, fileName);
  }

  // Function to trigger file download
  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    FileSaver.saveAs(data, `${fileName}.xlsx`);
  }
}
