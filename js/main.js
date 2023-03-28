
d3.csv('data/cities_and_population_area.csv')
    .then(data => {
      // Change numeric values to numbers
      data.forEach(d => {
        d.area = parseFloat(d.area)
        d.population = parseInt(d.population)
      })

    })
