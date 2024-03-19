import { Pipe, PipeTransform } from '@angular/core';
import { Response } from '../models/entitie';

@Pipe({
  name: 'buscadorEntitie'
})
export class BuscadorEntitiePipe implements PipeTransform {

  transform(entitie:Response[], search:string=''): Response[] {
    if(!entitie||!search){
      return entitie;
     }
     return entitie.filter(entitie=>
      entitie.name.toLowerCase().includes(search.toLowerCase())||
      entitie.email.toLowerCase().includes(search.toLowerCase())||
      entitie.phone.toLowerCase().includes(search.toLowerCase())
      )
  }

}
