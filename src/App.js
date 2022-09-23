import './App.css';
import { useState } from 'react';
import axios from "axios";
import { ethers } from "ethers";
import data from './artifacts/data.json';
import data_nft from './artifacts/data_nft.json';


function App() {
  // const CONTRACT_ADDRESS_RINKEBY = "0xF7B4C1806b82d6a81EC32360Ac4E3fcBE91f0C2B";
  const CONTRACT_ADDRESS_GOERLI = "0x8C1C947F7f5c23ee58399912EABdECB88F9b7B37";
  const CONTRACT_ADDRESS_SKALE = "0x01d83b1aaf12a98ccf0f83147732bfe9f53c61c1";
  const CONTRACT_ADDRESS_AURORA = "0xc892caEe8eca7734A66F2d6Bb69F123e610dB9fc";
  const CONTRACT_ADDRESS_CRONOS = "0x5D9F1CC0D4Df5568FB5ff934305a19754ecB14bb";
  const CONTRACT_ADDRESS_POLYGON = "0x116256e92E499A93538ED82aCAB108cB3D7dc056";

  // const NFT_GOERLI = "0x6793FB8baA653ae5D9eFaD415d759cD9503f2510";
  const NFT_GOERLI = "0xA78970518ea6754781Afd24CB35305E16e27003A";  //old
  const NFT_SKALE = "0xf590dece3807fff78cdf3df12f4c29febb2561ba"
  const NFT_AURORA = "0x9d92ca20ea4f33aed1d06203142d264980562020";
  const NFT_CRONOS = "0xB3657f286d840CdEffB26F28c678A6853D8AbBfc";

  const [metadataUri, setMetadataUri] = useState();         //setting up metadata URI for MINTING
  const [txHash, setTxHash] = useState();         //setting up metadata URI for MINTING



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
      console.log(signer)

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
  //---------------------------------------------------For POLYGON MUMBAI NETWORK(testnet)
  const addPolygon = async () => {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      if (!provider) {
        console.log("Metamask is not installed, please install!");
      }
      //adding Polygon MUMBAI TESTNET NETWORK TO METAMASK
      //IF AVAILABLE then just SWITCH network (done automatically by metamask)
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x13881',   //338
              chainName: 'Polygon Mumbai Testnet',
              rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
              blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
              nativeCurrency: {
                symbol: 'MATIC',
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

  //-----------------------------------metadata upload
  async function metadata(e) {
    e.preventDefault();
    const nftName = e.target.name_id.value;
    const nftDesc = e.target.desc_id.value;
    const marks = e.target.marks_id.value;
    console.log(marks)

    console.log(nftName)
    console.log(nftDesc)
    // setName(nftName);
    // setDesc(nftDesc);
    let imageForMetadata = "https://ipfs.io/ipfs/bafkreihqjvzlqemkh76vwrmwzt6awckj2qdrgkqcotrwkhooiidoyflnhy"   //default value


    if (marks >= 0 && marks <= 20) {
      console.log("less than 20")
      imageForMetadata = "https://ipfs.io/ipfs/bafkreifuq5f4jevaniqigngjgyfa7uaipzkdsbuh6mnq4fzpxpfetdo26a"
      console.log(imageForMetadata)

    }
    else if (marks >= 21 && marks <= 40) {
      console.log("less than 40")
      imageForMetadata = "https://ipfs.io/ipfs/bafkreif2iqtkd3fbd3h7ivfmyqlq53fcjym7vn33jjw4buhav7xjp2emqu"
      console.log(imageForMetadata)
    }
    else if (marks >= 41 && marks <= 60) {
      console.log("less than 60")
      imageForMetadata = "https://ipfs.io/ipfs/bafkreidprsyx6kigsserx3nbln5j6endam2lgquzw5dgbngdama6sbfika"
      console.log(imageForMetadata)
    }
    else if (marks >= 61 && marks <= 80) {
      console.log("less than 80")
      imageForMetadata = "https://ipfs.io/ipfs/bafkreiht5iadoztdgz6kdqjrtokjcfqndmpysm33gm2xptnuiy6hxfw4xy"
      console.log(imageForMetadata)
    }
    else if (marks >= 81 && marks <= 100) {
      console.log("less than 100")
      imageForMetadata = "https://ipfs.io/ipfs/bafkreihqjvzlqemkh76vwrmwzt6awckj2qdrgkqcotrwkhooiidoyflnhy"
      console.log(imageForMetadata)
    }

    console.log("outside")
    console.log(imageForMetadata)

    const options = {
      method: 'POST',
      url: 'https://api.nftport.xyz/v0/metadata',
      headers: {
        'Content-Type': 'application/json',
        Authorization: '4455109c-4819-40f5-9ec5-5882af32a7ed'
      },
      data: {
        name: nftName,
        description: nftDesc,
        file_url: imageForMetadata
      }
    };

    await axios.request(options).then(function (response) {
      console.log(response.data.metadata_uri);
      setMetadataUri(response.data.metadata_uri)
    }).catch(function (error) {
      console.error(error);
    });

  }
  async function askApiToMint(e) {
    // e.preventDefault();
    // const network = e.target.networks.value;
    // console.log(network);

    const options = {
      method: 'POST',
      url: 'https://api.nftport.xyz/v0/mints/customizable',
      headers: {
        'Content-Type': 'application/json',
        Authorization: '4455109c-4819-40f5-9ec5-5882af32a7ed'
      },
      data: {
        chain: 'rinkeby',
        contract_address: '0x508C019B90976D654a90d5CECD49C0B7A810a357',
        metadata_uri: metadataUri,
        mint_to_address: '0xdab4984b2f4e06d207f73678935a649ae6969490'
      }
    };

    await axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

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
            let connectedContract = new ethers.Contract(CONTRACT_ADDRESS_GOERLI, data.abi, signer);
            console.log("Going to pop wallet now to pay gas...")
            let balance = await connectedContract.contractBalance();
            console.log(balance.toNumber() / 1000000000000000000);
            let connectedContractNft = new ethers.Contract(NFT_GOERLI, data_nft.abi, signer);
            let mint = await connectedContractNft.mint("0xDaB4984b2F4e06d207f73678935A649ae6969490", metadataUri);
            let tokenID = await connectedContractNft.tokenURI(6)
            console.log(mint);
            console.log("mint hash:   " + mint.hash)

            let transactionHash = `https://goerli.etherscan.io/tx/${mint.hash}`
            console.log(transactionHash);
            setTxHash(transactionHash);

            // let tcReciept = await ethereum.request({ method: 'eth_getTransactionReceipt', params: [mint.hash] })
            // console.log(tcReciept);
            console.log(tokenID)
            break;

          case 647426021:
            //for SKALE
            connectedContract = new ethers.Contract(CONTRACT_ADDRESS_SKALE, data.abi, signer);
            console.log("Going to pop wallet now to pay gas...")
            balance = await connectedContract.contractBalance();
            console.log(balance.toNumber() / 1000000000000000000);
            connectedContractNft = new ethers.Contract(NFT_SKALE, data_nft.abi, signer);
            mint = await connectedContractNft.mint("0xDaB4984b2F4e06d207f73678935A649ae6969490", metadataUri);
            console.log(mint.hash)
            tokenID = await connectedContractNft.tokenURI(6)


            // let tcReciept = ethereum.request({ method: 'eth_getTransactionReceipt', params: [mint] })
            // console.log("transcation reciept: "+tcReciept);

            // console.log("data hash" + ethers.receipt.mint);
            // function checkTransactionconfirmation(mint) {

            //   let checkTransactionLoop = () => {
            //     return ethereum.request({ method: 'eth_getTransactionReceipt', params: [txhash] }).then(r => {
            //       if (r != null) return 'confirmed';
            //       else return checkTransactionLoop();
            //     });
            //   };

            //   return checkTransactionLoop();
            // }
            console.log(tokenID)
            break;

          case 338:
            //for CRONOS
            const connectedContract_c = new ethers.Contract(CONTRACT_ADDRESS_CRONOS, data.abi, signer);
            console.log("Going to pop wallet now to pay gas...")
            let c_tx = await connectedContract_c.contractBalance();
            console.log(c_tx.toNumber() / 1000000000000000000);
            break;

          case 1313161555:
            //for AURORA
            const connectedContract_a = new ethers.Contract(CONTRACT_ADDRESS_AURORA, data.abi, signer);
            console.log("Going to pop wallet now to pay gas...")
            let a_tx = await connectedContract_a.contractBalance();
            console.log(a_tx.toNumber() / 1000000000000000000);
            break;
          case 80001:
            //for AURORA
            const connectedContract_p = new ethers.Contract(CONTRACT_ADDRESS_AURORA, data.abi, signer);
            console.log("Going to pop wallet now to pay gas...")
            let p_tx = await connectedContract_p.contractBalance();
            console.log(p_tx.toNumber() / 1000000000000000000);
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
      <button onClick={addPolygon} className="cta-button connect-wallet-button">
        ADD POLYGON
      </button>
      <form onSubmit={metadata}>
        <br></br><br></br>
        <input type="text"
          id="name_id"
          className="cta-button connect-wallet-button"
          placeholder='Enter Name:'
        />
        <input type="text"
          id="desc_id"
          className="cta-button connect-wallet-button"
          placeholder='Enter Description:'
        />
        <input type="text"
          id="marks_id"
          className="cta-button connect-wallet-button"
          placeholder='Enter Marks:'
        />

        <button>Upload Metadata</button>
      </form>

      <button onClick={checkBalance} className="cta-button connect-wallet-button">
        check Balance
      </button>
      <button onClick={askApiToMint} className="cta-button connect-wallet-button">
        Mint With NFTport
      </button>
      <a href={txHash}>Check Tx</a>

      {/* <button onClick={onChainChanged} className="cta-button connect-wallet-button">
        Test
      </button> */}

    </div>
  );
}

export default App;
