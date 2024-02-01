import * as cheerio from "cheerio"
import nodeFetch from "node-fetch"
// import fs from "node"
import * as fs from 'node:fs'

// const url = "https://www.premierleague.com/stats"
const url = "https://www.premierleague.com/stats/top/players/goals?se=578"





const getPremierLeagueData = async () => {
    try {
        const statData = []
        // const data = await fetch(process.env.PREMIER_STAT)
        const data = await fetch(url)
        const body = await data.text()

        const $ = cheerio.load(body)
        $(`.stats-table__container > .table__row `).map((i, element) => {
            // const tableRow = $(element).find('.table__row ').map((i, el) => {
                
            // })
            const rank = $(element).find('.stats-table__rank').text()
            const name = $(element).find('.stats-table__name').text().trim()
            const club = $(element).find('.stats-table__cell-icon-align').text().trim
            // const rank
            statData.push({
                rank,
                name,
                club
            })
            // console.log(table__row)
            fs.writeFile("data.json", JSON.stringify(statData), (err) => {
                console.log(err)
            })
        })
    } catch (err) {
        console.log(err)
        // err ? console.log(`Encounter error while fetching`) : ""
    }
}

getPremierLeagueData()