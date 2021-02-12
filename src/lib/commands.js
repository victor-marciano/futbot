import bot from "../config/bot";
import http from "../http"
import teams from "./teams"

bot.help((ctx) => {
    ctx.replyWithMarkdown(
`**Lista de comandos do bot**

*/ajuda*: **Lista os comandos do bot**
*/acorda*: **Testa se o bot está ativo**`
    )
})

bot.command('acorda', (ctx) => {
    ctx.reply("O FutBot está ativo!")
})

bot.command('rodada_atual', async (ctx) => {
    try {
        const response = await http.get('fixtures', { params: {
            league: '71',
            season: '2020',
            last: 10
        }})

        const formattedData = response.data.response.map(response => {
            let objReturn = {
                status: response.fixture.status.short,
                home: response.teams.home.name,
                away: response.teams.away.name,
                homeGoals: response.goals.home,
                awayGoals: response.goals.away,
            }

            return objReturn;
        })
        
        let html = `**Campeonato Brasileiro 2020** 🇧🇷

`
        formattedData.forEach(data => {
html += `**${data.home}** ${data.homeGoals} x ${data.awayGoals} **${data.away}** | ${data.status}  
`
        })

        ctx.replyWithMarkdown(html)
    } catch (error) {
        console.log(error)
        ctx.reply("Erro ao buscar rodada.")        
    }
})

bot.command('time', async (ctx) => {
   const teamName = ctx.update.message.text.split(' ')[1].toLowerCase()
   const season = ctx.update.message.text.split(' ')[2]

   const team = teams.find(team => team.name === teamName)

   if (!team) {
       return ctx.reply('Nenhum clube encontrado.')
   }

   const response = await http.get('standings', { params: {
    team: team.id,
    season: season 
    }})

    const data = {
        year: response.data.parameters.season,
        teamName: response.data.response[0].league.standings[0][0].team.name,
        rankNational: response.data.response[0].league.standings[0][0].rank,
        photo: response.data.response[0].league.standings[0][0].team.logo
    }

    console.log(response.data.response[0].league.standings[0][0].team)
    console.log(response.data.response[0].league.standings[0][0].all)
    ctx.replyWithPhoto(data.photo), { 
         caption: `${data.teamName} em ${data.year}
Brasileirão: *${data.rankNational}*`
        , parse_mode: 'Markdown' 
    }

})

bot.command('goal', (ctx) => {
    ctx.replyWithMarkdown(
`GOOOOOOOOOOOOOOL DO CORINTHIANS!! ⚽⚽

Corinthians **2** x **0** Flamengo - 🕒 2T 44:38 - 🏟️ Neo Química Arena`
)
})