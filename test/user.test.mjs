import { User } from '../modules/user.mjs'
import { assert } from 'chai';

describe('User class', () => {

    it('store and fetch', () => {
        const newUser = new User("", "tom.cruise@gmail.com", "123");
        newUser.store('temp_user');
        const existed = User.fetch("temp_user", newUser.email, newUser.password);
        assert.equal(existed.email, newUser.email);
        assert.equal(existed.password, newUser.password);
        assert.lengthOf(existed.id, 36);

        // attempt cleanup - this is problematic not good cleanup method
        User.delete('temp_user', existed.id);
    });

    it('delete', () => {
        const newUser = new User("", "tom.cruise@gmail.com", "123");
        newUser.store('temp_user');
        const existed = User.fetch("temp_user", newUser.email, newUser.password);
        assert.equal(existed.email, newUser.email);
        assert.equal(existed.password, newUser.password);
        assert.lengthOf(existed.id, 36);

        User.delete('temp_user', existed.id);

        var theUser;

        try {
            theUser = User.fetch("temp_user", newUser.email, newUser.password);
        } catch (e) {
            return;
        }

        if (!theUser) return;

        assert.notEqual(theUser.email, newUser.email);
        assert.notEqual(theUser.password, newUser.password);
        assert.notEqual(theUser.id, existed.id);
    });
})

