import { Component } from '@angular/core';

@Component({
  selector: 'app-all-pays',
  templateUrl: './all-pays.component.html',
  styleUrls: ['./all-pays.component.scss']
})
export class AllPaysComponent {

  public search:string ='';

  onSearchUser(search: string){
    this.search =search;

  }


}
