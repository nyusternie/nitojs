/* Import core modules. */
const _ = require('lodash')
const debug = require('debug')('cashfusion:test')
const net = require('net')
const path = require('path')
const protobuf = require('protobufjs')
// const repl = require('repl')

/* Import local modules. */
// const ShuffleClient = require('./ShuffleClient.js')
// const JsonWallet = require('./JsonWallet')

/* Initialize shuffle. */
// const shuffleIt = repl.start('cashfusion > ')

// const GENESIS = '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f'
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

/* Initialize protobuf. */
const PB = {
    root: protobuf.loadSync(path.join(__dirname, 'fusion.proto'))
}

/* Loop through ALL protobuf types. */
for (let oneTypeName of pbTypes) {
    PB[oneTypeName] = PB.root.lookupType(oneTypeName)
}
// debug('Protocol buffer', PB)


/**
 * Send Message
 */
const sendMessage = function (_msg) {
    debug('Send message', _msg)

    /* Initialize message length. */
    const messageLength = Buffer.allocUnsafe(4)

    /* Set message (buffer). */
    // const message = Buffer.from(_msg.toString())
    // const message = _msg

    /* Calculate message length. */
    const lengthDec = _msg.length
    // const lengthHex = lengthDec.toString(16)
    // const lengthBuf = Buffer.from(lengthHex, 'hex')
    // debug('Message length (dec / hex / buf)',
    //     lengthDec, lengthHex, lengthBuf)

    /* Set message length. */
    // NOTE: 4-bytes in big-endian (bytes order).
    // lengthBuf.copy(messageLength)
    // messageLength.writeUIntBE(lengthBuf, 0, 4)
    messageLength.writeUIntBE(lengthDec, 0, 4)
    debug('Message length', messageLength)

    /* Build packet. */
    const packet = Buffer.concat([
        magic,
        messageLength,
        _msg
    ])
    debug('Packet message:', packet)
    debug('Packet message (string):', packet.toString())

    return packet
}

/**
 * Greeting
 */
const greet = function () {
    debug('Greeting server...')

    // packet = self.packets.packet.add()
    // packet.packet.from_key.key = verification_key
    // packet.packet.registration.amount = amount
    // packet.packet.registration.type = typ
    // packet.packet.registration.version = version

    // send(pb.ClientHello(version=VERSION, genesis_hash=GENESIS))

    /* Set message. */
    // const message = PB.Signed.create({
    //     packet: PB.Packet.create({
    //         fromKey: PB.VerificationKey.create({ key }),
    //         registration: PB.Registration.create({
    //             amount: amount,
    //             version: protocolVersion,
    //             // type: 'DEFAULT' // WHY AREN'T WE USING THIS??
    //             type: 'DEFAULT'
    //         })
    //     })
    // })

    /* Set message. */
    const message = PB.ClientMessage.create({
        clienthello: PB.ClientHello.create({
            version: Buffer.from(VERSION),
            genesisHash: Buffer.from(GENESIS, 'hex')
        })
    })

    // const obj = {
    //     version: Buffer.from(VERSION),
    //     genesisHash: Buffer.from(GENESIS, 'hex')
    // }

    // const payload = PB.ClientHello.fromObject(obj)
    // const payload = obj

    const errMsg = PB.ClientMessage.verify(message)
    if (errMsg) {
        debug('Protobuf verification failed!', errMsg)
    }

    const buffer = PB.ClientMessage.encode(message).finish()
    debug('MESSAGE', buffer)
    debug('MESSAGE (hex)', buffer.toString('hex'))
    debug('MESSAGE (string)', buffer.toString())

    const decoded = PB.ClientMessage.decode(buffer)
    debug('Decoded', decoded)

    // const packet = PB.encode(message)
    // debug('PACKET', packet)

    /* Return packed message. */
    return sendMessage(buffer)
    // return packMessage(message)

    // reply = self.recv('serverhello')
    // self.num_components = reply.num_components
    // self.component_feerate = reply.component_feerate
    // self.min_excess_fee = reply.min_excess_fee
    // self.max_excess_fee = reply.max_excess_fee
    // self.available_tiers = tuple(reply.tiers)
    // strong_plugin = self.strong_plugin
    // if strong_plugin:
    //     strong_plugin.set_remote_donation_address(reply.donation_address)
    //
    // # Enforce some sensible limits, in case server is crazy
    // if self.component_feerate > 5000:
    //     raise FusionError('excessive component feerate from server')
    // if self.min_excess_fee > 400:
    //     raise FusionError('excessive min excess fee from server')
}

/**
 * Pack Message
 *
 * Encode (pack) a message into a prototype buffer (protobuf) object.
 */
function packMessage (oneOrMorePackets) {
    oneOrMorePackets = _.isArray(oneOrMorePackets) ? oneOrMorePackets : [oneOrMorePackets]

    /* Set packets. */
    // const packets = PB.Packets.create({ packet: oneOrMorePackets })

    /* Set message buffer. */
    // const messageBuffer = PB.Packets.encode(packets).finish()
    // const messageBuffer = PB.Packets.encode(oneOrMorePackets).finish()
    // console.log('PB', PB)
    // const clientHello = PB.lookup('ClientHello')
    // const messageBuffer = PB.ClientHello.encode(oneOrMorePackets).finish()
    const messageBuffer = oneOrMorePackets

    /* Initialize length suffix. */
    const lengthSuffix = Buffer.alloc(4)

    /* Set length suffix. */
    lengthSuffix.writeUIntBE(messageBuffer.length, 0, 4)

    /* Set message components. */
    const messageComponents = [magic, lengthSuffix, messageBuffer]

    /* Set full message. */
    const fullMessage = Buffer.concat(messageComponents)

    /* Return message object. */
    return {
        unpacked: oneOrMorePackets,
        packed: fullMessage,
        components: messageToBuffers(fullMessage)
    }
}

/**
 * Message to Buffers
 */
function messageToBuffers (someBase64Message) {
    /* Initialize message buffer. */
    const messageBuffer = Buffer.from(someBase64Message, 'base64')

    /* Validate message buffer. */
    if (messageBuffer.length < 12) {
        throw new Error('bad_length')
    } else {
        /* Set message magic (bytes). */
        const messageMagic = messageBuffer.slice(0, 8)

        /* Validate message magic (bytes). */
        if (messageMagic.toString('hex') !== magic.toString('hex')) {
            throw new Error('message_magic')
        }

        /* Initialize message length. */
        let messageLength = messageBuffer.slice(8, 12)

        /* Set message length. */
        messageLength = messageLength.readUInt32BE()

        /* Set message payload. */
        // const messagePayload = messageBuffer.slice(12, ) // FIXME: Why do we have a trailing space??
        const messagePayload = messageBuffer.slice(12) // FIXME: Why do we have a trailing space??

        /* Validate message payload. */
        if (messagePayload.length !== messageLength) {
            debug('Incorrect payload size:', messagePayload.length, '!==', messageLength)
            throw new Error('message_payload')
        } else {
            /* Return message buffers. */
            return {
                magic: messageBuffer.slice(0, 8).toString('base64'),
                length: messageBuffer.slice(8, 12).toString('base64'),
                // payload: messageBuffer.slice(12, ).toString('base64'), // FIXME
                payload: messageBuffer.slice(12).toString('base64'), // FIXME
                buffer: messageBuffer.toString('base64')
            }
        }
    }
}

let greeting = greet()
// debug('Greeting', greeting.length, greeting)
debug('Greeting', greeting.length, greeting.toString('hex'))

// return

/* Initialize client. */
const client = new net.Socket()

/**
 * Connect
 *
 * Opens a new connection to the host.
 */
client.connect(PORT, HOST, function () {
    debug('CONNECTED (host/port):', HOST, PORT)
    // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
    // sendMessage('I am Chuck Norris!')

    const greeting = greet()
    debug('Greeting', greeting.toString('hex'))
    client.write(greeting)
})

/**
 * Handle Data
 *
 * Processes all data received from the host.
 */
client.on('data', function (_data) {
    // debug('RECEIVED DATA:', _data)

    debug('Incoming data (from server)', Buffer.from(_data).toString('hex'))

    const message = _data.slice(magic.length + 4)
    // debug('Incoming message', message.toString('hex'))

    const decoded = PB.ServerMessage.decode(message)
    debug('Incoming decoded', decoded)

    debug('Tiers', decoded.serverhello.tiers)
    debug('# Components', decoded.serverhello.numComponents)
    debug('Component fee rate', decoded.serverhello.componentFeerate)
    debug('Min excess fee', decoded.serverhello.minExcessFee)
    debug('Max excess fee', decoded.serverhello.maxExcessFee)
    debug('Donation address', decoded.serverhello.donationAddress)

    // Close the client socket completely
    client.destroy()
})

/**
 * Handle Close
 *
 * Handles connection termination.
 */
client.on('close', function () {
    debug('Connection closed.')
})

/**
 * Delay (Execution)
 */
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/* Initialize new wallet. */
// const myWallet = new JsonWallet({
//     file: './test_json_wallet.js'
// })

/* Unfreeze any frozen addresses. */
// myWallet.unfreezeAddresses(
//     _.map(myWallet.addresses, 'cashAddress')
// )

/* Load up our on-disk HD wallet. */
// shuffleIt.context.wallet = myWallet
