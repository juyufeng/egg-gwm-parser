'use strict';

class Category {
  constructor() {
     
  }

  isGwmIf(line) {
    return line.search('@gwmIf') !== -1
  }

  isGwmElseIf(line) {
    return line.search('@gwmElseIf') !== -1
  }

  isGwmElse(line) {
    return line.search('@gwmElse') !== -1
  }

  isGwmEndIf(line) {
    return line.search('@gwmEndIf') !== -1
  }

  isGwmFor(line) {
    return line.search('@gwmFor') !== -1
  }

  isGwmEndFor(line) {
    return line.search('@gwmEndFor') !== -1
  }

}

const category = new Category()
module.exports = category;
