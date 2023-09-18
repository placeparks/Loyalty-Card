import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import { CONTRACT_ADDRESS } from "../../consts"

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    // Initialize the SDK
    const sdk = ThirdwebSDK.fromPrivateKey(
      process.env.WALLET_PRIVATE_KEY,
      "mumbai",
      {
        secretKey: process.env.TW_SECRET_KEY
      }
    )

    const contract = await sdk.getContract(CONTRACT_ADDRESS)

    const address = req.body.address

    // Create the metadata for the NFT
    const payload = {
      to: address,
      metadata: {
        name: "My loyalty card",
        description: "Some loyalty card description. Too lazy to write one.",
        image:
          "https://amethyst-sound-orangutan-120.mypinata.cloud/ipfs/QmX2znFHvG55FLRYfpt1MrZw8we4FVhvfUrZPoHYnUT4yX?_gl=1*1vjhx5q*_ga*NTA3MTU1NTI4LjE2OTQ2ODIyNDE.*_ga_5RMPXG14TE*MTY5NTAzNTM2My40LjEuMTY5NTAzNTQyOS42MC4wLjA.",
        attributes: [
          {
            trait_type: "color",
            value: "vibrant"
          },
          {
            trait_type: "points",
            value: 100
          }
        ]
      }
    }

    // Generate the signature with the metadata
    const signedPayload = await contract.erc721.signature.generate(payload)

    return res.status(200).json({ signedPayload })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}

export default handler
