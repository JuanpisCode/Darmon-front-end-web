import { Pipe, PipeTransform } from '@angular/core';
import { Response } from '../models/sport';

@Pipe({
  name: 'buscadorSport'
})
export class BuscadorSportPipe implements PipeTransform {

  transform(sports:Response[], search:string=''): Response[] {
    if(!sports||!search){
      return sports;
     }
     return sports.filter(sports=>
      sports.name.toLowerCase().includes(search.toLowerCase())
      )
  }

}
