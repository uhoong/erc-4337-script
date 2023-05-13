import { BigNumberish, BytesLike } from "ethers";
import { UserOperationBuilder } from "../../builder";
import { SimpleAccount as SimpleAccountImpl } from "../../typechain";
import { UserOperationMiddlewareFn } from "../../types";
export declare class SimpleAccount extends UserOperationBuilder {
    private signer;
    private provider;
    private entryPoint;
    private factory;
    private initCode;
    proxy: SimpleAccountImpl;
    private constructor();
    private resolveAccount;
    static init(signingKey: string, ERC4337NodeRpc: string, entryPoint: string, factory: string, paymasterMiddleware?: UserOperationMiddlewareFn): Promise<SimpleAccount>;
    execute(to: string, value: BigNumberish, data: BytesLike): this;
    executeBatch(to: Array<string>, data: Array<BytesLike>): this;
}
