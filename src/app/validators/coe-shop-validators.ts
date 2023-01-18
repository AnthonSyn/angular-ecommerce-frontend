import { FormControl, ValidationErrors } from "@angular/forms";

export class CoeShopValidators {

  //whitespace validator
  static notOnlyWhitespace(control: FormControl) : ValidationErrors{

    //check if string only contains whitespace
    if((control.value != null) && (control.value.trim().length == 0)){

      //invalid, return error object
      return {'notOnlyWhitespace': true}
    }
    else{

      //valid (passes), return null
      return null;
    }
  }
}
