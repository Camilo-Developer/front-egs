import { Component } from '@angular/core';
import { ExcelService } from '../../../../services/admin/excel/excel.service';
import { FooterComponent } from '../../../footer/footer.component';

@Component({
  selector: 'app-excel-index',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './excel-index.component.html',
  styleUrl: './excel-index.component.css'
})
export class ExcelIndexComponent {
  constructor(private excelService: ExcelService) {}

  downloadExcel() {
    this.excelService.downloadExcel().subscribe({
      next: (response: Blob) => {
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'ventas.xlsx'); // Nombre del archivo descargado
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      error: (err) => {
        console.error('Error al descargar el archivo Excel:', err);
      }
    });
  }
}
