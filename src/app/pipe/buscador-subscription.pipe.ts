import { Pipe, PipeTransform } from '@angular/core';
import { Subscription } from '../models/subscription';

@Pipe({
  name: 'buscadorSubscription'
})
export class BuscadorSubscriptionPipe implements PipeTransform {

  transform(subscriptions:Subscription[], search:string=''): Subscription[] {
    if(!subscriptions||!search){
     return subscriptions;
    }

    return subscriptions.filter(subscriptions=>
     subscriptions.state.toLowerCase().includes(search.toLowerCase())
     )

   }

}
