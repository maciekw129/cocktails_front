import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from '@src/app/auth/forms/login-form/login-form.model';
import { LoginPayload } from '@src/app/auth/auth.model';
import { CommonValidators } from '@src/app/shared/forms/validators/common-validators';
import { FormComponent } from '@src/app/shared/forms/form.component';
import { FormService } from '@src/app/shared/forms/form.service';
import { TextInputComponent, ButtonComponent } from '@cocktails-ui';

@Component({
  selector: 'c-login-form',
  standalone: true,
  imports: [TextInputComponent, ReactiveFormsModule, ButtonComponent, TextInputComponent],
  templateUrl: './login-form.component.html',
  providers: [FormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent extends FormComponent<
  LoginPayload,
  FormGroup<LoginForm>
> {
  protected override buildForm() {
    return this.fb.group({
      email: this.fb.control('', {
        validators: [Validators.required, CommonValidators.email()],
      }),
      password: this.fb.control('', { validators: Validators.required }),
    });
  }

  protected override setEmittingValue() {
    return this.form.getRawValue();
  }
}
