/**
 * main controller
 */
'use strict';

// Mock data
const db = [
  {
    id: 'revenue',
    title: 'Revenue',
    unit: '€',
    data: [
      {
        label: 'smartphone',
        quantity: 80000
      },
      {
        label: 'tablet',
        quantity: 120000
      }
    ]
  },
  {
    id: 'impressions',
    title: 'Impressions',
    unit: '',
    data: [
      {
        label: 'smartphone',
        quantity: 30000000
      },
      {
        label: 'tablet',
        quantity: 20000000
      }
    ]
  },
  {
    id: 'visits',
    title: 'Visits',
    unit: '',
    data: [
      {
        label: 'smartphone',
        quantity: 120000000
      },
      {
        label: 'tablet',
        quantity: 480000000
      }
    ]
  }
];

const getChartData = (id) => {
  for (let item of db) {
    if (item.id === id) return item;
  }
  return;
}

const charts = document.querySelectorAll('marfeel-chart');

for (let chart of charts) {
  chart.setAttribute('chart-data', JSON.stringify(getChartData(chart.id)));
}
