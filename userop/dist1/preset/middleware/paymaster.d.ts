import { UserOperationMiddlewareFn } from "../../types";
// export declare const verifyingPaymaster: (paymasterRpc: string, context: any) => UserOperationMiddlewareFn;
export declare const verifyingPaymaster: (paymasterAddr: string,offchainSigner: string) => UserOperationMiddlewareFn;