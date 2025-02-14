import { providers } from "ethers";

export type networkCurrency = "ETH" | "MATIC";

type SupportedNetwork = {
  explorer: string;
  provider: () => providers.Provider;
  networkId: number;
  networkName: string;
  currency: networkCurrency;
};

export enum NetworkCmdName {
  Local = "local",
  Mainnet = "mainnet",
  Goerli = "goerli",
  Sepolia = "sepolia",
  Matic = "matic",
  Maticmum = "maticmum",
}

const defaultInfuraProvider =
  (networkName: string): (() => providers.Provider) =>
  () =>
	new providers.AlchemyProvider(networkName, "");

const jsonRpcProvider =
  (url: string): (() => providers.Provider) =>
  () =>
    new providers.JsonRpcProvider(url);

export const supportedNetwork: {
  [key in NetworkCmdName]: SupportedNetwork;
} = {
  [NetworkCmdName.Local]: {
    explorer: "https://localhost/explorer",
    provider: jsonRpcProvider("http://127.0.0.1:8545"),
    networkId: 1337,
    networkName: "local",
    currency: "ETH",
  },
  [NetworkCmdName.Mainnet]: {
    explorer: "https://etherscan.io",
    provider: defaultInfuraProvider("homestead"),
	//provider: ethers.getDefaultProvider("homestead"),
	networkId: 1,
    networkName: "homestead",
    currency: "ETH",
  },
  [NetworkCmdName.Goerli]: {
    explorer: "https://goerli.etherscan.io",
    provider: defaultInfuraProvider("goerli"),
    networkId: 5,
    networkName: "goerli",
    currency: "ETH",
  },
  [NetworkCmdName.Sepolia]: {
    explorer: "https://sepolia.etherscan.io",
    provider: jsonRpcProvider("https://rpc.sepolia.org"),
    networkId: 11155111,
    networkName: "sepolia",
    currency: "ETH",
  },
  [NetworkCmdName.Matic]: {
    explorer: "https://polygonscan.com",
    provider: defaultInfuraProvider("matic"),
    networkId: 137,
    networkName: "matic",
    currency: "MATIC",
  },
  [NetworkCmdName.Maticmum]: {
    explorer: "https://mumbai.polygonscan.com",
    provider: defaultInfuraProvider("maticmum"),
    networkId: 80001,
    networkName: "maticmum",
    currency: "MATIC",
  },
};

export const getSupportedNetwork = (networkCmdName: string, apiKey:string): SupportedNetwork => {

	let result =  supportedNetwork[networkCmdName as NetworkCmdName];
	let instance = new providers.AlchemyProvider(result.networkName, apiKey);    
	result.provider = ()=>instance; 
	return result;
};
