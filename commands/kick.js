const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kicks a user from the server',
    permissions: ['KICK_MEMBERS'],
    execute(message, args) {
        // Get the user ID to kick from the arguments
        const userId = args[0];
        if (!userId) {
            return message.reply('please provide a valid user ID to kick.');
        }

        // Get the guild from the message
        const guild = message.guild;
        if (!guild) {
            return message.reply('this command can only be used in a server.');
        }

        // Get the member to kick
        const member = guild.members.cache.get(userId);
        if (!member) {
            return message.reply('the specified user is not a member of this server.');
        }

        // Get the reason for the kick
        const reason = args.slice(1).join(' ');

        // Kick the member
        member.kick(reason)
        .then(() => message.reply(`${member.user.tag} has been kicked.`))
        .catch(error => {
            console.error(error);
            message.reply('there was an error trying to kick the user.');
        });
    },
};
