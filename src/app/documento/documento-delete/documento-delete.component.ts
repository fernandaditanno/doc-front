import {Component, Inject, inject, model, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Documento} from '../../Model/Documento';
import {DocServicoService} from '../doc-servico.service';

@Component({
  selector: 'app-documento-delete',
  standalone: false,

  templateUrl: './documento-delete.component.html',
  styleUrl: './documento-delete.component.css'
})
export class DocumentoDeleteComponent implements OnInit {
  excluir = {} as Documento;
  constructor(private docServicoService: DocServicoService,
              public dialogRef: MatDialogRef<DocumentoDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.excluir = this.data;
  }
  ngOnInit() {
    console.log(this.excluir);
  }

  salvar(): void {
    this.docServicoService.delete(this.excluir.id).subscribe(retorno => {
      console.log(retorno);
    }, error => {
      console.log(error);
    })
    this.dialogRef.close(true);
  }
  voltar(): void {
    this.dialogRef.close(false);
  }
}
