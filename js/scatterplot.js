class Scatterplot {

  /**
   * Class constructor with basic chart configuration
   */
  constructor(_config, _data) {
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 600,
      containerHeight: _config.containerHeight || 500,
      margin: _config.margin || {top: 25, right: 20, bottom: 20, left: 35},
    }
    this.data = _data;
    this.initVis();
  }

  /**
   * We initialize scales/axes and append static elements, such as axis titles.
   */
  initVis() {
    let vis = this;

    // Calculate inner chart size. Margin specifies the space around the actual chart.
    vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
    vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

    // Scales
    vis.xScale = d3.scaleLinear()
      .range([0, vis.width])
    vis.yScale = d3.scaleLinear()
      .range([0, vis.height])

    // Initialize axes
    vis.xAxis = d3.axisBottom(vis.xScale)
    vis.yAxis = d3.axisLeft(vis.yScale)

    // Define size of SVG drawing area
    vis.svg = d3.select(vis.config.parentElement).append('svg')
      .attr('width', this.config.containerWidth)
      .attr('height', this.config.containerHeight)

    // Append group element that will contain our actual chart
    // and position it according to the given margin config
    vis.visG = vis.svg.append('g')
      .attr('transform', `translate(${this.config.margin.left},${this.config.margin.top})`)

    // Append empty x-axis group and move it to the bottom of the chart
    vis.xAxisG = vis.svg.append('g')
      .attr('transform', `translate(${this.config.margin.left},${this.config.margin.top + vis.height})`)

    // Append y-axis group
    vis.yAxisG = vis.svg.append('g')
      .attr('transform', `translate(${this.config.margin.left},${this.config.margin.top})`)

  }

  /**
   * Prepare the data and scales before we render it.
   */
  updateVis() {
    let vis = this;

    // Specificy accessor functions


    // Set the scale input domains
    vis.xScale.domain([0, d3.max(vis.data, d => d.population)])
    vis.yScale.domain([0, d3.max(vis.data, d => d.area)])
    this.renderVis()
  }

  /**
   * Bind data to visual elements.
   */
  renderVis() {
    let vis = this;

    // Add circles
    vis.visG.selectAll('circle')
      .data(vis.data)
      .join('circle')
      .attr('cx', d => vis.xScale(d.population))
      .attr('cy', d => vis.yScale(d.area))
      .attr('r', 5)

    // Update the axes
    vis.xAxisG.call(this.xAxis)
    vis.yAxisG.call(this.yAxis)
  }
}
