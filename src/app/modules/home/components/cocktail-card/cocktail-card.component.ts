import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CategoryLabelPipe } from '@src/app/core/pipes/category-label.pipe';
import { DifficultyLabelPipe } from '@src/app/core/pipes/difficulty-label.pipe';
import { RouterLink } from '@angular/router';
import { CocktailListItem } from '@src/app/core/model/cocktails.model';
import { AuthorPipe } from '@app/core/pipes/author.pipe';

@Component({
  selector: 'c-cocktail-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    CategoryLabelPipe,
    DifficultyLabelPipe,
    RouterLink,
    AuthorPipe,
  ],
  templateUrl: './cocktail-card.component.html',
  styleUrls: ['./cocktail-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CocktailCardComponent {
  @Input() cocktail: CocktailListItem;
}
