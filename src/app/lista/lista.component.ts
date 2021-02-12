import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Lista } from './lista';
import { ListaService } from './lista.service';

@Component({
  selector: 'lsc-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  public titulo = 'Minhas listas';
  public subTitulo = 'Onde Comprar';
  public formAdiciona = false;

  listaForm: FormGroup;
  id: number;
  nome: string;

  _listas: Lista[] = [];

  constructor(private listaService: ListaService, 
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.getAllLista();
    this.criarFormulario(new Lista());
  }

  getAllLista(): void {
    this.listaService.getAllListas().subscribe({
      next: listas => {
        this._listas = listas;
      },
      error: err => console.log('Erro', err)
    })
  }

  deleteByIdLista(listaId: number): void {
    this.listaService.deleteByIdLista(listaId).subscribe({
      next: () => {
        console.log('Deletado com sucesso!');
        this.getAllLista();
      },
      error: err => console.log('Erro', err)
    })
  }


  submit(): void{
    const lista = this.listaForm.getRawValue() as Lista;

    this.addLista(lista);
    this.formAdiciona = false;
    this.criarFormulario(new Lista());
  }

  private criarFormulario(lista: Lista) {
    this.listaForm = this.fb.group({
      id: new FormControl(lista.id),
      nome: new FormControl(lista.nome)
    });
  }

  editByIdLista(id: number, nome: string){
    this.listaForm = this.fb.group({
      id: id,
      nome: nome,
    })
    this.formAdiciona = true;
  }

  openLista(id: number): void{
    this.router.navigateByUrl(`${id}`);
  }


  addLista(lista: Lista): void {

    if (lista.id){
      this.listaService.postLista(lista).subscribe({
        next: () => {
          console.log('Editado com sucesso!');
          this.getAllLista();
        },
        error: err => console.log('Erro', err)
      })
    }else{
      this.listaService.postLista(lista).subscribe({
        next: () => {
          console.log('Adicionado com sucesso!');
          this.getAllLista();
        },
        error: err => console.log('Erro', err)
      })
    }

  }

  viewForm(mostra: boolean){
    this.formAdiciona = mostra;
  }

  

}
