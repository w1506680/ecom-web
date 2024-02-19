const { generateOTP, sendOTP } = require('../utils/otp');
const assert = require('assert');

describe('generateOTP', () => {

    it('should generate a 6 digit OTP', () => {
        const otp = generateOTP();
        assert.strictEqual(otp.length, 6);
        assert.strictEqual(typeof otp, 'string');
    });

    it('should generate a random OTP each time', () => {
        const otp1 = generateOTP();
        const otp2 = generateOTP();
        assert.notStrictEqual(otp1, otp2);
    });

});

describe('sendOTP', () => {

    it('should send OTP email successfully', async () => {
        const username = 'test@example.com';
        const otp = '123456';

        let info;
        try {
            info = await sendOTP(username, otp);
        } catch (err) {
            assert.ifError(err);
        }

        assert.ok(info);
        assert.strictEqual(info.accepted.length, 1);
    });

    it('should handle invalid username error', async () => {
        const username = 'invalid';
        const otp = '123456';

        let error;
        try {
            await sendOTP(username, otp);
        } catch (err) {
            error = err;
        }

        assert(error);
        assert.strictEqual(error.code, 'EENVELOPE');
    });

});
