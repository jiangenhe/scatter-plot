const dispatcher = d3.dispatch('filterCountries');
let filteredCountry = []
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

      d3.select("body").selectAll("input")
        .data(data.map(d => d.country))
        .enter()
        .append('label')
        .text(function(d) { return d; })
        .append("input")
        .attr("checked", true)
        .attr("type", "checkbox")
        .attr("id", function(d,i) { return d; })
        .on('click', e => {
          dispatcher.call('filterCountries', e, {name: e.target.id, selected: e.target.checked})
        })


        dispatcher.on('filterCountries', country =>{
          console.log(country)
          if (country.selected) {
            filteredCountry = filteredCountry.filter(d => d != country.name)
          } else {
            filteredCountry.push(country.name)
          }
          scatterplot.data = data.filter(d => !filteredCountry.includes(d.country))
          scatterplot.updateVis()
        })

    })
