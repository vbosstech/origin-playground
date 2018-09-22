import { getTransactions } from '../transactions'

export default {
  networkId: () => web3.eth.net.getId(),
  nodeAccounts: () => new Promise((resolve) => {
    web3.eth.getAccounts().then(accts => resolve(accts.map(id => ({ id }))))
    .catch(() => resolve([]))
  }),
  nodeAccount: (_, args) => ({ id: args.id }),
  nodeAccountAt: async (_, args) => {
    const accounts = await web3.eth.getAccounts()
    return { id: accounts[args.idx] }
  },
  accounts: async () => {
    const accounts = []
    for (let i = 0; i < web3.eth.accounts.wallet.length; i++) {
      accounts.push({ id: web3.eth.accounts.wallet[i].address })
    }
    return accounts
  },
  account: (_, args) => ({ id: args.id }),
  defaultAccount: () =>
    web3.eth.defaultAccount ? { id: web3.eth.defaultAccount } : null,
  transactions: () => {
    var t = getTransactions()
    return t
  },
  transaction: async (_, args) => {
    let status = 'submitted'
    let transaction = await web3.eth.getTransaction(args.id)
    return {
      id: args.id,
      status,
      ...transaction
    }
  }
}