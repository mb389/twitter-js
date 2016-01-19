var _ = require("lodash");

var data=[
   { name: 'Scott Stackson',
    text: 'Fullstack Academy is cool! The instructors are just so wonderful. #fullstacklove #codedreams' },
  { name: 'Ayana Ternary',
    text: 'Fullstack Academy is breathtaking! The instructors are just so breathtaking. #fullstacklove #codedreams' },
  { name: 'Shanna Stackson',
    text: 'Fullstack Academy is amazing! The instructors are just so mindblowing. #fullstacklove #codedreams' },
  { name: 'Scott Ternary',
    text: 'Fullstack Academy is breathtaking! The instructors are just so awesome. #fullstacklove #codedreams' },
  { name: 'Ayana McQueue',
    text: 'Fullstack Academy is amazing! The instructors are just so sweet. #fullstacklove #codedreams' }
];

function add (name, text) {
  data.push({ name: name, text: text });
};

function list () {
  return _.cloneDeep(data);
};

function find (properties) {
  return _.filter(data, properties);
};

module.exports = { add: add, list: list, find: find, data: data };

var randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};
