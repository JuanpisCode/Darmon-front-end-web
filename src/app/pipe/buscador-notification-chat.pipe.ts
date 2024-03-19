import { Pipe, PipeTransform } from '@angular/core';
import { Response } from '../models/notification_chat';

@Pipe({
  name: 'buscadorNotificationChat'
})
export class BuscadorNotificationChatPipe implements PipeTransform {

  transform(users:Response[], search:string=''): Response[] {
    if(!users||!search){
     return users;
    }
    return users.filter(users=>
     users.name.toLowerCase().includes(search.toLowerCase())
     )

   }
}
