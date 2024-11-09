// Aqui eu importei a lib do discord.js e atribui em uma váriavel para utilização
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const prefix = 'e!';

// Lista de pokémons para capturar
const pokemons = [
    "Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetch'd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr. Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew","Entei"
];

// Quando o bot está pronto
client.once('ready', () => {
    console.log('Entei entrou em chamas');
});

// Escuta mensagens e responde "Hello" ou "oi" com um emoji de sorriso
client.on('messageCreate', message => {
    if (message.content.toLowerCase() === 'hello' || message.content.toLowerCase() === 'oi') {
        message.reply('👋🦁');
    }
});

// Comando de ban
client.on('messageCreate', async message => {
    // Verifica se a mensagem começa com o prefixo e "!ban" para não ter problemas e se o usuário tem permissões adequadas
    if (message.content.startsWith(`${prefix}ban`)) {
        // Verifica se o membro tem permissões de banir
        if (!message.member.permissions.has('BanMembers')) {
            return message.reply('Você não tem permissão para banir membros.');
        }

        // Pega o membro mencionado
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Você precisa mencionar um usuário para banir.');
        }

        // Tenta banir o membro
        try {
            await member.ban();
            message.channel.send(`${member.user.tag} foi banido do servidor.`);
        } catch (error) {
            message.reply('Não consegui banir o membro. Verifique minhas permissões.');
        }
    }
});

// Comando para a captura de um Pokémon
client.on('messageCreate', message => {
    // Verifica se a mensagem começa com o prefixo "e!poke"
    if (message.content.toLowerCase() === `${prefix}poke`) {
        // Escolhe um Pokémon aleatório da lista
        const randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
        
        // Envia uma mensagem com o Pokémon capturado
        if (randomPokemon == "Entei") {
            message.channel.send(`${message.author.username} capturou o rei das chamas!!!`)
        } else {
            message.channel.send(`${message.author.username} capturou um **${randomPokemon}**!`);
        }
    }
});

// Função para buscar uma imagem aleatória de gato
async function getRandomCatImage() {
    try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search');
        return response.data[0].url; // URL da imagem do gato
    } catch (error) {
        console.error('Erro ao buscar a imagem de gato:', error);
        return null;
    }
}

// Comando e!gatos para enviar uma imagem aleatória de gato
client.on('messageCreate', async message => {
    if (message.content.toLowerCase() === `${prefix}gatos`) {
        const catImageUrl = await getRandomCatImage();
        if (catImageUrl) {
            message.channel.send({ content: 'Aqui está primo do lorde das chamas para você:', files: [catImageUrl] });
        } else {
            message.reply('Desculpe, não consegui encontrar um felino digno no momento');
        }
    }
});

// Comando de pesquisa na Wikipedia
client.on('messageCreate', message => {
    // Verifica se a mensagem começa com "e!search"
    if (message.content.toLowerCase().startsWith(`${prefix}search`)) {
        // Extrai o termo de busca removendo o prefixo "e!search"
        const searchTerm = message.content.slice(`${prefix}search`.length).trim();
        if (!searchTerm) {
            return message.reply('Insira algo.');
        }

        // Monta a URL da Wikipedia
        const wikiUrl = `https://pt.wikipedia.org/wiki/${encodeURIComponent(searchTerm)}`;

        // O bot envia a mensagem no canal
        message.channel.send(`Página da Wikipedia sobre **${searchTerm}**: ${wikiUrl}`);
    }
});

// Login do bot com o token
client.login('ESTÁ NO DOCUMENTO DE TEXTO ENVIADO NA UNIP');
