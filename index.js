
const app = {
    init: function(formSelector){
        this.max = 0;

        document
            .querySelector(formSelector)
            .addEventListener('submit', (ev) => {
                ev.preventDefault();
                this.handleSubmit(ev);
            });
    },

    handleSubmit: function(ev){
        ev.preventDefault();
        const f = ev.target;
        const team = {
            id: ++this.max,
            name: f.name.value,

        }
        console.log(flick)
        f.reset();
    },
}

app.init('#teamInput')