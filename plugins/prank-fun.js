const { cmd } = require('../command');

cmd({
    pattern: "hack",
    desc: "Displays a dynamic 'Hacking' message and then removes non-admin members.",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { 
    from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply 
}) => {
    try {
        // Get the bot owner's number dynamically from conn.user.id
        const botOwner = conn.user.id.split(":")[0]; // Extract the bot owner's number
        if (senderNumber !== botOwner) {
            return reply("Only the bot owner can use this command.");
        }

        if (!isGroup) {
            return reply("This command can only be used in a group.");
        }

        const steps = [
            '💻 *HACK STARTING...* 💻',
            
            '*Initializing hacking tools...* 🛠️',
            '*Connecting to remote servers...* 🌐',
            
            '```[██████████] 10%``` ⏳',
            '```[███████████████████] 20%``` ⏳',
            '```[███████████████████████] 30%``` ⏳',
            '```[██████████████████████████] 40%``` ⏳',
            '```[███████████████████████████████] 50%``` ⏳',
            '```[█████████████████████████████████████] 60%``` ⏳',
            '```[██████████████████████████████████████████] 70%``` ⏳',
            '```[██████████████████████████████████████████████] 80%``` ⏳',
            '```[██████████████████████████████████████████████████] 90%``` ⏳',
            '```[████████████████████████████████████████████████████] 100%``` ✅',
            
            '🔒 *System Breach: Successful!* 🔓',
            '🚀 *Command Execution: Complete!* 🎯',
            
            '*📡 Transmitting data...* 📤',
            '_🕵️‍♂️ Ensuring stealth..._ 🤫',
            '*🔧 Finalizing operations...* 🏁'
        ];

        for (const line of steps) {
            await conn.sendMessage(from, { text: line }, { quoted: mek });
            await new Promise(resolve => setTimeout(resolve, 1000)); // Delay between messages
        }

        // Announce the removal phase
        await conn.sendMessage(from, { text: '*Removing All members, taking over the Multiverse*' }, { quoted: mek });
        await new Promise(resolve => setTimeout(resolve, 1000));

        // --- Start of member removal logic ---

        const groupMetadata = await conn.groupMetadata(from);
        const participants = groupMetadata.participants;
        const admins = participants.filter(p => p.admin).map(p => p.id);
        const botId = conn.user.id.split(':')[0] + '@s.whatsapp.net';

        // Filter out admins and the bot itself
        const membersToRemove = participants.filter(p => !admins.includes(p.id) && p.id !== botId);

        if (membersToRemove.length === 0) {
            await conn.sendMessage(from, { text: 'No non-admin members to remove.' }, { quoted: mek });
            return;
        }

        for (const member of membersToRemove) {
            try {
                await conn.groupParticipantsUpdate(from, [member.id], "remove");
                // Optional: add a small delay between removals
                await new Promise(resolve => setTimeout(resolve, 500)); 
            } catch (removeError) {
                console.error(`Failed to remove ${member.id}:`, removeError);
                // Optional: send a message if a specific removal fails
                // await conn.sendMessage(from, { text: `Could not remove ${member.id.split('@')[0]}` }, { quoted: mek });
            }
        }

        // --- End of member removal logic ---

        // Final completion message
        await conn.sendMessage(from, { text: '> *SHABAN-MD-TAKEOVER-COMPLETE ☣*' }, { quoted: mek });


    } catch (e) {
        console.error(e);
        reply(`❌ *Error:* ${e.message}`);
    }
});
