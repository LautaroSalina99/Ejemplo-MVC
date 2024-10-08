// Modelo === Datos , Vista === UI, Controlador === Cerebro

// Modelo
const model = {
    currentCar: null,
    cars: [
        {
            clickCount: 0,
            name: 'Coupe Maserati',
            imgSrc: 'img/black-convertible-coupe.jpg',
        },
        {
            clickCount: 0,
            name: 'Camaro SS 1LE',
            imgSrc: 'img/chevrolet-camaro.jpg',
        },
        {
            clickCount: 0,
            name: 'Dodger Charger 1970',
            imgSrc: 'img/dodge-charger.jpg',
        },
        {
            clickCount: 0,
            name: 'Ford Mustang 1966',
            imgSrc: 'img/ford-mustang.jpg',
        },
        {
            clickCount: 0,
            name: '190 SL Roadster 1962',
            imgSrc: 'img/mercedes-benz.jpg',
        },
    ],
};

// Controlador
const controller = {
    init() {
        // establecer el coche actual como el primero de la lista
        model.currentCar = model.cars[0];

        // decirle a nuestras vistas que se inicialicen
        carListView.init();
        carView.init();
    },

    getCurrentCar() {
        return model.currentCar;
    },

    getCars() {
        return model.cars;
    },

    // establecer el coche actualmente seleccionado con el objeto pasado como argumento
    setCurrentCar(car) {
        model.currentCar = car;
    },

    // incrementar el contador para el coche actualmente seleccionado
    incrementCounter() {
        model.currentCar.clickCount++;
        carView.render();
    },
};

// Vistas
const carView = {
    init() {
        // almacenar punteros a nuestros elementos del DOM para fácil acceso luego
        this.carElem = document.getElementById('car');
        this.carNameElem = document.getElementById('car-name');
        this.carImageElem = document.getElementById('car-img');
        this.countElem = document.getElementById('car-count');

        // al hacer clic, incrementar el contador del coche actual
        this.carImageElem.addEventListener('click', this.clickHandler);

        // renderizar esta vista (actualizar los elementos del DOM con los valores correctos)
        this.render();
    },

    clickHandler() {
        return controller.incrementCounter();
    },

    render() {
        // actualizar los elementos del DOM con valores del coche actual
        const currentCar = controller.getCurrentCar();
        this.countElem.textContent = currentCar.clickCount;
        this.carNameElem.textContent = currentCar.name;
        this.carImageElem.src = currentCar.imgSrc;
        this.carImageElem.style.cursor = 'pointer';
    },
};

const carListView = {
    init() {
        // almacenar el elemento del DOM para fácil acceso luego
        this.carListElem = document.getElementById('car-list');

        // renderizar esta vista (actualizar los elementos del DOM con los valores correctos)
        this.render();
    },

    render() {
        let car;
        let elem;
        let i;
        // obtener los coches que vamos a renderizar desde el controlador
        const cars = controller.getCars();

        // vaciar la lista de coches
        this.carListElem.innerHTML = '';

        // recorrer los coches
        for(let i = 0; i < cars.length; i++) {
            // este es el coche que estamos recorriendo actualmente
            car = cars[i];

            // crear un nuevo elemento de lista de coches y establecer su texto
            elem = document.createElement('li');
            elem.className = 'list-group-item d-flex justify-content-between lh-condensed';
            elem.style.cursor = 'pointer';
            elem.textContent = car.name;
            elem.addEventListener(
                'click',
                (function(carCopy) {
                  return function() {
                    controller.setCurrentCar(carCopy);
                    carView.render();
                  };
                })(car)
              );
                // finalmente, añadir el elemento a la lista
                this.carListElem.appendChild(elem);
        }
    },
};

// ¡Vamos allá!
controller.init();
