import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;

    ngOnInit(){
      this.chartColor = "#FFFFFF";

      this.canvas = document.getElementById("chartHours");
      this.ctx = this.canvas.getContext("2d");

      this.chartHours = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
          datasets: [{
              borderColor: "#6bd098",
              backgroundColor: "#6bd098",
              fill: true,
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354]
            },
            {
              borderColor: "#f17e5d",
              backgroundColor: "#f17e5d",
              fill: true,
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
            },
            {
              borderColor: "#fcc468",
              backgroundColor: "#fcc468",
              fill: true,
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 3,
              data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }, 
            tooltip: {
              enabled: false
            }
          },
          scales: {
            x: {
              
              border: {
                display: false
              },
              
              grid: {
                color: 'rgba(255,255,255,0.1)',
                display: false,
              },
              ticks: {
                padding: 20,
                color: "#9f9f9f"
              }
            },
            y: {
              beginAtZero: false,
              ticks: {
                color: "#9f9f9f",
                maxTicksLimit: 5,
                //padding: 20
              },
              border: {
                display: false
              },
              grid: {
                color: 'rgba(255,255,255,0.05)'
              }
            },
          },
        }
      });

      this.canvas = document.getElementById("chartEmail");
      this.ctx = this.canvas.getContext("2d");
      this.chartEmail = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: [1, 2, 3],
          datasets: [{
            label: "Emails",
            backgroundColor: [
              '#e3e3e3',
              '#4acccd',
              '#fcc468',
              '#ef8157'
            ],
            borderWidth: 0,
            data: [342, 480, 530, 120],
          }],
        },

        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            },
          },
          elements: {
            point: {
              radius: 0,
              hoverRadius: 0
            },
          },
          
          scales: {
            x: {
              border: {
                display: false,
                color: "transparent"
              },
              grid: {
                color: 'rgba(255,255,255,0.1)',
              },
              ticks: {
                display: false,
              }
            },
            y: {
              border: {
                display: false,
                color: "transparent"
              },  
              ticks: {
                display: false
              },
              grid: {
                color: 'rgba(255,255,255,0.05)'
              }
            }
          }
        }
      });

      var dataFirst = {
        data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
        fill: false,
        borderColor: '#fbc658',
        backgroundColor: 'transparent',
        pointBorderColor: '#fbc658',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      };

      var dataSecond = {
        data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
        fill: false,
        borderColor: '#51CACF',
        backgroundColor: 'transparent',
        pointBorderColor: '#51CACF',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };

      var speedData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [dataFirst, dataSecond]
      };

      this.canvas = document.getElementById("speedChart");
      this.ctx = this.canvas.getContext("2d");

      var lineChart = new Chart(this.ctx, {
        type: 'line',
        data: speedData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          hover : {
            mode: 'index',
            intersect: false
          },
          plugins: {
            legend: {
              display: false,
              position: 'top'
            },
          }
        }
      });
    }
}
