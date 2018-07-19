declare module "*.json" {
    const value: any;
    export default value;
    export function map(callback: Function);
    export const length: number;
}
