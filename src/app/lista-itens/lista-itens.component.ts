import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Lista } from '../lista/lista';
import { ListaService } from '../lista/lista.service';
import { ListaDetalhada } from '../lista/listaDetalhada';

@Component({
  selector: 'lsc-lista-itens',
  templateUrl: './lista-itens.component.html',
  styleUrls: ['./lista-itens.component.css']
})
export class ListaItensComponent implements OnInit {
  public titulo = 'Itens da lista';
  public subTitulo = 'Onde Comprar';
  public formAdiciona = false;

  listaItens: FormGroup;
  id_lista: number;
  id: number;


  _listas: ListaDetalhada[] = [];
  _lista: Lista;

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private listaService: ListaService,
    private router: Router
    ) { }

  ngOnInit() {
    this.id_lista = this.activatedRoute.snapshot.params['id'];
    if (this.id_lista) {
      this.listaService.getByIdLista(this.id_lista).subscribe({
        next: lista => {
          this.subTitulo =  lista.nome;
        }
      });
      this.getAllItens(this.id_lista);
      this.criarFormulario(new ListaDetalhada());
    } 
  }


  getAllItens(id: number): void {
    this.listaService.getAllItens(id)
        .subscribe({
          next: itens => {
            this._listas = itens;
          },
          error: err => console.log('Erro', err)
      })
  }

  voltarLista(){
    this.router.navigateByUrl('/');
  }

  deleteByIdItem(listaId: number): void {
    this.listaService.deleteByIdItem(listaId).subscribe({
      next: () => {
        console.log('Deletado com sucesso!');
        this.getAllItens(listaId);
      },
      error: err => console.log('Erro', err)
    })
  }


  submit(): void{
    const lista = this.listaItens.getRawValue() as ListaDetalhada;

    this.addItem(lista);
    this.formAdiciona = false;
    this.criarFormulario(new ListaDetalhada());
  }

  private criarFormulario(lista: ListaDetalhada) {
    this.listaItens = this.fb.group({
      id: new FormControl(lista.id),
      item: new FormControl(lista.item),
      ativo: new FormControl(lista.ativo),
      
    });
  }

  editByIdItem(id: number, item: string, ativo: boolean){
    this.listaItens = this.fb.group({
      id: id,
      item: item,
      ativo: ativo
    })
    this.formAdiciona = true;
  }

  checkAtivo(lista: ListaDetalhada){

    if (lista.ativo == true){
      lista.ativo = false;
    }else{
      lista.ativo = true;
    }
    if (lista.id){
      this.listaService.postItem(lista).subscribe({
        next: () => {
          console.log('Editado com sucesso!');
          this.getAllItens(lista.id_lista);
        },
        error: err => console.log('Erro', err)
      })
      this.getAllItens(lista.id_lista)
    }
  }




  addItem(lista: ListaDetalhada): void {

    lista.id_lista = this.id_lista;
    if(lista.ativo == null){
      lista.ativo = true;
    }

    if (lista.id){
      this.listaService.postItem(lista).subscribe({
        next: () => {
          console.log('Editado com sucesso!');
          this.getAllItens(lista.id_lista);
        },
        error: err => console.log('Erro', err)
      })
    }else{
      this.listaService.postItem(lista).subscribe({
        next: () => {
          console.log('Adicionado com sucesso!');
          this.getAllItens(lista.id_lista);
        },
        error: err => console.log('Erro', err)
      })
    }

  }

  viewForm(mostra: boolean){
    this.formAdiciona = mostra;
  }

  

}
