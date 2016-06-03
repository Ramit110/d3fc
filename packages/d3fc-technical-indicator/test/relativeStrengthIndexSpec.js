const relativeStrengthIndex = require('../build/d3fc-technical-indicator').relativeStrengthIndex;
const readCsv = require('./readcsv.js');

describe('relativeStrengthIndex', () => {
    it('should match the expected output', done => {
        Promise.all([
            readCsv('./test/data/input.csv'),
            readCsv('./test/data/rsi.csv')
        ])
        .then(result => {
            const input = result[0];
            const expectedOutput = result[1];

            const rsi = relativeStrengthIndex().value(d => d.Close);
            const output = rsi(input);
            expect(output)
                .toBeEqualWithTolerance(expectedOutput.map(d => d.RSI));
        })
        .then(done, done.fail);
    });

    it('should return undefined for defined input following non-leading undefined input', () => {
        const rsi = relativeStrengthIndex().period(2);
        const input = [1, 2, 3, 4, 3, undefined, 2, 3, 4];
        const expectedOutput = [undefined, undefined, 100, 100, 50, undefined, undefined, undefined, undefined];
        expect(rsi(input)).toEqual(expectedOutput);
    });
});