const {generateVanityNumbers,scoreVanityNumber,selectBestVanityNumbers} = require('../processVanityNumbers')

const { expect } = require('chai');

describe('Vanity Number Generator', () => {
    describe('generateVanityNumbers', () => {
        it('should generate all possible vanity numbers for a given phone number', () => {
            const phoneNumber = '23';
            const result = generateVanityNumbers(phoneNumber);
            expect(result).to.have.members(['AD', 'AE', 'AF', 'BD', 'BE', 'BF', 'CD', 'CE', 'CF']);
        });

        it('should return the original number when digits are 1 or 0', () => {
            const phoneNumber = '102';
            const result = generateVanityNumbers(phoneNumber);
            expect(result).to.have.members(['10A', '10B', '10C']);
        });

        it('should handle empty input', () => {
            const phoneNumber = '';
            const result = generateVanityNumbers(phoneNumber);
            expect(result).to.eql(['']);
        });
    });

    describe('scoreVanityNumber', () => {
        it('should return a score based on the number of letters in the vanity number', () => {
            const vanityNumber = '1-800-FLOWERS';
            const result = scoreVanityNumber(vanityNumber);
            expect(result).to.equal(7);
        });

        it('should return 0 if the vanity number contains no letters', () => {
            const vanityNumber = '123456';
            const result = scoreVanityNumber(vanityNumber);
            expect(result).to.equal(0);
        });
    });

    describe('selectBestVanityNumbers', () => {
        it('should return the top 3 vanity numbers based on their score', () => {
            const vanityNumbers = ['123456', '1800FLOWERS', '1800CARPET', '1800CLEAN'];
            const result = selectBestVanityNumbers(vanityNumbers);
            expect(result).to.eql(['1800FLOWERS', '1800CARPET', '1800CLEAN']);
        });

        it('should return all vanity numbers if there are fewer than 3', () => {
            const vanityNumbers = ['1800FLOWERS', '123456'];
            const result = selectBestVanityNumbers(vanityNumbers);
            expect(result).to.eql(['1800FLOWERS', '123456']);
        });

        it('should return an empty array if no vanity numbers are provided', () => {
            const vanityNumbers = [];
            const result = selectBestVanityNumbers(vanityNumbers);
            expect(result).to.eql([]);
        });
    });
});
