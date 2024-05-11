import { Pipe, PipeTransform } from '@angular/core';
import { Payment_plans } from '../models/payment_plans';

@Pipe({
  name: 'buscadorPlan'
})
export class BuscadorPlanPipe implements PipeTransform {

  transform(plans:Payment_plans[], search:string=''): Payment_plans[] {
    if(!plans||!search){
     return plans;
    }
    return plans.filter(plans=>
     plans.name.toLowerCase().includes(search.toLowerCase())||
     plans.price.toLowerCase().includes(search.toLowerCase())
     )

   }
}
