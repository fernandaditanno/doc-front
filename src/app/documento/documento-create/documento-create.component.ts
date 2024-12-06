import {Component, Inject, inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Documento} from '../../Model/Documento';
import {DocServicoService} from '../doc-servico.service';

@Component({
  selector: 'app-documento-create',
  standalone: false,
  templateUrl: './documento-create.component.html',
  styleUrl: './documento-create.component.css'
})
export class DocumentoCreateComponent implements OnInit {
  documentForm: FormGroup = {} as FormGroup;
  documentoNovo = {} as Documento;
  fases: string[] = ['MINUTA', 'VIGENTE', 'OBSOLETO'];
  constructor(private docServicoService: DocServicoService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<DocumentoCreateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    this.documentForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: [''],
      versao: ['', Validators.required],
      sigla: [''],
      fase: ['', Validators.required],
    });
  }
  montar(): boolean{
    this.documentoNovo.titulo = this.documentForm.get('titulo')?.value;
    this.documentoNovo.descricao = this.documentForm.get('descricao')?.value;
    this.documentoNovo.sigla = this.documentForm.get('sigla')?.value;
    this.documentoNovo.versao = this.documentForm.get('versao')?.value;
    this.documentoNovo.fase = this.documentForm.get('fase')?.value;
    return true;
  }
  salvar(): void{
    if(this.montar()){
      this.docServicoService.create(this.documentoNovo).subscribe(retorno => {
        this.documentoNovo = retorno;
      }, error => {
        console.log(error);
      });
      this.dialogRef.close(this.documentoNovo);
    }
  }
  voltar(): void {
    this.dialogRef.close();
  }
}
