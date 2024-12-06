import {Component, Inject, inject, model, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Documento} from '../../Model/Documento';
import {DocumentoComponent} from '../documento.component';
import {DocServicoService} from '../doc-servico.service';
import {finalize} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-documento-update',
  standalone: false,
  templateUrl: './documento-update.component.html',
  styleUrl: './documento-update.component.css'
})
export class DocumentoUpdateComponent implements OnInit {
  documentForm: FormGroup = {} as FormGroup;
  documentoNovo = {} as Documento;
  fases: string[] = ['MINUTA', 'VIGENTE', 'OBSOLETO'];
  edicao = {} as Documento;
  readonly resposta = model(this.edicao);
  constructor(private docServicoService: DocServicoService, private fb: FormBuilder,
              public dialogRef: MatDialogRef<DocumentoUpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.edicao = this.data;
  }

  ngOnInit(): void {
    if(this.edicao != null){
      this.documentForm = this.fb.group({
        titulo: [this.edicao.titulo, Validators.required],
        descricao: [this.edicao.descricao],
        versao: [this.edicao.versao, Validators.required],
        sigla: [this.edicao.sigla, Validators.required],
        fase: [this.edicao.fase, Validators.required],
      });
    }else {
      this.documentForm = this.fb.group({
        titulo: [this.data.titulo, Validators.required],
        descricao: [this.data.descricao],
        versao: [this.data.versao, Validators.required],
        sigla: [this.data.sigla, Validators.required],
        fase: [this.data.fase, Validators.required],
      });
    }
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
    this.docServicoService.update(this.edicao).subscribe(retorno => {
      this.edicao = retorno;
    }, error => {
      console.log(error);
    });
    this.dialogRef.close(this.edicao);
  }
  voltar(): void {
    this.dialogRef.close(null);
  }
}
