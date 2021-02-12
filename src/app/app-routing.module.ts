import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaItensComponent } from './lista-itens/lista-itens.component';
import { ListaComponent } from './lista/lista.component';


const routes: Routes = [
  {
    path:'',
    children: [
      {
        path: "",
        component: ListaComponent
      },
      {
        path: ':id',
        component: ListaItensComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
