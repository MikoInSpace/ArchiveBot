const { Client, Intents } = require('discord.js');
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

// Bot token
const token = 'YOUR-TOKEN-HERE';

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

// Archive messages every hour
setInterval(() => {
    archiveMessages();
    logBotStatus();
}, 60 * 60 * 1000); // Run every hour

// Function to archive messages
async function archiveMessages() {
    const serverId = 'YOUR-SERVER-ID-HERE';
    const server = client.guilds.cache.get(serverId);
    if (!server) {
        console.error('Server not found!');
        return;
    }

    // Get the role with the specified ID
    const roleId = 'YOUR-ROLE-ID-HER';
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

    for (const [channelId, channel] of channels) {
        try {
            const messages = await fetchAllMessages(channel);

            // Generate a unique folder name with the current date and time for each archive operation
            const dateTime = new Date().toISOString().replace(/[:.]/g, '-');
            const archiveFolder = path.join('archives', dateTime);
            fs.mkdirSync(archiveFolder);

            // Convert messages to CSV string and write to file
            csv.writeToPath(path.join(archiveFolder, `${channel.name}.csv`), messages, { headers: true })
                .on('error', err => console.error(`Error writing CSV file for #${channel.name}:`, err))
                .on('finish', () => console.log(`Archived ${messages.length} messages from #${channel.name}`));
        } catch (error) {
            console.error(`Failed to archive messages from #${channel.name}:`, error);
        }
    }
}

// Function to fetch all messages from a channel that are at least 30 minutes old
async function fetchAllMessages(channel) {
    let messages = [];
    let lastId;
    const now = new Date();
    const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);

    while (true) {
        const options = { limit: 100, before: lastId };
        const fetchedMessages = await channel.messages.fetch(options);

        if (fetchedMessages.size === 0) {
            break;
        }

        const filteredMessages = fetchedMessages.filter(message => message.createdAt <= thirtyMinutesAgo);

        messages.push(...filteredMessages.map(message => ({
            id: message.id,
            author: message.author.tag,
            content: message.content.replace(/\n/g, ' '),
            timestamp: message.createdAt.toISOString()
        })));

        if (fetchedMessages.size < 100) {
            break;
        }

        lastId = fetchedMessages.last().id;
    }

    return messages;
}

// Login to Discord with your app's token
client.login(token);
