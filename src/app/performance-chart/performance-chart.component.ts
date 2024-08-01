import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.css']
})
export class PerformanceChartComponent implements OnInit, AfterViewInit{
  chart: any ;
  @ViewChild('canvasChart') canvasChart: ElementRef;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.initChart()
  }

  initChart() {
    this.chart = new Chart(this.canvasChart.nativeElement, {
      type: "bar",
      data: {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        datasets: [
          {
            label: "Sales",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: '#7CB9E8'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: '#BDBDBD'
          }
        ]
      },
      options: {
        aspectRatio: 2,
      }
    })
  }
}
