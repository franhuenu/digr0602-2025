import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"

const cities = [
    {name:"Amieirinha",population:4812946},
    {name:"Kinshasa",population:1027499},
    {name:"Blantyre",population:1992831},
    {name:"Pueblo Nuevo Viñas",population:6106658},
    {name:"Ko Si Chang",population:1258350},
    {name:"Rabak",population:5611054},
    {name:"Port-Cartier",population:2014142},
    {name:"Detroit",population:8927289},
    {name:"Medeiros Neto",population:6847563},
    {name:"Kushchëvskaya",population:4160962}
]

const scale = d3.scaleLinear([0, 1e7], [0, 420])

d3.select('.bars')
    .selectAll('rect')
    .data(cities)
    .join('rect')
    .attr('height', 19)
    .attr('width', function(d){
        return scale(d.population)
    })
    .attr('y', function(d, i){
        return i * 20
    })

d3.select('.labels')
    .selectAll('text')
    .data(cities)
    .join('text')
    .attr('y', function(d, i){
        return i * 20 + 13
    })
    .text(function(d){
        return d.name
    })

const axis = d3.axisBottom(scale)
axis.tickValues([0, 2e6, 4e6, 6e6, 8e6, 10e6])

d3.select('.axis')
    .call(axis)