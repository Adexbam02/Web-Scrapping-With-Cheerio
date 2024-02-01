import * as cheerio from "cheerio"
import nodeFetch from "node-fetch"
// import fs from "node"
import * as fs from 'node:fs'

const formulaOneDriverURL = "https://www.formula1.com/en/drivers.html"

const getFormulaOneDrivers = async () => {

    try {
        const response = await fetch(formulaOneDriverURL)
        const body = await response.text()

        const $ = cheerio.load(body)
        const wrapper = $('.row')
        // console.log(wrapper.length)



        // fs.writeFile("body.html", body, (err) => {
        //     if (err) throw err;
        //     console.log('The file has been saved!');
        // })
        // console.log(body)

        const items = []
        $('.listing-items--wrapper > .row .col-12').map((index, element) => {
            const name = $(element).find('.listing-item--name').text()
            const team = $(element).find('.listing-item--team').text()
            // const countryFlag = $(element).find('country-flag').attr('data-src')
            // console.log(rank)
            // console.log(team)



            items.push({
                name,
                team,
                countryFlag
            })

            fs.writeFile("data.json", JSON.stringify(items).trim(), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            })
            // console.log(items)
        })
    } catch (error) {
        console.log(error)
    }
}

getFormulaOneDrivers()