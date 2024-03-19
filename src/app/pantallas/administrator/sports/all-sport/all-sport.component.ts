import { Component, OnInit } from '@angular/core';
import { SportsService } from 'src/app/services/sports.service';

@Component({
  selector: 'app-all-sport',
  templateUrl: './all-sport.component.html',
  styleUrls: ['./all-sport.component.scss']
})
export class AllSportComponent implements OnInit{

  public sports:any=[];
  public search:string ='';

  constructor(
    private sportService:SportsService
  ){

  }

  ngOnInit(): void {

      this.obtenerSports()


  }

  public async obtenerSports(){

    await this.sportService.getSports()
    .subscribe(resp=>{
      this.sports= resp.response
    });
  }

  onSearchUser(search: string){
    this.search =search;

  }

}
