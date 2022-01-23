const section = document.getElementById('createPage');
section.remove();

export async function showCreatePage(context){
    context.showSection(section);
}