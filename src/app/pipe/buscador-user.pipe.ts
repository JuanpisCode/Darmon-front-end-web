import { Pipe, PipeTransform } from '@angular/core';
import { Response } from '../models/user';

@Pipe({
  name: 'buscadorUser'
})
export class BuscadorUserPipe implements PipeTransform {

  transform(users:Response[], search:string=''): Response[] {
   if(!users||!search){
    return users;
   }
   return users.filter(users=>
    users.name.toLowerCase().includes(search.toLowerCase())||
    users.email.toLowerCase().includes(search.toLowerCase())||
    users.phone.toLowerCase().includes(search.toLowerCase())
    )

  }

}
