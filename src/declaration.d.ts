// src/declaration.d.ts 또는 루트의 declaration.d.ts
declare module "*.png" {
    const value: string;
    export default value;
  }
  
  declare module "*.jpg" {
    const value: string;
    export default value;
  }
  