
/// <reference types="jest" />

import * as TRANS from '../../../../src/frontend/core/utils/trans';



describe('utils/trans', () => {
  it('Computes hash', () => {
    expect.assertions(3);
    expect(TRANS.hashCode('')).toBe(0);
    expect(TRANS.hashCode('AaA')).toBe(65537);
    expect(TRANS.hashCode('$#DAS$#@$#@KL:AKDSAL:DAKSdl;ASKDLAS:DKASL:D'.repeat(10))).toBe(81217664);
  });

  it('generates key', () => {
    expect.assertions(3);
    expect(TRANS.generateKey('')).toBe('');
    expect(TRANS.generateKey('AaA')).toBe("AaA");
    expect(TRANS.generateKey('$#DAS$#@$#@KL:AKDSAL:DAKSdl;ASKDLAS:DKASL:D'.repeat(10))).toBe("$#DAS$#@$#@KL:AK81217664");
  });

  it('sets lang data', () => {
    expect.assertions(3);
    const dict = {'Hello!': 'Bienvenida!',};
    const lang =  'es';
    expect(TRANS.updateLang(lang, dict)).toBeUndefined();
    expect(TRANS.getLang()).toEqual(lang);
    expect(TRANS.getLangDict()).toEqual(dict);

  });

  it('get en text', () => {
    expect.assertions(1);
    const dict = {'Hello!': 'Bienvenida!',};
    const lang =  'en';
    TRANS.updateLang(lang, dict);
    expect(TRANS.getText('Hello!')).toEqual('Hello!');

  });

  it('get es text', () => {
    expect.assertions(2);
    const dict = {'Hello!': 'Bienvenida!',};
    const lang =  'es';
    TRANS.updateLang(lang, dict);
    expect(TRANS.getText('Hello!')).toEqual('Bienvenida!');
    expect(TRANS.getText('Hello There!')).toEqual('Hello There!');

  });

});
