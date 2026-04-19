'use strict';

const { Collection } = require('@discordjs/collection');
const ApplicationCommandManager = require('./ApplicationCommandManager');
const ApplicationCommandPermissionsManager = require('./ApplicationCommandPermissionsManager');

/**
 * An extension for guild-specific application commands.
 * @extends {ApplicationCommandManager}
 */
class GuildApplicationCommandManager extends ApplicationCommandManager {
  constructor(guild, iterable) {
    super(guild.client, iterable);

    /**
     * The guild that this manager belongs to
     * @type {Guild}
     */
    this.guild = guild;

    /**
     * The manager for permissions of arbitrary commands on this guild
     * @type {ApplicationCommandPermissionsManager}
     */
    this.permissions = new ApplicationCommandPermissionsManager(this);

    /**
     * Shared cache of application command permission overrides for this guild,
     * keyed by command id (or by application id for guild-wide overrides).
     * Read and written by every {@link ApplicationCommandPermissionsManager} that targets this guild.
     * @type {Collection<Snowflake, ApplicationCommandPermissions[]>}
     */
    this.permissionsCache = new Collection();
  }
}

module.exports = GuildApplicationCommandManager;
