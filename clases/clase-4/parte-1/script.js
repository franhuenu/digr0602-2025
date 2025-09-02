import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"
import data from './data.json' with {type : 'json'}

const gdpScale = d3.scaleLinear([0, 9e4], [0, 700])
const giniScale = d3.scaleLinear([0, 1], [480, 20])
const populationScale = d3.scaleSqrt([1e5, 200e6], [1, 30])

const item = d3.select('.chart')
    .selectAll('circle')
    .data(data)
    .join('circle')
        .attr('r', (d) => {return populationScale(d.population)})
        .attr('cx', (d) => {return gdpScale(d.gdp)})
        .attr('cy', (d) => {return giniScale(d.gini)})
        .classed('dot', true)


const burbuja = d3.select('body').append('div')
    .attr('class', 'country-info')

item.on('mouseenter', function(e, d){
    console.log(e.target, e.type)
    burbuja.style('opacity', .8)
    burbuja.style('top', e.pageY + 'px')
    burbuja.style('left', e.pageX + 'px')
    burbuja.html(`<p>${d.country}<br>${Math.trunc(d.population/1e5)/10} M habs.</p>`)
})
    .on('mouseout', function(e, d){
    burbuja.style('opacity', 0)
})

d3.select('.x-axis')
    .append('text')
    .text('GDP')
    .attr('text-anchor', 'middle')
    .attr('x', 350)
    .attr('y', 35)
    .attr('font-size', '15px')
    .attr('fill', '#000000')

d3.select('.y-axis')
    .append('text')
    .text('GINI')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(-40, 250) rotate(270)')
    .attr('font-size', '15px')
    .attr('fill', '#000000')

const xAxis = d3.axisBottom(gdpScale)
d3.select('.x-axis')
    .call(xAxis)

const yAxis = d3.axisLeft(giniScale)
d3.select('.y-axis')
    .call(yAxis)
    .attr('transform', 'translate(80, 0)')