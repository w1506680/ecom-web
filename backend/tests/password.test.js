const assert = require('assert');
const { hashPassword } = require('../utils/password');

describe('hashPassword', () => {

    it('should hash the password', async () => {
        const password = 'password123';
        const hashedPassword = await hashPassword(password);

        assert.strictEqual(typeof hashedPassword, 'string');
        assert.strictEqual(hashedPassword.length, 60);
    });

    it('should hash different passwords to different hashes', async () => {
        const password1 = 'password123';
        const password2 = 'password456';

        const hash1 = await hashPassword(password1);
        const hash2 = await hashPassword(password2);

        assert.notStrictEqual(hash1, hash2);
    });

    it('should throw an error on invalid password', async () => {
        const invalidPassword = null;

        let error;
        try {
            await hashPassword(invalidPassword);
        } catch (err) {
            error = err;
        }

        assert(error instanceof Error);
    });

});
