import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DocumentoComponent} from './documento/documento.component';
import {DocumentoCreateComponent} from './documento/documento-create/documento-create.component';
import {DocumentoUpdateComponent} from './documento/documento-update/documento-update.component';
import {DocumentoDeleteComponent} from './documento/documento-delete/documento-delete.component';

const routes: Routes = [
  {
    path: "",
    component: DocumentoComponent,
  },
  {
    path: "documentos",
    component: DocumentoComponent,
  },
  {
    path: "documentos/create",
    component: DocumentoCreateComponent
  },
  {
    path: "documentos/update/:id",
    component: DocumentoUpdateComponent,
  },
  {
    path: "documentos/delete/:id",
    component: DocumentoDeleteComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
