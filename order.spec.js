describe('order.js', () => {
    let order;
    beforeEach(() => {
        order = new Order();
    })

    describe('addPizza(pizza)', () => {
        it('Should add new pizza in order', () => {
            const pizza = new Pizza(['ham'], ['small']);

            expect(order.pizzas.length).toBe(0);
            order.addPizza(pizza);
            expect(order.pizzas.length).toBe(1);
        })
    })

    describe('removePizza(index)', () => {
        it('Should remove pizza from order', () => {
            const pizza = new Pizza(['ham'], ['small']);
            order.addPizza(pizza);

            expect(order.pizzas.length).toBe(1);
            order.removePizza(0);
            expect(order.pizzas.length).toBe(0);
        })
    })

})