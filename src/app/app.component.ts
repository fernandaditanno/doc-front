import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {DocumentoCreateComponent} from './documento/documento-create/documento-create.component';
import {DocServicoService} from './documento/doc-servico.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly dialog = inject(MatDialog);
  title = 'doc-front';
constructor(private router: Router,
            private docServicoService: DocServicoService) {
}
  navigateToListar(): void {
    this.router.navigate(['/documentos'])
  }
  abrirCriar(): void {
    const dialogRef = this.dialog.open(DocumentoCreateComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.navigateToListar();
      }
    });
  }
}
