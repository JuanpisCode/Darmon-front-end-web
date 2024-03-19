import { Component, OnInit } from '@angular/core';
import { EntitiesService } from 'src/app/services/entities.service';

@Component({
  selector: 'app-all-entities',
  templateUrl: './all-entities.component.html',
  styleUrls: ['./all-entities.component.scss']
})
export class AllEntitiesComponent implements OnInit{

  public entities:any=[];
  public search:string ='';

  constructor(
    private entitieService:EntitiesService
  ){

  }

  ngOnInit(): void {

      this.obtenerSports()


  }

  public async obtenerSports(){

    await this.entitieService.getEntities()
    .subscribe(resp=>{
      this.entities= resp.response
    });
  }

  onSearchUser(search: string){
    this.search =search;

  }

}
