export type Article = {
    id: number;
    title: string;
    price: number;
    description: string;
    picture: string;
    artist: string;
    label: string;
    category: any;
    createdAt: string;
  };

  export type Category = {
    id: number;
    title: string;
  }