/* eslint-disable no-extend-native */

/* istanbul ignore else  */
if (!String.prototype.capitalize) {
  String.prototype.capitalize = function capitalize() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };
}

/* istanbul ignore else  */
if (!Array.prototype.appendArray) {
  Array.prototype.appendArray = function appendArray(nextArray, merge = false) {
    if (merge === false) {
      return [...this, ...nextArray];
    }
    return [
      ...this,
      ...nextArray.filter((item) => this.indexOf(item) === -1),
    ];
  };
}
