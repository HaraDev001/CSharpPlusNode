var json;
//// Provide your translations as JSON / JS objects
//var englishTranslation = {
//    header: {
//        title: 'Welcome to Academica',
//        subtitle: 'Dieser Untertitel ist nur für Demozwecke',
//    },
//};
//var spanishTranslation = {
//    translateme: 'Eine Überschrift',
//    subtitle: 'Dieser Untertitel ist nur für Demozwecke'
//};
function getLenguajeFile(lenguaje, exito) {
    fetch(`/dist/lenguajes/${lenguaje}.json?` + Math.random() * 10000)
        .then((res) => {
            return json = res.json()
        })
        .then((translation) => {
            json = translation
            exito()
        })
        .catch((e) => {
            console.log(e)
            console.log(`archivo: ${lenguaje}.json`)
        });
}
/**
 * Get a translated value from a JSON by providing a key. Additionally,
 * the target language can be specified as the second parameter.
 *
 * @param {String} key
 * @return {String}
 */
var _getValueFromJSON = function (key) {
    
    var texto = key.split('.').reduce((obj, i) => (obj ? obj[i] : null), json);
  
    return texto
}

function traducir(key) {
    return _getValueFromJSON(key)
}

/**
 * Replace a given DOM nodes' attribute values (by default innerHTML) with
 * the translated text.
 *
 * @param {HTMLElement} element
 */
var _replace = function (element) {
    const keys = element.getAttribute('data-i18n')?.split(/\s/g);
    const attributes = element?.getAttribute('data-i18n-attr')?.split(/\s/g);

    if (attributes && keys.length != attributes.length) {
        console.log('MISMATCHING_ATTRIBUTES', keys, attributes, element);
    }

    keys.forEach((key, index) => {
        const text = this._getValueFromJSON(key);
        const attr = attributes ? attributes[index] : 'innerHTML';
       
        if (text && text != undefined) {
            if (attr == 'innerHTML') {
                element[attr] = text;
            } else {
                element.setAttribute(attr, text);
            }
        } else {
            console.log('TRANSLATION_NOT_FOUND', key);
        }
    });
}

/**
 * Translate all DOM nodes that match the given selector into the
 * specified target language.
 *
 */
var translatePageTo = function () {
    const elements = Array.from(document.querySelectorAll('[data-i18n]'));
    if (elements.length && elements.length > 0) {
        elements.forEach((element) => this._replace(element));
    } else if (elements.length == undefined) {
        this._replace(elements);
    }
}

