// ============================================
// ========== DASHBOARD CONTROLLER  ===========
// ============================================

// Responsável pelas informações principais da tela principal

// Importando model
const List = require('../model/List')
const Profile = require('../model/Profile')

// Utilitarios
const ListUtils = require('../utils/ListUtils');

module.exports = {
  index(request, response) {
    const profile = Profile.get()

    const statusCount = {
      totalItens: ListUtils.getTotalItens(List.get()),
      done: 'x',
      progress: 'x'
    }

    console.log("===== LISTA ====")
    console.log(List.get())
    console.log("\n")
    List.get().forEach(list => {console.log(list.itens)})

    // Retorna Pagina Home - Respondendo a page home
    // Passando para dentro da pagina as informações do "banco"
    return response.render("index", { lists: List.get(), profile: profile, statusCount: statusCount });
  },
}