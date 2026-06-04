import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'sap-chart-card',
  standalone: true,
  template: `
    <section class="panel chart-panel">
      <h3>{{ title }}</h3>
      <canvas #canvas height="220"></canvas>
    </section>
  `,
  styles: [`
    .chart-panel { min-height: 310px; }
    h3 { font-size: 15px; margin-bottom: 12px; color: #27415f; }
    canvas { width: 100%; max-height: 240px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartCardComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) title = '';
  @Input({ required: true }) config!: ChartConfiguration;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;

  ngAfterViewInit(): void {
    this.chart = new Chart(this.canvas.nativeElement, this.config);
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
