(function (global, factory) {
  
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.lingebra = mod.exports.lingebra;
  }
})(this, function (exports) {
  "use strict";

  // expose lingebra to other modules
  var lingebra = exports.lingebra || {};
  lingebra.Matrix = {
    add,
    addable,
    column,
    columnCount,
    dotMultiply,
    isRegularMatrix,
    multipliable,
    multiply,
    row,
    rowCount
  };
  exports.lingebra = lingebra;
});

function add(a, b) {
    if (!addable(a, b)) {
      throw new Error('Matrices are not compatible for addition')
    }
    const outer = [];
    var rowCountOfA = rowCount(a);
    var columnCountOfA = columnCount(a);
    for (var i = 0; i < rowCountOfA; i++) {
        const inner = [];
        for (var j = 0; j < columnCountOfA; j++) {
            inner.push(a[i][j] + b[i][j])
        }
        outer.push(inner);
    }
    return outer;
}

function addable(a, b) {
  return (isRegularMatrix(a) && isRegularMatrix(b)
    && (rowCount(a) === rowCount(b))
    && (columnCount(a) === columnCount(b)));
}

function column(a, i) {
  var col = [];
  var rowCountOfA = rowCount(a);
  for (var j = 0; j < rowCountOfA; j++) {
    col.push(a[j][i]);
  }
  return col;
}

function columnCount(a) {
  if (a.length === 0) {
    return 0;
  }
  if (isRegularMatrix(a)) {
    return a[0].length;
  } else {
    throw new Error("Can't determine column count for an irregular matrix");
  }
}

function dotMultiply(a, b) {
  if (a.length !== b.length) {
    throw new Error('Arrays are not compatible for dot multiplication')
  }
  var rowCountOfA = rowCount(a);
  var dotProduct = 0;
  for (var i = 0; i < rowCountOfA; i++) {
      dotProduct += (a[i] * b[i]);
  }
  return dotProduct;
}

function isRegularMatrix(a) {
  // return true if all rows have the same number of columns
  for (var i = 0; i < a.length; i++) {
    if (a[i].length !== a[0].length) {
      return false;
    }
  }
  return true;
}

function row(a, i) {
  return a[i];
}

function rowCount(a) {
  return a.length;
}

function multiply(a, b) {
    if (!multipliable(a, b)) {
      throw new Error('Matrices are not compatible for multiplication')
    }
    const outer = [];
    var rowCountOfA = rowCount(a);
    var columnCountOfB = columnCount(b);
    for (var i = 0; i < rowCountOfA; i++) {
        var rowFromA = row(a, i);
        const inner = [];
        for (var j = 0; j < columnCountOfB; j++) {
          var columnFromB = column(b, j);
          inner.push(dotMultiply(rowFromA, columnFromB));
        }
        outer.push(inner);
    }
    return outer;
}

function multipliable(a, b) {
  return (isRegularMatrix(a) && isRegularMatrix(b)
    && (columnCount(a) === rowCount(b)));
}
