

class App {
    constructor(selectors){
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
    }

    removeFlick(routine, ev){
        //remove fromt eh dom
        const item = ev.target.closest('.routine')
        item.remove();

        //remove from teh array
        const i = this.routines.indexOf(routine)
        this.routines.splice(i,1)

    }

    renderListItem(routine){
        const listItem = this.template.cloneNode(true)
        listItem.classList.remove('template');
        listItem.dataset.id = routine.id;
        listItem
            .querySelector('.team')
            .textContent = routine.team;
        
            
        listItem
            .querySelector('.remove.button')
            .addEventListener('click', this.removeFlick.bind(this, routine))
            //bind this object being the app and passes in the flick

        return listItem;
    }

    handleSubmit(ev){
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
    }
}

const app = new App(
    {
        formSelector: '#teamForm',
        listSelector: '#routineList',
        templateSelector: '.routine.template',
    }
)
