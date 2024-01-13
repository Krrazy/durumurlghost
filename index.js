const Discord = require('discord.js');

require('dotenv').config();
require('colors');

const client = global.client = new Discord.Client({
    intents: [32767, Discord.GatewayIntentBits.MessageContent],
    presence: { status: 'idle', activities: [{ name: 'www.itemsatis.com/p/GhostMarket', type: 3 }] } // Elleme bozarsın
}); console.clear();

client.login(process.env.Token)
    .then(async c => await console.log(`\n\n  The Bot has been Activated on:`.magenta + ` ${client.guilds.cache.size} servers `.blue + `\n  Bot Name:`.magenta + ` ${client.user.tag} \n\n`.blue));

setInterval(async () => {
    let guild = client.guilds.cache.get('SUNUCU ID'); //GhostMarket Güvencesiyle :)
    if (!guild) return console.log('Guild ID\'si Belirtilmemiş'.red);
    let role = guild.roles.cache.get('VERİLCEK ROL ID'); //GhostMarket Güvencesiyle :)
    if (!role) return console.log('Role ID\'si Belirtilmemiş'.red);
    let channel = guild.channels.cache.get('LOG KANAL ID'); //GhostMarket Güvencesiyle :)
    if (!channel) return console.log('Kanal ID\'si Belirtilmemiş'.red);

    await guild.members.cache.map(async m => {
        let status = m.presence?.activities.map(pre => pre.state).join() || '';
        let control = status.includes('DURUMA NE YAZILACAK');

        if (!control) {
            if (m.roles.cache.has(role.id)) {
                await m.roles.remove(role.id);
                return await channel.send({ embeds: [{ color: 0xf43f5e, description: `<a:shop_no:1188863004817756190> ${m} adlı kullanıcı durumundan URL'mizi çıkardı. (\`Yeni durumu: ${status}\`)` }] });
            }
        }

        if (control) {
            if (!m.roles.cache.has(role.id)) {
                await m.roles.add(role.id);
                return await channel.send({ embeds: [{ color: 0x10b981, description: `<a:shop_yes:1188589092854845492> ${m} adlı kullanıcı durumuna URL'mizi ekledi. (\`Yeni Durumu: ${status}\`)` }] });
            }
        }
    });

}, 1000 * 30 * 1);