import Knex from 'knex';

export async function seed(knex: Knex) {
  //await para aguardar finalizar
  await knex('item').insert([ 
    { title: 'Lâmpadas', image: 'lampada.svg' },
    { title: 'Pilhas e Baterias', image: 'bateria.svg' },
    { title: 'Papéis e Papelões', image: 'papel.svg' },
    { title: 'Resíduos Eletrônicos', image: 'eletronico.svg' },
    { title: 'Resíduos Orgânicos', image: 'organico.svg' },
    { title: 'Óleo de Cozinha', image: 'oleo.svg' },
  ]);
}
//Rodar: npm run knex:seed