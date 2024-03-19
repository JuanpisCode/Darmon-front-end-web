import { Component } from '@angular/core';
import { ClubsService } from 'src/app/services/clubs.service';

@Component({
  selector: 'app-sports-clubs',
  templateUrl: './sports-clubs.component.html',
  styleUrls: ['./sports-clubs.component.scss']
})
export class SportsClubsComponent {

  public clubs:any=[];
  public search:string ='';

  constructor(
    private clubService:ClubsService
  ){

  }

  ngOnInit(): void {

      this.obtenerClubs()


  }

  public async obtenerClubs(){

    await this.clubService.getClubs()
    .subscribe(resp=>{
      this.clubs= resp.response
    });
  }

  onSearchUser(search: string){
    this.search =search;

  }

}
