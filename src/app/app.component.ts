import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  myForm: FormGroup;
  items: FormArray;

  constructor(private readonly formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      items: this.formBuilder.array([this.getAddressForm()])
    });
  }

  public getFormGroups() {
    return (this.myForm.get('items') as FormArray).controls;
  }

  public getControl(item: any) {
    return item.controls;
  }

  public addAddress(): void {
    this.items = this.myForm.get('items') as FormArray;
    this.items.push(this.getAddressForm());
  }

  public removeAddress(index: number): void {
    this.items = this.myForm.get('items') as FormArray;
    this.items.removeAt(index);
  }

  private getAddressForm() {
    const form = this.formBuilder.group({
      address1: new FormControl('', { validators: Validators.required }),
      postalCode: new FormControl('', {
        validators: [Validators.required,
        Validators.pattern('[a-zA-Z][1-9][a-zA-Z][1-9][a-zA-Z][1-9]')]
      }),
      country: new FormControl('', {
        validators: [Validators.required]
      })
    });
    return form;
  }
}
