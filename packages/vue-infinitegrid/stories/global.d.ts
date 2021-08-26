declare module "*.vue" {
  const content: any;
  export default content;
}
declare module "!!raw-loader!*" {
  const content: string;
  export default content;
}
