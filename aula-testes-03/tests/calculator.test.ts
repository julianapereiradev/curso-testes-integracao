import calculator from "../src/calculator";


describe("Trivial Math functions", () => {
    it("returns 3 for 1 and 2 params", () => {
        const sum = calculator.sum(1, 2);   
        expect(sum).toEqual(3);
    });

    it("returns -1 for 1 and 2 params", () => {
        const sub = calculator.sub(1, 2);   
        expect(sub).toEqual(-1);
    });

    it("returns 2 for 1 and 2 params", () => {
        const mul = calculator.mul(1, 2);   
        expect(mul).toEqual(2);
    });

    it("returns 0.5 for 1 and 2 params", () => {
        const div = calculator.div(1, 2);   
        expect(div).toEqual(0.5);
    });
  
});