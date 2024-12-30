export interface CurtainMetaData {
    minWidth: number;
    sewingPrice: number;
    hossz: number;
  }
  
  export interface CurtainCustomData {
    fabric_width: string;
    fabric_length: string;
    sewing_type: string;
    fabric_price: number;
    sewing_price: number;
    total_custom_price: number;
  }
  
  declare module '#woo' {
    interface Product {
      curtainData?: CurtainMetaData;
      metaData: {
        key: string;
        value: string;
      }[];
    }
  
    interface CartItem {
      extraData?: string; // This will contain JSON string of CurtainCustomData
    }
  }