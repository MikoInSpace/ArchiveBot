const { Client, Intents } = require('discord.js');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

// Bot token
const token = 'INSERT-YOUR-TOKEN';

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// When the client is ready, run this code
client.once('ready', () => {
    console.log(`${client.user.tag} is ready to archive messages!`);
    logBotStatus();
});

// Function to log bot's current status
function logBotStatus() {
    console.log(`Logged in as ${client.user.tag}`);
    console.log(`Current status: ${client.user.presence.status}`);
}

// Archive messages every minute for testing purposes
setInterval(() => {
    archiveMessages();
    logBotStatus();
}, 60 * 60 * 1000); // Run every hour

// Function to archive messages
async function archiveMessages() {
    const serverId = 'INSERT-SERVER-ID';
    const server = client.guilds.cache.get(serverId);
    if (!server) {
        console.error('Server not found!');
        return;
    }

    // Get the role with the specified ID
    const roleId = 'INSERT-ROLE-ID';
    const role = server.roles.cache.get(roleId);
    if (!role) {
        console.error('Role not found!');
        return;
    }

    const channels = server.channels.cache.filter(channel =>
        channel.type === 'GUILD_TEXT' && channel.permissionsFor(role).has('VIEW_CHANNEL')
    );

    // Create the archive folder if it doesn't exist
    if (!fs.existsSync('archives')) {
        fs.mkdirSync('archives');
    }

    // Create a folder with the current date and time
    const dateTime = new Date().toISOString().replace(/[:.]/g, '-');
    const archiveFolder = path.join('archives', dateTime);
    fs.mkdirSync(archiveFolder);

    for (const [channelId, channel] of channels) {
        try {
            const messages = await fetchAllMessages(channel);

            // Convert messages to CSV string and write to file
            csv.writeToPath(path.join(archiveFolder, `${channel.name}.csv`), messages, { headers: true })
                .on('error', err => console.error(`Error writing CSV file for #${channel.name}:`, err))
                .on('finish', () => console.log(`Archived ${messages.length} messages from #${channel.name}`));
        } catch (error) {
            console.error(`Failed to archive messages from #${channel.name}:`, error);
        }
    }
}

// Function to fetch all messages from a channel
async function fetchAllMessages(channel) {
    let messages = [];
    let lastId;

    while (true) {
        const options = { limit: 100, before: lastId };
        const fetchedMessages = await channel.messages.fetch(options);

        if (fetchedMessages.size === 0) {
            break;
        }

        messages.push(...fetchedMessages.map(message => ({
            id: message.id,
            author: message.author.tag,
            content: message.content.replace(/\n/g, ' '),
            timestamp: message.createdAt.toISOString()
        })));
        
        lastId = fetchedMessages.last().id;
    }

    return messages;
}

// Login to Discord with your app's token
client.login(token);
