
d3.csv('data/cities_and_population_area.csv')
    .then(data => {
      // Change numeric values to numbers
      data.forEach(d => {
        d.area = parseFloat(d.area)
        d.population = parseInt(d.population)
      })

      const scatterplot = new Scatterplot({parentElement:"#scatterplot-container", containerHeight: 400}, data)
      scatterplot.updateVis()

      d3.select('body').append('button').text('add data').on('click', function () {
        data.push({country: "United States", city: "Knoxville", population: 1861730000, area: 104.3})
        scatterplot.data = data
        scatterplot.updateVis()
      })


    })
