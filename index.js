import * as cheerio from "cheerio"
import nodeFetch from "node-fetch"
import * as fs from 'node:fs'

const url = "https://www.premierleague.com/stats/top/players/goals?se=578"



const getPremierLeagueData = async () => {
    try {
        const statData = []
        const data = await fetch(url)
        const body = await data.text()

        const $ = cheerio.load(body)
        $(`.stats-table__container > .table__row `).map((i, element) => {
            const rank = $(element).find('.stats-table__rank').text()
            const name = $(element).find('.stats-table__name').text().trim()
            // const club = $(element).find('.stats-table__cell-icon-align').text().trim()
            const country = $(element).find('.stats__player-country').text()
            const goals = $(element).find('.stats-table__main-stat').text()
            statData.push({
                rank,
                name,
                // club,
                country,
                goals
            })
            fs.writeFile("data.json", JSON.stringify(statData), (err) => {
                console.log(err)
            })
        })
    } catch (err) {
        err ? console.log(`Encounter error while fetching data`) : ""
    }
}

getPremierLeagueData()