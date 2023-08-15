import {
  Directive,
  HostListener,
  inject,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import {
  combineLatest,
  distinctUntilChanged,
  of,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { UnsubscribeOnDestroy } from '../../services/unsubscribe-on-destroy';
import { TranslatePipe } from '@ngx-translate/core';

@Directive({
  selector: 'input[validationErrors][formControl]',
  standalone: true,
  providers: [TranslatePipe],
})
export class ValidationErrorsDirective
  extends UnsubscribeOnDestroy
  implements OnInit
{
  @Input() formControl!: FormControl;
  @Input() validationErrors!: HTMLElement;
  @Input() errorChange$ = new Subject<void>();

  private renderer = inject(Renderer2);
  private translate = inject(TranslatePipe);

  private errorText = this.renderer.createText('');

  ngOnInit() {
    this.renderer.appendChild(this.validationErrors, this.errorText);

    combineLatest([
      this.errorChange$,
      this.formControl.valueChanges.pipe(startWith(null)),
    ])
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap(() => of(this.formControl.errors)),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        ),
        tap(errors => this.refreshErrorMessages(errors))
      )
      .subscribe();
  }

  @HostListener('blur') onBlur() {
    this.errorChange$.next();
  }

  private refreshErrorMessages(errors: ValidationErrors | null) {
    if (errors === null) {
      this.renderer.setValue(this.errorText, '');
    } else {
      const errorKeys = Object.keys(errors);
      const errorText = this.translate.transform(
        `forms.validationErrors.${errorKeys[0]}`,
        errors[errorKeys[0]]
      );
      this.renderer.setValue(this.errorText, errorText);
    }
  }
}
