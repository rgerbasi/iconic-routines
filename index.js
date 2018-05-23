

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

    removeRoutine(routine, ev){
        //remove fromt eh dom
        const item = ev.target.closest('.routine')
        item.remove();

        //remove from teh array
        const i = this.routines.indexOf(routine)
        this.routines.splice(i,1)

    }

    favRoutine(routine, ev){
        const item = ev.target.closest('.routine')
        routine.fave = item.classList.toggle('fav')
    }

    toggleEditable(routine, ev){
        //finish toggle editable

    }

    setBackground(routine, ev){

        /*
        const link = `https://www.google.com/search?biw=1680&bih=870&tbm=isch&source=hp&biw=&bih=&ei=MYQFW6C1FYG2tQWriaLgBA&q=${routine.team}+${routine.year}`
        //const winder = window.open(`${link}`, '_blank','left=9999999 top=9999999 width= 0 height=0 display=none show=false', false)
        //winder.style.display = 'none'

        const thewindow = document.querySelector('iframe')
        thewindow.setAttribute('src', link)

        const imgdiv = thewindow.contentWindow.document.querySelector('[data-ri="1"]')
        
        alert(imgdiv)
        //  winder.close();
        */
    }


    renderListItem(routine){
        const listItem = this.template.cloneNode(true)
        listItem.classList.remove('template');
        listItem.dataset.id = routine.id;
        listItem
            .querySelector('.team')
            .textContent = `${routine.team} ${routine.year}`;        

        listItem
            .querySelector('.remove.button')
            .addEventListener('click', this.removeRoutine.bind(this, routine))
            //bind this object being the app and passes in the flick

        listItem
            .querySelector('.fav.button')
            .addEventListener('click', this.favRoutine.bind(this, routine))

        listItem
            .querySelector('.edit.button')
            .addEventListener('click', this.toggleEditable.bind(this, routine))

        const link = listItem.querySelector('a')
        link
            .setAttribute('href', `https://www.youtube.com/results?search_query=${routine.team}+${routine.year}`)
        link
            .setAttribute('onclick', `window.open('https://www.youtube.com/results?search_query=${routine.team}+${routine.year}', 'popup', 'width=1000,height=600' ); return false;`)

        return listItem;
    }

    handleSubmit(ev){
        ev.preventDefault();
        const f = ev.target;
        const routine = {
            id: ++this.max,
            team: f.team.value,
            year: f.year.value,
            fave: false,
        }

        this.routines.push(routine);

        const listItem = this.renderListItem(routine);
        this.list.appendChild(listItem);
        console.log(routine)
        
        //setting background
        this.setBackground(routine, ev);

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
