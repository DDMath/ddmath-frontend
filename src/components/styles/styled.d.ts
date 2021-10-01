import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    size: {
      width: string;
      height: string;
    };
    colors: {
      [key: string]: string;
    };
  }
}
