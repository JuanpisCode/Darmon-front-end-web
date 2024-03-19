import { Pipe, PipeTransform } from '@angular/core';
import { Resp } from '../models/chat';

@Pipe({
  name: 'buscadorChat'
})
export class BuscadorChatPipe implements PipeTransform {

  transform(chats:Resp[], search:string=''): Resp[] {
    if(!chats||!search){
     return chats;
    }
    return chats.filter(chats=>
     chats.message.toLowerCase().includes(search.toLowerCase())
     )

   }
}
