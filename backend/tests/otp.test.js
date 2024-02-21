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

    it('should send OTP email', async () => {
      const username = 'sylenthira@gmail.com';
      const otp = '123456';
   
      await sendOTP(username, otp);
   
      assert.ok(true); 
    });
   
    it('should handle invalid username', async () => {
      const username = null;
      const otp = '123456';
   
      let error;
      try {
        await sendOTP(username, otp);
      } catch (err) {
        error = err;
      }
   
      assert(error);
    });
   
    it('should handle invalid OTP', async () => {
      const username = 'sylenthira@gmail.com';
      const otp = null;
   
      let error;
      try {
        await sendOTP(username, otp);
      } catch (err) {
        error = err;
      }
   
      assert(error);
    });
   
   });