/* Import core modules. */
const debug = require('debug')('cashfusion:test')
const net = require('net')
const numeral = require('numeral')
const path = require('path')
const protobuf = require('protobufjs')

const GENESIS = '6fe28c0ab6f1b372c1a6a246ae63f74f931e8365e15a089c68d6190000000000'
const HOST = 'cashfusion.electroncash.dk'
const PORT = 8787
const VERSION = 'alpha13'

/* Initialize magic (bytes). */
const magic = Buffer.from('765be8b4e4396dcf', 'hex')

/* Initialize protobuf classes. */
// const pbEnums = ['Phase', 'Reason']

/* Initialize protobuf types. */
const pbTypes = [
    'InputComponent', 'OutputComponent', 'BlankComponent', 'Component',
    'InitialCommitment', 'Proof', 'ClientHello', 'ServerHello', 'JoinPools',
    'TierStatusUpdate', 'FusionBegin', 'StartRound', 'PlayerCommit',
    'BlindSigResponses', 'AllCommitments', 'CovertComponent',
    'ShareCovertComponents', 'CovertTransactionSignature', 'FusionResult',
    'MyProofsList', 'TheirProofsList', 'Blames', 'RestartRound', 'Error',
    'Ping', 'OK', 'ClientMessage', 'ServerMessage', 'CovertMessage',
    'CovertResponse'
]

/* Initialize tiers output. */
let tiersOutput = null

/**
 * Parse Players
 */
const _parsePlayers = (_tier) => {
    if (_tier.timeRemaining) {
        /* Set time remaining. */
        const remaining = (_tier.timeRemaining / 60).toFixed(1) + ' mins remaining'

        return `${_tier.players} of ${_tier.minPlayers} [ ${remaining} ]`
    } else {
        return `${_tier.players} of ${_tier.minPlayers}`
    }
}

/* Initialize protobuf. */
const PB = {
    root: protobuf.loadSync(path.join(__dirname, 'libs', 'cashfusion', 'fusion.proto'))
}

/* Loop through ALL protobuf types. */
for (let oneTypeName of pbTypes) {
    PB[oneTypeName] = PB.root.lookupType(oneTypeName)
}
// debug('Protocol buffer', PB)

/**
 * Greeting
 */
const greet = function () {
    console.info('\n\tGreeting CashFusion server...\n') // eslint-disable-line no-console

    /* Set message. */
    const message = PB.ClientMessage.create({
        clienthello: PB.ClientHello.create({
            version: Buffer.from(VERSION),
            genesisHash: Buffer.from(GENESIS, 'hex')
        })
    })

    /* Verify message. */
    const errMsg = PB.ClientMessage.verify(message)
    if (errMsg) {
        // debug('Protobuf verification failed!', errMsg)
        throw new Error(errMsg)
    }

    /* Encode message. */
    const buffer = PB.ClientMessage.encode(message).finish()
    // debug('Encoded message:', buffer.toString('hex'))

    // const decoded = PB.ClientMessage.decode(buffer)
    // debug('Decoded:', decoded)

    /* Return packed message. */
    return packMessage(buffer)
}

/**
 * Register
 */
const register = function () {
    console.info('\n\tRegistering tiers...\n') // eslint-disable-line no-console

    // All tiers
    // tiersOutput = [
    //     10000, 12000, 15000, 18000, 22000, 27000, 33000, 39000, 47000, 56000, 68000, 82000,
    // ]
    tiersOutput = [
        10000, 12000, 15000, 18000, 22000, 27000, 33000, 39000, 47000, 56000, 68000, 82000,
        100000, 120000, 150000, 180000, 220000, 270000, 330000, 390000, 470000, 560000, 680000, 820000,
        1000000, 1200000, 1500000, 1800000, 2200000, 2700000, 3300000, 3900000, 4700000, 5600000, 6800000, 8200000,
        10000000, 12000000, 15000000, 18000000, 22000000, 27000000, 33000000, 39000000, 47000000, 56000000, 68000000, 82000000
    ]
    debug('Tiers output:', tiersOutput.length, tiersOutput)

    /* Set message. */
    const message = PB.ClientMessage.create({
        joinpools: PB.JoinPools.create({
            tiers: tiersOutput,
            tags: [PB.JoinPools.PoolTag.create({
                // FIXME: Figure out what this id/tag means??
                id: Buffer.from('c58594f6f26f0315f459f06d4106084ae53058e3', 'hex'),
                limit: 1
            })]
        })
    })

    /* Verify message. */
    const errMsg = PB.ClientMessage.verify(message)
    if (errMsg) {
        // debug('Protobuf verification failed!', errMsg)
        throw new Error(errMsg)
    }

    /* Encode message. */
    const buffer = PB.ClientMessage.encode(message).finish()
    // debug('Encoded message:', buffer.toString('hex'))

    // const decoded = PB.ClientMessage.decode(buffer)
    // debug('Decoded:', decoded)

    /* Return packed message. */
    return packMessage(buffer)

}

/**
 * Pack Message
 *
 * Encode (pack) a message into a prototype buffer (protobuf) object.
 */
function packMessage (_packets) {
    // debug('Packing message:', _packets)

    /* Initialize message length. */
    const messageLength = Buffer.allocUnsafe(4)

    /* Calculate message length. */
    const lengthDec = _packets.length

    /* Set message length. */
    // NOTE: 4-bytes in big-endian (bytes order).
    messageLength.writeUIntBE(lengthDec, 0, 4)
    // debug('Message length:', messageLength)

    /* Build packet. */
    const packet = Buffer.concat([
        magic,
        messageLength,
        _packets
    ])
    // debug('Packet message:', packet)

    return packet

    // _packets = _.isArray(_packets) ? _packets : [_packets]

    // const messageBuffer = _packets

    /* Initialize length suffix. */
    // const lengthSuffix = Buffer.alloc(4)

    /* Set length suffix. */
    // lengthSuffix.writeUIntBE(messageBuffer.length, 0, 4)

    /* Set message components. */
    // const messageComponents = [magic, lengthSuffix, messageBuffer]

    /* Set full message. */
    // const fullMessage = Buffer.concat(messageComponents)

    /* Return message object. */
    // return {
    //     unpacked: _packets,
    //     packed: fullMessage,
    //     components: messageToBuffers(fullMessage)
    // }
}

/* Initialize client. */
const client = new net.Socket()

/**
 * Connect
 *
 * Opens a new connection to the host.
 */
client.connect(PORT, HOST, function () {
    debug('Connected! (host/port):', HOST, PORT)

    /* Initialize greeting. */
    const greeting = greet()
    debug('Greeting', greeting.toString('hex'))

    /* Send greeting. */
    client.write(greeting)
})

/**
 * Handle Data
 *
 * Processes all data received from the host.
 */
client.on('data', function (_data) {
    // debug('RECEIVED DATA:', _data)

    debug('Incoming data (from server):', Buffer.from(_data).toString('hex'))

    const message = _data.slice(magic.length + 4)
    // debug('Incoming data (message):', message.toString('hex'))

    const decoded = PB.ServerMessage.decode(message)
    debug('Incoming data (decoded):', decoded)

    /* Handle message. */
    if (decoded.serverhello) {
        /* Validate data. */
        if (!PB.ServerHello.verify(decoded.serverhello)) {
            debug('ServerHello (tiers):', decoded.serverhello.tiers)
            debug('ServerHello (numComponents):', decoded.serverhello.numComponents)
            debug('ServerHello (componentFeerate):', decoded.serverhello.componentFeerate)
            debug('ServerHello (minExcessFee):', decoded.serverhello.minExcessFee)
            debug('ServerHello (maxExcessFee):', decoded.serverhello.maxExcessFee)
            debug('ServerHello (donationAddress):', decoded.serverhello.donationAddress)

            /* Initialize registration. */
            const registration = register()
            debug('Registration', registration.toString('hex'))

            /* Send greeting. */
            client.write(registration)

        } else {
            throw new Error(PB.ServerHello.verify(decoded.serverhello))
        }
    }

    /* Handle data. */
    if (decoded.tierstatusupdate) {
        // console.log('DEBUG:', decoded.tierstatusupdate)

        const statuses = decoded.tierstatusupdate.statuses
        // debug('Tier statuses::', statuses)

        const keys = Object.keys(statuses)
        // debug('Tier keys:', decodeURIComponent(keys))

        /* Display each key status. */
        keys.forEach((key, i) => {
            // debug(i, decodeURIComponent(key), statuses[key])
            debug(`Tier ${numeral(tiersOutput[i]).format('0,0')} - ${_parsePlayers(statuses[key])}`)
        })

        client.destroy()
        // if (!PB.TierStatusUpdate.verify(decoded.tierstatusupdate)) {
        //     debug('TierStatusUpdate (statuses):', decoded.tierstatusupdate.statuses)
        // } else if (decoded.tierstatusupdate) {
        //     throw new Error(PB.TierStatusUpdate.verify(decoded.tierstatusupdate))
        // }
    }

    // Close the client socket completely
    // client.destroy()
})

/**
 * Handle Close
 *
 * Handles connection termination.
 */
client.on('close', function () {
    debug('Connection closed.')
})
