export enum ImageType {
  "FOX" = "fox",
  "DOG" = "dog",
  "CAT" = "cat",
}
export interface ImageI {
  url: string;
  type: ImageType;
}

export interface CatApiResponse {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface DogApiResponse {
  message: string[];
  status: string;
}

export interface FoxApiResponse {
  image: string;
  link: string;
}
