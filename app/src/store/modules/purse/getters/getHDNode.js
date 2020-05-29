/* Initialize BITBOX. */
const bitbox = new window.BITBOX()

/**
 * Get HD Node
 */
const getHDNode = (state, getters) => {
    /* Initialize mnemonic. */
    const mnemonic = getters.getMnemonic
    // console.log('MNEMONIC', mnemonic)

    /* Initialize seed buffer. */
    const seedBuffer = bitbox.Mnemonic.toSeed(mnemonic)
    // console.log('SEED BUFFER', seedBuffer)

    /* Initialize HD node. */
    const hdNode = bitbox.HDNode.fromSeed(seedBuffer)
    // console.log('HD NODE', hdNode)

    /* Return HD node. */
    return hdNode
}

/* Export module. */
export default getHDNode
