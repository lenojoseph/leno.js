const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

class CustomEmbed {
    constructor() {
        this.embed = new EmbedBuilder();
        this.defaultFooter = {
            text: '- powered by leno',
            iconURL: 'https://lenobot.xyz/asset/Leno_Logo_New.png',
        };

        this.defaultColor = '#F4C2C2'; // Baby pink color
        this.embed.setFooter(this.defaultFooter);
    }

    setTitle(title) {
        this.embed.setTitle(title);
        return this;
    }

    setDescription(description) {
        this.embed.setDescription(description);
        return this;
    }

    setColor(color = this.defaultColor) {
        this.embed.setColor(color);
        return this;
    }

    setAuthor({ name, iconURL } = {}) {
        if (!name) throw new Error('The "name" field is required in setAuthor.');
        this.embed.setAuthor({ name, iconURL });
        return this;
    }

    setThumbnail(url) {
        this.embed.setThumbnail(url);
        return this;
    }

    setFields(fields) {
        this.embed.addFields(fields);
        return this;
    }

    setImage(url) {
        this.embed.setImage(url);
        return this;
    }

    setTimestamp() {
        this.embed.setTimestamp();
        return this;
    }

    setFooter(text, iconURL) {
        this.embed.setFooter({ text, iconURL });
        return this;
    }

    getEmbed() {
        if (!this.embed.data.color) {
            this.embed.setColor(this.defaultColor);
        }
        if (!this.embed.data.footer) {
            this.embed.setFooter(this.defaultFooter);
        }
        return this.embed;
    }
}

// Function to create a basic embed for a specific page
function createEmbed(content, page, totalPages, customEmbed = null) {
    if (customEmbed) {
        return customEmbed
            .setDescription(content)
            .setTitle(`Page ${page}/${totalPages}`)
            .getEmbed();
    }

    // Fallback to default pagination embed
    return new EmbedBuilder()
        .setColor('#F4C2C2')
        .setDescription(content)
        .setFooter({ text: '- powered by leno', iconURL: 'https://lenobot.xyz/asset/Leno_Logo_New.png' })
        .setTitle(`Page ${page}/${totalPages}`);
}

// Universal pagination handler
async function handlePagination(interactionOrMessage, contentArray, perPage = 1, customEmbed = null) {
    if (!contentArray || contentArray.length === 0) {
        const reply = "There's no content to paginate!";
        if (interactionOrMessage.reply) {
            return interactionOrMessage.reply(reply);
        } else {
            return interactionOrMessage.channel.send(reply);
        }
    }

    let currentPage = 1;
    const totalPages = Math.ceil(contentArray.length / perPage);
    const isInteraction = !!interactionOrMessage.isCommand;
    let messageDeleted = false;

    let currentContent = contentArray
        .slice((currentPage - 1) * perPage, currentPage * perPage)
        .join('\n');
    const embed = createEmbed(currentContent, currentPage, totalPages, customEmbed);

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('previous')
            .setEmoji('◀')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(currentPage === 1),
        new ButtonBuilder()
            .setCustomId('next')
            .setEmoji('▶')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(currentPage === totalPages),
        new ButtonBuilder()
            .setCustomId('delete')
            .setEmoji('❌')
            .setStyle(ButtonStyle.Secondary)
    );

    const sentMessage = isInteraction
        ? await interactionOrMessage.reply({ embeds: [embed], components: [row]})
        : await interactionOrMessage.channel.send({ embeds: [embed], components: [row] });

    const collector = sentMessage.createMessageComponentCollector({
        filter: (btnInteraction) =>
            btnInteraction.user.id === (isInteraction ? interactionOrMessage.user.id : interactionOrMessage.author.id),
        time: 60000,
    });

    collector.on('collect', async (btnInteraction) => {
        if (btnInteraction.customId === 'delete') {
            messageDeleted = true;
            await sentMessage.delete();
            return collector.stop();
        }

        if (btnInteraction.customId === 'next' && currentPage < totalPages) {
            currentPage++;
        } else if (btnInteraction.customId === 'previous' && currentPage > 1) {
            currentPage--;
        }

        currentContent = contentArray
            .slice((currentPage - 1) * perPage, currentPage * perPage)
            .join('\n');
        const updatedEmbed = createEmbed(currentContent, currentPage, totalPages, customEmbed);

        row.components[0].setDisabled(currentPage === 1);
        row.components[1].setDisabled(currentPage === totalPages);

        await btnInteraction.update({ embeds: [updatedEmbed], components: [row] });
    });

    collector.on('end', async () => {
        if (messageDeleted) return;

        row.components.forEach((button) => button.setDisabled(true));
        try {
            await sentMessage.edit({ components: [row] });
        } catch (err) {
            console.error('Failed to edit message after collector ended:', err);
        }
    });
}

module.exports = { CustomEmbed, handlePagination };
