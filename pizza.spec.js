describe('pizza.js', () => {
    let pizza1, pizza2;
    beforeEach(() => {
        pizza1 = new Pizza(['ham'], ['small']);
        pizza2 = new Pizza(['ham', 'bacon', 'pepperoni'], ['small']);
    })

    describe('toppingsPrice()', () => {
        it('Should return correct toppings price', () => {
            const actual = pizza1.pizzaPrice;
            const expected = 0.5;

            expect(actual).toBeNumber();
            expect(expected).toBe(actual);
        })
    })

    describe('pizzaPrice()', () => {
        it('Should return correct price', () => {
            const actual = pizza2.toppingsPrice;
            const expected = 2.05;

            expect(actual).toBeNumber();
            expect(expected).toBe(actual)
        })
    })

})