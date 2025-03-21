document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.aside ul li a');
    const sections = document.querySelectorAll('main section');
  
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const targetId = item.getAttribute('onclick').split("'")[1];
            sections.forEach(section => {
                if (section.id === targetId) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });
});

// Chart.js configurations
const consommationCtx = document.getElementById('consommationChart').getContext('2d');
const consommationChart = new Chart(consommationCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Fev', 'Mars', 'Avr', 'Mai', 'Juin' , 'Juil' , 'Aout' , 'Sept' , 'Oct' , 'Nov' , 'Dec'],
        datasets: [{
            label: 'Consommation (kWh)',
        
            data: [20, 10, 40, 30, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200],
            borderColor: 'blue',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const historiqueCtx = document.getElementById('historiqueChart').getContext('2d');
const historiqueChart = new Chart(historiqueCtx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fev', 'Mars', 'Avr', 'Mai', 'Juin' , 'Juil' , 'Aout' , 'Sept' , 'Oct' , 'Nov' , 'Dec'],
        datasets: [{
            label: 'Historique (kWh)',
            data: [20, 10, 40, 30, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200],
            backgroundColor:  [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
        ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


  // Panneaux Solaires
  const ctx = document.getElementById('myChart').getContext('2d');
  const data = {
      labels: [
          '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', 
          '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', 
          '22:00', '23:00'
      ],
      datasets: [{
          label: 'Courant (A)',
          data: [
              10, 12, 15, 14, 18, 25, 30, 35, 40, 45, 50
          ],
          fill: false,
          borderColor: 'rgba(43, 43, 243)',
          backgroundColor: 'rgba(15, 15, 15, 0.2)',
          tension: 0.1
      }]
  };
  
  const config = {
      type: 'line',
      data: data,
      options: {
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'Heure'
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'Courant (A)'
                  },
                  beginAtZero: true
              }
          }
      }
  };
  
  const myChart = new Chart(ctx, config);
  
  const ctx2 = document.getElementById('myChart2').getContext('2d');
  const data2 = {
      labels: [
          '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', 
          '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', 
          '22:00', '23:00'
      ],
      datasets: [{
          label: 'Tension (V)',
          data: [
              10, 12, 15, 14, 18, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115
          ],
          fill: false,
          borderColor: 'rgba(255, 13, 13)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.1
      }]
  };
  
  const config2 = {
      type: 'line',
      data: data2,
      options: {
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'Heure'
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'Tension (V)'
                  },
                  beginAtZero: true
              }
          }
      }
  };
  
  const myChart2 = new Chart(ctx2, config2);

  const ctx3 = document.getElementById('myChart3').getContext('2d');
  const data3 = {
      labels: [
          '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', 
          '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', 
          '22:00', '23:00'
      ],
      datasets: [{
          label: 'Temperature (°C)',
          data: [
              10, 12, 15, 14, 18, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80,
          ],
          fill: false,
          borderColor: 'rgba(43, 43, 243)',
          backgroundColor: 'rgba(15, 15, 15, 0.2)',
          tension: 0.1
      }]
  };
  
  const config3 = {
      type: 'line',
      data: data3,
      options: {
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'Heure'
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'Temperature (°C)'
                  },
                  beginAtZero: true
              }
          }
      }
  };
  
  const myChart3 = new Chart(ctx3, config3);
  
  // Régulateur
  const ctx4 = document.getElementById('myChart4').getContext('2d');
  const data4 = {
      labels: [
          '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', 
          '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', 
          '22:00', '23:00'
      ],
      datasets: [{
          label: 'Courant (A)',
          data: [
              10, 12, 15, 14, 18, 25, 30, 35, 40, 45, 50,
          ],
          fill: false,
          borderColor: 'rgba(43, 43, 243)',
          backgroundColor: 'rgba(15, 15, 15, 0.2)',
          tension: 0.1
      }]
  };
  
  const config4 = {
      type: 'line',
      data: data4,
      options: {
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'Heure'
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'Courant (A)'
                  },
                  beginAtZero: true
              }
          }
      }
  };
  
  const myChart4 = new Chart(ctx4, config4);
  
  const ctx5 = document.getElementById('myChart5').getContext('2d');
  const data5 = {
      labels: [
          '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', 
          '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', 
          '22:00', '23:00'
      ],
      datasets: [{
          label: 'Tension (V)',
          data: [
              10, 12, 15, 14, 18, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115,120,125,130
          ],
          fill: false,
          borderColor: 'rgba(255, 13, 13)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.1
      }]
  };
  
  const config5 = {
      type: 'line',
      data: data5,
      options: {
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'Heure'
                  }
              },
              y: {
                  title: {
                      display: true,
                      text: 'Tension (V)'
                  },
                  beginAtZero: true
              }
          }
      }
  };
  
  const myChart5 = new Chart(ctx5, config5);

 