export type IItem = {
  id: number;
  title: string;
  image_url: string;
}

export type IIBGE = {
  id: number,
  sigla: string,
  nome: string,
  regiao: {
    id: number,
    sigla: string,
    nome: string,
  }
}


