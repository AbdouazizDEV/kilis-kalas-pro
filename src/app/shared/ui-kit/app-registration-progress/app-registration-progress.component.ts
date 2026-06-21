import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-registration-progress',
  standalone: true,
  templateUrl: './app-registration-progress.component.html',
  styleUrls: ['./app-registration-progress.component.scss'],
})
export class AppRegistrationProgressComponent {
  @Input() totalSteps = 5;
  @Input() currentStep = 1;

  get steps(): number[] {
    return Array.from({ length: this.totalSteps }, (_, index) => index + 1);
  }

  isActive(step: number): boolean {
    return step <= this.currentStep;
  }
}
