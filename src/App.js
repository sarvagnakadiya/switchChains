import './App.css';
import { ethers } from "ethers";
import data from './artifacts/data.json';


function App() {
  // const CONTRACT_ADDRESS_RINKEBY = "0xF7B4C1806b82d6a81EC32360Ac4E3fcBE91f0C2B";
  const CONTRACT_ADDRESS_GOERLI = "0x8C1C947F7f5c23ee58399912EABdECB88F9b7B37";
  const CONTRACT_ADDRESS_SKALE = "0x01d83b1aaf12a98ccf0f83147732bfe9f53c61c1";
  const CONTRACT_ADDRESS_AURORA = "0xc892caEe8eca7734A66F2d6Bb69F123e610dB9fc";
  const CONTRACT_ADDRESS_CRONOS = "0x5D9F1CC0D4Df5568FB5ff934305a19754ecB14bb";


  //--------------------------------------------------- switch to GOERLI
  const connectToGoerli = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        // if metamask not found
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }

        //getting chainId
        const { chainId } = await provider.getNetwork()
        console.log(chainId)  //console chainID

        const goerli_chainId = '0x5'  //explicitly defining Goerly chainID
        if (chainId == goerli_chainId) {
          console.log("Bravo!, you are on the correct network");
        } else {
          console.log("oulalal, switch to the correct network");
          try {
            //switching logic
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: "0x5" }],
            });
            console.log("You have switched to the right network")

          } catch (switchError) {

            // The network has not been added to MetaMask
            if (switchError.code === 4902) {
              console.log("this chainId does not exist")
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

  //---------------------------------------------------switching to  SKALE network
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
        const skale_chainId = '0x2696efe5' //Its in HEX of 647426021  
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
              console.log("this chainId does not exist")
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


  //---------------------------------------------------For SKALE NETWORK
  const addSkale = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      if (!provider) {
        console.log("Metamask is not installed, please install!");
      }
      //adding SKALE NETWORK TO METAMASK
      //IF AVAILABLE then just SWITCH network (done automatically by metamask)
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x2696efe5', //647426021
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

  //---------------------------------------------------For AURORA NETWORK
  const addAurora = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      if (!provider) {
        console.log("Metamask is not installed, please install!");
      }
      //adding AURORA NETWORK TO METAMASK
      //IF AVAILABLE then just SWITCH network (done automatically by metamask)
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x4E454153',  //1313161555
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

  //---------------------------------------------------For CRONOS NETWORK
  const addCronos = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      if (!provider) {
        console.log("Metamask is not installed, please install!");
      }
      //adding CRONOS NETWORK TO METAMASK
      //IF AVAILABLE then just SWITCH network (done automatically by metamask)
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x152',   //338
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


  //CALLING any function(here: contractBalance() from smart contract) to test
  //for any Chain user is on (using switch case)
  const checkBalance = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        // const connectedContract = new ethers.Contract(CONTRACT_ADDRESS_GOERLI, data_goerli.abi, signer);
        if (!provider) {
          console.log("Metamask is not installed, please install!");
        }

        const { chainId } = await provider.getNetwork()
        console.log("switch case for this case is: " + chainId);

        //SWITCH CASE for networks
        switch (chainId) {

          case 5:
            //for GOERLI
            const connectedContract_g = new ethers.Contract(CONTRACT_ADDRESS_GOERLI, data.abi, signer);
            console.log("Going to pop wallet now to pay gas...")
            let g_tx = await connectedContract_g.contractBalance();
            console.log(g_tx.toNumber());
            break;

          case 647426021:
            //for SKALE
            const connectedContract_s = new ethers.Contract(CONTRACT_ADDRESS_SKALE, data.abi, signer);
            console.log("Going to pop wallet now to pay gas...")
            let s_tx = await connectedContract_s.contractBalance();
            console.log(s_tx.toNumber());
            break;

          case 338:
            //for CRONOS
            const connectedContract_c = new ethers.Contract(CONTRACT_ADDRESS_CRONOS, data.abi, signer);
            console.log("Going to pop wallet now to pay gas...")
            let c_tx = await connectedContract_c.contractBalance();
            console.log(c_tx.toNumber());
            break;

          case 1313161555:
            //for AURORA
            const connectedContract_a = new ethers.Contract(CONTRACT_ADDRESS_AURORA, data.abi, signer);
            console.log("Going to pop wallet now to pay gas...")
            let a_tx = await connectedContract_a.contractBalance();
            console.log(a_tx.toNumber());
            break;
        }
      }
    }
    catch (error) {
      console.log(error)
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

      <button onClick={checkBalance} className="cta-button connect-wallet-button">
        check Balance
      </button>

    </div>
  );
}

export default App;
