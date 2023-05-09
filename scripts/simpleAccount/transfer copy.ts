import { ethers } from "ethers";
import { Client, Presets} from "userop";
import { CLIOpts } from "../../src";
// @ts-ignore
import config from "../../config.json";

// function getUserOpHash(op:IUserOperation) {
//     const packed = ethers.utils.defaultAbiCoder.encode([
//         "address",
//         "uint256",
//         "bytes32",
//         "bytes32",
//         "uint256",
//         "uint256",
//         "uint256",
//         "uint256",
//         "uint256",
//         "bytes32",
//     ], [
//         op.sender,
//         op.nonce,
//         ethers.utils.keccak256(op.initCode),
//         ethers.utils.keccak256(op.callData),
//         op.callGasLimit,
//         op.verificationGasLimit,
//         op.preVerificationGas,
//         op.maxFeePerGas,
//         op.maxPriorityFeePerGas,
//         ethers.utils.keccak256(op.paymasterAndData),
//     ]);
//     return ethers.utils.keccak256(packed);
// }

export default async function main(t: string, amt: string, opts: CLIOpts) {
  const paymaster = opts.withPM
    ? Presets.Middleware.verifyingPaymaster(
        config.paymaster.rpcUrl,
        config.paymaster.context
      )
    : undefined;
  const simpleAccount = await Presets.Builder.SimpleAccount.init(
    config.signingKey,
    config.rpcUrl,
    config.entryPoint,
    config.simpleAccountFactory,
    paymaster
  );
  const client = await Client.init(config.rpcUrl, config.entryPoint);

  const target = ethers.utils.getAddress(t);
  const value = ethers.utils.parseEther(amt);

//   let accountBuilder = simpleAccount.execute(target, value, "0x");
//   let userOp = await client.buildUserOperation(accountBuilder);
//   accountBuilder.setPaymasterAndData(config.paymaster_custom+getUserOpHash(userOp));
//   userOp =  await client.buildUserOperation(accountBuilder);
//   console.log(userOp)

  const res = await client.sendUserOperation(
    simpleAccount.execute(target, value, "0x"),
    {
      dryRun: opts.dryRun,
      onBuild: (op) => console.log("Signed UserOperation:", op),
    }
  );
  console.log(`UserOpHash: ${res.userOpHash}`);

  console.log("Waiting for transaction...");
  const ev = await res.wait();
  console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
}
