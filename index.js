

const app = {
    init: function(selectors){
        this.max = 0;
        this.routines = [];
        this.list = document.querySelector(selectors.listSelector);
        this.template = document.querySelector(selectors.templateSelector)

        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', (ev) => {
                ev.preventDefault();
                this.handleSubmit(ev);
            });
    },

    removeFlick(ev){

    },

    renderListItem(routine){
        const listItem = this.template.cloneNode(true)
        listItem.classList.remove('template');
        listItem.dataset.id = routine.id;
        listItem
            .querySelector('.team')
            .textContent = routine.team;
        
            
        listItem
            .querySelector('.remove.button')
            .addEventListener('click', this.removeFlick)

        return listItem;
    },

    handleSubmit: function(ev){
        ev.preventDefault();
        const f = ev.target;
        const routine = {
            id: ++this.max,
            team: f.team.value,
            year: f.year.value,

        }

        this.routines.push(routine);

        const listItem = this.renderListItem(routine);
        this.list.appendChild(listItem);
        console.log(routine)
        
        f.reset();
    },
}

app.init({
    formSelector: '#teamForm',
    listSelector: '#routineList',
    templateSelector: '.routine.template',
});