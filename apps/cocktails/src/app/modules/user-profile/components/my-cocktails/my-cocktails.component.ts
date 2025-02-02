import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Cocktail } from '@app/modules/cocktails/cocktails.model';

@Component({
  selector: 'c-my-cocktails',
  standalone: true,
  templateUrl: './my-cocktails.component.html',
  styleUrls: ['./my-cocktails.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyCocktailsComponent {
  cocktails$: Observable<Cocktail[]> = inject(ActivatedRoute).data.pipe(
    map(({ cocktails }) => cocktails)
  );
}
