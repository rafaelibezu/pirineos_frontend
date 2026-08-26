import { Component, computed, input } from '@angular/core';

type StatusTone = 'success' | 'warning' | 'danger' | 'neutral';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss',
})
export class StatusBadgeComponent {
  readonly label = input('Pendiente');
  readonly tone = input<StatusTone>('neutral');
  readonly classes = computed(() => `status-badge status-badge--${this.tone()}`);
}
