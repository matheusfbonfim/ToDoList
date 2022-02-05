// ============================================
// ============= LIST CONTROLLER  ==========
// ============================================

const List = require('../model/List');
const Profile = require('../model/Profile')

// Controles
module.exports = {
  
    create(request, response){        // Retorna Pagina para Adicionar Lista
      return response.render("list");
    },
    
    async createItem(request, response){    // Retorna Pagina para Adicionar Item a Lista
      // Pegando ID específico da lista da url
      const listId = request.params.idList;
      
      const lists = await List.get();

      // Encontrando o index no array List.data que corresponde a essa lista
      const indexListId = lists.findIndex((list) => {
        return list.id == listId;
      }) 

      let list = {
        id: listId,
        name: lists[indexListId].name
      };

      // Renderizando pagina passando informacão da lista especifica
      return response.render("item", { list });
    },

    async save(request, response){          // Adicionando Lista ao ToDo
      // request.body = {name: "dasdsa"}
      
      // ADD na lista
      await List.create({
        name: request.body.name,
        itens: []}
      );
 
      return response.redirect("/") // Redireciona para /
    },

    async saveItem(request, response){      // Adicionndo Item em uma lista especifica
      // Pegando ID específico
      const listId = request.params.idList;

      // ADD Item
      let newItem = {name:request.body.name, status: 'roxo'};
      await List.createItem(listId, newItem)

      return response.redirect("/") // Redireciona para /
    },

    async show(request, response){          // Retorna dados específicos para pagina editar list
      // Pegando ID específico
      const listId = request.params.id;
      
      const lists = await List.get()

      // Verifica cada dado para encontrar o ID
      const list = lists.find(list => Number(list.id) == Number(listId));

      // Caso lista nao exista
      if (!list){
        return response.send("List Not Found!!")
      }

      // Renderiza a pagina enviando para pagina informações
      return response.render("list-edit", { list });
    },

    async showItem(request, response){      // Retorna dados específicos para pagina de editar item
      // Pegando ID específico da lista da url
      const listId = request.params.idList;
      
      // Pegando ID específico do item da url
      const itemId = request.params.idItem;
      
      // Recupera as listas do banco de dados
      const lists = await List.get()

      // Verifica cada dado para encontrar o ID
      const list = lists.find(list => Number(list.id) == Number(listId));
      
      // Caso lista nao exista
      if (!list){
        return response.send("List Not Found!!")
      }

      // Verifica cada dado para encontrar o item
      const item = list.itens.find(item => Number(item.id) == Number(itemId));

      // Caso item nao exista
      if (!item){
        return response.send("Item Not Found!!")
      }

      return response.render("item-edit", { list, item });
    },

    async update(request, response){        // Enviar dados atualizados da lista conforme o ID para o banco
      // Pegando ID específico
      const listId = request.params.id;

      const lists = await List.get()

      // Verifica cada dado para encontrar o ID
      const list = lists.find(list => Number(list.id) == Number(listId));

      // Caso lista nao exista
      if (!list){
        return response.send("List Not Found!!")
      }

      // Atualiza dados 
      const updateList = {
        ...list,
        name: request.body.name
      }

      // Percorre todas listas e atualiza somente conforme o ID
      const newList = lists.map( list => {
        if (Number(list.id) === Number(listId)){
          list = updateList;
        }
        return list
      });

      // Atualizando a lista
      List.update(newList);

      // Redireciona para mesma tela
      response.redirect('/');
    },

    async updateItem(request, response){    // Enviar dados atualizados do item conforme o ID da lista e item para o banco
      // Pegando ID específico da lista da url
      const listId = request.params.idList;

      const lists = await List.get()

      // Encontrando o index no array List.data que corresponde a essa lista
      const indexListId = lists.findIndex((list) => {
        return list.id == listId;
      }) 

      // Pegando ID específico do item da url
      const itemId = request.params.idItem;

      // Verifica cada dado para encontrar o ID
      const list = lists.find(list => Number(list.id) == Number(listId));

      // Caso lista nao exista
      if (!list){
        return response.send("List Not Found!!")
      }

      // Verifica cada dado para encontrar o item
      const item = list.itens.find(item => Number(item.id) == Number(itemId));

      // Caso item nao exista
      if (!item){
        return response.send("Item Not Found!!")
      }

      // Atualiza dados 
      const updateItem = {
        ...item,
        name: request.body.name
      }

      // Percorre todas listas e atualiza somente conforme o ID
      const newItens = lists[indexListId].itens.map( item => {
        if (Number(item.id) === Number(itemId)){
          item = updateItem;
        }
        return item
      });

      // Atualiza 
      List.updateItem(indexListId, newItens);

      // Redireciona para mesma tela
      response.redirect('/');
    },

    delete(request, response){        // Deletando a lista selecionada
      const listId = request.params.id;
    
      List.delete(listId);

      return response.redirect('/');
    },

    deleteItem(request, response){    // Deletando o item selecionado
      const listId = request.params.idList;
      // Pegando ID específico do item da url
      const itemId = request.params.idItem;
      
      List.deleteItem(listId, itemId);
      
      return response.redirect('/');
    },

    checkItem(request, response){    // Deletando o item selecionado
      // console.log(request.body.checkbox)
      
      const listId = request.params.idList;
      // Pegando ID específico do item da url
      const itemId = request.params.idItem;
      
      List.checkItem(listId, itemId);

      return response.redirect('/');
    }
}