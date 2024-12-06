import {Component, Inject, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DocServicoService} from './doc-servico.service';
import {Documento} from '../Model/Documento';
import {MatTableDataSource} from '@angular/material/table';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DocumentoCreateComponent} from './documento-create/documento-create.component';
import {DocumentoUpdateComponent} from './documento-update/documento-update.component';
import {DocumentoDeleteComponent} from './documento-delete/documento-delete.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-documento',
  standalone: false,

  templateUrl: './documento.component.html',
  styleUrl: './documento.component.css'
})
export class DocumentoComponent implements OnInit {
  listaDeDocumentos: Documento[] =[];
  dataSource: MatTableDataSource<Documento> = new MatTableDataSource();
  constructor(private router: Router,
              private dialog: MatDialog,
              private docServicoService: DocServicoService) {
  }
  listar(): void{
    this.docServicoService.read().subscribe(documentos => {
      this.listaDeDocumentos = documentos;
      this.dataSource = new MatTableDataSource(this.listaDeDocumentos);
    });
  }
  displayedColumns: string[] = ['titulo', 'descricao', 'sigla', 'fase', 'versao' , 'acoes' ];
  ngOnInit() {
    this.listar();
  }
  navigateToListar(): void {
    this.router.navigate(['/documentos'])
  }
  navigateToCriar(): void {
    this.router.navigate(['/documentos/create'])
  }

  abrirCriar(): void {
    const dialogRef = this.dialog.open(DocumentoCreateComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.listar();
      }
    });
  }
  abrirEditar(documento: Documento): void {
    const dialogRef = this.dialog.open(DocumentoUpdateComponent, {
      width: '400px',
      data: {documento: documento},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.listar();
      }
    });
  }
  abrirDeletar(documento: Documento): void {
    const dialogRef = this.dialog.open(DocumentoDeleteComponent, {
      width: '400px',
      data: {documento: documento},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.listar();
      }
    });
  }
}
