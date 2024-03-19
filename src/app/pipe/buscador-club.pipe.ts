import { Pipe, PipeTransform } from '@angular/core';
import { Response } from '../models/club';

@Pipe({
  name: 'buscadorClub'
})
export class BuscadorClubPipe implements PipeTransform {

  transform(clubs:Response[], search:string=''): Response[] {
    if(!clubs||!search){
      return clubs;
     }
     return clubs.filter(clubs=>
      clubs.name.toLowerCase().includes(search.toLowerCase())||
      clubs.phone.toLowerCase().includes(search.toLowerCase())
      )
  }

}

