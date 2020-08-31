describe('appController.js', () => {
    let appController;

    beforeEach(() => {
        appController = new AppController();
    });

    describe('renderPizzasInOrder()', () => {
        let orderElem;

        beforeEach(() => {
            

            appController.order.addPizza(new Pizza(['ham'], ['small']));
            appController.order.addPizza(new Pizza(['olives'], ['medium']));

            orderElem = document.createElement('div');
            orderElem.classList.add('order');
            document.body.appendChild(orderElem);

        });


        afterEach(() => {
            orderElem.outerHTML = null;
        })

        it('should have correct bindings for pizza', () => {
           
            appController.renderPizzasInOrder();

            const pizza = document.querySelectorAll('.order .pizza')[0];
            const size = pizza.querySelector('.size').textContent;
            const toppings = pizza.querySelector('.toppings').textContent;
            const price = pizza.querySelector('.price').textContent;

            expect(size).toBe('small');
            expect(toppings).toBe('ham');
            expect(price).toBe('0.5$');
        });

        it('should correct quantity pizzas in order', () => {
            appController.renderPizzasInOrder();
            
            const pizzas = document.querySelectorAll('.pizza').length;
            const pizzasQuantity = appController.order.pizzas.length;

            expect(pizzas).toBe(pizzasQuantity);

        })

        it('should invoke remove pizza from order', () => {
            window.appController = new AppController();

            const removePizzaSpy = spyOn(window.appController, 'removePizza');

            appController.renderPizzasInOrder();

            const removeBtn = document.querySelectorAll('.pizza')[0].querySelector('button');
            removeBtn.click();

            expect(removePizzaSpy).toHaveBeenCalled()
        })

        it('should invoke remove the pizza from order', () => {
            window.appController = new AppController();

            const removePizzaSpy = spyOn(window.appController, 'removePizza');

            appController.renderPizzasInOrder();

            const removeBtn = document.querySelectorAll('.pizza')[0].querySelector('button');
            removeBtn.click();

            expect(removePizzaSpy).toHaveBeenCalledWith(0)
        })
    });

    describe('renderTotalPriceInOrder()', () => {
        let orderElem;

        beforeEach(() => {
            orderElem = document.createElement('div');
            orderElem.classList.add('order');
            document.body.appendChild(orderElem);
        })

        afterEach(() => {
            orderElem.outerHTML = null;
        })

        it('should correct total price in order', async () => {
            const appController = new AppController();
            

            appController.order.addPizza(new Pizza(['ham'], ['large']));
            appController.order.addPizza(new Pizza(['olives'], ['medium']));

            const totalPriceExpected = appController.order.totalPrice;
            

            expect(`Total Price: ${totalPriceExpected}$`).toBe(`Total Price: 1.45$`);
        });
    })

    describe('initOrder()', () => {
        const responsePizzasMock = [
            {
              "toppings": ["ham", "bacon"],
              "size": "large"
            },
            {
              "toppings": ["corn", "olives"],
              "size": "medium"
            }
          ];

        it('should set pizzas to order', async () => {
            const requestSpy = spyOnProperty(appController, 'pizzas')
                  .and.returnValue(Promise.resolve(responsePizzasMock));
            const addPizzaSpy = spyOn(appController.order, 'addPizza');

            await appController.initOrder();

            expect(requestSpy).toHaveBeenCalled();
            expect(addPizzaSpy).toHaveBeenCalledTimes(responsePizzasMock.length);

        })
    });

    describe('init()', () => {
        it('should initOrder() have been called', async () => {
            const requesInit = spyOn(appController, 'initOrder').and.returnValue(Promise.resolve())
            const renderOrderSpy = spyOn(appController, 'renderOrder');

            await appController.init();

            expect(requesInit).toHaveBeenCalled()
            expect(renderOrderSpy).toHaveBeenCalled()
        })
    });

    describe('renderAddPizzaButtonInOrder()', () => {
        let orderElem;
        beforeEach(() => {
            orderElem = document.createElement('div');
            orderElem.classList.add('order');
            document.body.appendChild(orderElem);
        })

        afterEach(() => {
            orderElem.outerHTML = null;
        })

        it('Should pizza button has been rendered', () => {
            appController.renderPizzasInOrder();
            appController.renderAddPizzaButtonInOrder();

            const btn = orderElem.querySelector('button.button');

            expect(btn).toBeDefined();
        })
    })

    describe('renderOrder()', () => {
        it('Should renderOrder() invoke childs methods', () => {
            const renderPizzasInOrder = spyOn(appController, 'renderPizzasInOrder')
            const renderAddPizzaButtonInOrder = spyOn(appController, 'renderAddPizzaButtonInOrder');
            const renderTotalPriceInOrder = spyOn(appController, 'renderTotalPriceInOrder');

            appController.renderOrder();

            expect(renderPizzasInOrder).toHaveBeenCalled()
            expect(renderAddPizzaButtonInOrder).toHaveBeenCalled()
            expect(renderTotalPriceInOrder).toHaveBeenCalled()
        })
    })

    describe('resetFormElements()', () => {
        let orderElem;
        beforeEach(() => {
            orderElem = document.createElement('div');
            orderElem.classList.add('order');
            document.body.appendChild(orderElem);
        })
        afterEach(() => {
            orderElem.innerHTML = null;
        })

        it('Should resetFormElements() reset all inputs in add pizza form', async () => {
            window.appController = new AppController();
            await window.appController.init();
            window.appController.renderOrder()

            const btn = document.querySelector('.add-pizza');

            const all = Array.from(document.querySelectorAll('.toppings input')).filter(el => el.checked);
            expect(all.length === 0).toBeTrue()
        })
    })

    describe('setFormElements()', () => {
        let orderElem;
        beforeEach(() => {
            orderElem = document.createElement('div');
            orderElem.classList.add('order');
            
            document.body.appendChild(orderElem);
            
        })

        afterEach(() => {
            orderElem.innerHTML = null;
        })

        it('Set Form Elements', () => {
            const form = `<form class="pizza-editor mb-20" style="display: none">
            <div class="size mb-15">
                <h5 class="is-size-5">Size:</h5>
                <label class="radio"><input type="radio" name="size" value="small">Small</label>
                <label class="radio"><input type="radio" name="size" value="medium">Medium</label>
                <label class="radio"><input type="radio" name="size" value="large">Large</label>
            </div>
            <div class="toppings">
                <h5 class="is-size-5">Toppings:</h5>
                <label class="checkbox"><input type="checkbox" value="bacon" name="toppings">Bacon</label>
                <label class="checkbox"><input type="checkbox" value="pepperoni" name="toppings">Pepperoni</label>
                <label class="checkbox"><input type="checkbox" value="sausage" name="toppings">Sausage</label>
                <label class="checkbox"><input type="checkbox" value="ham" name="toppings">Ham</label>
                <label class="checkbox"><input type="checkbox" value="pineapple" name="toppings">Pineapple</label>
                <label class="checkbox"><input type="checkbox" value="olives" name="toppings">Olives</label>
                <label class="checkbox"><input type="checkbox" value="corn" name="toppings">Corn</label>
                <label class="checkbox"><input type="checkbox" value="mushrooms" name="toppings">Mushrooms</label>
            </div>
        </form>;
        `
            document.querySelector('.order').innerHTML += form;
            
            const selectedPizza = new Pizza(['ham']);
            appController.setFormElements(selectedPizza);

            const arrayOfToppingChecked = document.querySelector('.pizza-editor input[value="ham"]');

            expect(arrayOfToppingChecked.checked).toBeTrue()
        })
    })

    describe('getFormElements()', () => {
        let orderElem = document.createElement('div');
            orderElem.classList.add('order');
            document.body.appendChild(orderElem);


        it('Get Form Elements', () => {
            const form = `<form class="pizza-editor mb-20" style="display: none">
            <div class="size mb-15">
                <h5 class="is-size-5">Size:</h5>
                <label class="radio"><input type="radio" name="size" value="small">Small</label>
                <label class="radio"><input type="radio" name="size" value="medium">Medium</label>
                <label class="radio"><input type="radio" name="size" value="large">Large</label>
            </div>
            <div class="toppings">
                <h5 class="is-size-5">Toppings:</h5>
                <label class="checkbox"><input type="checkbox" value="bacon" name="toppings">Bacon</label>
                <label class="checkbox"><input type="checkbox" value="pepperoni" name="toppings">Pepperoni</label>
                <label class="checkbox"><input type="checkbox" value="sausage" name="toppings">Sausage</label>
                <label class="checkbox"><input type="checkbox" value="ham" name="toppings">Ham</label>
                <label class="checkbox"><input type="checkbox" value="pineapple" name="toppings">Pineapple</label>
                <label class="checkbox"><input type="checkbox" value="olives" name="toppings">Olives</label>
                <label class="checkbox"><input type="checkbox" value="corn" name="toppings">Corn</label>
                <label class="checkbox"><input type="checkbox" value="mushrooms" name="toppings">Mushrooms</label>
            </div>
        </form>;
        `;
        
            const order = document.querySelector('.order');
            order.innerHTML += form;

            const sizeRadioEx = Array.from(order.querySelectorAll('input[type=radio]'));
            const toppingsCheckboxesEx = Array.from(order.querySelectorAll('input[type=checkbox]'));

            const result = [...sizeRadioEx, ...toppingsCheckboxesEx];

            const expected = appController.getFormElements();
            console.log(expected);
            let {sizeRadio, toppingsCheckboxes} = expected;

            sizeRadio = Array.from(sizeRadio);
            toppingsCheckboxes = Array.from(toppingsCheckboxes);
            
            expect(result.length).toBe(sizeRadio.length + toppingsCheckboxes.length)
          
        })
    });
    

    describe('Toggle state of form', () => {
        let form, order;
        beforeEach(() => {
            form = `<form class="pizza-editor mb-20" style="display: none">
                <div class="size mb-15">
                    <h5 class="is-size-5">Size:</h5>
                    <label class="radio"><input type="radio" name="size" value="small">Small</label>
                    <label class="radio"><input type="radio" name="size" value="medium">Medium</label>
                    <label class="radio"><input type="radio" name="size" value="large">Large</label>
                </div>
                <div class="toppings">
                    <h5 class="is-size-5">Toppings:</h5>
                    <label class="checkbox"><input type="checkbox" value="bacon" name="toppings">Bacon</label>
                    <label class="checkbox"><input type="checkbox" value="pepperoni" name="toppings">Pepperoni</label>
                    <label class="checkbox"><input type="checkbox" value="sausage" name="toppings">Sausage</label>
                    <label class="checkbox"><input type="checkbox" value="ham" name="toppings">Ham</label>
                    <label class="checkbox"><input type="checkbox" value="pineapple" name="toppings">Pineapple</label>
                    <label class="checkbox"><input type="checkbox" value="olives" name="toppings">Olives</label>
                    <label class="checkbox"><input type="checkbox" value="corn" name="toppings">Corn</label>
                    <label class="checkbox"><input type="checkbox" value="mushrooms" name="toppings">Mushrooms</label>
                </div>
            </form>;
            `;
            order = document.querySelector('.order');
            order.innerHTML += form;
        });
        afterEach(() => {
            order.innerHTML = null;

        })
        describe('hideForm()', () => {
            it('The form was hidden', () => {
               
                const formEditor = document.querySelector('.pizza-editor');
                formEditor.style.display = 'block';
    
                appController.hideForm();
                expect(formEditor.style.display).toBe('none');
            })
        })
        describe('showForm()', () => {
            it('The form was show', () => {
                const order = document.querySelector('.order');
                order.innerHTML += form;
                const formEditor = document.querySelector('.pizza-editor');
                formEditor.style.display = 'none';
    
                appController.showForm();
                expect(formEditor.style.display).toBe('block');
            })
        })
    })

})