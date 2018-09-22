export default {
  web3: () => ({}),
  marketplace: (_, args, context) => context.contracts.marketplace,
  contracts: () => {
    let contracts = []
    try {
      contracts = JSON.parse(window.localStorage.contracts2)
    } catch (e) {
      /* Ignore  */
    }
    console.log(contracts)
    return contracts
  },
  marketplaces: (_, args, context) => context.contracts.marketplaces,
  tokens: (_, args, context) => context.contracts.tokens
}