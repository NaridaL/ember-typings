import Ember from 'ember';
import { assertType } from './lib/assert';

const pets = ['dog', 'cat', 'fish'];
const proxy = Ember.ArrayProxy.create({ content: Ember.A(pets) });

proxy.get('firstObject'); // 'dog'
proxy.set('content', Ember.A(['amoeba', 'paramecium']));
proxy.get('firstObject'); // 'amoeba'

const overridden = Ember.ArrayProxy.create({
    content: Ember.A(pets),
    objectAtContent(idx: number) {
        return this.get('content').objectAt(idx).toUpperCase();
    }
});

overridden.get('firstObject'); // 'DOG'

class MyNewProxy<T> extends Ember.ArrayProxy<T> {
    isNew = true;
}

let x: MyNewProxy<number> = MyNewProxy.create({ content: Ember.A([1, 2, 3]) });
assertType<number>(x.get('firstObject'));
assertType<boolean>(x.isNew);
