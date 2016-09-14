/**
 * custom element definition
 */
'use strict';

class MarfeelChart extends HTMLElement {

  /**
   * draw the pie chart of element
   */
  drawChart() {
    const width = 300;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const pie = d3.pie()
        .sort(null);
    const arc = d3.arc()
        .innerRadius(radius - 6)
        .outerRadius(radius);
    const svg = d3.select(this.dom.svg)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    const path = svg.selectAll('path')
        .data(pie(this.chartData.data.map((i) => i.quantity)))
        .enter().append('path')
        .attr('class', 'arc')
        .attr('fill', (d, i) => { return this.chartData.data[i].color; })
        .attr('d', arc);
    svg.append('text')
        .attr('dy', '-1.5em')
        .style('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('fill', '#CCC')
        .attr('class', 'inside')
        .text((d) => { return this.chartData.title.toUpperCase(); });
    svg.append('text')
        .attr('dy', '0')
        .style('font-size', '1.5em')
        .style('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr('class', 'data')
        .text((d) => { return (this.chartData.data[0].quantity + this.chartData.data[1].quantity).toLocaleString() + this.chartData.unit; });
    svg.append('line')
        .attr('x1', 0)
        .attr('y1', -(radius-6-1))
        .attr('x2', 0)
        .attr('y2', -(radius-6-6))
        .attr('stroke', '#CCC')
        .attr('stroke-opacity', 1)
        .attr('stroke-width', '2px');
    svg.append('line')
        .attr('x1', 0)
        .attr('y1', (radius-6-1))
        .attr('x2', 0)
        .attr('y2', (radius-6-6))
        .attr('stroke', '#CCC')
        .attr('stroke-opacity', 1)
        .attr('stroke-width', '2px');
    svg.append('line')
        .attr('x1', (radius-6-1))
        .attr('y1', 0)
        .attr('x2', (radius-6-6))
        .attr('y2', 0)
        .attr('stroke', '#CCC')
        .attr('stroke-opacity', 1)
        .attr('stroke-width', '2px');
    svg.append('line')
        .attr('x1', -(radius-6-1))
        .attr('y1', 0)
        .attr('x2', -(radius-6-6))
        .attr('y2', 0)
        .attr('stroke', '#CCC')
        .attr('stroke-opacity', 1)
        .attr('stroke-width', '2px');
  }

  /**
   * populate legend with chart data
   */
  populateLegend() {
    this.dom.chartData[1].querySelector('.label').innerText = this.chartData.data[0].label;
    this.dom.chartData[1].querySelector('.label').style.color = this.chartData.data[0].color;
    this.dom.chartData[1].querySelector('.percentage').innerText = (this.chartData.data[0].quantity * 100) / (this.chartData.data[0].quantity + this.chartData.data[1].quantity) + '%';
    this.dom.chartData[1].querySelector('.quantity').innerText = this.chartData.data[0].quantity.toLocaleString() + this.chartData.unit;
    this.dom.chartData[0].querySelector('.label').innerText = this.chartData.data[1].label;
    this.dom.chartData[0].querySelector('.label').style.color = this.chartData.data[1].color;
    this.dom.chartData[0].querySelector('.percentage').innerText = (this.chartData.data[1].quantity * 100) / (this.chartData.data[0].quantity + this.chartData.data[1].quantity) + '%';
    this.dom.chartData[0].querySelector('.quantity').innerText = this.chartData.data[1].quantity.toLocaleString() + this.chartData.unit;
  }

  /**
   * initialize element
   */
  init() {
    this.drawChart();
    this.populateLegend();
  }


  /**
   * set properties on element
   */
  setProperties() {
    this.chartData = {};
    this.mainColor = 'steelblue';
  };

  /**
   * parse attributes on element
   */
  parseAttributes() {
    if (this.hasAttribute('main-color')) {
      this.mainColor = this.getAttribute('main-color');
    }

    if (this.hasAttribute('chart-data')) {
      this.chartData = JSON.parse(this.getAttribute('chart-data'));
      this.chartData.data[0].color = d3.rgb(this.mainColor).toString();
      this.chartData.data[1].color = d3.rgb(this.mainColor).brighter().toString();
    }
  };

  /**
   * register dom elements
   */
  registerElements() {
    this.dom = {};
    this.dom.svg = this.root.querySelector('svg');
    this.dom.chartData = this.root.querySelectorAll('.chart-data');
  };

  createdCallback() {
    this.setProperties();
    this.parseAttributes();
  };

  attachedCallback() {
    let template = this.owner.querySelector('template#marfeel-chart-template');
    let clone = document.importNode(template.content, true);
    this.root = this.createShadowRoot();
    this.root.appendChild(clone);
    this.registerElements();
    this.init();
  };
}

/**
 * register custom elements
 */
if (document.createElement('marfeel-chart').constructor !== MarfeelChart) {
  MarfeelChart.prototype.owner = (document._currentScript || document.currentScript).ownerDocument;
  document.registerElement('marfeel-chart', MarfeelChart);
}
