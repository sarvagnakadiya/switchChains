import './App.css';
import { ethers } from "ethers";
import data_goerli from './artifacts/data_goerli.json';
import data_skale from './artifacts/data_skale.json';
import data_cronos from './artifacts/data_cronos.json';

function App() {
  // const CONTRACT_ADDRESS_RINKEBY = "0xF7B4C1806b82d6a81EC32360Ac4E3fcBE91f0C2B";
  const CONTRACT_ADDRESS_GOERLI = "0x3265B27312cc692F9B79456Ba9e8Dc6913cE9132";
  const CONTRACT_ADDRESS_SKALE = "0xbf8a6a5c6f8602fb27c6231ebd08d2d99c94e0df";
  // const CONTRACT_ADDRESS_AURORA = " 0xc892caEe8eca7734A66F2d6Bb69F123e610dB9fc";
  const CONTRACT_ADDRESS_CRONOS = "0x5D9F1CC0D4Df5568FB5ff934305a19754ecB14bb";


  //function to pop up
  const connectToGoerli = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }

        const { chainId } = await provider.getNetwork()
        console.log(chainId)
        const goerli_chainId = '0x5'
        if (chainId == goerli_chainId) {
          console.log("Bravo!, you are on the correct network");
        } else {
          console.log("oulalal, switch to the correct network");
          try {

            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: "0x5" }],
            });
            console.log("You have switched to the right network")

          } catch (switchError) {

            // The network has not been added to MetaMask
            if (switchError.code === 4902) {
              console.log("Please add the Polygon network to MetaMask")
            }
            console.log("Cannot switch to the network")

          }
        }

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }
  const connectToSkale = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }

        const { chainId } = await provider.getNetwork()
        console.log(chainId)
        const skale_chainId = '0x2696efe5'  //647426021
        if (chainId == skale_chainId) {
          console.log("Bravo!, you are on the correct network");
        } else {
          console.log("oulalal, switch to the correct network");
          try {

            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: "0x2696efe5" }],
            });
            console.log("You have switched to the right network")

          } catch (switchError) {

            // The network has not been added to MetaMask
            if (switchError.code === 4902) {
              console.log("Please add the Polygon network to MetaMask")
            }
            console.log("Cannot switch to the network")

          }
        }

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }


  //
  const addSkale = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      if (!provider) {
        console.log("Metamask is not installed, please install!");
      }
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x2696efe5',
              chainName: 'EthOnline sChain | hackathon-complex-easy-naos',
              rpcUrls: ['https://eth-online.skalenodes.com/v1/hackathon-complex-easy-naos'],
              blockExplorerUrls: ['https://hackathon-complex-easy-naos.explorer.eth-online.skalenodes.com/'],
              nativeCurrency: {
                symbol: 'sFUEL',
                decimals: 18
              }
            }
          ]
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  }

  const addAurora = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      if (!provider) {
        console.log("Metamask is not installed, please install!");
      }
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x4E454153',
              chainName: 'Aurora Testnet',
              rpcUrls: ['https://testnet.aurora.dev/'],
              blockExplorerUrls: ['https://testnet.aurorascan.dev/'],
              nativeCurrency: {
                symbol: 'AuroraETH',
                decimals: 18
              }
            }
          ]
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  }
  const addCronos = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      if (!provider) {
        console.log("Metamask is not installed, please install!");
      }
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x152',
              chainName: 'Cronos testnet',
              rpcUrls: ['https://evm-t3.cronos.org'],
              blockExplorerUrls: ['https://testnet.cronoscan.com/'],
              nativeCurrency: {
                symbol: 'tCRO',
                decimals: 18
              }
            }
          ]
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  }


  return (
    <div className="App">
      <button onClick={connectToGoerli} className="cta-button connect-wallet-button">
        SWITCH TO GOERLI
      </button>
      <button onClick={connectToSkale} className="cta-button connect-wallet-button">
        SWITCH TO Skale
      </button>
      <button onClick={addSkale} className="cta-button connect-wallet-button">
        ADD SKALE
      </button>
      <button onClick={addCronos} className="cta-button connect-wallet-button">
        ADD CRONOS
      </button>
      <button onClick={addAurora} className="cta-button connect-wallet-button">
        ADD AURORA
      </button>

    </div>
  );
}

export default App;
