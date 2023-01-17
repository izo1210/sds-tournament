import { AbstractControl, FormControl, FormGroup } from "@angular/forms";

type Values={[key: string]: any};
type FormControls={[key: string]: FormControl}

export class FormHelper {
    
    static createForm(data: Values): FormGroup
    {
        const formControls: FormControls={};
        for(const key in data)
        {
          const value: any=data[key]; 
          let formControl: FormControl;
          if(value instanceof Number) formControl=new FormControl<Number>(value);
          else if(value instanceof Boolean) formControl=new FormControl<Boolean>(value);
          else if(value instanceof String) formControl=new FormControl<String>(value);
          else formControl=new FormControl<unknown>(value);
          formControls[key]=formControl;
        }
        return new FormGroup(formControls);
    }

    static dataToForm(data: Values, form: FormGroup): void
    {
        for(const key in data)
        {
            form.controls[key].setValue(data[key]);
        }
    }

    static formToData(form: FormGroup, data: Values, manageForm: boolean=true): void
    {
        if(manageForm && form.invalid) return;
        if(manageForm && form.pristine) return;
        for(const key in data)
        {
            data[key]=form.controls[key].value||data[key];
        }
        if(manageForm) form.markAsPristine();
    }

    static errorText(control: AbstractControl): string
    {
        return JSON.stringify(control.errors);
    }
}
