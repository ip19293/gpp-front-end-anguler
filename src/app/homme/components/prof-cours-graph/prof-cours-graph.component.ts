import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { CoursService } from 'src/app/cours/services/cours.service';

@Component({
  selector: 'app-prof-cours-graph',
  templateUrl: './prof-cours-graph.component.html',
  styleUrls: ['./prof-cours-graph.component.scss'],
})
export class ProfCoursGraphComponent implements OnInit {
  role = localStorage.getItem('role');
  ngOnInit(): void {
    if (this.role != 'professeur') {
      this.cours_service
        .getMonthlyCourseCountByProfessor()
        .subscribe((data) => {
          this.processData(data.result);
        });
    } else {
      this.cours_service
        .getMonthlyCourseCountByOfprofesseur(localStorage.getItem('prof_id'))
        .subscribe((data) => {
          this.processData(data.result);
        });
    }
  }
  constructor(private cours_service: CoursService) {}
  public barChartData: ChartData<'bar'> | undefined;
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true,
      },
    },
  };
  public barChartLabels: string[] = [];
  public barChartType: 'bar' = 'bar';
  public barChartType1: 'pie' = 'pie';

  processData(data: any[]): void {
    const professorNames: Set<string> = new Set();
    const labels: Set<string> = new Set();
    const coursesByProfessor: any = {};

    data.forEach((item) => {
      const professorFullName = `${item.nom} ${item.prenom}`;
      const monthYear = `${item.month}/${item.year}`;

      professorNames.add(professorFullName);
      labels.add(monthYear);

      if (!coursesByProfessor[professorFullName]) {
        coursesByProfessor[professorFullName] = {};
      }

      if (!coursesByProfessor[professorFullName][monthYear]) {
        coursesByProfessor[professorFullName][monthYear] = 0;
      }

      coursesByProfessor[professorFullName][monthYear] += item.nbc;
    });

    this.barChartLabels = Array.from(labels);

    const datasets = Array.from(professorNames).map((professor) => {
      return {
        label: professor,
        data: this.barChartLabels.map((label) => {
          return coursesByProfessor[professor][label] || 0;
        }),
      };
    });

    this.barChartData = {
      labels: this.barChartLabels,
      datasets: datasets,
    };
  }
}
