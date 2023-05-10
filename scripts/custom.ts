import { ethers } from "ethers";
import { Client, Presets, UserOperationBuilder } from "userop";
// @ts-ignore
import config from "../config.json";
import { Middleware } from "userop/dist/preset";

export default async function main() {
    const useropbuilder = new UserOperationBuilder();

    const paymaster = Presets.Middleware.verifyingPaymaster(
        config.paymasterAddr,
        config.offchainSigner
    )
    
    const signer = new ethers.Wallet("0x0a42ee30e2226b8d3f87a579abcfe20f083cf9437203a0eca3f72b8237899bd0")

    useropbuilder.setSender("0x7C6234270F4f61C5d2760304eb8aef08Da6DfE54");
    useropbuilder.setNonce(ethers.BigNumber.from("7"));
    useropbuilder.setInitCode(ethers.utils.hexlify("0x"));
    useropbuilder.setCallData(ethers.utils.hexlify("0xb61d27f6000000000000000000000000a1337813843dc2a76ef9e2abfc1f4d4697e4719b00000000000000000000000000000000000000000000000000470de4df82000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000"));
    useropbuilder.setCallGasLimit(ethers.BigNumber.from("41789"))
    useropbuilder.setVerificationGasLimit(ethers.BigNumber.from("270467"))
    useropbuilder.setPreVerificationGas(ethers.BigNumber.from("49528"))
    useropbuilder.setMaxFeePerGas(ethers.BigNumber.from("1500000032"))
    useropbuilder.setMaxPriorityFeePerGas(ethers.BigNumber.from("1500000000"))
    useropbuilder.useMiddleware(paymaster)
    useropbuilder.useMiddleware(Middleware.EOASignature(signer))

    const client = await Client.init(config.rpcUrl, config.entryPoint);
    const a = await client.buildUserOperation(useropbuilder)
    console.log(a)
}

main()
